<?php
require "config.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["hiba" => "Tétel ID hiányzik"]);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM tetelek WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(["uzenet" => "Tétel törölve"]);
