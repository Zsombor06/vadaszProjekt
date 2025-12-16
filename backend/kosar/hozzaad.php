<?php
require "config.php";
require "kosar.php";

$data = json_decode(file_get_contents("php://input"), true);

$felhasznalo = $data['felhasznalo'] ?? null;
$termekId   = $data['termekId'] ?? null;

if (!$felhasznalo || !$termekId) {
    http_response_code(400);
    echo json_encode(["hiba" => "Felhasználó vagy termék hiányzik"]);
    exit;
}

$rendelesId = getOrCreateActiveOrder($pdo, $felhasznalo);

// van-e már ilyen termék?
$stmt = $pdo->prepare("
    SELECT id, mennyiseg
    FROM tetelek
    WHERE rendelesId = ? AND termekId = ?
    LIMIT 1
");
$stmt->execute([$rendelesId, $termekId]);
$tetel = $stmt->fetch(PDO::FETCH_ASSOC);

if ($tetel) {
    // növelés
    $stmt = $pdo->prepare("
        UPDATE tetelek
        SET mennyiseg = mennyiseg + 1
        WHERE id = ?
    ");
    $stmt->execute([$tetel['id']]);

    echo json_encode([
        "uzenet" => "A termék mennyisége növelve",
        "mennyiseg" => $tetel['mennyiseg'] + 1
    ]);
} else {
    // új tétel
    $stmt = $pdo->prepare("
        INSERT INTO tetelek (rendelesId, termekId, mennyiseg)
        VALUES (?, ?, 1)
    ");
    $stmt->execute([$rendelesId, $termekId]);

    echo json_encode([
        "uzenet" => "Termék hozzáadva a kosárhoz",
        "mennyiseg" => 1
    ]);
}