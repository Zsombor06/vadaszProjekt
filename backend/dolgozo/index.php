<?php
include "../sql_fuggvenyek.php";
require '../config.php';
require '../emailKuldes.php';
$metodus=$_SERVER["REQUEST_METHOD"];
$uri=parse_url($_SERVER["REQUEST_URI"],PHP_URL_PATH);
$uri=explode("/",$uri);
$bodyAdatok=json_decode(file_get_contents("php://input"),true);
switch(end($uri)){
    case "rendelesTorles":
        if($metodus!="DELETE"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["rendelesId"])){
            echo json_encode(["valasz"=>"Válassz ki egy rendelést!"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);
        }
        $rendelesTorlesSQL="DELETE from rendeles where id=?";
        $rendelesTorles=adatokValtoztatasa($rendelesTorlesSQL,"i",[$bodyAdatok["rendelesId"]]);
        if($rendelesTorles){
        $emailLekeresSQL="SELECT email from felhasznalo where felhasznalonev=?";
        $emailLekeres=adatokLekerese($emailLekeresSQL,"s",[$bodyAdatok["nev"]]);
    $emailHTML = <<<HTML
            <div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f1ea; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <tr>
                                <td style="background-color: #2f3e2b; padding: 30px 40px; text-align: center;">
                                    <h1 style="margin: 0; color: #c49e3c; font-size: 28px; font-weight: 600; letter-spacing: 1px;">Arany Agancs</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 40px;">
                                    <h2 style="margin: 0 0 20px 0; color: #2f3e2b; font-size: 22px; font-weight: 600;">
                                        Kedves, {$bodyAdatok["nev"]}!
                                    </h2>                            
                                    <p style="margin: 0 0 25px 0; color: #444; font-size: 16px; line-height: 1.6;">
                                        Sajnálatos okok miatt töröltük rendelésedet.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #2f3e2b; padding: 25px 40px;">
                                    <p style="margin: 0 0 5px 0; color: #c49e3c; font-size: 14px; font-weight: 600;">
                                        Az Arany Agancs Csapata
                                    </p>
                                    <p style="margin: 0; color: #a0a0a0; font-size: 12px;">
                                        Ez egy automatikus üzenet, kérjük ne válaszolj rá.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
HTML;
 $eredmeny = emailKuldes(
        $emailLekeres[0]["email"],
        $bodyAdatok["nev"],
        "Rendelés törölve",
        $emailHTML
    );
            echo json_encode(["valasz"=>"Sikeres törlés"],JSON_UNESCAPED_UNICODE);
            return http_response_code(204);
        }
          echo json_encode(["valasz"=>"Sikertelen törlés"],JSON_UNESCAPED_UNICODE);
          return http_response_code(400);


    case "rendelesKuldes":
        if($metodus!="PUT"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["rendelesId"])){
            echo json_encode(["valasz"=>"Válassz ki egy rendelést!"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);
        }
        $ellSQL="SELECT * from rendeles where id=? and elkuldve is not null";
        $ell=adatokLekerese($ellSQL,"i",[$bodyAdatok["rendelesId"]]);
        if(!empty($ell)){
            echo json_encode(["valasz"=>"Már elküldve"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);
        }
        $rendelesKuldesSQL="UPDATE `rendeles` SET`elkuldve`=Now() WHERE `id`=?";
        $rendelesKuldes=adatokValtoztatasa($rendelesKuldesSQL,"i",[$bodyAdatok["rendelesId"]]);
        if($rendelesKuldes){
                    $emailLekeresSQL="SELECT email from felhasznalo where felhasznalonev=?";
        $emailLekeres=adatokLekerese($emailLekeresSQL,"s",[$bodyAdatok["nev"]]);
        $termekAdatokSQL="    SELECT 
        t.id,
        t.termekId,
        t.mennyiseg,
        tr.nev,
        tr.nevEn,
        tr.kep,
        (tr.ar-tr.ar*LearazasMerteke/100) as ar
        FROM tetelek t
        JOIN termek tr ON tr.id = t.termekId
        join learazas on learazasId=learazas.id
        WHERE t.rendelesId = ?";
        $termekAdatok=adatokLekerese($termekAdatokSQL,"i",[$bodyAdatok["rendelesId"]]);
        $emailHTML = <<<HTML
            <div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f1ea; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <tr>
                                <td style="background-color: #2f3e2b; padding: 30px 40px; text-align: center;">
                                    <h1 style="margin: 0; color: #c49e3c; font-size: 28px; font-weight: 600; letter-spacing: 1px;">Arany Agancs</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 40px;">
                                    <h2 style="margin: 0 0 20px 0; color: #2f3e2b; font-size: 22px; font-weight: 600;">
                                        Kedves, {$bodyAdatok["nev"]}!
                                    </h2>                            
                                    <p style="margin: 0 0 25px 0; color: #444; font-size: 16px; line-height: 1.6;">
                                        Rendelésedet összekészíttük, és leadtuk a szállítónak.<br>
                                        Rendelésed azonosítója: {$bodyAdatok["rendelesId"]}
                                        Szállítási cím: <b>{$bodyAdatok["cim"]}</b>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #2f3e2b; padding: 25px 40px;">
                                    <p style="margin: 0 0 5px 0; color: #c49e3c; font-size: 14px; font-weight: 600;">
                                        Az Arany Agancs Csapata
                                    </p>
                                    <p style="margin: 0; color: #a0a0a0; font-size: 12px;">
                                        Ez egy automatikus üzenet, kérjük ne válaszolj rá.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
HTML;
 $eredmeny = emailKuldes(
        $emailLekeres[0]["email"],
        $bodyAdatok["nev"],
        "Rendelés elküldve",
        $emailHTML
    );
            echo json_encode(["valasz"=>"Sikeresen elküldve"],JSON_UNESCAPED_UNICODE);
            return http_response_code(200);
        }
          echo json_encode(["valasz"=>"Sikertelen elküldve"],JSON_UNESCAPED_UNICODE);
          return http_response_code(400);
    case "rendelesTeljesitve":
        if($metodus!="PUT"){
            return http_response_code(405);
        }
        if(empty($bodyAdatok["rendelesId"])){
            echo json_encode(["valasz"=>"Válassz ki egy rendelést!"],JSON_UNESCAPED_UNICODE);
            return http_response_code(400);
        }
        $rendelesTeljesitveSQL="UPDATE `rendeles` SET`teljesitve`=Now() WHERE `id`=?";
        $rendelesTeljesitve=adatokValtoztatasa($rendelesTeljesitveSQL,"i",[$bodyAdatok["rendelesId"]]);
        if($rendelesTeljesitve){
                                $emailLekeresSQL="SELECT email from felhasznalo where felhasznalonev=?";
        $emailLekeres=adatokLekerese($emailLekeresSQL,"s",[$bodyAdatok["nev"]]);
    $emailHTML = <<<HTML
            <div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f1ea; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <tr>
                                <td style="background-color: #2f3e2b; padding: 30px 40px; text-align: center;">
                                    <h1 style="margin: 0; color: #c49e3c; font-size: 28px; font-weight: 600; letter-spacing: 1px;">Arany Agancs</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 40px;">
                                    <h2 style="margin: 0 0 20px 0; color: #2f3e2b; font-size: 22px; font-weight: 600;">
                                        Kedves, {$bodyAdatok["nev"]}!
                                    </h2>                            
                                    <p style="margin: 0 0 25px 0; color: #444; font-size: 16px; line-height: 1.6;">
                                        Rendelésedet sikeresen elért a címpontjához, reméljük még fogsz tölünk vásárolni.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #2f3e2b; padding: 25px 40px;">
                                    <p style="margin: 0 0 5px 0; color: #c49e3c; font-size: 14px; font-weight: 600;">
                                        Az Arany Agancs Csapata
                                    </p>
                                    <p style="margin: 0; color: #a0a0a0; font-size: 12px;">
                                        Ez egy automatikus üzenet, kérjük ne válaszolj rá.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
HTML;
 $eredmeny = emailKuldes(
        $emailLekeres[0]["email"],
        $bodyAdatok["nev"],
        "Rendelés teljesítve",
        $emailHTML
    );
            echo json_encode(["valasz"=>"Sikeresen teljesítve"],JSON_UNESCAPED_UNICODE);
            return http_response_code(200);
        }
          echo json_encode(["valasz"=>"Sikertelen teljesítve"],JSON_UNESCAPED_UNICODE);
          return http_response_code(400);
    case "rendelesekAdatai":
        if($metodus!="GET"){
             return http_response_code(405);
        }
        $rendelesekAdataiSQL="SELECT * from rendeles where fizetve=1 and teljesitve is null";
        $rendelesekAdatai=adatokLekerese($rendelesekAdataiSQL);
        echo json_encode($rendelesekAdatai,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);
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

    case "ujTermek":
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


    case "termekNeve":
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $gettermekNevSQL="SELECT id,nev,nevEn from termek where kategoriaId=?";
        $gettermekNev=adatokLekerese($gettermekNevSQL,"i",[$_GET["kategoriaId"]]);
        echo json_encode($gettermekNev,JSON_UNESCAPED_UNICODE);
        return http_response_code(200);

    case "kategoriaLearazas":
         if($metodus!="PUT"){
            return http_response_code(405);
        }
        $learazasSQL="UPDATE `termek` SET`learazasid`=? WHERE `kategoriaId`=?";
        $learazas=adatokValtoztatasa($learazasSQL,"ii",[$bodyAdatok["learazasId"],$bodyAdatok["kategoriaId"]]);
        if($learazas){
            echo json_encode(["valasz"=>"Sikeresen módosítva"],JSON_UNESCAPED_UNICODE);
            return http_response_code(200);
        }
          echo json_encode(["valasz"=>"Sikertelen módosítás"],JSON_UNESCAPED_UNICODE);
          return http_response_code(400);
    case "termekLearazas":
         if($metodus!="PUT"){
            return http_response_code(405);
        }
        $learazasSQL="UPDATE `termek` SET`learazasid`=? WHERE `id`=?";
        $learazas=adatokValtoztatasa($learazasSQL,"ii",[$bodyAdatok["learazasId"],$bodyAdatok["termekId"]]);
        if($learazas){
            echo json_encode(["valasz"=>"Sikeresen módosítva"],JSON_UNESCAPED_UNICODE);
            return http_response_code(200);
        }
          echo json_encode(["valasz"=>"Sikertelen módosítva"],JSON_UNESCAPED_UNICODE);
          return http_response_code(400);
    case "rendelesiCim":
        if($metodus!="GET"){
            return http_response_code(405);
        }
        $rendelesiCimSQL="SELECT * from szallitasicimek where id=? limit 1";
        $rendelesiCim=adatokLekerese($rendelesiCimSQL,"i",[$_GET["szallitasId"]]);
        echo json_encode($rendelesiCim[0], JSON_UNESCAPED_UNICODE);
        return http_response_code(200);
}