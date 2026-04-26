<?php
require 'config.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->token) || !isset($data->ujJelszo)) {
    http_response_code(400);
    echo json_encode(["valasz" => "Hiányzó adatok"]);
    exit;
}

$stmt = $pdo->prepare("SELECT email FROM jelszo_visszaallitas WHERE token = ? AND lejarat > NOW()");
$stmt->execute([$data->token]);
$request = $stmt->fetch();

if (!$request) {
    http_response_code(400);
    echo json_encode(["valasz" => "A link érvénytelen vagy lejárt"]);
    exit;
}

$ujHash = password_hash($data->ujJelszo, PASSWORD_BCRYPT);
$stmt = $pdo->prepare("UPDATE felhasznalo SET jelszo = ? WHERE email = ?");
$stmt->execute([$ujHash, $request['email']]);

$stmt = $pdo->prepare("DELETE FROM jelszo_visszaallitas WHERE email = ?");
$stmt->execute([$request['email']]);

echo json_encode(["valasz" => "A jelszó sikeresen megváltozott!"]);