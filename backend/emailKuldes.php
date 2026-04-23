<?php
require __DIR__ . '/../vendor/autoload.php';
require 'config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function emailKuldes($cimzettEmail, $cimzettNev, $targy, $uzenet) {
    
    $mail = new PHPMailer(true);
    $mail->SMTPDebug = 0;

    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['EMAIL_USERNAME'];
    $mail->Password = $_ENV['EMAIL_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom($_ENV['EMAIL_USERNAME'], 'Arany Agancs Webshop');
    $mail->addAddress($cimzettEmail, $cimzettNev);

    $mail->isHTML(true);
    $mail->Subject = $targy;
    $mail->Body = $uzenet;

    try {
        $mail->send();
        return true;
    } catch (Exception $e) {
        return $mail->ErrorInfo;
    }
}