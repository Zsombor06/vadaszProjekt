<?php
include "../sql_fuggvenyek.php";
$metodus=$_SERVER["REQUEST_METHOD"];
$uri=parse_url($_SERVER["REQUEST_URI"],PHP_URL_PATH);
$uri=explode("/",$uri);
$bodyAdatok=json_decode(file_get_contents("php://input"),true);
switch(end($uri)){


    case "felhasznaloAdatok": //fooldal Navbar
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getFelhasznaloAdatSQL="SELECT * FROM felhasznalo WHERE felhasznalonev=?";
        $getFelhasznaloAdat=adatokLekerese($getFelhasznaloAdatSQL,"s",[$_GET["felhasznalo"]]);
        echo json_encode($getFelhasznaloAdat[0],JSON_UNESCAPED_UNICODE);
        return http_response_code(200);


    case "felhasznaloNevek": //Admin oldal select-be toltesehez
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getFelhasznalonevSQL="SELECT felhasznalonev FROM felhasznalo";
        $getFelhasznalonev=adatokLekerese($getFelhasznalonevSQL);
        echo json_encode($getFelhasznalonev,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);



    case "rangokNeve":    
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getrangokNeveSQL="SELECT id, rang FROM rang";
        $getrangokNeve=adatokLekerese($getrangokNeveSQL);
        echo json_encode($getrangokNeve,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);

    
    case "ujFelhasznalo": //Admin oldal uj felhasznalo felvetele
    if($metodus!="POST"){
        return http_response_code(405);
    }
    if(empty($bodyAdatok["felhasznalonev"])  || empty($bodyAdatok["email"]) ||empty($bodyAdatok["szamlazasi_irsz"]) ||empty($bodyAdatok["szamlazasi_orszag"]) ||empty($bodyAdatok["szamlazasi_varos"]) ||empty($bodyAdatok["szamlazasi_utca"]) ||empty($bodyAdatok["rangId"]))
    {
        echo json_encode(["valasz"=>"Hianyzo adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $ujFelhasznaloSQL="INSERT INTO `felhasznalo`(`felhasznalonev`, `email`, `szamlazasi_orszag`, `szamlazasi_iranyitoszam`, `szamlazasi_varos`, `szamlazasi_utca`, `rangId`) VALUES (?,?,?,?,?,?,?,?);";
    $ujFelhasznalo=adatokValtoztatasa($ujFelhasznaloSQL,"ssisssi",[$bodyAdatok["felhasznalonev"],$bodyAdatok["email"],$bodyAdatok["szamlazasi_irsz"],$bodyAdatok["szamlazasi_orszag"] ,$bodyAdatok["szamlazasi_varos"] ,$bodyAdatok["szamlazasi_utca"] ,$bodyAdatok["rangId"]]);
    if($ujFelhasznalo == true){
        echo json_encode(["valasz"=>"Sikeres feltoltes!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(204);
    }
    echo json_encode(["valasz"=>"Sikertelen feltoltes!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    

    case "modositFelhasznalo"://Admin oldal  felhasznalo adatai modositasa felvetele
    if($metodus!="PUT"){
        return http_response_code(405);
    }
     if(empty($bodyAdatok["felhasznalonev"]) || empty($bodyAdatok["email"])||empty($bodyAdatok["szamlazasi_irsz"]) ||empty($bodyAdatok["szamlazasi_orszag"]) ||empty($bodyAdatok["szamlazasi_varos"]) ||empty($bodyAdatok["szamlazasi_utca"]) ||empty($bodyAdatok["rangId"]))
    {
        echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $modositFelhasznaloSQL="UPDATE felhasznalo SET email=?, szamlazasi_iranyitoszam=?,szamlazasi_orszag=?,szamlazasi_varos=?,szamlazasi_utca=?,rangId=? WHERE felhasznalonev=?";
    $modositFelhasznalo=adatokValtoztatasa($modositFelhasznaloSQL,"sisssis",[$bodyAdatok["email"],$bodyAdatok["szamlazasi_irsz"],$bodyAdatok["szamlazasi_orszag"] ,$bodyAdatok["szamlazasi_varos"] ,$bodyAdatok["szamlazasi_utca"] ,$bodyAdatok["rangId"],$bodyAdatok["felhasznalonev"]]);
    if($modositFelhasznalo){
        echo json_encode(["valasz"=>"Sikeres modositas!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
    }
    echo json_encode(["valasz"=>"Sikertelen modositas!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);


    case "felhasznaloTorles":////Admin oldal  felhasznalo torlese
        if($metodus!="DELETE"){
            return http_response_code(405);
        }
        $cimekTorleseSQL="DELETE FROM szallitasicimek WHERE felhasznalo=?";
        $cimekTorlese=adatokValtoztatasa($cimekTorleseSQL,"s",[$bodyAdatok["felhasznalonev"]]);
        $kosarTorlesSQL="DELETE tetelek FROM `tetelek` INNER join rendeles ON rendeles.id=rendelesId WHERE felhasznalo=?";
        $kosarTorles=adatokValtoztatasa($kosarTorlesSQL,"s",[$bodyAdatok["felhasznalonev"]]);
        $rendelesekTorlesSQL="DELETE  FROM rendeles WHERE felhasznalo=?";
        $rendelesTorles=adatokValtoztatasa($rendelesekTorlesSQL,"s",[$bodyAdatok["felhasznalonev"]]);
        $felhasznaloTorlesSQL="DELETE FROM felhasznalo WHERE felhasznalonev=?";
        $felhasznaloTorles=adatokValtoztatasa($felhasznaloTorlesSQL,"s",[$bodyAdatok["felhasznalonev"]]);
        if($cimekTorlese && $felhasznaloTorles && $kosarTorles && $rendelesTorles){
        echo json_encode(["valasz"=>"Sikeres torles!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
    }
    echo json_encode(["valasz"=>"Sikertelen torles!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);

        
    case "kategoriakNeve"://Admin oldal kategoriak neve select-be es Navbar toltesehez 
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getKategoriakSQL="SELECT * from kategoria";
        $getKategoriak=adatokLekerese($getKategoriakSQL);
        echo json_encode($getKategoriak,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);


    case "learazasokMerteke"://Admin oldal learazas mertekeinek feltoltese select-be
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getLearazasokSQL="SELECT * from learazas";
        $getLearazasok=adatokLekerese($getLearazasokSQL);
        echo json_encode($getLearazasok,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);

    case "termekAdatok":
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $gettermekAdatokSQL="SELECT nev, nevEn, leiras,leirasEn, ar, kategoriaId, keszlet, learazasid from termek where id=?";
        $gettermekAdatok=adatokLekerese($gettermekAdatokSQL,"i",[$_GET["id"]]);
        echo json_encode($gettermekAdatok[0],JSON_UNESCAPED_UNICODE);
        return http_response_code(200);

    case "ujTermek"://Admin oldal uj termek felvetele
        if($metodus!="POST"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["nev"]) ||empty($bodyAdatok["nevEn"]) ||empty($bodyAdatok["leiras"]) ||empty($bodyAdatok["leirasEn"]) ||empty($bodyAdatok["ar"]) ||empty($bodyAdatok["kategoriaId"]) || empty($bodyAdatok["keszlet"]) ||empty($bodyAdatok["learazasId"]) ||empty($bodyAdatok["kep"])){
            echo json_encode(["valasz"=>"Hianyzo adat"]);
            return http_response_code(400);
        }
        $postUjTermekSQL="INSERT INTO `termek` (`nev`, `nevEn`, `leiras`, `leirasEn`, `ar`, `kategoriaId`, `keszlet`, `learazasid`, `kep`) values ( ?,?,?,?,?,?,?,?,?)";
        $postUjTermek=adatokValtoztatasa($postUjTermekSQL,"ssssiiiis",[$bodyAdatok["nev"],$bodyAdatok["nevEn"],$bodyAdatok["leiras"],$bodyAdatok["leirasEn"],$bodyAdatok["ar"],$bodyAdatok["kategoriaId"],$bodyAdatok["keszlet"],$bodyAdatok["learazasId"],$bodyAdatok["kep"]]);
        if($postUjTermek){
            echo json_encode(["valasz"=>"Sikeres feltoltes"],JSON_UNESCAPED_UNICODE);
            return http_response_code(201);
        }
         echo json_encode(["valasz"=>"Sikertelen feltoltes"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);

    case "ujTermekT"://Admin oldal uj termek felvetele
        if($metodus!="POST"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["nev"]) ||empty($bodyAdatok["nevEn"]) ||empty($bodyAdatok["leiras"]) ||empty($bodyAdatok["leirasEn"]) ||empty($bodyAdatok["ar"]) ||empty($bodyAdatok["kategoriaId"]) || empty($bodyAdatok["keszlet"]) ||empty($bodyAdatok["learazasId"])){
            echo json_encode(["valasz"=>"Hianyzo adat"]);
            return http_response_code(400);
        }
        $postUjTermekSQL="INSERT INTO `termek` ( `nev`, `nevEn`, `leiras`, `leirasEn`, `ar`, `kategoriaId`, `keszlet`, `learazasid`) values ( ?,?,?,?,?,?,?,?)";
        $postUjTermek=adatokValtoztatasa($postUjTermekSQL,"ssssiiii",[$bodyAdatok["nev"],$bodyAdatok["nevEn"],$bodyAdatok["leiras"],$bodyAdatok["leirasEn"],$bodyAdatok["ar"],$bodyAdatok["kategoriaId"],$bodyAdatok["keszlet"],$bodyAdatok["learazasId"]]);
        if($postUjTermek){
            echo json_encode(["valasz"=>"Sikeres feltoltes"],JSON_UNESCAPED_UNICODE);
            return http_response_code(201);
        }
         echo json_encode(["valasz"=>"Sikertelen feltoltes"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);


    case "termekNeve"://Admin oldal termek neve select-be tolteshez
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $gettermekNevSQL="SELECT id,nev from termek";
        $gettermekNev=adatokLekerese($gettermekNevSQL);
        echo json_encode($gettermekNev,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);


    case "modositTermek"://Admin oldal termek adatainak modositasa
        if($metodus!="PUT"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["nev"]) ||empty($bodyAdatok["nevEn"]) ||empty($bodyAdatok["leiras"]) ||empty($bodyAdatok["leirasEn"]) ||empty($bodyAdatok["ar"]) ||empty($bodyAdatok["kategoriaId"]) || empty($bodyAdatok["keszlet"]) ||empty($bodyAdatok["learazasId"]) ||empty($bodyAdatok["kep"])){
            echo json_encode(["valasz"=>"Hianyzo adat"]);
            return http_response_code(400);

        }
        $putTermekModositSQL="UPDATE `termek` SET `nev`=?,`nevEn`=?,`leiras`=?,`leirasEn`=?,`ar`=?,`kategoriaId`=?,`keszlet`=?,`learazasid`=?,`kep`=? WHERE `id`=?";
        $putTermekModosit=adatokValtoztatasa($putTermekModositSQL,"ssssiiiisi",[$bodyAdatok["nev"],$bodyAdatok["nevEn"],$bodyAdatok["leiras"],$bodyAdatok["leirasEn"],$bodyAdatok["ar"],$bodyAdatok["kategoriaId"],$bodyAdatok["keszlet"],$bodyAdatok["learazasId"],$bodyAdatok["kep"],$bodyAdatok["id"]]);
        if($putTermekModosit){
            echo json_encode(["valasz"=>"Sikeres modosites"],JSON_UNESCAPED_UNICODE);
            return http_response_code(201);
        }
         echo json_encode(["valasz"=>"Sikertelen modosites"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);


case "modositTermekT"://Admin oldal termek adatainak modositasa
        if($metodus!="PUT"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["nev"]) ||empty($bodyAdatok["nevEn"]) ||empty($bodyAdatok["leiras"]) ||empty($bodyAdatok["leirasEn"]) ||empty($bodyAdatok["ar"]) ||empty($bodyAdatok["kategoriaId"]) || empty($bodyAdatok["keszlet"]) ||empty($bodyAdatok["learazasId"])){
            echo json_encode(["valasz"=>"Hianyzo adat"]);
            return http_response_code(400);
        }
        $putTermekModositSQL="UPDATE `termek` SET `nev`=?,`nevEn`=?,`leiras`=?,`leirasEn`=?,`ar`=?,`kategoriaId`=?,`keszlet`=?,`learazasid`=? WHERE `id`=?";
        $putTermekModosit=adatokValtoztatasa($putTermekModositSQL,"ssssiiiii",[$bodyAdatok["nev"],$bodyAdatok["nevEn"],$bodyAdatok["leiras"],$bodyAdatok["leirasEn"],$bodyAdatok["ar"],$bodyAdatok["kategoriaId"],$bodyAdatok["keszlet"],$bodyAdatok["learazasId"],$bodyAdatok["id"]]);
        if($putTermekModosit){
            echo json_encode(["valasz"=>"Sikeres modosites"],JSON_UNESCAPED_UNICODE);
            return http_response_code(200);
        }
         echo json_encode(["valasz"=>"Sikertelen modosites"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);

    case "termekTorles":////Admin oldal termek torlese TODO
        if($metodus!="DELETE"){
            return http_response_code(405);
        }
        $kosarTorlesSQL="DELETE FROM tetelek WHERE termekId=?";
        $kosarTorles=adatokValtoztatasa($kosarTorlesSQL,"i",[$bodyAdatok["termekId"]]);
        $termekTorlesSQL="DELETE FROM termek WHERE id=?";
        $termekTorles=adatokValtoztatasa($termekTorlesSQL,"i",[$bodyAdatok["termekId"]]);
        if($termekTorles){
            echo json_encode(["valasz"=>"Sikeres torles!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(200);
        }
        echo json_encode(["valasz"=>"Sikertelen torles!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);

}
?>