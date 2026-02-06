<?php
include "../sql_fuggvenyek.php";
$metodus=$_SERVER["REQUEST_METHOD"];
$uri=parse_url($_SERVER["REQUEST_URI"],PHP_URL_PATH);
$uri=explode("/",$uri);
$bodyAdatok=json_decode(file_get_contents("php://input"),true);
switch(end($uri)){
    case "szallitasiCimek":
         if($metodus!="GET"){
        return http_response_code(405);
    }
    if(empty($_GET["nev"])){
        echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $szallitasiCimekSQL="SELECT * from szallitasicimek where felhasznalo=?";
    $szallitasiCimek=adatokLekerese($szallitasiCimekSQL,"s",[$_GET["nev"]]);
    echo json_encode($szallitasiCimek,JSON_UNESCAPED_UNICODE);
    return http_response_code(200);
}