<?php
require '../bejelentkezes/config.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"));

// mezők ellenőrzése
if (!isset($data->felhasznalonev) || 
    !isset($data->jelszo) || 
    !isset($data->email) ||
    !isset($data->szamlazasiCim) ||
    !isset($data->orszag) ||
    !isset($data->iranyitoszam) ||
    !isset($data->varos) ||
    !isset($data->utca)) {

    http_response_code(400);
    echo json_encode(["hiba" => "Minden mező kitöltése kötelező"]);
    exit;
}

// felhasználónév foglaltság
$stmt = $pdo->prepare("SELECT felhasznalonev FROM felhasznalo WHERE felhasznalonev = ?");
$stmt->execute([$data->felhasznalonev]);

if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(["hiba" => "A felhasználónév már létezik!"]);
    exit;
}

//email foglaltság
$stmt = $pdo->prepare("SELECT email FROM felhasznalo WHERE email = ?");
$stmt->execute([$data->email]);

if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(["hiba" => "Az email cím már foglalt!"]);
    exit;
}


// jelszó hash-elése
$hashedPassword = password_hash($data->jelszo, PASSWORD_DEFAULT);

// felhasználó mentése
$stmt = $pdo->prepare("
    INSERT INTO felhasznalo (felhasznalonev, jelszo, email, szamlazasicim, rangId)
    VALUES (?, ?, ?, ?, 3)
");
$stmt->execute([
    $data->felhasznalonev,
    $hashedPassword,
    $data->email,
    $data->szamlazasiCim
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

echo json_encode([
    "uzenet" => "Felhasználó sikeresen létrehozva!"
]);
