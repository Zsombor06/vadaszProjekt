<?php
require "config.php";

$felhasznalo = $_GET['felhasznalo'] ?? null;

if (!$felhasznalo) {
    http_response_code(400);
    echo json_encode(["hiba" => "Felhasználó hiányzik"]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT
        r.id AS rendelesId,
        r.fizetesIdeje,
        r.elkuldve,
        r.teljesitve,
        SUM(t.mennyiseg * tr.ar) AS vegosszeg
        FROM rendeles r
        JOIN tetelek t ON t.rendelesId = r.id
        JOIN termek tr ON tr.id = t.termekId
        WHERE r.felhasznalo = ?
          AND r.fizetve = 1
        GROUP BY r.id
        ORDER BY r.fizetesIdeje DESC
");

$stmt->execute([$felhasznalo]);

$rendelesek = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "felhasznalo" => $felhasznalo,
    "rendelesek" => $rendelesek
]);
