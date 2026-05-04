<?php
require "config.php";
require "kosar.php";
require '../emailKuldes.php';
include "../sql_fuggvenyek.php";
$data = json_decode(file_get_contents("php://input"), true);
$felhasznalo = $data['felhasznalo'] ?? null;
$szallitasId=$data["szallitasId"] ?? null;
if (!$felhasznalo) {
    http_response_code(400);
    echo json_encode([
        "siker" => false,
        "uzenet" => "Felhasználó hiányzik"
    ]);
    exit;
}
$stmt=$pdo->prepare("
    SELECT
    mennyiseg, 
    keszlet 
    FROM `tetelek` 
    inner JOIN rendeles on rendelesId=rendeles.id 
    inner JOIN termek on termekId=termek.id 
    where rendeles.felhasznalo=? 
    and fizetve=0");
$stmt->execute([$felhasznalo]);
$eredmeny=$stmt->fetchAll(PDO::FETCH_ASSOC);
if($eredmeny[0]["mennyiseg"] > $eredmeny[0]["keszlet"]){
    http_response_code(400);
    echo json_encode([
        "siker" => false,
        "uzenet" => "Nincs elég termék raktáron"
    ]);
    exit;
}
$stmt1= $pdo->prepare("SELECT id from rendeles WHERE felhasznalo=? order by id desc limit 1;");
$stmt1->execute([$felhasznalo]);
$eredmeny=$stmt1->fetchAll(PDO::FETCH_ASSOC);
$stmt2=$pdo->prepare("SELECT termekId FROM `rendeles` inner join tetelek on rendelesId=rendeles.id WHERE rendeles.id=?;");
$stmt2->execute([$eredmeny[0]["id"]]);
$eredmeny=$stmt2->fetchAll(PDO::FETCH_ASSOC);

foreach ($eredmeny as $termekId) {
$stmt=$pdo->prepare("UPDATE `termek` SET keszlet=(`keszlet`- (select mennyiseg from termek inner join tetelek on termek.id=termekId inner join rendeles on rendeles.id=rendelesId where termekId=? and felhasznalo=? order by tetelek.id desc limit 1)) where `id`=?;");
$stmt->execute([$termekId["termekId"],$felhasznalo,$termekId["termekId"]]);

}


$emailLekeresSQL="SELECT email from felhasznalo where felhasznalonev=?";
$emailLekeres=adatokLekerese($emailLekeresSQL,"s",[$felhasznalo]);
$termekAdatokSQL="    SELECT 
        t.termekId,
        t.mennyiseg,
        tr.nev,
        floor((tr.ar-tr.ar*LearazasMerteke/100)*t.mennyiseg) as ar
        FROM tetelek t
        JOIN termek tr ON tr.id = t.termekId
        join learazas on learazasId=learazas.id
        join rendeles on rendeles.id=rendelesId
        WHERE rendeles.felhasznalo = ? and fizetve=0";
        $termekAdatok=adatokLekerese($termekAdatokSQL,"i",[$felhasznalo]);
        $sorAdat="";
        $teljOsszeg=0;
        foreach ($termekAdatok as $termekAdat) {
            $sorAdat=$sorAdat."<tr style='border: 1px solid black; border-collapse: collapse;'><td style='border: 1px solid black; border-collapse: collapse;'>{$termekAdat["nev"]}</td><td style='border: 1px solid black; border-collapse: collapse;'>{$termekAdat["mennyiseg"]}db</td><td style='border: 1px solid black; border-collapse: collapse;'>{$termekAdat["ar"]}Ft</td></tr>";
            $teljOsszeg+=$termekAdat["ar"];
        }
    $emailHTML = <<<HTML
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>
            <div>
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
                                        Kedves, {$felhasznalo}!
                                    </h2>                            
                                    <p style="margin: 0 0 25px 0; color: #444; font-size: 16px; line-height: 1.6;">
                                        Rendelésedet elkezdtük feldolgozni, hamarason jövünk a további értesítésekkel
                                    </p>
                                    <table class="table" style="border: 1px solid black; border-collapse: collapse;">
                                        <tr style='border: 1px solid black; border-collapse: collapse;'><th style='border: 1px solid black; border-collapse: collapse;'>Termék</th><th style='border: 1px solid black; border-collapse: collapse;'>Mennyiség</th><th style='border: 1px solid black; border-collapse: collapse;'>Ár</th></tr>
                                    {$sorAdat}
                                    </table>
                                    <h2>Végösszeg: {$teljOsszeg}<h2>
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
        </div>
    </body>
HTML;
$eredmeny = emailKuldes(
        $emailLekeres[0]["email"],
        $felhasznalo,
        "Rendelés fizetve",
        $emailHTML
    );
$stmt = $pdo->prepare("
    UPDATE rendeles
    SET fizetve = 1,
        fizetesIdeje = NOW(),
        szallitasId=?
    WHERE felhasznalo = ? AND fizetve = 0
");
// Új kosár
getOrCreateActiveOrder($pdo, $felhasznalo);

$stmt->execute([$szallitasId,$felhasznalo]);
echo json_encode([
    "siker" => true,
    "uzenet" => "Sikeres fizetés! Köszönjük a vásárlást.",
    "datum" => date("Y-m-d H:i:s")
]);

