

const bejelentkezesiStatus = async () => {
    try {
        if(localStorage.getItem('token')!=undefined){
            
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
                window.location.href="../bejelentkezes/bejelentkezes.html"
            }}
            else{
                window.location.href="../bejelentkezes/bejelentkezes.html"

            }
        } catch (error) {
            return console.log(error);
        }
    }
const kosarBejelentkezes=async()=>{
    if(localStorage.getItem('token')){

            
            let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
            if (httpValasz.ok) {
                let httpAdat = await httpValasz.json();
              
                    window.location.href="../kosar/kosar.html"
                    }
                
            }
            else{
                window.location.href="../bejelentkezes/bejelentkezes.html"
            }
}

    document.getElementById("felhasznaloGomb").addEventListener("click",bejelentkezesiStatus)
    document.getElementById("kosarGomb").addEventListener("click",kosarBejelentkezes)