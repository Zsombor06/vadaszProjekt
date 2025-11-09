<?php
include "../sql_fuggvenyek.php";
$metodus=$_SERVER["REQUEST_METHOD"];
$uri=parse_url($_SERVER["REQUEST_URI"],PHP_URL_PATH);
$uri=explode("/",$uri);
$bodyAdatok=json_decode(file_get_contents("php://input"),true);
switch(end($uri)){
    case "felhasznaloNevek":
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getFelhasznalonevSQL="SELECT felhasználónév FROM felhasználó";
        $getFelhasznalonev=adatokLekerese($getFelhasznalonevSQL);
        echo json_encode($getFelhasznalonev,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);
    case "ujFelhasznalo":
    if($metodus!="POST"){
        return http_response_code(405);
    }
    if(empty($bodyAdatok["felhasználónév"]) || empty($bodyAdatok["jelszó"]) || empty($bodyAdatok["email"]) ||empty($bodyAdatok["számlázásicím"]) ||empty($bodyAdatok["rangId"]))
    {
        echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $ujFelhasznaloSQL="INSERT INTO felhasználó (felhasználónév, jelszó, email, számlázásicím, rangId) VALUES (?,?,?,?,?)";
    $ujFelhasznalo=adatokValtoztatasa($ujFelhasznaloSQL,"ssssi",[$bodyAdatok["felhasználónév"],$bodyAdatok["jelszó"],$bodyAdatok["email"],$bodyAdatok["számlázásicím"],$bodyAdatok["rangId"]]);
    if($ujFelhasznalo){
        echo json_encode(["valasz"=>"Sikeres feltöltés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
    }
    echo json_encode(["valasz"=>"Sikertelen feltöltés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    
    case "modositFelhasznalo":
    if($metodus!="PUT"){
        return http_response_code(405);
    }
    $modositFelhasznaloSQL="UPDATE felhasználó SET jelszó=?, email=?, számlázásicím=?,rangId=? WHERE felhasználónév=?";
    $modositFelhasznalo=adatokValtoztatasa($modositFelhasznaloSQL,"sssis",[$bodyAdatok["jelszó"],$bodyAdatok["email"],$bodyAdatok["számlázásicím"],$bodyAdatok["rangId"],$bodyAdatok["felhasználónév"]]);
    if($modositFelhasznalo){
        echo json_encode(["valasz"=>"Sikeres módosítás!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
    }
    echo json_encode(["valasz"=>"Sikertelen módosítás!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    case "felhasznaloTorles":
        if($metodus!="DELETE"){
            return http_response_code(405);
        }
        $cimekTorleseSQL="DELETE FROM szállításicímek WHERE felhasználó=?";
        $cimekTorlese=adatokValtoztatasa($cimekTorleseSQL,"s",[$bodyAdatok["felhasználónév"]]);
        $felhasznaloTorlesSQL="DELETE FROM felhasználó WHERE felhasználónév=?";
        $felhasznaloTorles=adatokValtoztatasa($felhasznaloTorlesSQL,"s",[$bodyAdatok["felhasználónév"]]);
        if($cimekTorlese && $felhasznaloTorles){
            echo json_encode(["valasz"=>"Sikeres törlés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
    }
    echo json_encode(["valasz"=>"Sikertelen törlés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);

}

?>