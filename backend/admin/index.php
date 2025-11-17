<?php
include "../sql_fuggvenyek.php";
$metodus=$_SERVER["REQUEST_METHOD"];
$uri=parse_url($_SERVER["REQUEST_URI"],PHP_URL_PATH);
$uri=explode("/",$uri);
$bodyAdatok=json_decode(file_get_contents("php://input"),true);
switch(end($uri)){


    case "felhasznaloAdatok": //főoldal Navbar
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getFelhasznaloAdatSQL="SELECT * FROM felhasználó WHERE felhasználónév=?";
        $getFelhasznaloAdat=adatokLekerese($getFelhasznaloAdatSQL,"s",[$_GET["felhasznalo"]]);
        echo json_encode($getFelhasznaloAdat[0],JSON_UNESCAPED_UNICODE);
        return http_response_code(200);


    case "felhasznaloNevek": //Admin oldal select-be töltéséhez
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getFelhasznalonevSQL="SELECT felhasználónév FROM felhasználó";
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

    
    case "ujFelhasznalo": //Admin oldal új felhasználó felvétele
    if($metodus!="POST"){
        return http_response_code(405);
    }
    if(empty($bodyAdatok["felhasználónév"]) || empty($bodyAdatok["jelszó"]) || empty($bodyAdatok["email"]) ||empty($bodyAdatok["számlázásicím"]) ||empty($bodyAdatok["rangId"]))
    {
        echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $ujFelhasznaloSQL="INSERT INTO felhasználó VALUES (?,?,?,?,?)";
    $ujFelhasznalo=adatokValtoztatasa($ujFelhasznaloSQL,"ssssi",[$bodyAdatok["felhasználónév"],$bodyAdatok["jelszó"],$bodyAdatok["email"],$bodyAdatok["számlázásicím"],$bodyAdatok["rangId"]]);
    if($ujFelhasznalo){
        echo json_encode(["valasz"=>"Sikeres feltöltés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
    }
    echo json_encode(["valasz"=>"Sikertelen feltöltés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    

    case "modositFelhasznalo"://Admin oldal  felhasználó adatai módosítása felvétele
    if($metodus!="PUT"){
        return http_response_code(405);
    }
     if(empty($bodyAdatok["felhasználónév"]) || empty($bodyAdatok["jelszó"]) || empty($bodyAdatok["email"]) ||empty($bodyAdatok["számlázásicím"]) ||empty($bodyAdatok["rangId"]))
    {
        echo json_encode(["valasz"=>"Hiányzó adat!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);
    }
    $modositFelhasznaloSQL="UPDATE felhasználó SET jelszó=?, email=?, számlázásicím=?,rangId=? WHERE felhasználónév=?";
    $modositFelhasznalo=adatokValtoztatasa($modositFelhasznaloSQL,"sssis",[$bodyAdatok["jelszó"],$bodyAdatok["email"],$bodyAdatok["számlázásicím"],$bodyAdatok["rangId"],$bodyAdatok["felhasználónév"]]);
    if($modositFelhasznalo){
        echo json_encode(["valasz"=>"Sikeres módosítás!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
    }
    echo json_encode(["valasz"=>"Sikertelen módosítás!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);


    case "felhasznaloTorles":////Admin oldal  felhasználó törlése
        if($metodus!="DELETE"){
            return http_response_code(405);
        }
        $cimekTorleseSQL="DELETE FROM szállításicímek WHERE felhasználó=?";
        $cimekTorlese=adatokValtoztatasa($cimekTorleseSQL,"s",[$bodyAdatok["felhasználónév"]]);
        $kosarTorlesSQL="DELETE tételek FROM `tételek` INNER join rendelés ON rendelés.id=rendelésId WHERE felhasználó=?";
        $kosarTorles=adatokValtoztatasa($kosarTorlesSQL,"s",[$bodyAdatok["felhasználónév"]]);
        $rendelésekTorlesSQL="DELETE  FROM rendelés WHERE felhasználó=?";
        $rendelésTorles=adatokValtoztatasa($rendelésekTorlesSQL,"s",[$bodyAdatok["felhasználónév"]]);
        $felhasznaloTorlesSQL="DELETE FROM felhasználó WHERE felhasználónév=?";
        $felhasznaloTorles=adatokValtoztatasa($felhasznaloTorlesSQL,"s",[$bodyAdatok["felhasználónév"]]);
        if($cimekTorlese && $felhasznaloTorles && $kosarTorles && $rendelésTorles){
        echo json_encode(["valasz"=>"Sikeres törlés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
    }
    echo json_encode(["valasz"=>"Sikertelen törlés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);

        
    case "kategoriakNeve"://Admin oldal kategóriák neve select-be és Navbar töltéséhez 
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getKategoriakSQL="SELECT * from kategória";
        $getKategoriak=adatokLekerese($getKategoriakSQL);
        echo json_encode($getKategoriak,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);


    case "learazasokMerteke"://Admin oldal leárazás mértékeinek feltöltése select-be
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $getLearazasokSQL="SELECT * from leárazás";
        $getLearazasok=adatokLekerese($getLearazasokSQL);
        echo json_encode($getLearazasok,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);

    case "termekAdatok":
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $gettermekAdatokSQL="SELECT név, névEn, leírás,leírásEn, ár, kategóriaId, készlet, leárazásid from termék where id=?";
        $gettermekAdatok=adatokLekerese($gettermekAdatokSQL,"i",[$_GET["id"]]);
        echo json_encode($gettermekAdatok[0],JSON_UNESCAPED_UNICODE);
        return http_response_code(200);

    case "ujTermek"://Admin oldal új termék felvétele
        if($metodus!="POST"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["név"]) ||empty($bodyAdatok["névEn"]) ||empty($bodyAdatok["leírás"]) ||empty($bodyAdatok["leírásEn"]) ||empty($bodyAdatok["ár"]) ||empty($bodyAdatok["kategóriaId"]) || empty($bodyAdatok["készlet"]) ||empty($bodyAdatok["leárazásId"]) ||empty($bodyAdatok["kép"])){
            echo json_encode(["valasz"=>"Hiányzó adat"]);
        }
        $postUjTermekSQL="INSERT INTO `termék` (`név`, `névEn`, `leírás`, `leírásEn`, `ár`, `kategóriaId`, `készlet`, `leárazásid`, `kép`) values ( ?,?,?,?,?,?,?,?,?)";
        $postUjTermek=adatokValtoztatasa($postUjTermekSQL,"ssssiiiib",[$bodyAdatok["név"],$bodyAdatok["névEn"],$bodyAdatok["leírás"],$bodyAdatok["leírásEn"],$bodyAdatok["ár"],$bodyAdatok["kategóriaId"],$bodyAdatok["készlet"],$bodyAdatok["leárazásId"],$bodyAdatok["kép"]]);
        if($postUjTermek){
            echo json_encode(["valasz"=>"Sikeres feltöltés"],JSON_UNESCAPED_UNICODE);
            return http_response_code(201);
        }
         echo json_encode(["valasz"=>"Sikertelen feltöltés"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);

        case "ujTermekT"://Admin oldal új termék felvétele
        if($metodus!="POST"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["név"]) ||empty($bodyAdatok["névEn"]) ||empty($bodyAdatok["leírás"]) ||empty($bodyAdatok["leírásEn"]) ||empty($bodyAdatok["ár"]) ||empty($bodyAdatok["kategóriaId"]) || empty($bodyAdatok["készlet"]) ||empty($bodyAdatok["leárazásId"])){
            echo json_encode(["valasz"=>"Hiányzó adat"]);
        }
        $postUjTermekSQL="INSERT INTO `termék` ( `név`, `névEn`, `leírás`, `leírásEn`, `ár`, `kategóriaId`, `készlet`, `leárazásid`) values ( ?,?,?,?,?,?,?,?)";
        $postUjTermek=adatokValtoztatasa($postUjTermekSQL,"ssssiiii",[$bodyAdatok["név"],$bodyAdatok["névEn"],$bodyAdatok["leírás"],$bodyAdatok["leírásEn"],$bodyAdatok["ár"],$bodyAdatok["kategóriaId"],$bodyAdatok["készlet"],$bodyAdatok["leárazásId"]]);
        if($postUjTermek){
            echo json_encode(["valasz"=>"Sikeres feltöltés"],JSON_UNESCAPED_UNICODE);
            return http_response_code(201);
        }
         echo json_encode(["valasz"=>"Sikertelen feltöltés"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);


    case "termekNeve"://Admin oldal termék neve select-be töltéshez
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $gettermekNevSQL="SELECT id,név from termék";
        $gettermekNev=adatokLekerese($gettermekNevSQL);
        echo json_encode($gettermekNev,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);


    case "modositTermek"://Admin oldal termék adatainak módosítása
        if($metodus!="PUT"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["név"]) ||empty($bodyAdatok["névEn"]) ||empty($bodyAdatok["leírás"]) ||empty($bodyAdatok["leírásEn"]) ||empty($bodyAdatok["ár"]) ||empty($bodyAdatok["kategóriaId"]) || empty($bodyAdatok["készlet"]) ||empty($bodyAdatok["leárazásId"]) ||empty($bodyAdatok["kép"])){
            echo json_encode(["valasz"=>"Hiányzó adat"]);
        }
        $putTermekModositSQL="UPDATE `termék` SET `név`=?,`névEn`=?,`leírás`=?,`leírásEn`=?,`ár`=?,`kategóriaId`=?,`készlet`=?,`leárazásid`=?,`kép`=? WHERE `id`=?";
        $putTermekModosit=adatokValtoztatasa($putTermekModositSQL,"ssssiiiibi",[$bodyAdatok["név"],$bodyAdatok["névEn"],$bodyAdatok["leírás"],$bodyAdatok["leírásEn"],$bodyAdatok["ár"],$bodyAdatok["kategóriaId"],$bodyAdatok["készlet"],$bodyAdatok["leárazásId"],$bodyAdatok["kép"],$bodyAdatok["id"]]);
        if($putTermekModosit){
            echo json_encode(["valasz"=>"Sikeres módosítés"],JSON_UNESCAPED_UNICODE);
            return http_response_code(201);
        }
         echo json_encode(["valasz"=>"Sikertelen módosítés"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);
case "modositTermekT"://Admin oldal termék adatainak módosítása
        if($metodus!="PUT"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["név"]) ||empty($bodyAdatok["névEn"]) ||empty($bodyAdatok["leírás"]) ||empty($bodyAdatok["leírásEn"]) ||empty($bodyAdatok["ár"]) ||empty($bodyAdatok["kategóriaId"]) || empty($bodyAdatok["készlet"]) ||empty($bodyAdatok["leárazásId"])){
            echo json_encode(["valasz"=>"Hiányzó adat"]);
        }
        $putTermekModositSQL="UPDATE `termék` SET `név`=?,`névEn`=?,`leírás`=?,`leírásEn`=?,`ár`=?,`kategóriaId`=?,`készlet`=?,`leárazásid`=? WHERE `id`=?";
        $putTermekModosit=adatokValtoztatasa($putTermekModositSQL,"ssssiiiii",[$bodyAdatok["név"],$bodyAdatok["névEn"],$bodyAdatok["leírás"],$bodyAdatok["leírásEn"],$bodyAdatok["ár"],$bodyAdatok["kategóriaId"],$bodyAdatok["készlet"],$bodyAdatok["leárazásId"],$bodyAdatok["id"]]);
        if($putTermekModosit){
            echo json_encode(["valasz"=>"Sikeres módosítés"],JSON_UNESCAPED_UNICODE);
            return http_response_code(201);
        }
         echo json_encode(["valasz"=>"Sikertelen módosítés"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);

    case "termekTorles":////Admin oldal termék törlése TODO
        if($metodus!="DELETE"){
            return http_response_code(405);
        }
        $kosarTorlesSQL="DELETE FROM tételek WHERE termékId=?";
        $kosarTorles=adatokValtoztatasa($kosarTorlesSQL,"i",[$bodyAdatok["termekId"]]);
        $termekTorlesSQL="DELETE FROM termék WHERE id=?";
        $termekTorles=adatokValtoztatasa($termekTorlesSQL,"i",[$bodyAdatok["termekId"]]);
        if($termekTorles){
            echo json_encode(["valasz"=>"Sikeres törlés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(201);
        }
        echo json_encode(["valasz"=>"Sikertelen törlés!"],JSON_UNESCAPED_UNICODE);
        return http_response_code(400);

}
?>