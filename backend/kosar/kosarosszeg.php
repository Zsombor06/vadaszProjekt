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
        tr.nev,
        tr.nevEn,
        tr.ar,
        t.mennyiseg,
        (tr.ar * t.mennyiseg) AS reszosszeg
    FROM tetelek t
    JOIN termek tr ON tr.id = t.termekId
    WHERE t.rendelesId = ?
");
$stmt->execute([$rendelesId]);

$tetelek = $stmt->fetchAll(PDO::FETCH_ASSOC);

$vegosszeg = 0;
foreach ($tetelek as $tetel) {
    $vegosszeg += $tetel['reszosszeg'];
}

echo json_encode([
    "rendelesId" => $rendelesId,
    "tetelek" => $tetelek,
    "vegosszeg" => $vegosszeg
]);
