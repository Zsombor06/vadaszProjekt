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

window.addEventListener("load", async () => {
    try {
        let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
        let httpAdat = await httpValasz.json();
        let userNev = httpAdat["felhasznalonev"]; //bejelentkezett felhasznalo nevet ide kell betenni
         httpValasz = await fetch(`../../backend/felhasznalo/index.php/felhasznaloAdat?nev=${userNev}`); //felhasznalo nevet at kell adni
        if (httpValasz.ok) {
            let httpAdat = await httpValasz.json();
            for (const adat of httpAdat) {
                document.getElementById("fNev").value = adat["felhasznalonev"];
                document.getElementById("fEmail").value = adat["email"];
                //document.getElementById("fSzamla").value = adat.szamlazasicim;
            }
        }
    } catch (error) {
        console.log("Hiba az adatok betöltésekor!", error);
    }
});
window.addEventListener("load", async () => { //szallitasi cimek
    try {

        let httpAdat = await Cimek();
        document.getElementById("fLak").innerHTML = "<option value='0'></option>";
        for (const cim of httpAdat) {
            document.getElementById("fLak").innerHTML += `<option value="${cim.id}">${cim.orszag}, ${cim.iranyitoszam} ${cim.varos}, ${cim.utca}</option>`;
        }
    } catch (error) {
        console.log("Hiba az adatok betöltésekor!", error);
    }
});
//rendelések betöltése: TODO->korábbi rendelések
// fetch("http://localhost/backend/rendelesHistory.php?felhasznalo=user1")
//     .then(res => res.json())
//     .then(data => {
//         const tabla = document.getElementById("rendelesLista");
//         tabla.innerHTML = "";

//         data.rendelesek.forEach(r => {
//             let statusClass = "status-feldolgozas";
//             let statusText = "Feldolgozás alatt";

//             if (r.teljesitve) {
//                 statusClass = "status-teljesitve";
//                 statusText = "Teljesítve";
//             } else if (r.elkuldve) {
//                 statusClass = "status-elkuldve";
//                 statusText = "Elküldve";
//             }

//             tabla.innerHTML += `
//                 <tr>
//                     <td>#${r.rendelesId}</td>
//                     <td>${r.fizetesIdeje ?? "-"}</td>        
//                     <td>${r.vegosszeg} Ft</td>
//                     <td>
//                         <span class="status-badge ${statusClass}">
//                             ${statusText}
//                         </span>
//                     </td>
//                     <td>
//                         <a href="rendeles_reszletek.html?rendelesId=${r.rendelesId}"
//                            class="btn btn-sm btn-primary">
//                            Részletek
//                         </a>
//                     </td>
//                 </tr>
//             `;
//         });
//     });

//jelszó módosítás:
document.getElementById("btn_jMod").addEventListener("click", async () => {
    try {
        const ujJelszo = document.getElementById("ujJelszo").value;
        const regiJelszo = document.getElementById("regiJelszo").value;
        const felhasznalonev = document.getElementById("fNev").value; //majd máshonnan kell (userNev)
        let httpValasz = await fetch("../../backend/felhasznalo/index.php/jelszoModositas", {
            method: "PUT",
            body: JSON.stringify({ 
                "nev" : felhasznalonev, 
                "regiJelszo": regiJelszo,
                "ujJelszo": ujJelszo 
            })
        });
        let httpAdat = await httpValasz.json();
        if (httpValasz.ok) {
            alert(httpAdat.valasz);
            document.getElementById("regiJelszo").value = "";
            document.getElementById("ujJelszo").value = "";
        } else {
            alert(httpAdat.valasz);
        }
    } catch (error) {
        console.log(" Hiba a jelszó módosításakor!", error);
    }
});

let CimID = 0;
document.getElementById("fLak").addEventListener("change", async () => {
    try {
        if (document.getElementById("fLak").value == 0) {
            document.getElementById("orszagMod").value = "";
            document.getElementById("irszMod").value = "";
            document.getElementById("varosMod").value = "";
            document.getElementById("utcaMod").value = "";
            return;
        }
        let adatok = await Cimek();
        for (const cimresz of adatok) {
            document.getElementById("orszagMod").value = cimresz.orszag;
            document.getElementById("irszMod").value = cimresz.iranyitoszam;
            document.getElementById("varosMod").value = cimresz.varos;
            document.getElementById("utcaMod").value = cimresz.utca;
            CimID = cimresz.id;
        }
    } catch (error) {
        console.log(error);
    }
});

document.getElementById("cimMod").addEventListener("click", async () => {
    try {
        let httpValasz = await fetch("../../backend/felhasznalo/index.php/modositSzallitasiCim", {
            method : "PUT",
            body : JSON.stringify({
                "id" : CimID,
                "orszag" : document.getElementById("orszagMod").value,
                "irsz": document.getElementById("irszMod").value ,
                "varos" :document.getElementById("varosMod").value,
                "utca" : document.getElementById("utcaMod").value 
            })
        });
        let httpAdat = await httpValasz.json();
        if (httpValasz.ok) {
            console.log(httpAdat.valasz);
        } else {
            console.log(httpAdat.valasz);
        }
    } catch (error) {
        
    }
});

const Cimek = async () => {
    try {
        let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
        let httpAdat = await httpValasz.json();
        let userNev = httpAdat["felhasznalonev"];
         httpValasz = await fetch(`../../backend/felhasznalo/index.php/szallitasiCimek?nev=${userNev}`); //felhasznalo nevet at kell adni
        if (httpValasz.ok) {
            let httpAdat = await httpValasz.json();
            return httpAdat;
        }
    } catch (error) {
        console.log("Hiba az adatok betöltésekor!", error);
    }
}

document.getElementById("btn_kij").addEventListener("click",  () => { //TODO kijelentkezés végpont...
       localStorage.removeItem('token')
           window.location.href="../fooldal/fooldal.html"
});
