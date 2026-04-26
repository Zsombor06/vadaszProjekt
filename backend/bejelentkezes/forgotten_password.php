<?php
require __DIR__ . '/../../vendor/autoload.php';
require 'config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

header('Content-Type: application/json');

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email)) {
    http_response_code(400);
    echo json_encode(["valasz" => "Email cím megadása kötelező"]);
    exit;
}

$stmt = $pdo->prepare("SELECT felhasznalonev FROM felhasznalo WHERE email = ?");
$stmt->execute([$data->email]);
$user = $stmt->fetch();

if ($user) {
    $token = rand(000000, 999999); 
    $lejarat = date("Y-m-d H:i:s", strtotime("+3 minutes")); 

    $stmt = $pdo->prepare("INSERT INTO jelszo_visszaallitas (email, token, lejarat) VALUES (?, ?, ?)");
    $stmt->execute([$data->email, $token, $lejarat]);

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->CharSet = 'UTF-8';
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['EMAIL_USERNAME'];
        $mail->Password = $_ENV['EMAIL_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom($_ENV['EMAIL_USERNAME'], 'Arany Agancs Webshop');
        $mail->addAddress($data->email, $user['felhasznalonev']);

        $mail->isHTML(true);
        $mail->Subject = 'Jelszó visszaállító kód - Arany Agancs';
        $mail->Body = "
            <div style='background-color: #f4f1ea; padding: 40px; font-family: Arial, sans-serif; color: #2f3e2b;'>
                <div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);'>
                    
                    <div style='background-color: #2f3e2b; padding: 20px; text-align: center;'>
                        <h1 style='color: #c49e3c; margin: 0; font-size: 28px; letter-spacing: 2px;'>Arany Agancs</h1>
                    </div>
            
                    <div style='padding: 30px; line-height: 1.6;'>
                        <h2 style='color: #2f3e2b; border-bottom: 2px solid #f4f1ea; padding-bottom: 10px;'>Üdvözlünk!</h2>
                        <p>Úgy tűnik, elfelejtetted a jelszavadat. Semmi gond, az alábbi biztonsági kóddal beállíthatsz egy újat:</p>
                        
                        <div style='background-color: #f9f7f2; border: 1px solid #e0ddd5; border-radius: 6px; padding: 20px; text-align: center; margin: 30px 0;'>
                            <p style='margin: 0; font-size: 14px; color: #888;'>A biztonsági kódod:</p>
                            <div style='font-size: 42px; font-weight: bold; color: #c49e3c; letter-spacing: 10px; margin: 10px 0;'>$token</div>
                            <p style='margin: 0; font-size: 12px; color: #a52a2a;'>A kód 3 percig érvényes!</p>
                        </div>
            
                        <p style='font-size: 14px;'>Ha nem te kérted a jelszó visszaállítását, kérjük hagyd figyelmen kívül ezt a levelet.</p>
                    </div>
            
                    <div style='background-color: #2f3e2b; padding: 20px; text-align: left;'>
                        <p style='color: #c49e3c; margin: 0; font-size: 14px; font-weight: bold;'>Az Arany Agancs Csapata</p>
                        <p style='color: #f4f1ea; margin: 5px 0 0 0; font-size: 11px; opacity: 0.7;'>Ez egy automatikus üzenet, kérjük ne válaszolj rá.</p>
                    </div>
                </div>
            </div>
            ";

        $mail->send();
        echo json_encode(["valasz" => "A kódot elküldtük az e-mail címedre!"]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["valasz" => "Hiba az e-mail küldésekor: " . $mail->ErrorInfo]);
    }
} else {
    http_response_code(404);
    echo json_encode(["valasz" => "Ez az e-mail cím nem létezik!"]);
}