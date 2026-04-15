document.getElementById('szemecske').addEventListener('click', function () {
    const jelszoIn = document.getElementById('FjelszoIn');
    const icon = this.querySelector('i');
    if (jelszoIn.type === 'password') {
        jelszoIn.type = 'text';
        if (icon) { icon.classList.remove('bi-eye-slash'); icon.classList.add('bi-eye'); }
    } else {
        jelszoIn.type = 'password';
        if (icon) { icon.classList.remove('bi-eye'); icon.classList.add('bi-eye-slash'); }
    }
});

document.getElementById('szemecske2').addEventListener('click', function () {
    const jelszoIn = document.getElementById('FjelszoUjraIn');
    const icon = this.querySelector('i');
    if (jelszoIn.type === 'password') {
        jelszoIn.type = 'text';
        if (icon) { icon.classList.remove('bi-eye-slash'); icon.classList.add('bi-eye'); }
    } else {
        jelszoIn.type = 'password';
        if (icon) { icon.classList.remove('bi-eye'); icon.classList.add('bi-eye-slash'); }
    }
});

document.getElementById("BejGomb").addEventListener("click", function () {
    try {
        window.location.href = "../bejelentkezes/bejelentkezes.html";
    } catch (error) {
        console.log(error);
    }
});

const Regisztracio = async () => {
     try {
        let fnev = document.getElementById("FnevIn").value;
        let jelszo = document.getElementById("FjelszoIn").value;
        let jelszoUjra = document.getElementById("FjelszoUjraIn").value;
        let email = document.getElementById("FemailIn").value;

        let szaml_or = document.getElementById("SzamlOrszag").value;
        let szaml_ir = document.getElementById("SzamlIr").value;
        let szaml_varos = document.getElementById("SzamlVaros").value;
        let szaml_utca = document.getElementById("SzamlUtca").value;

        let orszag = document.getElementById("FlakOrszag").value;
        let irsz = document.getElementById("FlakIr").value;
        let varos = document.getElementById("FlakVaros").value;
        let utca = document.getElementById("FlakUtca").value;

        if (jelszo !== jelszoUjra) {
            document.getElementById("hiba").hidden=false
            if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu")document.getElementById("hiba").innerHTML="Jelszók nem egyeznek meg"
            else document.getElementById("hiba").innerHTML="The passwords dont match"
            return;
        }
        let regAdatok = {
            felhasznalonev: fnev,
            jelszo: jelszo,
            email: email,

            szamlazasi_orszag: szaml_or,
            szamlazasi_iranyitoszam: szaml_ir,
            szamlazasi_varos: szaml_varos,
            szamlazasi_utca: szaml_utca,

            orszag: orszag,
            iranyitoszam: irsz,
            varos: varos,
            utca: utca
        };
        let response = await fetch("../../backend/regisztracio/ujFelhasznalo.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(regAdatok)
        });
        let adat = await response.json();
        if (response.ok) {
            window.location.href = "../bejelentkezes/bejelentkezes.html";
        } else {
            document.getElementById("hiba").hidden=false
            if(adat.hiba==1){
            if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu")document.getElementById("hiba").innerHTML="Minden mező kitöltése kötelező"
            else document.getElementById("hiba").innerHTML="All fields are required!"
            }
            else if(adat.hiba==2){
            if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu")document.getElementById("hiba").innerHTML="Felhasználónév már foglalt!"
            else document.getElementById("hiba").innerHTML="Username already in use!"    
            }
            else{
            if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu")document.getElementById("hiba").innerHTML="Email cím már foglat!"
            else document.getElementById("hiba").innerHTML="Email address already in use!"   
            }
        }
    } catch (err) {
        document.getElementById("hiba").hidden=false
        document.getElementById("hiba").innerHTML="ERROR 404"
    }
}

document.getElementById("RegGomb").addEventListener("click", Regisztracio);

const szoveg=async()=>{
    try {
        let httpvalasz=await fetch("../../backend/szoveg/szoveg.php/szoveg")
        let adatok=await httpvalasz.json()
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg"]
            document.getElementById("FnevIn").placeholder="Felhasználónév";
            document.getElementById("FjelszoIn").placeholder="Jelszó";
            document.getElementById("FjelszoUjraIn").placeholder="Jelszó megerősítés";


            document.getElementById("SzamlOrszag").placeholder="Ország";
            document.getElementById("SzamlIr").placeholder="Irányítószám";
            document.getElementById("SzamlVaros").placeholder="Város";
            document.getElementById("SzamlUtca").placeholder="Utca";

            document.getElementById("FlakOrszag").placeholder="Ország";
            document.getElementById("FlakIr").placeholder="Irányítószám";
            document.getElementById("FlakVaros").placeholder="Város";
            document.getElementById("FlakUtca").placeholder="Utca";

            document.getElementById("RegGomb").value=adatok[6]["szoveg"];
            document.getElementById("szoveg6").innerHTML=adatok[13]["szoveg"];
            document.getElementById("BejGomb").value=adatok[11]["szoveg"];    
            document.getElementById("szoveg4").innerHTML=adatok[14]["szoveg"];
            document.getElementById("szoveg5").innerHTML=adatok[15]["szoveg"];
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[96]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[96]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[96]["szoveg"]
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[97]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[97]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[97]["szoveg"]
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[98]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[98]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[98]["szoveg"]
        } else {
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
            document.getElementById("FnevIn").placeholder="User name";
            document.getElementById("FjelszoIn").placeholder="Password";
            document.getElementById("FjelszoUjraIn").placeholder="Password conformation";

            document.getElementById("SzamlOrszag").placeholder="Country";
            document.getElementById("SzamlIr").placeholder="ZIP code";
            document.getElementById("SzamlVaros").placeholder="City";
            document.getElementById("SzamlUtca").placeholder="Street";

            document.getElementById("FlakOrszag").placeholder="Country";
            document.getElementById("FlakIr").placeholder="ZIP code";
            document.getElementById("FlakVaros").placeholder="City";
            document.getElementById("FlakUtca").placeholder="Street";
            document.getElementById("RegGomb").value=adatok[6]["szoveg_en"];
            document.getElementById("szoveg6").innerHTML=adatok[13]["szoveg_en"];
            document.getElementById("BejGomb").value=adatok[11]["szoveg_en"];
            document.getElementById("szoveg4").innerHTML=adatok[14]["szoveg_en"];
            document.getElementById("szoveg5").innerHTML=adatok[15]["szoveg_en"];
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[96]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[96]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[96]["szoveg_en"]
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[97]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[97]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[97]["szoveg_en"]
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[98]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[98]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[98]["szoveg_en"]
        }
    } catch (error) {
        console.log(error)
    }
}
window.addEventListener("load",szoveg)
const beallitMagyar = () => {
    localStorage.setItem("nyelv", "hu")
    szoveg()
}
document.getElementById("magyar").addEventListener("click",beallitMagyar)
const beallitAngol = () => {
    localStorage.setItem("nyelv", "en")
    szoveg()
}
document.getElementById("angol").addEventListener("click",beallitAngol)