<?php
require '../bejelentkezes/config.php';
require '../config.php';
require '../emailKuldes.php';

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

$sikeresReg = $stmt->execute([
    $data->felhasznalonev,
    $data->orszag,
    $data->iranyitoszam,
    $data->varos,
    $data->utca
]);

if ($sikeresReg) {
    emailKuldes(
        $data->email,
        $data->felhasznalonev,
        "Sikeres regisztráció",
        `<div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f1ea; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <tr>
                                <td style="background-color: #2f3e2b; padding: 30px 40px; text-align: center;">
                                    <h1 style="margin: 0; color: #c49e3c; font-size: 28px; font-weight: 600; letter-spacing: 1px;">Arany Agancs</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 40px;">
                                    <h2 style="margin: 0 0 20px 0; color: #2f3e2b; font-size: 22px; font-weight: 600;">
                                        Üdvözlünk, {$data->felhasznalonev}!
                                    </h2>                            
                                    <p style="margin: 0 0 25px 0; color: #444; font-size: 16px; line-height: 1.6;">
                                        Köszönjük, hogy regisztráltál webshopunkba! Fiókod sikeresen aktiválódott.
                                    </p>
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f1ea; border-radius: 6px; margin-bottom: 30px;">
                                        <tr>
                                            <td style="padding: 25px;">
                                                <p style="margin: 0 0 15px 0; color: #2f3e2b; font-size: 15px; font-weight: 600;">
                                                    Mostantól elérhető számodra:
                                                </p>
                                                <table role="presentation" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td style="padding: 6px 0; color: #444; font-size: 15px;">
                                                            <span style="color: #b08b32; margin-right: 10px;">✓</span> Vásárolhatsz termékeink közül
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 6px 0; color: #444; font-size: 15px;">
                                                            <span style="color: #b08b32; margin-right: 10px;">✓</span> Követheted rendeléseidet
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 6px 0; color: #444; font-size: 15px;">
                                                            <span style="color: #b08b32; margin-right: 10px;">✓</span> Megnézheted eddigi vásárlásaidat
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                        <tr>
                                            <td style="background-color: #8b2f2f; border-radius: 6px;">
                                                <a href="http://localhost/vadaszProjekt/frontend/fooldal/fooldal.html" 
                                                   style="display: inline-block; padding: 14px 35px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">
                                                    Vásárlás megkezdése →
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #2f3e2b; padding: 25px 40px;">
                                    <p style="margin: 0 0 5px 0; color: #c49e3c; font-size: 14px; font-weight: 600;">
                                        Az Arany Agancs Csapata
                                    </p>
                                    <p style="margin: 0; color: #a0a0a0; font-size: 12px;">
                                        Ez egy automatikus üzenet, kérjük ne válaszolj rá.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>`
    );
    echo json_encode(["uzenet" => "Felhasználó sikeresen létrehozva!"]);
} else {
    echo json_encode(["uzenet" => "Felhasználó létrehozása sikertelen!"]);
}
