const bejelentkezesiStatus = async () => {
    try {
        if(localStorage.getItem('token')){         
            let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
            if (httpValasz.ok) {
                    window.location.href="../felhasznalo/felhasznalo.html"
                }
             else {
                window.location.href="../bejelentkezes/bejelentkezes.html"
            }
        
        } else {
            window.location.href="../bejelentkezes/bejelentkezes.html"
        }
    } catch (error) {
         window.location.href="../bejelentkezes/bejelentkezes.html"
    }
}
const jogosultsagok=async()=>{
    if(localStorage.getItem('token')){         
            let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
            if (httpValasz.ok) {    
                let htttpAdat=await httpValasz.json()
                document.getElementById("felhasznaloGomb").innerHTML=htttpAdat["felhasznalonev"]
                if(htttpAdat["rangId"]==1){
                    document.getElementById("adminGomb").hidden=false
                    document.getElementById("dolgozoGomb").hidden=false
                }
                else if(htttpAdat["rangId"]==2){
                    document.getElementById("adminGomb").hidden=true
                    document.getElementById("dolgozoGomb").hidden=false
                }
            }
        }
}
const kosarBejelentkezes=async()=>{
    if(localStorage.getItem('token')){
        let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
        if (httpValasz.ok) {
            let httpAdat = await httpValasz.json();
            window.location.href="../kosar/kosar.html"
        } else {
            window.location.href="../bejelentkezes/bejelentkezes.html"
        }
    } else {
        window.location.href="../bejelentkezes/bejelentkezes.html"
    }
}
    document.getElementById("felhasznaloGomb").addEventListener("click",bejelentkezesiStatus)
    document.getElementById("kosarGomb").addEventListener("click",kosarBejelentkezes)

    const navbarKategoriak=async()=>{
        try {
            let httpvalasz=await fetch("../../backend/navbar/index.php/kategoriakNeve")
            let adatok=await httpvalasz.json()
            document.getElementById("navbarKategoriak").innerHTML=""
            for (const adat of adatok) {
                  if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
                    document.getElementById("navbarKategoriak").innerHTML+=`<div lang="hu" class="btn-kat" onclick=" localStorage.setItem('kategoria','${adat["id"]}')
        window.location.href='../termekek/termekek.html'" style="text-decoration: none;">${adat["kategoria"]}</div>`
    }
        else{
                    document.getElementById("navbarKategoriak").innerHTML+=`<div lang="en" class="btn-kat" onclick=" localStorage.setItem('kategoria','${adat["id"]}')
        window.location.href='../termekek/termekek.html'" style="text-decoration: none;">${adat["kategoriaEn"]}</div>`
        }
                   
                }
        } catch (error) {
            console.log(error)
        }
    }
    window.addEventListener("load",navbarKategoriak)
    window.addEventListener("load",jogosultsagok)
    document.getElementById("magyar").addEventListener("click",navbarKategoriak)
    document.getElementById("angol").addEventListener("click",navbarKategoriak)