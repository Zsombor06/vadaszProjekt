<?php
require "config.php";

$rendelesId = $_GET['rendelesId'] ?? null;

if (!$rendelesId) {
    http_response_code(400);
    echo json_encode(["hiba" => "Rendelés ID hiányzik"]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT
        tr.nev,
        tr.ar,
        t.mennyiseg,
        (tr.ar * t.mennyiseg) AS reszosszeg
        FROM tetelek t
        JOIN termek tr ON tr.id = t.termekId
        WHERE t.rendelesId = ?
");

$stmt->execute([$rendelesId]);

echo json_encode([
    "rendelesId" => $rendelesId,
    "tetelek" => $stmt->fetchAll(PDO::FETCH_ASSOC)
]);
