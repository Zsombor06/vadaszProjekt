document.getElementById('szemecske').addEventListener('click', function () {
    const jelszoIn = document.getElementById('regiJelszo');
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
    const jelszoIn = document.getElementById('ujJelszo');
    const icon = this.querySelector('i');
    if (jelszoIn.type === 'password') {
        jelszoIn.type = 'text';
        if (icon) { icon.classList.remove('bi-eye-slash'); icon.classList.add('bi-eye'); }
    } else {
        jelszoIn.type = 'password';
        if (icon) { icon.classList.remove('bi-eye'); icon.classList.add('bi-eye-slash'); }
    }
});

//adatok betöltése:
let userNev = ""; //bejelentkezett felhasznalo nevet ide kell betenni
window.addEventListener("load", async () => {
    try {
        let httpValasz = await fetch(`../../backend/felhasznalo/index.php/felhasznaloAdat?felhasznalonev=${userNev}`); //felhasznalo nevet at kell adni
        if (httpValasz.ok) {
            let httpAdat = await httpValasz.json();
            document.getElementById("fNev").value = httpAdat.felhasznalonev;
            document.getElementById("fEmail").value = httpAdat.email;
            document.getElementById("fSzamla").value = httpAdat.szamlazasicim;
        }
    } catch (error) {
        console.log("Hiba az adatok betöltésekor!", error);
    }
});
window.addEventListener("load", async () => {
    try {
        let httpValasz = await fetch(`../../backend/felhasznalo/index.php/szallitasCimek?felhasznalo=${userNev}`); //felhasznalo nevet at kell adni
        if (httpValasz.ok) {
            let httpAdat = await httpValasz.json();
            document.getElementById("fLak").innerHTML = "<option value='0'></option>";
            for (const cim of httpAdat) {
                document.getElementById("fLak").innerHTML += `<option value="${cim.id}">${cim.orszag}, ${cim.iranyitoszam} ${cim.varos}, ${cim.utca}</option>`;
            }
        }
    } catch (error) {
        console.log("Hiba az adatok betöltésekor!", error);
    }
});
//rendelések betöltése:
window.addEventListener("load", async () => {
    try {
        let httpValasz = await fetch(`../../backend/felhasznalo/index.php/rendelesekAdatai?felhasznalo=${userNev}`);
        if (httpValasz.ok) {
            let httpAdat = await httpValasz.json();
            document.getElementById("rendelesLista").innerHTML = "<option value='0'></option>";
            for (const rendeles of httpAdat) {
                document.getElementById("rendelesLista").innerHTML += `<option value="${rendeles.id}">${rendeles.id}</option>`; //mikor adta fel
            }
        }
    } catch (error) {
        console.log("Hiba a rendelések betöltésekor!", error);
    }
});

document.getElementById("rendelesLista").addEventListener("change", async () => {
    try {
        const rendelesId = document.getElementById("rendelesLista").value;
        let httpValasz = await fetch(`../../backend/felhasznalo/index.php/rendelesTetelek?rendelesId=${rendelesId}`);
        if (httpValasz.ok) {
            let httpAdat = await httpValasz.json();
            document.getElementById("rendelesReszletek").innerHTML = "";
            document.getElementById("rendelesP").hidden = false;
            for (const termek of httpAdat) {
                document.getElementById("rendelesReszletek").innerHTML += `Termék neve: ${termek.termeknev}, ${termek.mennyiseg} db, egységár: ${termek.ar}Ft`;
            }
        }
    } catch (error) {
        console.log("Hiba a rendelés részleteinek lekérésekor!", error);
    }
});

//jelszó módosítás:
document.getElementById("btn_jMod").addEventListener("click", async () => {
    try {
        const ujJelszo = document.getElementById("ujJelszo").value;
        const regiJelszo = document.getElementById("regiJelszo").value;
        const felhasznalonev = document.getElementById("fNev").value;
        let httpValasz = await fetch("../../backend/felhasznalo/index.php/jelszoModosit", {
            method: "PUT",
            body: JSON.stringify({ 
                "nev" : felhasznalonev, 
                "regiJelszo": regiJelszo,
                "ujJelszo": ujJelszo 
            })
        });
        if (httpValasz.ok) {
            alert(httpAdat.valasz);
            document.getElementById("FjelszoIn").value = "";
            document.getElementById("FjelszoUjraIn").value = "";
        } else {
            alert(httpAdat.valasz);
        }
    } catch (error) {
        console.log("Hiba a jelszó módosításakor!", error);
    }
});
