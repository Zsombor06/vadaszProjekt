const bejelentkezesiStatus = async () => {
    try {
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
            } else {
                window.location.href="../bejelentkezes/bejelentkezes.html"
            }
        } else {
            window.location.href="../bejelentkezes/bejelentkezes.html"
        }
    } catch (error) {
         window.location.href="../bejelentkezes/bejelentkezes.html"
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
    document.getElementById("magyar").addEventListener("click",navbarKategoriak)
    document.getElementById("angol").addEventListener("click",navbarKategoriak)