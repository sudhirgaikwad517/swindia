
<?php
// Prevent CORS issues
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// 1. CONFIGURATION
$configPath = 'config.php';
if (!file_exists($configPath)) $configPath = 'include/config.php';
if (!file_exists($configPath)) $configPath = __DIR__ . '/include/config.php';

if (file_exists($configPath)) {
    include $configPath;
} else {
    echo json_encode(["status" => false, "msg" => "Config not found"]);
    exit;
}

// 2. KEYS
$EASEBUZZ_ENV = "test"; 
$SALT = ($EASEBUZZ_ENV === "prod") ? "YOUR_PROD_SALT" : "U6NSJ7NRY";

// 3. CAPTURE DATA
$response = $_POST;
if (empty($response) || !isset($response['hash'])) {
    echo json_encode(["status" => false, "msg" => "No data received"]);
    exit;
}

// 4. EXTRACT VARIABLES
$key = $response['key'] ?? '';
$txnid = $response['txnid'] ?? ''; // order_id
$amount = $response['amount'] ?? 0.0;
$productinfo = $response['productinfo'] ?? '';
$firstname = $response['firstname'] ?? '';
$email = $response['email'] ?? '';
$phone = $response['phone'] ?? '';
$udf1 = $response['udf1'] ?? '';
$udf2 = $response['udf2'] ?? '';
$udf3 = $response['udf3'] ?? '';
$udf4 = $response['udf4'] ?? '';
$udf5 = $response['udf5'] ?? '';
$udf6 = $response['udf6'] ?? '';
$udf7 = $response['udf7'] ?? '';
$udf8 = $response['udf8'] ?? '';
$udf9 = $response['udf9'] ?? '';
$udf10 = $response['udf10'] ?? '';
$status = $response['status'] ?? '';
$posted_hash = $response['hash'] ?? '';
$easepayid = $response['easepayid'] ?? ''; 
$error_msg = ($response['error'] ?? '') . ' ' . ($response['error_Message'] ?? '');

// Additional Fields
$mode = $response['mode'] ?? '';
$unmappedstatus = $response['unmappedstatus'] ?? '';
$cardCategory = $response['cardCategory'] ?? '';
$addedon = $response['addedon'] ?? '';
$payment_source = $response['payment_source'] ?? '';
$pg_type = $response['PG_TYPE'] ?? '';
$bank_ref_num = $response['bank_ref_num'] ?? '';
$bankcode = $response['bankcode'] ?? '';
$name_on_card = $response['name_on_card'] ?? '';
$cardnum = $response['cardnum'] ?? '';
$issuing_bank = $response['issuing_bank'] ?? '';
$net_amount_debit = $response['net_amount_debit'] ?? 0.0;
$cash_back_percentage = $response['cash_back_percentage'] ?? 0.0;
$deduction_percentage = $response['deduction_percentage'] ?? 0.0;
$merchant_logo = $response['merchant_logo'] ?? '';
$surl = $response['surl'] ?? '';
$furl = $response['furl'] ?? '';
$upi_va = $response['upi_va'] ?? '';
$card_type = $response['card_type'] ?? '';
$bank_name = $response['bank_name'] ?? '';
$auth_code = $response['auth_code'] ?? '';

// 5. VERIFY HASH
$hash_sequence = "$SALT|$status|$udf10|$udf9|$udf8|$udf7|$udf6|$udf5|$udf4|$udf3|$udf2|$udf1|$email|$firstname|$productinfo|$amount|$txnid|$key";
$calculated_hash = strtolower(hash('sha512', $hash_sequence));

if ($posted_hash !== $calculated_hash) {
    error_log("Easebuzz Webhook: Hash mismatch for order $txnid");
    echo json_encode(["status" => false, "msg" => "Hash Mismatch"]);
    exit;
}

// 6. UPDATE DATABASE
$db_status = ($status === "success") ? 'success' : 'failed';

$sql = "UPDATE tbl_orders SET 
    payment_status = ?, bank_ref_no = ?, pg_txnid = ?, pg_amount = ?, pg_status = ?, 
    pg_error_message = ?, pg_payment_source = ?, pg_mode = ?, pg_addedon = ?, pg_easepayid = ?, 
    pg_net_amount_debit = ?, pg_cash_back_percentage = ?, pg_deduction_percentage = ?, pg_card_category = ?, 
    pg_unmappedstatus = ?, pg_cardnum = ?, pg_upi_va = ?, pg_card_type = ?, pg_bankcode = ?, 
    pg_name_on_card = ?, pg_bank_name = ?, pg_issuing_bank = ?, pg_pg_type = ?, pg_auth_code = ?, 
    pg_auth_ref_num = ?, pg_email = ?, pg_firstname = ?, pg_productinfo = ?, pg_key = ?, 
    pg_merchant_logo = ?, pg_surl = ?, pg_furl = ?, pg_udf1 = ?, pg_udf2 = ?, pg_udf3 = ?, 
    pg_udf4 = ?, pg_udf5 = ?, pg_udf6 = ?, pg_udf7 = ?, pg_udf8 = ?, pg_udf9 = ?, pg_udf10 = ?, 
    pg_hash = ?, channel_id = ?, updated_at = NOW()
WHERE order_id = ?";

$stmt = $con->prepare($sql);

if ($stmt) {
    // Mapping 45 parameters carefully
    // Types: s=string, d=double
    $stmt->bind_param(
        "sssds"."sssss"."dddss"."sssss"."sssss"."sssss"."ss"."sssssssssss"."ss",
        $db_status, $bank_ref_num, $txnid, $amount, $status,
        $error_msg, $payment_source, $mode, $addedon, $easepayid,
        $net_amount_debit, $cash_back_percentage, $deduction_percentage, $cardCategory,
        $unmappedstatus, $cardnum, $upi_va, $card_type, $bankcode,
        $name_on_card, $bank_name, $issuing_bank, $pg_type, $auth_code,
        $bank_ref_num, $email, $firstname, $productinfo, $key,
        $merchant_logo, $surl, $furl, $udf1, $udf2, $udf3,
        $udf4, $udf5, $udf6, $udf7, $udf8, $udf9, $udf10,
        $posted_hash, $easepayid, $txnid
    );

    $stmt->execute();
    
    if ($stmt->affected_rows > 0 || $stmt->errno == 0) {
        echo json_encode(["status" => true, "msg" => "Order updated successfully"]);
    } else {
        echo json_encode(["status" => true, "msg" => "No changes made or DB error: " . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => false, "msg" => "Database error: " . $con->error]);
}

$con->close();
?>
