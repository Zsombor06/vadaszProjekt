<?php
header("Content-Type: application/json; charset=UTF-8");
require "config.php";
require "kosar.php";

$felhasznalo = $_GET['felhasznalo'] ?? null;
if (!$felhasznalo) {
    http_response_code(400);
    echo json_encode(["hiba" => "Felhasználó hiányzik"]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT tetelek.id 
    FROM `rendeles` 
    left JOIN tetelek on rendeles.id=tetelek.rendelesId 
    where felhasznalo=? 
    order by rendeles.id desc 
    limit 1;
");
$stmt->execute([$felhasznalo]);

echo json_encode([
    $stmt->fetchAll(PDO::FETCH_ASSOC)
]);
exit;