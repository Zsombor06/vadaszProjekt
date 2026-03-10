<?php
include "../sql_fuggvenyek.php";
$metodus=$_SERVER["REQUEST_METHOD"];
$uri=parse_url($_SERVER["REQUEST_URI"],PHP_URL_PATH);
$uri=explode("/",$uri);
$bodyAdatok=json_decode(file_get_contents("php://input"),true);
switch(end($uri)){
 case "szoveg":
    if($metodus!="GET"){
            return http_response_code(405);
        }
        $getszovegSQL="SELECT * from szoveg";
        $getszoveg=adatokLekerese($getszovegSQL);
        echo json_encode($getszoveg,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);
}
?>