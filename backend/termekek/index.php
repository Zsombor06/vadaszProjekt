<?php
include "../sql_fuggvenyek.php";
$metodus=$_SERVER["REQUEST_METHOD"];
$uri=parse_url($_SERVER["REQUEST_URI"],PHP_URL_PATH);
$uri=explode("/",$uri);
$bodyAdatok=json_decode(file_get_contents("php://input"),true);
switch(end($uri)){
 case "termekAdatok":
    if($metodus!="GET"){
        return http_response_code(405);
    }
    $termekAdatokSQL="SELECT termek.id as id ,nev,`leiras`, kep, ar as regiar, (`ar`-ar*(LearazasMerteke/100)) as ujar,`keszlet` FROM `termek` inner JOIN learazas on learazasid=learazas.id where `kategoriaId`=?;";
    $termekAdatok=adatokLekerese($termekAdatokSQL,"i",[$_GET["kategoria"]]);
    echo json_encode($termekAdatok,JSON_UNESCAPED_UNICODE);
    return http_response_code(200);
    case "termekAdatokEn":
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $termekAdatokSQL="SELECT termek.id as id,nevEn,`leirasEn`, kep, ar as regiar, (`ar`-ar*(LearazasMerteke/100)) as ujar,`keszlet` FROM `termek` inner JOIN learazas on learazasid=learazas.id where `kategoriaId`=?;";
        $termekAdatok=adatokLekerese($termekAdatokSQL,"i",[$_GET["kategoria"]]);
        echo json_encode($termekAdatok,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);


        //vegyen le a mennyiségből
    case "kosarHozzaad":
        if($metodus!="POST"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["nev"])){
            echo json_encode(["valasz"=>"Kérem jelentkezzen be!"], JSON_UNESCAPED_UNICODE);
            return http_response_code(400);
        }
        $rendelesSQL="SELECT id from rendeles where felhasznalo=? order by id limit 1";
        $rendeles=adatokLekerese($rendelesSQL,"s",[$bodyAdatok["nev"]]);
        $ellSQL="SELECT tetelek.id FROM `tetelek` WHERE rendelesId=? && termekId=?";
        $ell=adatokLekerese($ellSQL,"si",[$rendeles[0]["id"],$bodyAdatok["termek"]]);
        if(!empty($ell)){
            $mennyisegNovSQL="UPDATE `tetelek` set `mennyiseg`=mennyiseg+1 WHERE id=?";
            $mennyisegNov=adatokValtoztatasa($mennyisegNovSQL,"i",[$ell[0]["id"]]);
            echo json_encode(["valasz"=>"Mennyiség növelve!"], JSON_UNESCAPED_UNICODE);
            return http_response_code(200);
        }
        $hozzaAdasSQL="INSERT INTO `tetelek`(`rendelesId`, `termekId`, `mennyiseg`) VALUES (?,?,1)";
        $hozzaAdas=adatokValtoztatasa($hozzaAdasSQL,"ii",[$rendeles[0]["id"],$bodyAdatok["termek"]]);
        if($hozzaAdas){
            echo json_encode(["valasz"=>"Sikesen a kosárba került!"], JSON_UNESCAPED_UNICODE);
            return http_response_code(201);
        }
        echo json_encode(["valasz"=>"Valami hiba történt!"], JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }