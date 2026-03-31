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

window.addEventListener("load", async () => {
    try {
        let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
        let httpAdat = await httpValasz.json();
        let userNev = httpAdat["felhasznalonev"];
         httpValasz = await fetch(`../../backend/felhasznalo/index.php/felhasznaloAdat?nev=${userNev}`);
        if (httpValasz.ok) {
            let httpAdat = await httpValasz.json();
            for (const adat of httpAdat) {
                document.getElementById("fNev").value = adat["felhasznalonev"];
                document.getElementById("fEmail").value = adat["email"];
            }
        }
    } catch (error) {
        console.log("Hiba az adatok betöltésekor!", error);
    }
});

window.addEventListener("load", async () => {
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

document.getElementById("btn_jMod").addEventListener("click", async () => {
    try {
        const ujJelszo = document.getElementById("ujJelszo").value;
        const regiJelszo = document.getElementById("regiJelszo").value;
        const felhasznalonev = document.getElementById("fNev").value;
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
            if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
                document.getElementById("cimMod").value="Hozzáadás"
            }
            else{
                document.getElementById("cimMod").value="Add address"
            }
            return;
        }
        let adatok = await Cimek();
        for (const cimresz of adatok) {
            document.getElementById("orszagMod").value = cimresz.orszag;
            document.getElementById("irszMod").value = cimresz.iranyitoszam;
            document.getElementById("varosMod").value = cimresz.varos;
            document.getElementById("utcaMod").value = cimresz.utca;
            if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
                document.getElementById("cimMod").value="Módosítás"
            }
            else{
                document.getElementById("cimMod").value="Change address"
            }
            CimID = cimresz.id;
        }
    } catch (error) {
        console.log(error);
    }
});

document.getElementById("cimMod").addEventListener("click", async () => {
    try {
        if(document.getElementById("fLak").value == 0){
            let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
            let httpAdat = await httpValasz.json();
            let userNev = httpAdat["felhasznalonev"];
            httpValasz=await fetch('../../backend/felhasznalo/index.php/ujSzallitasiCim',{
                method : "POST",
                body : JSON.stringify({
                    "nev" : userNev,
                    "orszag" : document.getElementById("orszagMod").value,
                    "irsz": document.getElementById("irszMod").value ,
                    "varos" :document.getElementById("varosMod").value,
                    "utca" : document.getElementById("utcaMod").value 
                })
            })
            httpAdat = await httpValasz.json();
            if (httpValasz.ok) {
                window.location.href=window.location.href
            } else {
                console.log(httpAdat.valasz);
            }
        } else {
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
        }
    } catch (error) {
        console.log(error);
    }
});

const Cimek = async () => {
    try {
        let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
        let httpAdat = await httpValasz.json();
        let userNev = httpAdat["felhasznalonev"];
        httpValasz = await fetch(`../../backend/felhasznalo/index.php/szallitasiCimek?nev=${userNev}`);
        if (httpValasz.ok) {
            let httpAdat = await httpValasz.json();
            return httpAdat;
        }
    } catch (error) {
        console.log("Hiba az adatok betöltésekor!", error);
    }
}

document.getElementById("kijelentkezes").addEventListener("click",  () => { 
    localStorage.removeItem('token')
    window.location.href="../fooldal/fooldal.html"
});

window.addEventListener("load", async () => {
    try {
        let auth = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`);
        let authAdat = await auth.json();
        let userNev = authAdat.felhasznalonev;
        let valasz = await fetch(`../../backend/kosar/rendelesHistory.php?felhasznalo=${userNev}`);
        if (!valasz.ok) {
            console.log("Nem sikerült betölteni a rendeléseket");
            return;
        }
        let adat = await valasz.json();
        let rendelesek = adat.rendelesek;
        let tbody = document.getElementById("rendelesLista");
        tbody.innerHTML = "";
        for (const r of rendelesek) {
            var statusz
            if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
                statusz = "Folyamatban";
                if (r.teljesitve == 1) statusz = "Teljesítve";
                if (r.elkuldve == 1 && r.teljesitve == 0) statusz = "Elküldve";
            } else {
                statusz = "In progress";
                if (r.teljesitve == 1) statusz = "Completed";
                if (r.elkuldve == 1 && r.teljesitve == 0) statusz = "Sent";
            }
            tbody.innerHTML += `
                <tr>
                    <td>${r.rendelesId}</td>
                    <td>${r.fizetesIdeje}</td>
                    <td>${r.vegosszeg} Ft</td>
                    <td id="statusz">${statusz}</td>
                    <td>
                        <button id="rendelesGomb" class="btn btn-sm felhasznalo-btn" data-id="${r.rendelesId}">
                            Részletek
                        </button>
                    </td>
                </tr>
            `;
        }
        szoveg()
    } catch (error) {
        console.log("Hiba a rendelések betöltésekor:", error);
    }
});

async function rendelesReszletek(id) {
    try {
        let valasz = await fetch(`../../backend/kosar/rendelesReszletek.php?rendelesId=${id}`);
        if (!valasz.ok) {
            alert("Nem sikerült betölteni a részleteket");
            return;
        }
        let adat = await valasz.json();
        let tbody = document.getElementById("rendelesReszletTbody");
        tbody.innerHTML = "";
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
        for (const tetel of adat.tetelek) {
            tbody.innerHTML += `
                <tr>
                    <td>${tetel.nev}</td>
                    <td>${tetel.ar} Ft</td>
                    <td>${tetel.mennyiseg}</td>
                    <td>${tetel.reszosszeg} Ft</td>
                </tr>
            `;
        }
    } else {
        for (const tetel of adat.tetelek) {
            tbody.innerHTML += `
                <tr>
                    <td>${tetel.nevEn}</td>
                    <td>${tetel.ar} Ft</td>
                    <td>${tetel.mennyiseg}</td>
                    <td>${tetel.reszosszeg} Ft</td>
                </tr>
            `;
        }
    }
    let modal = new bootstrap.Modal(document.getElementById("rendelesModal"));
    modal.show();
    } catch (error) {
        console.log("Hiba a részletek betöltésekor:", error);
    }
}

document.addEventListener("click", function(e){
        if(e.target && e.target.matches("button[data-id]")){
            let id = e.target.getAttribute("data-id");
            rendelesReszletek(id);
        }
});

const szoveg=async()=>{
    try {
        let httpvalasz=await fetch("../../backend/szoveg/szoveg.php/szoveg")
        let adatok=await httpvalasz.json()
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg"]
            document.getElementById("szoveg4").innerHTML=adatok[26]["szoveg"]
            document.getElementById("szoveg5").innerHTML=adatok[27]["szoveg"]
            document.getElementById("szoveg6").innerHTML=adatok[28]["szoveg"]
            document.getElementById("regiJelszo").placeholder=adatok[29]["szoveg"]
            document.getElementById("ujJelszo").placeholder=adatok[30]["szoveg"]
            document.getElementById("btn_jMod").innerHTML=adatok[28]["szoveg"]
            document.getElementById("szoveg7").innerHTML=adatok[31]["szoveg"]
            document.getElementById("orszagMod").placeholder=adatok[32]["szoveg"]
            document.getElementById("irszMod").placeholder=adatok[33]["szoveg"]
            document.getElementById("varosMod").placeholder=adatok[34]["szoveg"]
            document.getElementById("utcaMod").placeholder=adatok[35]["szoveg"]
            if(document.getElementById("cimMod").value==adatok[36]["szoveg_en"] || document.getElementById("cimMod").value==adatok[36]["szoveg"]) {
               document.getElementById("cimMod").value=adatok[36]["szoveg"]
            } else {
                document.getElementById("cimMod").value=adatok[37]["szoveg"]
            }
            document.getElementById("szoveg8").innerHTML=adatok[38]["szoveg"]
            document.getElementById("szoveg9").innerHTML=adatok[39]["szoveg"]
            document.getElementById("szoveg10").innerHTML=adatok[19]["szoveg"]
            document.getElementById("szoveg11").innerHTML=adatok[40]["szoveg"]
            for (const statusz of document.querySelectorAll("#statusz")) {
                if(statusz.innerHTML==adatok[41]["szoveg"] || statusz.innerHTML==adatok[41]["szoveg_en"] )statusz.innerHTML=adatok[41]["szoveg"]
                if(statusz.innerHTML==adatok[42]["szoveg"] || statusz.innerHTML==adatok[42]["szoveg_en"] )statusz.innerHTML=adatok[42]["szoveg"];
                if(statusz.innerHTML==adatok[43]["szoveg"] || statusz.innerHTML==adatok[43]["szoveg_en"] )statusz.innerHTML=adatok[43]["szoveg"];
            }
            for (const rendelesGomb of document.querySelectorAll("#rendelesGomb")) {
                rendelesGomb.innerHTML=adatok[44]["szoveg"]
            }
            document.getElementById("szoveg12").innerHTML=adatok[45]["szoveg"]
            document.getElementById("szoveg13").innerHTML=adatok[46]["szoveg"]
            document.getElementById("szoveg14").innerHTML=adatok[47]["szoveg"]
            document.getElementById("szoveg15").innerHTML=adatok[48]["szoveg"]
            document.getElementById("szoveg16").innerHTML=adatok[49]["szoveg"]
            document.getElementById("kijelentkezes").value=adatok[50]["szoveg"]
            document.getElementById("szoveg17").innerHTML=adatok[71]["szoveg"]
            await kategoriChart()
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
        }
        else{
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
            document.getElementById("szoveg4").innerHTML=adatok[26]["szoveg_en"]
            document.getElementById("szoveg5").innerHTML=adatok[27]["szoveg_en"]
            document.getElementById("szoveg6").innerHTML=adatok[28]["szoveg_en"]
            document.getElementById("regiJelszo").placeholder=adatok[29]["szoveg_en"]
            document.getElementById("ujJelszo").placeholder=adatok[30]["szoveg_en"]
            document.getElementById("btn_jMod").innerHTML=adatok[28]["szoveg_en"]
            document.getElementById("szoveg7").innerHTML=adatok[31]["szoveg_en"]
            document.getElementById("orszagMod").placeholder=adatok[32]["szoveg_en"]
            document.getElementById("irszMod").placeholder=adatok[33]["szoveg_en"]
            document.getElementById("varosMod").placeholder=adatok[34]["szoveg_en"]
            document.getElementById("utcaMod").placeholder=adatok[35]["szoveg_en"]
            if(document.getElementById("cimMod").value==adatok[36]["szoveg_en"] || document.getElementById("cimMod").value==adatok[36]["szoveg"]) {
                document.getElementById("cimMod").value=adatok[36]["szoveg_en"]
            } else {
                document.getElementById("cimMod").value=adatok[37]["szoveg_en"]
            }
            document.getElementById("szoveg8").innerHTML=adatok[38]["szoveg_en"]
            document.getElementById("szoveg9").innerHTML=adatok[39]["szoveg_en"]
            document.getElementById("szoveg10").innerHTML=adatok[19]["szoveg_en"]
            document.getElementById("szoveg11").innerHTML=adatok[40]["szoveg_en"]
            for (const statusz of document.querySelectorAll("#statusz")) {
                if(statusz.innerHTML==adatok[41]["szoveg"] || statusz.innerHTML==adatok[41]["szoveg_en"] )statusz.innerHTML=adatok[41]["szoveg_en"]
                if(statusz.innerHTML==adatok[42]["szoveg"] || statusz.innerHTML==adatok[42]["szoveg_en"] )statusz.innerHTML=adatok[42]["szoveg_en"];
                if(statusz.innerHTML==adatok[43]["szoveg"] || statusz.innerHTML==adatok[43]["szoveg_en"] )statusz.innerHTML=adatok[43]["szoveg_en"];
            }
            for (const rendelesGomb of document.querySelectorAll("#rendelesGomb")) {
                rendelesGomb.innerHTML=adatok[44]["szoveg_en"]
            }
            document.getElementById("szoveg12").innerHTML=adatok[45]["szoveg_en"]
            document.getElementById("szoveg13").innerHTML=adatok[46]["szoveg_en"]
            document.getElementById("szoveg14").innerHTML=adatok[47]["szoveg_en"]
            document.getElementById("szoveg15").innerHTML=adatok[48]["szoveg_en"]
            document.getElementById("szoveg16").innerHTML=adatok[49]["szoveg_en"]
            document.getElementById("kijelentkezes").value=adatok[50]["szoveg_en"]
            document.getElementById("szoveg17").innerHTML=adatok[71]["szoveg_en"]
            await kategoriChart()
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

async function kategoriChart() {
    try {
        const canvas = document.getElementById('kategoriChart');
        if (!canvas) return;
        let auth = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`);
        let authAdat = await auth.json();
        let userNev = authAdat.felhasznalonev;
        let valasz = await fetch(`../../backend/felhasznalo/index.php/kategoriStat?nev=${userNev}`);
        let adat = await valasz.json();
        if (!adat || adat.length === 0) {
            console.warn("Nincs megjeleníthető adat a diagramhoz.");
            return;
        }
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu") var labels = adat.map(a => a.kategoria);
        else var labels = adat.map(a => a.kategoriaEn);
        const values = adat.map(a => a.szazalek);
        const ctx = canvas.getContext("2d");
        if (window.myChart instanceof Chart) {
            window.myChart.destroy();
        }
        window.myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: [
                        '#c09e44', 
                        '#3498db', 
                        '#e74c3c', 
                        '#2ecc71', 
                        '#f1c40f', 
                        '#9b59b6', 
                        '#1abc9c', 
                        '#e67e22', 
                        '#34495e',
                        '#7f8c8d'  
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            color: '#333'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Diagram hiba:", error);
    }
}

window.addEventListener("load", async () => {
    await kategoriChart();
});