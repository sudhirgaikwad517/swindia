import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Use port from environment variable for cPanel deployment, or fallback to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------
// DATABASE CONFIGURATION
// ---------------------------------------------------------
// Credentials provided for: adityaka_db_swavalambi_healthcare
// Note: On cPanel/Shared Hosting, database names often include the username prefix (e.g. adityaka_).
const db = mysql.createPool({
    host: "127.0.0.1", 
    user: "adityaka_user_swavalambi_healthcare",
    password: "Aditya_test_2004",
    database: "adityaka_db_swavalambi_healthcare",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL Database: adityaka_db_swavalambi_healthcare');
        connection.release();
    }
});

// ---------------------------------------------------------
// EASEBUZZ CONFIGURATION
// ---------------------------------------------------------
const EASEBUZZ_ENV = "test"; 
const SALT = (EASEBUZZ_ENV === "prod") ? "M0BLDA02O9" : "U6NSJ7NRY";
const MERCHANT_KEY = (EASEBUZZ_ENV === "prod") ? "HZG5XMOJRB" : "CYH86BZWU";
const PAYMENT_API_URL = (EASEBUZZ_ENV === "prod") ? "https://pay.easebuzz.in/payment/initiateLink" : "https://testpay.easebuzz.in/payment/initiateLink";
const PAYMENT_REDIRECT_BASE = (EASEBUZZ_ENV === "prod") ? "https://pay.easebuzz.in/pay/" : "https://testpay.easebuzz.in/pay/";

function generateOrderId() {
    const date = new Date();
    const iso = date.toISOString().replace(/[-T:\.Z]/g, "").slice(2, 14); 
    const random = Math.floor(Math.random() * 90 + 10);
    return `${iso}${random}`;
}

// ---------------------------------------------------------
// API ROUTES
// ---------------------------------------------------------

// Test Route to verify API is running
app.get('/api/test', (req, res) => {
    res.json({ status: "success", message: "API is working correctly!" });
});

// Insert Order & Initiate Payment
app.post('/api/insert_order', (req, res) => {
    try {
        const data = req.body;
        console.log("Received Order Data:", JSON.stringify(data, null, 2));
        
        if (!data || !data.shipping || !data.items) {
            return res.status(400).json({ status: "error", message: "Invalid data received: Missing shipping or items" });
        }

        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const host = req.get('host');
        const BASE_URL = `${protocol}://${host}`;

        const { shipping, items, paymentMethod } = data;
        const fullName = shipping.fullName || `${shipping.firstName || ''} ${shipping.lastName || ''}`.trim();
        
        let totalAmount = 0;
        let totalQty = 0;
        const productSummary = [];

        items.forEach(item => {
            totalAmount += item.price * item.quantity;
            totalQty += item.quantity;
            productSummary.push(`${item.name} (${item.quantity})`);
        });

        // Backend validation for totals
        const shippingCost = totalAmount > 499 ? 0 : 99;
        const finalTotal = totalAmount + shippingCost;
        
        // Calculate average MRP for the schema (assuming single product row structure)
        const itemMrpAvg = totalQty > 0 ? (totalAmount / totalQty) : 0;
        
        // Truncate SKU string if it exceeds DB limit (approx 250 chars)
        const productSkuString = productSummary.join(", ").substring(0, 250);
        
        const orderId = generateOrderId();
        const now = new Date();
        const orderDate = now.toISOString().slice(0, 10);
        const orderTime = now.toLocaleTimeString('en-GB', { hour12: false });
        
        const modeOfPayment = paymentMethod === 'cod' ? 'COD' : 'ONLINE';
        const paymentStatus = 'pending';
        const channelId = '1';

        // Mapping to tbl_orders Schema
        const sql = `INSERT INTO tbl_orders (
            order_id, fname, mobno, street, landmark, city, taluka, district, pincode, 
            product_sku, item_mrp, qty, mode_of_payment, total_amount, order_date, order_time, 
            payment_status, channel_id, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

        const values = [
            orderId, fullName, shipping.phone, shipping.street, shipping.landmark, 
            shipping.city, shipping.taluka, shipping.district, shipping.pinCode,
            productSkuString, itemMrpAvg, totalQty, modeOfPayment, finalTotal,
            orderDate, orderTime, paymentStatus, channelId
        ];

        db.query(sql, values, async (err, result) => {
            if (err) {
                console.error("DB Insert Error:", err);
                return res.status(500).json({ status: "error", message: "Database Insertion Failed: " + err.message });
            }

            console.log(`Order ${orderId} inserted successfully.`);

            let response = {
                status: "success",
                order_id: orderId,
                message: "Order placed successfully",
                final_amount: finalTotal
            };

            if (modeOfPayment === 'ONLINE') {
                // -------------------------------------------------------------
                // MOCK PAYMENT IMPLEMENTATION (DEMO MODE)
                // -------------------------------------------------------------
                // As requested, skipping the actual Easebuzz API call for now.
                // Simulating a successful transaction redirection.
                
                console.log("Mocking Online Payment for Order:", orderId);

                // Redirect directly to the success page
                const successUrl = `${BASE_URL}/#/checkout?status=success&order_id=${orderId}`;
                response.payment_url = successUrl;
                
                // Auto-confirm payment status in DB for this demo transaction
                db.query("UPDATE tbl_orders SET payment_status = 'success' WHERE order_id = ?", [orderId], (uErr) => {
                    if(uErr) console.error("Mock payment status update failed:", uErr);
                    else console.log(`Order ${orderId} marked as paid (Mock).`);
                });

                /* 
                // --- ORIGINAL EASEBUZZ LOGIC (Uncomment when ready for production) ---
                const amountFloat = parseFloat(finalTotal).toFixed(2);
                const productInfo = "Ayurvedic Products";
                const firstNameClean = shipping.firstName.replace(/[^a-zA-Z0-9\s]/g, '').trim() || "Customer";
                const phoneClean = shipping.phone.replace(/[^0-9]/g, '').trim(); 
                const emailClean = shipping.email || "guest@pravara.com";

                const hashString = `${MERCHANT_KEY}|${orderId}|${amountFloat}|${productInfo}|${firstNameClean}|${emailClean}|||||||||||${SALT}`;
                const hash = crypto.createHash('sha512').update(hashString).digest('hex');

                const params = new URLSearchParams();
                params.append('key', MERCHANT_KEY);
                params.append('txnid', orderId);
                params.append('amount', amountFloat);
                params.append('productinfo', productInfo);
                params.append('firstname', firstNameClean);
                params.append('email', emailClean);
                params.append('phone', phoneClean);
                params.append('surl', `${BASE_URL}/api/payment_callback`);
                params.append('furl', `${BASE_URL}/api/payment_callback`);
                params.append('hash', hash);
                
                try {
                    const apiResponse = await fetch(PAYMENT_API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
                        body: params
                    });

                    const easebuzzData = await apiResponse.json();
                    
                    if (easebuzzData.status == 1 && easebuzzData.data) {
                        response.access_key = easebuzzData.data;
                        response.payment_url = `${PAYMENT_REDIRECT_BASE}${easebuzzData.data}`;
                    } else {
                        response.payment_error = "Payment initiation failed: " + JSON.stringify(easebuzzData.data);
                    }

                } catch (apiError) {
                    console.error("Easebuzz Network Error:", apiError);
                    response.payment_error = "Payment gateway unreachable.";
                }
                */
            }

            res.json(response);
        });

    } catch (e) {
        console.error("Server Error:", e);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

// Payment Callback
app.post('/api/payment_callback', (req, res) => {
    const { status, firstname, amount, txnid, hash: postedHash, key, productinfo, email, error } = req.body;
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const FRONTEND_URL = `${protocol}://${host}/#/checkout`;

    const hashString = `${SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

    const isPaymentValid = (postedHash === calculatedHash);
    const finalStatus = (isPaymentValid && status === "success") ? 'success' : 'failed';
    const failureReason = isPaymentValid ? (error || "Transaction Failed") : "Hash Mismatch - Security Alert";

    const updateSql = "UPDATE tbl_orders SET payment_status = ?, updated_at = NOW() WHERE order_id = ?";
    
    db.query(updateSql, [finalStatus, txnid], (err, result) => {
        if (err) {
            console.error("Callback DB Update Error:", err);
            return res.redirect(`${FRONTEND_URL}?status=failed&order_id=${txnid}&reason=System_Error`);
        }
        if (finalStatus === 'success') {
            res.redirect(`${FRONTEND_URL}?status=success&order_id=${txnid}`);
        } else {
            res.redirect(`${FRONTEND_URL}?status=failed&order_id=${txnid}&reason=${encodeURIComponent(failureReason)}`);
        }
    });
});

// ---------------------------------------------------------
// STATIC FILES SERVING (Fixes 404 for frontend)
// ---------------------------------------------------------

app.use(express.static(__dirname));

// Express 5 wildcard syntax: Use regex or '/(.*)' instead of '*'
app.get('/(.*)', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});