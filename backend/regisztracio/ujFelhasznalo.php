<?php
require '../bejelentkezes/config.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

// mezők ellenőrzése
if (
    !isset($data->felhasznalonev) ||
    !isset($data->jelszo) ||
    !isset($data->email) ||
    
    !isset($data->szamlazasi_orszag) ||
    !isset($data->szamlazasi_iranyitoszam) ||
    !isset($data->szamlazasi_varos) ||
    !isset($data->szamlazasi_utca) ||

    !isset($data->orszag) ||
    !isset($data->iranyitoszam) ||
    !isset($data->varos) ||
    !isset($data->utca)
) {
    http_response_code(400);
    echo json_encode(["hiba" => "Minden mező kitöltése kötelező!"]);
    exit;
}

// felhasználónév ellenőrzése
$stmt = $pdo->prepare("SELECT felhasznalonev FROM felhasznalo WHERE felhasznalonev = ?");
$stmt->execute([$data->felhasznalonev]);

if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(["hiba" => "A felhasználónév már létezik!"]);
    exit;
}

// email ellenőrzése
$stmt = $pdo->prepare("SELECT email FROM felhasznalo WHERE email = ?");
$stmt->execute([$data->email]);

if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(["hiba" => "Az email cím már foglalt!"]);
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
