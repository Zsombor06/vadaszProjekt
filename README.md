# vadaszProjekt
Iskolai projekt, amely egy vadász webshopot probál szimulálni

A megfelelő működéshez kell: 
    https://github.com/firebase/php-jwt\n
    A letöltött ZIP jájlból az src mappát el kell helyezni a:\n
    vadaszProjekt/backend/bejelentkezes/vendor/firebase/php-jwt mappába,majd a\n
    JWT.php fájlból a 708-710 sorok törlése:\n
    /*\n
        if ($keyDetails['bits'] < $minKeyLength) {\n
            throw new DomainException('Provided key is too short');\n
        }\n
    */
    
