<?php

function getOrCreateActiveOrder(PDO $pdo, string $felhasznalo): int {
    $stmt = $pdo->prepare("
        SELECT id FROM rendeles
        WHERE felhasznalo = ? AND fizetve = 0
        LIMIT 1
    ");
    $stmt->execute([$felhasznalo]);
    $order = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($order) {
        return (int)$order['id'];
    }

    // ÚJ RENDES BESZÚRÁS (NULL HELYETT 0)
    $stmt = $pdo->prepare("
        INSERT INTO rendeles (felhasznalo, fizetve, elkuldve, teljesitve)
        VALUES (?, 0, 0, 0)
    ");
    $stmt->execute([$felhasznalo]);

    return (int)$pdo->lastInsertId();
}

