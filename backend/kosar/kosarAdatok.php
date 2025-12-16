<?php
require "config.php";
require "kosar.php";

$felhasznalo = $_GET['felhasznalo'] ?? null;
if (!$felhasznalo) {
    http_response_code(400);
    echo json_encode(["hiba" => "Felhasználó hiányzik"]);
    exit;
}

$rendelesId = getOrCreateActiveOrder($pdo, $felhasznalo);

$stmt = $pdo->prepare("
    SELECT 
        t.id,
        t.termekId,
        t.mennyiseg,
        tr.nev,
        tr.nevEn,
        tr.kep,
        tr.ar
    FROM tetelek t
    JOIN termek tr ON tr.id = t.termekId
    WHERE t.rendelesId = ?
");
$stmt->execute([$rendelesId]);

echo json_encode([
    "rendelesId" => $rendelesId,
    "tetelek" => $stmt->fetchAll(PDO::FETCH_ASSOC)
]);
