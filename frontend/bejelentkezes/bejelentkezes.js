const bejelentkezesGomb = async () => {
    try {
        if (!kapcsaEllenorzes()) {
            document.getElementById("hiba").hidden=false
        if (localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu") document.getElementById("hiba").innerHTML="Helytelen Captcha"
        else document.getElementById("hiba").innerHTML="Incorrect Captcha"
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
        })
        let httpAdat = await httpValasz.json();
        if (httpValasz.ok) {  
            localStorage.setItem('token', httpAdat["accessToken"])
            window.location.href = "../fooldal/fooldal.html"
        } else {
        if (localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu") document.getElementById("hiba").innerHTML="Helytelen felhasználónév vagy jelszó"
        else document.getElementById("hiba").innerHTML="Incorrect username or password"
        kapcsaGen();
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("RegGomb").addEventListener("click", function() {
    try {
        window.location.href = "../regisztracio/regisztracio.html" 
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

const szoveg = async () => {
    try {
        let httpvalasz = await fetch("../../backend/szoveg/szoveg.php/szoveg")
        let adatok = await httpvalasz.json()
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg"]
            if(localStorage.getItem('token')){
            let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
            let adat=await httpValasz.json()
            if(adat["felhasznalonev"]==null){
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            }
            else{
            document.getElementById("felhasznaloGomb").innerHTML=adat["felhasznalonev"]
            }
            }
            else{
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            }
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg"]
            document.getElementById("FnevIn").placeholder="Felhasználónév";
            document.getElementById("FjelszoIn").placeholder="Jelszó";
            document.getElementById("BejGomb").value=adatok[11]["szoveg"]
            document.getElementById("szoveg5").innerHTML=adatok[12]["szoveg"]
            document.getElementById("RegGomb").value=adatok[6]["szoveg"]
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[94]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[94]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[94]["szoveg"]
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[95]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[95]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[95]["szoveg"]
            document.getElementById("termekGomb").innerHTML=adatok[113]["szoveg"]
            document.getElementById("dolgozoGomb").innerHTML=adatok[116]["szoveg"]
        } else {
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            if(localStorage.getItem('token')){
            let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
            let adat=await httpValasz.json()
            if(adat["felhasznalonev"]==null){
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            }
            else{
            document.getElementById("felhasznaloGomb").innerHTML=adat["felhasznalonev"]
            }
            }
            else{
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            }
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
            document.getElementById("FnevIn").placeholder="Username";
            document.getElementById("FjelszoIn").placeholder="Password";
            document.getElementById("BejGomb").value=adatok[11]["szoveg_en"]
            document.getElementById("szoveg5").innerHTML=adatok[12]["szoveg_en"]
            document.getElementById("RegGomb").value=adatok[6]["szoveg_en"]
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[94]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[94]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[94]["szoveg_en"]
            if(document.getElementById("hiba").hidden==false && document.getElementById("hiba").innerHTML==adatok[95]["szoveg"] || document.getElementById("hiba").innerHTML==adatok[95]["szoveg_en"])document.getElementById("hiba").innerHTML=adatok[95]["szoveg_en"]
            document.getElementById("termekGomb").innerHTML=adatok[113]["szoveg_en"]
            document.getElementById("dolgozoGomb").innerHTML=adatok[116]["szoveg_en"]
        
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


let userEmail = "";
let userOTP = "";



function showModalMsg(msg, isError = true) {
    const msgDiv = document.getElementById('modal-footer-msg');
    if (msgDiv) {
        msgDiv.innerText = msg;
        msgDiv.className = isError ? "text-center pb-3 text-danger" : "text-center pb-3 text-success";
        msgDiv.style.display = 'block';
    }
}

async function sendOTP() {
    const emailInput = document.getElementById('resetEmail');
    const email = emailInput ? emailInput.value : "";
    
    if (!email) {
        showModalMsg("Adj meg egy e-mail címet!");
        return;
    }

    showModalMsg("Küldés folyamatban...", false);

    try {
        const response = await fetch('../../backend/bejelentkezes/forgotten_password.php', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();

        if (response.ok) {
            userEmail = email;
            document.getElementById('modal-body-content').innerHTML = `
                <div id="step2">
                    <p class="text-dark">A kódot elküldtük az e-mail címedre!</p>
                    <input type="text" id="otpInput" class="form-control mb-3" placeholder="6 jegyű kód">
                    <button id="btnVerifyOTP" class="btn btn-primary w-100">Kód ellenőrzése</button>
                </div>
            `;
            showModalMsg(""); 
        } else {
            showModalMsg(data.valasz || "Hiba történt!");
        }
    } catch (e) {
        showModalMsg("Szerver hiba történt!");
    }
}

async function verifyOTP() {
    const otp = document.getElementById('otpInput').value;
    if (!otp) return showModalMsg("Add meg a kódot!");

    const response = await fetch('../../backend/bejelentkezes/verify_code.php', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, code: otp })
    });

    if (response.ok) {
        userOTP = otp;
        document.getElementById('modal-body-content').innerHTML = `
            <div id="step3">
                <p>Kód elfogadva! Add meg az új jelszavadat:</p>
                <input type="password" id="newPass" class="form-control mb-2" placeholder="Új jelszó">
                <input type="password" id="newPassConfirm" class="form-control mb-3" placeholder="Megerősítés">
                <button id="btnSavePassword" class="btn btn-primary w-100">Mentés</button>
            </div>
        `;
        showModalMsg("");
    } else {
        showModalMsg("Hibás vagy lejárt kód!");
    }
}

async function saveNewPassword() {
    const pass = document.getElementById('newPass').value;
    const confirm = document.getElementById('newPassConfirm').value;

    if (!pass || pass.length < 6) return showModalMsg("Túl rövid jelszó!");
    if (pass !== confirm) return showModalMsg("A jelszavak nem egyeznek!");

    const response = await fetch('../../backend/bejelentkezes/reset_password.php', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, token: userOTP, ujJelszo: pass })
    });

    if (response.ok) {
        showModalMsg("Sikeres módosítás! Frissítés...", false);
        setTimeout(() => location.reload(), 2000);
    } else {
        showModalMsg("Hiba a mentés során!");
    }
}

window.sendOTP = sendOTP;
window.verifyOTP = verifyOTP;
window.saveNewPassword = saveNewPassword;

document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'btnSendOTP') {
        sendOTP();
    }
    if (e.target && e.target.id === 'btnVerifyOTP') {
        verifyOTP();
    }
    if (e.target && e.target.id === 'btnSavePassword') {
        saveNewPassword();
    }
});