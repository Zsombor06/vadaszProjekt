<?php
header("Content-Type: application/json");

$cacheFile = "rate.json";
$cacheTime = 86400; // 1 nap

if (!file_exists($cacheFile) || time() - filemtime($cacheFile) > $cacheTime) {
    $response = file_get_contents("https://open.er-api.com/v6/latest/HUF");
    if ($response !== false) {
        file_put_contents($cacheFile, $response);
    }
}

$data = json_decode(file_get_contents($cacheFile), true);
$eurRate = $data['rates']['EUR'] ?? null;
echo json_encode([
    "rate" => $eurRate
]);