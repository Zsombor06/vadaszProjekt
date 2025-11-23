<?php
require 'vendor/autoload.php';
require 'config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

// mezők ellenőrzése
if (!isset($data->username) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(["valasz" => "felhasználónév és jelszó szükséges"]);
    exit;
}

// lekérdezés a DB-ből
$stmt = $pdo->prepare("SELECT felhasznalonev, jelszo, rangId FROM felhasznalo WHERE felhasznalonev = ?");
$stmt->execute([$data->username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// ellenőrzés
if (!$user || $user["jelszo"] !== $data->password) {
    http_response_code(401);
    echo json_encode(["valasz" => "Érvénytelen hitelesítő adatok"]);
    exit;
}

// JWT payload
$payload = [
    "sub" => $user["felhasznalonev"],
    "rangId" => $user["rangId"],
    "iat" => time(),
    "exp" => time() + $TOKEN_EXPIRE
];

// token létrehozása
$token = JWT::encode($payload, $SECRET_KEY, 'HS256');

// válasz
echo json_encode([
    "accessToken" => $token,
    "expiresIn" => $TOKEN_EXPIRE
]);
