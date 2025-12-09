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

        // számlázási cím
        let szaml_or = document.getElementById("SzamlOrszag").value;
        let szaml_ir = document.getElementById("SzamlIr").value;
        let szaml_varos = document.getElementById("SzamlVaros").value;
        let szaml_utca = document.getElementById("SzamlUtca").value;

        // szállítási cím
        let orszag = document.getElementById("FlakOrszag").value;
        let irsz = document.getElementById("FlakIr").value;
        let varos = document.getElementById("FlakVaros").value;
        let utca = document.getElementById("FlakUtca").value;

        if (jelszo !== jelszoUjra) {
            alert("A jelszavak nem egyeznek!");
            return;
        }

        let regAdatok = {
            felhasznalonev: fnev,
            jelszo: jelszo,
            email: email,

            // számlázási cím
            szamlazasi_orszag: szaml_or,
            szamlazasi_iranyitoszam: szaml_ir,
            szamlazasi_varos: szaml_varos,
            szamlazasi_utca: szaml_utca,

            // szállítási cím
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
            alert("Sikeres regisztráció!");
        } else {
            alert(adat.hiba);
        }

    } catch (err) {
        console.error(err);
        alert("Hálózati hiba!");
    }
}

document.getElementById("RegGomb").addEventListener("click", Regisztracio);