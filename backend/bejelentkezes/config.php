<?php
    $SECRET_KEY = "F3k9!s2@H8d#Q1pL0zUeW7*mRnB5_vX";
    $TOKEN_EXPIRE = 60 * 60 * 24; // 24 óra

    $pdo = new PDO("mysql:host=localhost;dbname=arany_agancs;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>