# vadaszProjekt
Iskolai projekt, amely egy vadász webshopot probál szimulálni

A megfelelő működéshez kell: <br>
    https://github.com/firebase/php-jwt<br>
    A letöltött ZIP jájlból az src mappát el kell helyezni a:<br>
    vadaszProjekt/backend/bejelentkezes/vendor/firebase/php-jwt mappába,majd a<br>
    JWT.php fájlból a 720-722 sorok törlése:<br>
    /*<br>
        if ($keyDetails['bits'] < $minKeyLength) {<br>
            throw new DomainException('Provided key is too short');<br>
        }<br>
    */
    
