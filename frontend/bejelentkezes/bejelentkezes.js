    import { bejelentkezesiStatus } from "../bejelentkezesiStatus.js";

    const bejelentkezesGomb = async () => {
        try {
            if (!kapcsaEllenorzes()) {
                alert("Helytelen kapcsa!");
                kapcsaGen();
                return;
            }
            let Fnev = document.getElementById("FnevIn").value;
            let Fjelszo = document.getElementById("FjelszoIn").value;
            let httpValasz = await fetch(`../../backend/bejelentkezes/index.php/bejelentkezes?felhasznalonev=${Fnev}&jelszo=${Fjelszo}`) //bejelentkezés
            let httpAdat = await httpValasz.json();
            if (httpValasz.ok) {
                alert(httpAdat.valasz);
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
            let bStatus = bejelentkezesiStatus();
            switch (bStatus) {
                case 0:
                    window.location.href = "../bejelentkezes/bejelentkezes.html"
                    break;
                case 1:
                    window.location.href = "" //admin oldal
                    break;
                case 2:
                    window.location.href = "" //munkas oldal
                    break;
                case 3:
                    window.location.href = "" //sima felhasznalo oldal
                    break;
                default:
                    break;
            }
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