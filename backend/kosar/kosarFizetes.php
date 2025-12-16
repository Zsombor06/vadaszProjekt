<?php
require "config.php";
require "kosar.php";

$data = json_decode(file_get_contents("php://input"), true);
$felhasznalo = $data['felhasznalo'] ?? null;

if (!$felhasznalo) {
    http_response_code(400);
    echo json_encode(["hiba" => "Felhasználó hiányzik"]);
    exit;
}

// Aktív kosár lezárása
$stmt = $pdo->prepare("
    UPDATE rendeles
    SET fizetve = 1
    WHERE felhasznalo = ? AND fizetve = 0
");
$stmt->execute([$felhasznalo]);

// Új, üres kosár
getOrCreateActiveOrder($pdo, $felhasznalo);

echo json_encode(["uzenet" => "Fizetés sikeres, új kosár létrehozva"]);
