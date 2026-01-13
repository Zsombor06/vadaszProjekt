<?php
require "config.php";
require "kosar.php";

$data = json_decode(file_get_contents("php://input"), true);
$felhasznalo = $data['felhasznalo'] ?? null;

if (!$felhasznalo) {
    http_response_code(400);
    echo json_encode([
        "siker" => false,
        "uzenet" => "Felhasználó hiányzik"
    ]);
    exit;
}

$stmt = $pdo->prepare("
    UPDATE rendeles
    SET fizetve = 1,
        fizetesIdeje = NOW()
    WHERE felhasznalo = ? AND fizetve = 0
");
$stmt->execute([$felhasznalo]);

// Új kosár
getOrCreateActiveOrder($pdo, $felhasznalo);

echo json_encode([
    "siker" => true,
    "uzenet" => "Sikeres fizetés! Köszönjük a vásárlást.",
    "datum" => date("Y-m-d H:i:s")
]);

