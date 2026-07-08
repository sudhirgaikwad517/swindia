<?php
// 1. ROBUST CORS HANDLING
// Allow from any origin that sends a request
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
} else {
    header("Access-Control-Allow-Origin: *");
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// 2. ERROR HANDLING & JSON HEADER
ob_start();
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ALL);
ini_set('display_errors', 0); // Disable auto-display, we handle it via shutdown function

register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== NULL && $error['type'] === E_ERROR) {
        // Clear any partial output
        if(ob_get_length()) ob_clean(); 
        echo json_encode(["status" => "error", "message" => "Fatal Error: " . $error['message'] . " on line " . $error['line']]);
        exit();
    }
});

// --- EASEBUZZ CONFIGURATION (TEST ENV) ---
$EASEBUZZ_ENV = "prod"; // Set to 'prod' for production


if ($EASEBUZZ_ENV === "prod") {
    $MERCHANT_KEY = "HZG5XMOJRB";
    $SALT = "M0BLDA02O9";
    $INITIATE_URL = "https://pay.easebuzz.in/payment/initiateLink";
    $PAY_REDIRECT_BASE = "https://pay.easebuzz.in/pay/";
} else {
    // TEST CREDENTIALS
    $MERCHANT_KEY = "CYH86BZWU";
    $SALT = "U6NSJ7NRY";
    $INITIATE_URL = "https://testpay.easebuzz.in/payment/initiateLink";
    $PAY_REDIRECT_BASE = "https://testpay.easebuzz.in/pay/";
}
// 3. DATABASE CONNECTION
$con = null;
try {
    // Look for config in current dir or parent includes
    $configPath = 'config.php';
    if (!file_exists($configPath)) $configPath = __DIR__ . '/config.php';

    if (!file_exists($configPath)) {
        throw new Exception("config.php not found in " . __DIR__);
    }

    include $configPath;

    if (!$con) {
        throw new Exception("Database connection variable \$con is null.");
    }
    
    if ($con->connect_error) {
        throw new Exception("DB Connect Error: " . $con->connect_error);
    }

} catch (Exception $e) {
    sendError("Server Config Error: " . $e->getMessage());
}

// 4. PROCESS REQUEST DATA
$shipping = [];
$items = [];
$paymentMethod = 'cod';
$totalAmount = 0;

try {
    // Debug: Log request method
    // file_put_contents('debug_log.txt', print_r($_POST, true), FILE_APPEND);

    if (!empty($_POST)) {
        // FormData
        $shipping['fullName'] = $_POST['firstname'] ?? '';
        $shipping['phone'] = $_POST['phone'] ?? '';
        $shipping['email'] = $_POST['email'] ?? 'guest@pravara.com'; 
        $shipping['street'] = $_POST['address1'] ?? '';
        $shipping['city'] = $_POST['city'] ?? '';
        $shipping['pinCode'] = $_POST['zipcode'] ?? '';
        $paymentMethod = $_POST['paymentMethod'] ?? 'cod';
        $totalAmount = floatval($_POST['amount'] ?? 0);

        if (isset($_POST['product_sku']) && is_array($_POST['product_sku'])) {
            $skus = $_POST['product_sku'];
            $names = $_POST['product_name'] ?? [];
            $qtys = $_POST['product_qty'] ?? [];
            $prices = $_POST['product_price'] ?? [];

            for ($i = 0; $i < count($skus); $i++) {
                $items[] = [
                    'sku' => $skus[$i],
                    'name' => $names[$i] ?? $skus[$i],
                    'quantity' => intval($qtys[$i] ?? 1),
                    'price' => floatval($prices[$i] ?? 0)
                ];
            }
        }
    } else {
        // JSON Fallback
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);
        if ($data) {
            $shipping = $data['shipping'] ?? [];
            $shipping['email'] = $shipping['email'] ?? 'guest@pravara.com';
            $paymentMethod = $data['paymentMethod'] ?? 'cod';
            $totalAmount = floatval($data['totalAmount'] ?? 0);
            foreach (($data['items'] ?? []) as $item) {
                $items[] = [
                    'sku' => $item['sku'] ?? 'unknown',
                    'name' => $item['name'] ?? '',
                    'quantity' => intval($item['quantity'] ?? 1),
                    'price' => floatval($item['price'] ?? 0)
                ];
            }
        }
    }

    // Validation
    if (empty($shipping['fullName']) || empty($shipping['phone'])) {
        sendError("Missing Name or Phone number.");
    }

    // 5. PREPARE SQL DATA
    $total_qty = 0;
    $total_cart_price = 0;
    $product_skus = [];
    
    foreach ($items as $item) {
        $product_skus[] = $item['sku'];
        $total_qty += $item['quantity'];
        $total_cart_price += ($item['price'] * $item['quantity']);
    }

    $final_total = ($total_cart_price > 0) ? $total_cart_price : $totalAmount;
    if ($final_total < 499 && $final_total > 0) $final_total += 99; // Shipping Logic

    $item_mrp_avg = $total_qty > 0 ? ($final_total / $total_qty) : 0; 
    $order_id = "ORD" . date('YmdHis') . rand(100, 999);
    $product_sku_string = implode(", ", $product_skus); 
    
    // 6. INSERT INTO DB
    $sql = "INSERT INTO tbl_orders (
        order_id, fname, mobno, street, city, pincode, 
        product_sku, item_mrp, qty, mode_of_payment, total_amount, 
        order_date, order_time, payment_status, channel_id, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), CURTIME(), ?, '1', NOW())";

    $stmt = $con->prepare($sql);

    if (!$stmt) {
        throw new Exception("SQL Prepare Failed: " . $con->error);
    }

    $initial_status = 'pending';
    // Logic changed to store EASEBUZZ instead of ONLINE
    $db_payment_method = ($paymentMethod === 'cod') ? 'COD' : 'EASEBUZZ';

    $stmt->bind_param(
        "sssssssdisds", 
        $order_id, 
        $shipping['fullName'], 
        $shipping['phone'], 
        $shipping['street'], 
        $shipping['city'], 
        $shipping['pinCode'],
        $product_sku_string, 
        $item_mrp_avg, 
        $total_qty, 
        $db_payment_method, 
        $final_total, 
        $initial_status
    );

    if ($stmt->execute()) {
        
        // --- 7. HANDLE PAYMENT LOGIC ---

        if ($paymentMethod === 'cod') {
            // COD SUCCESS
            $origin = $_SERVER['HTTP_ORIGIN'] ?? 'http://localhost:3000';
            $redirect_url = $origin . "/#/thank-you?status=success&order_id=" . $order_id; 

            sendResponse([
                "status" => "success",
                "order_id" => $order_id,
                "payment_url" => $redirect_url, 
                "message" => "Order placed successfully (COD)"
            ]);

        } else {
            // ONLINE PAYMENT - EASEBUZZ
            
            // Format Amount
            $amount_fixed = number_format((float)$final_total, 2, '.', ''); 
            $product_info = "Ayurvedic Products";
            $firstname_clean = preg_replace("/[^a-zA-Z0-9\s]/", "", $shipping['fullName']);
            $email_clean = $shipping['email'];
            $phone_clean = $shipping['phone'];
            
            // Define Return URLs (Backend Callback)
            // Fix: Dynamically construct URL for localhost/production
            $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http");
            $host = $_SERVER['HTTP_HOST'];
            $path = dirname($_SERVER['PHP_SELF']);
            
            // Remove trailing slash if exists to avoid double slash
            $path = rtrim($path, '/');
            
            $api_base = "$protocol://$host$path/";
            $surl = $api_base . "payment_callback.php";
            $furl = $api_base . "payment_callback.php";

            // Hash Sequence
            $hash_string = $MERCHANT_KEY . "|" . $order_id . "|" . $amount_fixed . "|" . $product_info . "|" . $firstname_clean . "|" . $email_clean . "|||||||||||" . $SALT;
            
            $hash = strtolower(hash('sha512', $hash_string));

            // Prepare POST Fields
            $post_fields = [
                'key' => $MERCHANT_KEY,
                'txnid' => $order_id,
                'amount' => $amount_fixed,
                'productinfo' => $product_info,
                'firstname' => $firstname_clean,
                'phone' => $phone_clean,
                'email' => $email_clean,
                'surl' => $surl,
                'furl' => $furl,
                'hash' => $hash
            ];

            // Call Easebuzz API
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $INITIATE_URL);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_fields));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

            $result_json = curl_exec($ch);
            
            if ($result_json === false) {
                 throw new Exception("Easebuzz Connection Error: " . curl_error($ch));
            }
            curl_close($ch);

            $result_data = json_decode($result_json, true);

            if (isset($result_data['status']) && $result_data['status'] == 1 && isset($result_data['data'])) {
                // SUCCESS
                $access_key = $result_data['data'];
                $payment_url = $PAY_REDIRECT_BASE . $access_key;

                sendResponse([
                    "status" => "success",
                    "order_id" => $order_id,
                    "payment_url" => $payment_url, 
                    "message" => "Payment initiated"
                ]);
            } else {
                // API ERROR
                $err_msg = isset($result_data['data']) ? $result_data['data'] : "Unknown Gateway Error";
                throw new Exception("Payment Gateway Error: " . $err_msg);
            }
        }

    } else {
        throw new Exception("DB Insert Failed: " . $stmt->error);
    }

} catch (Exception $e) {
    sendError($e->getMessage());
}

$stmt->close();
$con->close();

function sendResponse($responseArray) {
    // Clear buffer before sending response
    if(ob_get_length()) ob_clean();
    echo json_encode($responseArray);
    exit();
}

function sendError($message) {
    // Clear buffer before sending error
    if(ob_get_length()) ob_clean();
    echo json_encode(["status" => "error", "message" => $message]);
    exit();
}
?>