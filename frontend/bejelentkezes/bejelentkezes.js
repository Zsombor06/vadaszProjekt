const bejelentkezesGomb = async () => {
    try {
        if (!kapcsaEllenorzes()) {
            alert("Helytelen kapcsa!");
            kapcsaGen();
            return;
        }
        let Fnev = document.getElementById("FnevIn").value;
        let Fjelszo = document.getElementById("FjelszoIn").value;
        let httpValasz = await fetch(`../../backend/bejelentkezes/login.php`,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "username":Fnev,
                "password":Fjelszo}
            )
        }) //bejelentkezés
        let httpAdat = await httpValasz.json();
        if (httpValasz.ok) {  
            localStorage.setItem('token', httpAdat["accessToken"])
            window.location.href = "../fooldal/fooldal.html" //főoldal
        } else {
            alert(httpAdat.valasz);
            kapcsaGen();
        }
    } catch (error) {
        console.log(error);
    }
}

const felhasznaloGomb = async () => {
    try {
        //window.location.href = "../felhasznalo/felhasznalo.html" //felhasználói oldal
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("RegGomb").addEventListener("click", function() {
    try {
        window.location.href = "../regisztracio/regisztracio.html" //regisztracios oldal
    } catch (error) {
        console.log(error);
    }
});


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

//kapcsa::
const kapcsaGen = () => {
    document.getElementById("kapcsaIn").value = "";
    let karakterek = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let kapcsaSzoveg = "";
    let kapcsa = document.getElementById("kapcsaKep");
    for (let i = 0; i < 6; i++) {
        kapcsaSzoveg += karakterek.charAt(Math.floor(Math.random() * karakterek.length));
    }
    kapcsa.innerHTML = kapcsaSzoveg;
}
const kapcsaEllenorzes = () => {
    let kapcsaBeirt = document.getElementById("kapcsaIn").value;
    let kapcsaSzoveg = document.getElementById("kapcsaKep").innerHTML;
    if (kapcsaBeirt == kapcsaSzoveg) {
        return true;
    } else {
        return false;
    }
}
document.getElementById("ujkapcsa").addEventListener("click", kapcsaGen);
window.addEventListener("load", kapcsaGen);

document.getElementById("felhasznaloGomb").addEventListener("click", felhasznaloGomb);
document.getElementById("BejGomb").addEventListener("click", bejelentkezesGomb);


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
        document.getElementById("BejGomb").value=adatok[11]["szoveg"]
        document.getElementById("szoveg5").value=adatok[12]["szoveg"]
        document.getElementById("RegGomb").value=adatok[6]["szoveg"]
        }
        else{
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
                    document.getElementById("FnevIn").placeholder="Username";
        document.getElementById("FjelszoIn").placeholder="Password";
        document.getElementById("BejGomb").value=adatok[11]["szoveg_en"]
        document.getElementById("szoveg5").innerHTML=adatok[12]["szoveg_en"]
        document.getElementById("RegGomb").value=adatok[6]["szoveg_en"]
        }
    } catch (error) {
        console.log(error)
    }
}
window.addEventListener("load",szoveg)
const beallitMagyar=()=>{
    localStorage.setItem("nyelv","hu")
    szoveg()
}
document.getElementById("magyar").addEventListener("click",beallitMagyar)
const beallitAngol=()=>{
    localStorage.setItem("nyelv","en")
    szoveg()
}
document.getElementById("angol").addEventListener("click",beallitAngol)