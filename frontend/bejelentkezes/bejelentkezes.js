    import { bejelentkezesiStatus } from "../bejelentkezesiStatus.js";

    const regisztralasGomb = async () => {
        try {
            window.location.href = "" //regisztracios oldal
        } catch (error) {
            console.log(error);
        }
    }

    const bejelentkezesGomb = async () => {
        try {
            let Fnev = document.getElementById("FnevIn").value;
            let Fjelszo = document.getElementById("FjelszoIn").value;
            let httpValasz = await fetch(""); //bejelentkezés elindítása
            let httpAdat = await httpValasz.json();
            if (httpValasz.ok) {
                alert(httpAdat.valasz);
            } else {
                alert(httpAdat.valasz);
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

    document.getElementById("RegGomb").addEventListener("click", regisztralasGomb);
    document.getElementById("BejGomb").addEventListener("click", bejelentkezesGomb);
    document.getElementById("felhasznaloGomb").addEventListener("click", felhasznaloGomb);