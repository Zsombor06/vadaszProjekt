<?php
require 'vendor/autoload.php';
require 'config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function authenticate() {
    global $SECRET_KEY;

    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["valasz" => "Hiányzó token"]);
        exit;
    }

    $token = str_replace("Bearer ", "", $headers['Authorization']);

    try {
        return JWT::decode($token, new Key($SECRET_KEY, 'HS256'));
    } catch (Exception $e) {
        http_response_code(403);
        echo json_encode(["valasz" => "Érvénytelen vagy lejárt token"]);
        exit;
    }
}
