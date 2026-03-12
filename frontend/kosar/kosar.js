const TermekKartyak = async () => {
    try {
        let httpResponse = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
        let httpAdat = await httpResponse.json();
        httpResponse = await fetch(`../../backend/kosar/kosarAdatok.php?felhasznalo=${httpAdat["felhasznalonev"]}`); //user1 tesztadat
        if (!httpResponse.ok) {
            alert("Hiba a termékek lekérése során");
            return;
        }
        httpAdat = await httpResponse.json();
        document.getElementById("KosarTartalom").innerHTML=""
        //console.log("httpAdat: " + Object.values(httpAdat));
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
        if (httpAdat.tetelek.length === 0) {
            document.getElementById("KosarTartalom").innerHTML =
                "<li>A kosarad üres.</li>";
            return;
        }
        for (const termek of httpAdat.tetelek) {
            //console.log("termek: " + Object.values(termek), termek.id);
            //<img src="${termek.kep}" alt="${termek.nev}" width="100" height="100">
            document.getElementById("KosarTartalom").innerHTML += `
            <li id="termek_${termek.id}" class="kosar-tetel"> 
                <div class="d-flex gap-3 align-items-center">
                    <div class="termek-kep">
                        <img class="termek-kep" src="${termek.kep}" alt="${termek.nev}">
                    </div>
                    <div class="tetel-adatok flex-grow-1">
                        <span class="termek-nev mb-2" id="nevMezo_${termek.id}" >${termek.nev}</span>
                        <div class="d-flex align-items-center gap-3 flex-wrap mt-2">
                            <div class="termek-menny input-group input-group-sm" style="width: 120px;">
                                <button type="button" class="minusz input-group-text btn btn-outline-secondary" data-kosar-id="${termek.id}">−</button>
                                <span class="mennyiseg form-control text-center" id="mennyiseg_${termek.id}">${termek.mennyiseg}</span>
                                <button type="button" class="plusz input-group-text btn btn-outline-secondary" data-kosar-id="${termek.id}">+</button>
                            </div>
                            <div class="fw-bold text-nowrap fs-6 termek-ar">
                                <span id="arMezo_${termek.id}" data-egysegar="${termek.ar}">${termek.mennyiseg * termek.ar} Ft</span>
                            </div>
                            <button type="button" class="torlesGomb btn btn-danger btn-sm px-2" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#torlesModal"> Törlés </button>
                        </div>
                    </div>
                </div>
            </li>
            `;
        }}
        else{
            if (httpAdat.tetelek.length === 0) {
            document.getElementById("KosarTartalom").innerHTML =
                "<li>Your cart is empty.</li>";
            return;
        }
        for (const termek of httpAdat.tetelek) {
            //console.log("termek: " + Object.values(termek), termek.id);
            //<img src="${termek.kep}" alt="${termek.nev}" width="100" height="100">
            document.getElementById("KosarTartalom").innerHTML += `
            <li id="termek_${termek.id}" class="kosar-tetel"> 
                <div class="d-flex gap-3 align-items-center">
                    <div class="termek-kep">
                        <img class="termek-kep" src="${termek.kep}" alt="${termek.nevEn}">
                    </div>
                    <div class="tetel-adatok flex-grow-1">
                        <span class="termek-nev mb-2" id="nevMezo_${termek.id}" >${termek.nevEn}</span>
                        <div class="d-flex align-items-center gap-3 flex-wrap mt-2">
                            <div class="termek-menny input-group input-group-sm" style="width: 120px;">
                                <button type="button" class="minusz input-group-text btn btn-outline-secondary" data-kosar-id="${termek.id}">−</button>
                                <span class="mennyiseg form-control text-center" id="mennyiseg_${termek.id}">${termek.mennyiseg}</span>
                                <button type="button" class="plusz input-group-text btn btn-outline-secondary" data-kosar-id="${termek.id}">+</button>
                            </div>
                            <div class="fw-bold text-nowrap fs-6 termek-ar">
                                <span id="arMezo_${termek.id}" data-egysegar="${termek.ar}">${termek.mennyiseg * termek.ar} Ft</span>
                            </div>
                            <button type="button" class="torlesGomb btn btn-danger btn-sm px-2" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#torlesModal"> Delete </button>
                        </div>
                    </div>
                </div>
            </li>
            `;
        }
        }
        vegosszegSzamitas();
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("KosarTartalom").addEventListener("click", (e) => {
    if (e.target.classList.contains("minusz")) {
        csokkentMennyiseg(e.target.dataset.kosarId);
    }

    if (e.target.classList.contains("plusz")) {
        novelMennyiseg(e.target.dataset.kosarId);
    }
});
const csokkentMennyiseg = async (id) => {
    try {
        const response = await fetch("../../backend/kosar/csokkenMenny.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "id" : id })
        });

        if (!response.ok) {
            alert("Hiba a csökkentésnél");
            return;
        }

        const adat = await response.json();
        const mennyisegSpan = document.getElementById(`mennyiseg_${id}`);
        let aktualis = parseInt(mennyisegSpan.innerText);
        if (aktualis > 1) {
            aktualis--;
            mennyisegSpan.innerText = aktualis;
            const ar = parseInt(
                document.getElementById(`arMezo_${id}`).dataset.egysegar
            );
            document.getElementById(`arMezo_${id}`).innerText =
                `${aktualis * ar} Ft`;
            vegosszegSzamitas();
        }
    } catch (err) {
        console.error(err);
    }
};

const novelMennyiseg = async (id) => {
    try {
        const response = await fetch("../../backend/kosar/novelMenny.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "id" : id })
        });

        if (!response.ok) {
            alert("Hiba a növelésnél");
            return;
        }

        const adat = await response.json();
        const mennyisegSpan = document.getElementById(`mennyiseg_${id}`);
        let aktualis = parseInt(mennyisegSpan.innerText);
        if (aktualis < 100) {
            aktualis++;
            mennyisegSpan.innerText = aktualis;
            const ar = parseInt(
                document.getElementById(`arMezo_${id}`).dataset.egysegar
            );
            document.getElementById(`arMezo_${id}`).innerText =
                `${aktualis * ar} Ft`;
            vegosszegSzamitas();
        }
    } catch (err) {
        console.error(err);
    }
};

const vegosszegSzamitas = () => {
    let vegosszeg = 0;
    document.querySelectorAll("#KosarTartalom li").forEach(li => {
        const mennyiseg = parseInt(
            li.querySelector(".mennyiseg").innerText
        );
        const egysegar = parseInt(
            li.querySelector("[data-egysegar]").dataset.egysegar
        );
        vegosszeg += mennyiseg * egysegar;
    });
    document.getElementById("vegosszeg").innerText =
        `${vegosszeg} Ft`;
}

const tetelTorles = async (Tid) => {
    try {
        const httpValasz = await fetch("../../backend/kosar/tetelTorles.php", { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "id": Tid })
        });
        let httpAdat = await httpValasz.json();
        if (httpValasz.ok) {
            document.getElementById(`termek_${Tid}`).remove();
            document.getElementById("modalHibaMezo").innerText = httpAdat.uzenet;
            vegosszegSzamitas();
        } else {
            console.error(httpAdat.hiba);
            document.getElementById("modalHibaMezo").innerText = httpAdat.hiba;
        }
    }   catch (err) {
        console.error(err);
        document.getElementById("modalHibaMezo").innerText = "Hiba történt a törlés során!";
    }
}
document.getElementById("torlesModal").addEventListener("show.bs.modal", function (e) {
    const button = e.relatedTarget;
    const Tid = button.getAttribute("data-id");
    document.getElementById("torlesConfirm").setAttribute("data-id", Tid);
});
document.getElementById("torlesConfirm").addEventListener("click", (e) => {
    const Tid = e.target.dataset.id;
    tetelTorles(Tid);
});

window.addEventListener("load", TermekKartyak);
window.addEventListener("load", async () => { //szallitasi cimek
   
        let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
        let httpAdat = await httpValasz.json();
        let userNev = httpAdat["felhasznalonev"];
         httpValasz = await fetch(`../../backend/felhasznalo/index.php/szallitasiCimek?nev=${userNev}`); //felhasznalo nevet at kell adni
        httpAdat = await httpValasz.json();
        for (const cim of httpAdat) {
            document.getElementById("szCimMezo").innerHTML += `<option value="${cim.id}">${cim.orszag}, ${cim.iranyitoszam} ${cim.varos}, ${cim.utca}</option>`;
        }
});
document.getElementById("fizetesGomb").addEventListener("click", () => {
    document.getElementById("fizetesConfirm").disabled = false;
    document.getElementById("FmodalHibaMezo").innerText = "";
    if(document.getElementById("szCimMezo").value==0){
        document.getElementById("FmodalHibaMezo").innerText = "Kérem válasszon szállítási címet!"
        document.getElementById("fizetesConfirm").disabled = true;
        return;
    }
    if(document.getElementById("fizModMezo").value==0){
        document.getElementById("FmodalHibaMezo").innerText = "Kérem válasszon fizetési módot!"
        document.getElementById("fizetesConfirm").disabled = true;
        return;
    }
})

document.getElementById("fizetesConfirm").addEventListener("click",async()=>{
    try {
        let httpResponse = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
        let httpAdat = await httpResponse.json();
        console.log(httpAdat["felhasznalonev"])
         httpResponse=await fetch('../../backend/kosar/kosarFizetes.php',{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "felhasznalo" : httpAdat["felhasznalonev"],
                "szallitasId":document.getElementById("szCimMezo").value
             })
        })
        httpAdat=await httpResponse.json()
        console.log(httpAdat)
    } catch (error) {
        console.log(error)
    }
})
const szoveg=async()=>{
    try {
        let httpvalasz=await fetch("../../backend/szoveg/szoveg.php/szoveg")
        let adatok=await httpvalasz.json()
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg"]
            document.getElementById("szoveg4").innerHTML=adatok[16]["szoveg"]
            document.getElementById("szoveg5").innerHTML=adatok[17]["szoveg"]
            document.getElementById("szoveg6").innerHTML=adatok[18]["szoveg"]
            document.getElementById("szoveg7").innerHTML=adatok[19]["szoveg"]
            document.getElementById("szoveg8").innerHTML=adatok[20]["szoveg"]
            document.getElementById("fizetesGomb").innerHTML=adatok[21]["szoveg"]
            document.getElementById("torlesModalLabel").innerHTML=adatok[22]["szoveg"]
            document.getElementById("szoveg9").innerHTML=adatok[23]["szoveg"]
            document.getElementById("szoveg10").innerHTML=adatok[24]["szoveg"]
            document.getElementById("torlesConfirm").innerHTML=adatok[25]["szoveg"]
     TermekKartyak()
        }
        else{
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
            document.getElementById("szoveg4").innerHTML=adatok[16]["szoveg_en"]
            document.getElementById("szoveg5").innerHTML=adatok[17]["szoveg_en"]
            document.getElementById("szoveg6").innerHTML=adatok[18]["szoveg_en"]
            document.getElementById("szoveg7").innerHTML=adatok[19]["szoveg_en"]
            document.getElementById("szoveg8").innerHTML=adatok[20]["szoveg_en"]
            document.getElementById("fizetesGomb").innerHTML=adatok[21]["szoveg_en"]
            document.getElementById("torlesModalLabel").innerHTML=adatok[22]["szoveg_en"]
            document.getElementById("szoveg9").innerHTML=adatok[23]["szoveg_en"]
            document.getElementById("szoveg10").innerHTML=adatok[24]["szoveg_en"]
            document.getElementById("torlesConfirm").innerHTML=adatok[25]["szoveg_en"]
TermekKartyak()
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