
<?php
// DB CONFIGURATION
define('DB_SERVER', '193.203.184.167'); // Changed from localhost to 127.0.0.1 for faster resolution
define('DB_USERNAME', 'u611789137_pravara_nw_usr');
define('DB_PASSWORD', 'Pravara@#986532');
define('DB_DATABASE', 'u611789137_pravara_new_db');  // Ensure this matches your phpMyAdmin DB name

$con = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

// If connection fails, we do NOT suppress it here, we let insert_order.php catch it.
if ($con->connect_error) {
    // Check if we are running in a script that handles errors, otherwise die
    if (basename($_SERVER['PHP_SELF']) == 'config.php') {
        die("Connection failed: " . $con->connect_error);
    }
    // Don't kill script here, let the parent script handle $con->connect_error
} else {
    $con->set_charset("utf8mb4");
}
?>
