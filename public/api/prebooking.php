<?php
// 1. ROBUST CORS HANDLING
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
ini_set('display_errors', 0);

register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== NULL && $error['type'] === E_ERROR) {
        if(ob_get_length()) ob_clean(); 
        echo json_encode(["status" => "error", "message" => "Fatal Error: " . $error['message'] . " on line " . $error['line']]);
        exit();
    }
});

/*
SQL Table Schema:
----------------
CREATE TABLE IF NOT EXISTS prebookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

// 3. DATABASE CONNECTION
$con = null;
try {
    $configPath = 'config.php';
    if (!file_exists($configPath)) $configPath = __DIR__ . '/config.php';

    if (!file_exists($configPath)) {
        throw new Exception("config.php not found");
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
$name = '';
$phone = '';
$address = '';
$city = '';
$pincode = '';
$productName = '';

try {
    // Check if JSON request or POST request
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    if ($data) {
        $name = $data['name'] ?? '';
        $phone = $data['phone'] ?? '';
        $address = $data['address'] ?? '';
        $city = $data['city'] ?? '';
        $pincode = $data['pincode'] ?? '';
        $productName = $data['product_name'] ?? '';
    } else {
        $name = $_POST['name'] ?? '';
        $phone = $_POST['phone'] ?? '';
        $address = $_POST['address'] ?? '';
        $city = $_POST['city'] ?? '';
        $pincode = $_POST['pincode'] ?? '';
        $productName = $_POST['product_name'] ?? '';
    }

    // Validation
    if (empty($name) || empty($phone) || empty($address) || empty($city) || empty($pincode) || empty($productName)) {
        sendError("Please fill out all the 5 fields (Name, Mob No, Address, City, Pincode) and the product selection.");
    }

    // 5. INSERT INTO DB
    $sql = "INSERT INTO prebookings (name, phone, address, city, pincode, product_name) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $con->prepare($sql);

    if (!$stmt) {
        throw new Exception("SQL Prepare Failed: " . $con->error);
    }

    $stmt->bind_param("ssssss", $name, $phone, $address, $city, $pincode, $productName);

    if ($stmt->execute()) {
        sendResponse([
            "status" => "success",
            "message" => "Your prebooking for " . htmlspecialchars($productName) . " has been successfully submitted!"
        ]);
    } else {
        throw new Exception("DB Insert Failed: " . $stmt->error);
    }

    $stmt->close();
} catch (Exception $e) {
    sendError($e->getMessage());
}

$con->close();

function sendResponse($responseArray) {
    if(ob_get_length()) ob_clean();
    echo json_encode($responseArray);
    exit();
}

function sendError($message) {
    if(ob_get_length()) ob_clean();
    echo json_encode(["status" => "error", "message" => $message]);
    exit();
}
?>
