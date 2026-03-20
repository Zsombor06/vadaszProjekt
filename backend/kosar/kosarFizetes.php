<?php
require "config.php";
require "kosar.php";

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
$stmt1= $pdo->prepare("SELECT id from rendeles WHERE felhasznalo=? order by id desc limit 2;");
$stmt1->execute([$felhasznalo]);
$eredmeny=$stmt1->fetchAll(PDO::FETCH_ASSOC);
$stmt2=$pdo->prepare("SELECT termekId FROM `rendeles` inner join tetelek on rendelesId=rendeles.id WHERE rendeles.id=?;");
$stmt2->execute([$eredmeny[1]["id"]]);
$eredmeny=$stmt2->fetchAll(PDO::FETCH_ASSOC);

foreach ($eredmeny as $termekId) {
$stmt=$pdo->prepare("UPDATE `termek` SET keszlet=(`keszlet`- (select mennyiseg from termek inner join tetelek on termek.id=termekId inner join rendeles on rendeles.id=rendelesId where termekId=? and felhasznalo=? order by tetelek.id desc limit 1)) where `id`=?;");
$stmt->execute([$termekId["termekId"],$felhasznalo,$termekId["termekId"]]);

}

$stmt = $pdo->prepare("
    UPDATE rendeles
    SET fizetve = 1,
        fizetesIdeje = NOW(),
        szallitasId=?
    WHERE felhasznalo = ? AND fizetve = 0
");
$stmt->execute([$szallitasId,$felhasznalo]);

// Új kosár
getOrCreateActiveOrder($pdo, $felhasznalo);

echo json_encode([
    "siker" => true,
    "uzenet" => "Sikeres fizetés! Köszönjük a vásárlást.",
    "datum" => date("Y-m-d H:i:s")
]);

