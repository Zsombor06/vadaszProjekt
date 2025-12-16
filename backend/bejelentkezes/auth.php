<?php
require  'vendor/autoload.php';
require 'config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function authenticate() {
    global $SECRET_KEY;

    if (!isset($_GET['Authorization'])) {
        http_response_code(401);
        echo json_encode(["valasz" => "Hiányzó token"]);
        exit;
    }

    $token = str_replace("Bearer ", "", $_GET['Authorization']);

    try {
        return JWT::decode($token, new Key($SECRET_KEY, 'HS256'));
    } catch (Exception $e) {
        http_response_code(403);
        echo json_encode(["valasz" => "Érvénytelen vagy lejárt token"]);
        exit;
    }
}
