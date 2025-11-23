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
        let szamla = document.getElementById("FszamlaIn").value;
        let lakcim = document.getElementById("FlakIn").value;
        if (jelszo !== jelszoUjra) {
            alert("A jelszavak nem egyeznek!");
            return;
        }
        //felhasználó név ellenőrzése (van e már ilyen)
        //email ellenőrzése (van e már ilyen)
        
        // Küldés a szervernek
        let regAdatok = {
            "felhasznalonev": fnev,
            "jelszo": jelszo,
            "email": email,
            "szamla": szamla,
            "lakcim": lakcim
        };
        let httpValasz = await fetch(`../../backend/regisztracio/index.php/regisztracio`, { //??
            method: 'POST',
            body: JSON.stringify(regAdatok),
        });
    } catch (error) {
        console.error();
    }
}