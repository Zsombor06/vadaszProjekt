const regisztralasGomb = async () => {
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
                window.location.href="../regisztracio/regisztracio.html"
            }
        } else {
            window.location.href="../regisztracio/regisztracio.html"
        }
    } catch (error) {
        console.log(error);
    }
}
document.getElementById("Regisztralas").addEventListener("click", regisztralasGomb);

const szoveg=async()=>{
    try {
        let httpvalasz=await fetch("../../backend/szoveg/szoveg.php/szoveg")
        let adatok=await httpvalasz.json()
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg"]
            document.getElementById("szoveg4").innerHTML=adatok[3]["szoveg"]
            document.getElementById("szoveg5").innerHTML=adatok[4]["szoveg"]
            document.getElementById("szoveg6").innerHTML=adatok[5]["szoveg"]
            document.getElementById("Regisztralas").innerHTML=adatok[6]["szoveg"]
            document.getElementById("footer1").innerHTML=adatok[82]["szoveg"]
            document.getElementById("footer2").innerHTML=adatok[83]["szoveg"]
            document.getElementById("footer3").innerHTML=adatok[84]["szoveg"]
            document.getElementById("footer4").innerHTML=adatok[85]["szoveg"]
            document.getElementById("footer5").innerHTML=adatok[86]["szoveg"]
            document.getElementById("footer6").innerHTML=adatok[87]["szoveg"]
            document.getElementById("footer7").innerHTML=adatok[88]["szoveg"]
            document.getElementById("footer8").innerHTML=adatok[89]["szoveg"]
            document.getElementById("footer9").innerHTML=adatok[90]["szoveg"]
            document.getElementById("footer10").innerHTML=adatok[91]["szoveg"]
            document.getElementById("footer11").innerHTML=adatok[92]["szoveg"]
            document.getElementById("footer12").innerHTML=adatok[93]["szoveg"]
        } else {
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
            document.getElementById("szoveg4").innerHTML=adatok[3]["szoveg_en"]
            document.getElementById("szoveg5").innerHTML=adatok[4]["szoveg_en"]
            document.getElementById("szoveg6").innerHTML=adatok[5]["szoveg_en"]
            document.getElementById("Regisztralas").innerHTML=adatok[6]["szoveg_en"]
            document.getElementById("footer1").innerHTML=adatok[82]["szoveg_en"]
            document.getElementById("footer2").innerHTML=adatok[83]["szoveg_en"]
            document.getElementById("footer3").innerHTML=adatok[84]["szoveg_en"]
            document.getElementById("footer4").innerHTML=adatok[85]["szoveg_en"]
            document.getElementById("footer5").innerHTML=adatok[86]["szoveg_en"]
            document.getElementById("footer6").innerHTML=adatok[87]["szoveg_en"]
            document.getElementById("footer7").innerHTML=adatok[88]["szoveg_en"]
            document.getElementById("footer8").innerHTML=adatok[89]["szoveg_en"]
            document.getElementById("footer9").innerHTML=adatok[90]["szoveg_en"]
            document.getElementById("footer10").innerHTML=adatok[91]["szoveg_en"]
            document.getElementById("footer11").innerHTML=adatok[92]["szoveg_en"]
            document.getElementById("footer12").innerHTML=adatok[93]["szoveg_en"]
        }
    } catch (error) {
        console.log(error)
    }
}
window.addEventListener("load",szoveg)
const beallitMagyar = () => {
    localStorage.setItem("nyelv","hu")
    szoveg()
}
document.getElementById("magyar").addEventListener("click",beallitMagyar)
const beallitAngol = () => {
    localStorage.setItem("nyelv","en")
    szoveg()
}
document.getElementById("angol").addEventListener("click",beallitAngol)