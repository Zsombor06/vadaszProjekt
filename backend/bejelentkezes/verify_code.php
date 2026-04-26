<?php
require 'config.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

$stmt = $pdo->prepare("SELECT * FROM jelszo_visszaallitas WHERE email = ? AND token = ? AND lejarat > NOW()");
$stmt->execute([$data->email, $data->code]);
$ok = $stmt->fetch();

if ($ok) {
    http_response_code(200);
    echo json_encode(["status" => "ok"]);
} else {
    http_response_code(400);
    echo json_encode(["valasz" => "Hibás kód"]);
}