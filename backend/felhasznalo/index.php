<?php
include "../sql_fuggvenyek.php";
$metodus=$_SERVER["REQUEST_METHOD"];
$uri=parse_url($_SERVER["REQUEST_URI"],PHP_URL_PATH);
$uri=explode("/",$uri);
$bodyAdatok=json_decode(file_get_contents("php://input"),true);
switch(end($uri)){
 case "felhasznaloAdat":
    if($metodus!="GET"){
        return http_response_code(405);
    }
    if(empty($_GET["nev"])){
        echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $felhasznaloAdatSQL="SELECT felhasznalonev, email, szamlazasicim from felhasznalo where felhasznalonev=?";
    $felhasznaloAdat=adatokLekerese($felhasznaloAdatSQL,"s",[$_GET["nev"]]);
    echo json_encode($felhasznaloAdat,JSON_UNESCAPED_UNICODE);
    return http_response_code(200);
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
case "rendelesekAdatai":
     if($metodus!="GET"){
        return http_response_code(405);
    }
    if(empty($_GET["nev"])){
        echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $rendelesekAdataiSQL="SELECT * from rendeles where felhasznalo=?";
    $rendelesekAdatai=adatokLekerese($rendelesekAdataiSQL,"s",[$_GET["nev"]]);
    echo json_encode($rendelesekAdatai,JSON_UNESCAPED_UNICODE);
    return http_response_code(200);
case "rendelesTetelek":
     if($metodus!="GET"){
        return http_response_code(405);
    }
    if(empty($_GET["rendelesId"])){
        echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $tetelekSQL="SELECT termek.nev, termek.ar, mennyiseg FROM `tetelek` INNER JOIN termek on termekId=termek.id where `rendelesId`=?;";
    $tetelek=adatokLekerese($tetelekSQL,"s",[$_GET["rendelesId"]]);
    echo json_encode($tetelek,JSON_UNESCAPED_UNICODE);
    return http_response_code(200);
case "jelszoModositas":
    if($metodus!="PUT"){
        return http_response_code(405);
    }
    if(empty($bodyAdatok["nev"])||empty($bodyAdatok["regiJelszo"]) || empty($bodyAdatok["ujJelszo"])){
        echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $ellenorzesSQL="SELECT * from felhasznalo where jelszo=? and felhasznalonev=?";
    $ellenorzes=adatokLekerese($ellenorzesSQL,"ss",[$bodyAdatok["regiJelszo"],$bodyAdatok["nev"]]);
    if(empty($ellenorzes)){
        echo json_encode(["valasz"=>"Hibás jelszó!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $jelszoModositasSQL="UPDATE `felhasznalo` SET `jelszo`=? WHERE `felhasznalonev`=?";
    $jelszoModositas=adatokValtoztatasa($jelszoModositasSQL,"ss",[$bodyAdatok["ujJelszo"],$bodyAdatok["nev"]]);
    if($jelszoModositas){
         echo json_encode(["valasz"=>"Sikeres módosítás!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(200);
    }
     echo json_encode(["valasz"=>"Ugyanaz jelszó megadva!"],JSON_UNESCAPED_UNICODE);
    return http_response_code(400);
case "ujSzallitasiCim":
    if($metodus!="POST"){
        return http_response_code(405);
    }
    if(empty($bodyAdatok["nev"]) ||empty($bodyAdatok["orszag"]) ||empty($bodyAdatok["irsz"]) ||empty($bodyAdatok["varos"]) ||empty($bodyAdatok["utca"])){
         echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $ujSzallitasiCimSQL="INSERT INTO `szallitasicimek`(`felhasznalo`, `orszag`, `iranyitoszam`, `varos`, `utca`) VALUES (?, ?, ?, ?, ?)";
    $ujSzallitasiCim=adatokValtoztatasa($ujSzallitasiCimSQL,"ssiss",[$bodyAdatok["nev"],$bodyAdatok["orszag"],$bodyAdatok["irsz"],$bodyAdatok["varos"],$bodyAdatok["utca"]]);
    if($ujSzallitasiCim){
         echo json_encode(["valasz"=>"Sikeres feltöltés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
    }
        echo json_encode(["valasz"=>"Sikerestelen feltöltés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
case "modositSzallitasiCim":
    if($metodus!="PUT"){
        return http_response_code(405);
    }        
    if(empty($bodyAdatok["id"]) ||empty($bodyAdatok["orszag"]) ||empty($bodyAdatok["irsz"]) ||empty($bodyAdatok["varos"]) ||empty($bodyAdatok["utca"])){
         echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $ellenorzesSQL="SELECT * from szallitasicimek where id=?";
    $ellenorzes=adatokLekerese($ellenorzesSQL,"i",[$bodyAdatok["id"]]);
    if(empty($ellenorzes)){
        echo json_encode(["valasz"=>"Hibás szállítási cím!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $modositSzallitasiCimSQL="UPDATE `szallitasicimek` SET `orszag`=? ,`iranyitoszam`=?,`varos`=?,`utca`=? WHERE `id`=?";
    $modositSzallitasiCim=adatokValtoztatasa($modositSzallitasiCimSQL,"sissi",[$bodyAdatok["orszag"],$bodyAdatok["irsz"],$bodyAdatok["varos"],$bodyAdatok["utca"],$bodyAdatok["id"]]);
     if($modositSzallitasiCim){
         echo json_encode(["valasz"=>"Sikeres módosítás!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(200);
    }
        echo json_encode(["valasz"=>"Sikerestelen módosítás!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
}