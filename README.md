# vadaszProjekt
Iskolai projekt, amely egy vadász webshopot probál szimulálni

A megfelelő működéshez kell: 
    https://github.com/firebase/php-jwt
    A letöltött ZIP jájlból az src mappát el kell helyezni a:
    vadaszProjekt/backend/bejelentkezes/vendor/firebase/php-jwt mappába,majd a
    JWT.php fájlból a 708-710 sorok törlése:
    /*
        if ($keyDetails['bits'] < $minKeyLength) {
            throw new DomainException('Provided key is too short');
        }
    */
    
