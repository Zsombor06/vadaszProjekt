<?php
require '../bejelentkezes/config.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

// mezők ellenőrzése
if (
    empty($data->felhasznalonev) ||
    empty($data->jelszo) ||
    empty($data->email) ||
    
    empty($data->szamlazasi_orszag) ||
    empty($data->szamlazasi_iranyitoszam) ||
    empty($data->szamlazasi_varos) ||
    empty($data->szamlazasi_utca) ||

    empty($data->orszag) ||
    empty($data->iranyitoszam) ||
    empty($data->varos) ||
    empty($data->utca)
) {
    http_response_code(400);
    echo json_encode(["hiba" => 1]);
    exit;
}

// felhasználónév ellenőrzése
$stmt = $pdo->prepare("SELECT felhasznalonev FROM felhasznalo WHERE felhasznalonev = ?");
$stmt->execute([$data->felhasznalonev]);

if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(["hiba" => 2]);
    exit;
}

// email ellenőrzése
$stmt = $pdo->prepare("SELECT email FROM felhasznalo WHERE email = ?");
$stmt->execute([$data->email]);

if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(["hiba" => 3]);
    exit;
}

// jelszó hash
$hashedPassword = password_hash($data->jelszo, PASSWORD_DEFAULT);

// felhasználó mentése
$stmt = $pdo->prepare("
    INSERT INTO felhasznalo 
    (felhasznalonev, jelszo, email, szamlazasi_orszag, szamlazasi_iranyitoszam, szamlazasi_varos, szamlazasi_utca, rangId)
    VALUES (?, ?, ?, ?, ?, ?, ?, 3)
");
$stmt->execute([
    $data->felhasznalonev,
    $hashedPassword,
    $data->email,
    $data->szamlazasi_orszag,
    $data->szamlazasi_iranyitoszam,
    $data->szamlazasi_varos,
    $data->szamlazasi_utca
]);
$stmt = $pdo->prepare("
    INSERT INTO rendeles 
    (felhasznalo, fizetve)
    VALUES (?, 0)
");
$stmt->execute([
    $data->felhasznalonev
]);
// szállítási cím mentése
$stmt = $pdo->prepare("
    INSERT INTO szallitasicimek (felhasznalo, orszag, iranyitoszam, varos, utca)
    VALUES (?, ?, ?, ?, ?)
");
$stmt->execute([
    $data->felhasznalonev,
    $data->orszag,
    $data->iranyitoszam,
    $data->varos,
    $data->utca
]);

echo json_encode(["uzenet" => "Felhasználó sikeresen létrehozva!"]);
