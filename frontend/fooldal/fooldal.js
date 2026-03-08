const regisztralasGomb = async () => {
        try {
            console.log("A")
            if(localStorage.getItem('token')){         
            let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
            if (httpValasz.ok) {
                let httpAdat = await httpValasz.json();
              
                    switch (httpAdat["rangId"]) {
                        case 1: //rangId 1 az admin
                        window.location.href="../admin/admin.html"
                        return
                        case 2: //rangId 2 a dolgozó
                        window.location.href="../dolgozo/dolgozo.html"
                        return
                        default: //rangId 3 a regisztrált felhasználó
                        window.location.href="../felhasznalo/felhasznalo.html"
                        return ;
                    }
                
            }
            else{
                window.location.href="../regisztracio/regisztracio.html"
            }}
            else{
                window.location.href="../regisztracio/regisztracio.html"

            }
        } catch (error) {
            console.log(error);
        }
    }


    document.getElementById("Regisztralas").addEventListener("click", regisztralasGomb);
    document.getElementById("RegisztralasEn").addEventListener("click", regisztralasGomb);


    