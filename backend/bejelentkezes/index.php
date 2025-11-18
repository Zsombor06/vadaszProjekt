<?php
    include "../sql_fuggvenyek.php";
    $metodus = $_SERVER["REQUEST_METHOD"];
    $uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
    $uri = explode("/", $uri);


    switch (end($uri)) {
        case "bejelentkezes":
            if ($metodus != "GET") {
                return http_response_code(405);
            }

            if (empty($_GET["felhasznalonev"]) || empty($_GET["jelszo"])) {
                echo json_encode(["valasz" => "Hiányzó adatok!"], JSON_UNESCAPED_UNICODE);
                return http_response_code(400);
            }

            $bejelentkezesSQL = "SELECT * FROM felhasználó WHERE felhasználónév = ? AND jelszó = ?";
            $bejelentkezes = adatokLekerese($bejelentkezesSQL, "ss", [$_GET["felhasznalonev"], $_GET["jelszo"]]);

            if (empty($bejelentkezes)) {
                echo json_encode(["valasz" => "Hibás felhasználónév vagy jelszó"], JSON_UNESCAPED_UNICODE);
                return http_response_code(401);
            }
            echo json_encode($bejelentkezes, JSON_UNESCAPED_UNICODE);
            return http_response_code(200);
            break;
        
    }
?>