let osszesTermek = [];
let minAr = document.getElementById("minAr")
let maxAr = document.getElementById("maxAr")
let kereso = document.getElementById("kereso")
let akcios = document.getElementById("akcios")
let raktaron = document.getElementById("raktaron")
let termekKartyaMezo = document.getElementById("termekKartyaMezo");
let rendezes = document.getElementById("rendezes");

let euroArfolyam = null;
const arfolyam = async () => {
    try {
        let response = await fetch("../../backend/arfolyam.php");
        if (response.ok) {
            let data = await response.json();
            euroArfolyam = data['rate'];
        }
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener("load", arfolyam);

const termekekBetoltese = async (termekek) => {
    termekKartyaMezo.innerHTML = "";
    for (const termek of termekek) {
        const kartya = document.createElement('div');
        kartya.className = 'mb-4 col-sm-6 col-md-4 col-lg-3';
        await kategoriaKartya(kartya, termek);
        termekKartyaMezo.appendChild(kartya);
    }
    document.querySelectorAll(".kosarbaGomb").forEach(btn => {
        btn.addEventListener("click", Kosaraba);
    });
};

const termekSzures = (termekek) => {
    const min = parseInt(minAr.value) || 0;
    const max = parseInt(maxAr.value) || Infinity;
    const keresett = kereso.value.toLowerCase();
    const csakAkcios = akcios.checked;
    const csakRaktaron = raktaron.checked;
    const nyelv = localStorage.getItem("nyelv");

    const nevNyelv = nyelv === "en" ? "nevEn" : "nev";
    const leirasNyelv = nyelv === "en" ? "leirasEn" : "leiras";

    let eredmeny = termekek.filter(t => {
        const ar = nyelv === "en" ? Math.round(Math.round(t.ujar, 0) * euroArfolyam, 2) : Math.round(t.ujar, 0);
        const regiar = nyelv === "en" ? Math.round(Math.round(t.regiar, 0) * euroArfolyam, 2) : Math.round(t.regiar, 0);
        return (
            ar >= min &&
            ar <= max &&
            (!csakAkcios || regiar != ar) &&
            (!csakRaktaron || t.keszlet > 0) &&
            (
                t[nevNyelv].toLowerCase().includes(keresett) ||
                t[leirasNyelv].toLowerCase().includes(keresett)
            )
        );
    });
    if (rendezes.value === "arNovekvo") {
        eredmeny.sort((a, b) => a.ujar - b.ujar);
    }
    if (rendezes.value === "arCsokkeno") {
        eredmeny.sort((a, b) => b.ujar - a.ujar);
    }
    return eredmeny;
};

const frissites = async () => {
    const szurt = termekSzures(osszesTermek);
    if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu")document.getElementById("talalatokSzama").innerText = szurt.length > 0 ? `${szurt.length} találat` : "Nincs találat";
    else document.getElementById("talalatokSzama").innerText = szurt.length > 0 ? `${szurt.length} products found` : "No products found";
    await termekekBetoltese(szurt);
};

[minAr, maxAr, kereso, rendezes, akcios, raktaron].forEach(elem => {
    elem.addEventListener("input", frissites);
});

document.getElementById("szurokTorlese").addEventListener("click", () => {
    minAr.value = "";
    maxAr.value = "";
    kereso.value = "";
    akcios.checked = false;
    raktaron.checked = false;
    rendezes.value = "";
    frissites();
});

const kategoriaKartya = async (kartya, termek) => {
    try {
        let htmlBelso = "";
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            if (termek.keszlet == 0) {
                htmlBelso = `   <div class="card h-100 nincs-raktaron">`;
            } else {
                htmlBelso = `   <div class="card h-100">`;
            }
            htmlBelso += `          <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nev}">
                                    <div class="card-body">
                                        <h5 class="card-title">${termek.nev}</h5>
                                        <p class="card-text">${termek.leiras}</p>
                                        <div class="mt-auto"> `;
            if (termek.regiar != Math.round(termek.ujar, 0)) {
                htmlBelso += `              <small class="text-muted">Leárazott ár: ${Math.round(termek.ujar, 0)} Ft</small> <br> `;
            } else {
                htmlBelso += `              <small class="text-muted">Ár: ${termek.regiar} Ft</small> <br>`;
            }
            htmlBelso += `                  <small class="text-muted">Raktáron: ${termek.keszlet} db </small>                        
                                        </div>
                                    </div>
                                    <div class="card-footer">`;
            if (termek.keszlet == 0) {
                htmlBelso += `          <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}" disabled>
                                    </div>
                                </div>`;
            } else {
                htmlBelso += `          <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                                    </div>
                                </div>`;
            } 
        } else {
            if (termek.keszlet == 0) {
                htmlBelso = `   <div class="card h-100 nincs-raktaron">`;
            } else {
                htmlBelso = `   <div class="card h-100">`;
            }
            htmlBelso += `           <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nevEn}">
                                    <div class="card-body">
                                        <h5 class="card-title">${termek.nevEn}</h5>
                                        <p class="card-text">${termek.leirasEn}</p>
                                        <div class="mt-auto">`;
            if (termek.regiar != Math.round(termek.ujar, 0)) {
                htmlBelso += `              <small class="text-muted">Marked down price: ${Math.round(Math.round(termek.ujar, 0) * euroArfolyam, 2)} €</small> <br>`;
            } else {
                htmlBelso += `              <small class="text-muted">Price: ${Math.round(termek.regiar * euroArfolyam, 2)} €</small> <br>`;
            }
            htmlBelso += `                  <small class="text-muted">In store: ${termek.keszlet} </small>
                                        </div>    
                                    </div>
                                    <div class="card-footer">`
            if (termek.keszlet == 0) {
                htmlBelso += `          <input type="button" class="kosarbaGomb" value="To cart" data-id="${termek.id}" disabled>
                                    </div>
                                </div>`;
            } else {
                htmlBelso += `          <input type="button" class="kosarbaGomb" value="To cart" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                                    </div>
                                </div>`;
            }
        }
        kartya.innerHTML = htmlBelso;
        
    } catch (error) {
        console.log(error);
    }
}
const kategoriakBetoltese=async() => {
    const termekKategoria = document.getElementById('termekKategoria');
    termekKategoria.innerHTML='<option value="0">Minden termék</option>'
    termekKartyaMezo.innerHTML=""
    try {
        const httpValasz = await fetch('../../backend/navbar/index.php/kategoriakNeve');
        const kategoriak = await httpValasz.json(); 
        for (const kat of kategoriak) {
            const option = document.createElement('option');
            option.value = kat["id"];
            if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
                option.textContent = kat["kategoria"];
            } else {
                option.textContent = kat["kategoriaEn"];
            }
            termekKategoria.appendChild(option);
            if(kat["id"]==localStorage.getItem("kategoria")){
                option.selected=true
                localStorage.setItem("kategoriaId",kat["id"])
            }
        }
        if(localStorage.getItem("kategoria")){
            let kategoria=localStorage.getItem("kategoriaId")
            let httpValasz = await fetch(`../../backend/termekek/index.php/termekAdatok?kategoria=${kategoria}`);
            osszesTermek = await httpValasz.json();
            await frissites();
        }
    } catch (error) {
        console.error('Hiba a termékek lekérésekor:', error);
    }};
window.addEventListener('load',kategoriakBetoltese) 

termekKategoria.addEventListener('change', async () => {
    try {
        const selectedKategoria = termekKategoria.value;
        termekKartyaMezo.innerHTML = '';
        localStorage.setItem("kategoria", selectedKategoria);
        if (selectedKategoria != 0) {
            let httpValasz = await fetch(`../../backend/termekek/index.php/termekAdatok?kategoria=${selectedKategoria}`);
        } else {
            let httpValasz = await fetch(`../../backend/termekek/index.php/termekAdatokOsszes`); // Minden termék lekérése TODO backend
        }
        osszesTermek = await httpValasz.json();
        await frissites();
    } catch (error) {
        console.error(error);
    }
});

const Kosaraba = async (e) => {
    let id = e.target.getAttribute('data-id');
    console.log('Kosárba gomb kattintva, termék ID: ' + id);
    if(localStorage.getItem('token')) {
        let httpResponse = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`);
        if (httpResponse.ok) {
            let httpAdat = await httpResponse.json();
            httpResponse = await fetch('../../backend/termekek/index.php/kosarHozzaad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nev" : httpAdat["felhasznalonev"],
                    "termek": id
                })
            });
            if (httpResponse.ok) {
                let httpAdat = await httpResponse.json();
                console.log(httpAdat);
            } else {
                alert('Hiba történt a kosárhoz adás során.');
            }
        }
    } else {
        window.location.href="../bejelentkezes/bejelentkezes.html"
        return;
    }
}


document.getElementById("hozzaadasConfirm").addEventListener('click', (e) => {
    window.location.href="../kosar/kosar.html";
    return;
});
const szoveg=async()=>{
    try {
        let httpvalasz=await fetch("../../backend/szoveg/szoveg.php/szoveg")
        let adatok=await httpvalasz.json()
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg"]
            document.getElementById("hozzaadasModalLabel").innerHTML=adatok[7]["szoveg"]
            document.getElementById("szoveg4").innerHTML=adatok[8]["szoveg"]
            document.getElementById("szoveg5").innerHTML=adatok[9]["szoveg"]
            document.getElementById("hozzaadasConfirm").innerHTML=adatok[10]["szoveg"]
            document.getElementById("szoveg6").innerHTML=adatok[70]["szoveg"]
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
            document.getElementById("szoveg7").innerHTML=adatok[99]["szoveg"]
            document.getElementById("kereso").placeholder=adatok[102]["szoveg"]
            document.getElementById("szoveg8").innerHTML=adatok[100]["szoveg"]
            document.getElementById("szoveg9").innerHTML=adatok[101]["szoveg"]
            document.getElementById("szoveg10").innerHTML=adatok[103]["szoveg"]
            document.getElementById("szoveg11").innerHTML=adatok[104]["szoveg"]
            document.getElementById("szoveg12").innerHTML=adatok[105]["szoveg"]
            document.getElementById("szoveg13").innerHTML=adatok[106]["szoveg"]
            document.getElementById("szoveg14").innerHTML=adatok[107]["szoveg"]
            document.getElementById("szoveg15").innerHTML=adatok[108]["szoveg"]
            document.getElementById("szoveg16").innerHTML=adatok[111]["szoveg"]
            document.getElementById("szurokTorlese").innerHTML=adatok[112]["szoveg"]
            document.getElementById("termekGomb").innerHTML=adatok[113]["szoveg"]
        }
        else{
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
            document.getElementById("hozzaadasModalLabel").innerHTML=adatok[7]["szoveg_en"]
            document.getElementById("szoveg4").innerHTML=adatok[8]["szoveg_en"]
            document.getElementById("szoveg5").innerHTML=adatok[9]["szoveg_en"]
            document.getElementById("hozzaadasConfirm").innerHTML=adatok[10]["szoveg_en"]
            document.getElementById("szoveg6").innerHTML=adatok[70]["szoveg_en"]
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
            document.getElementById("szoveg6").innerHTML=adatok[70]["szoveg_en"]
            document.getElementById("szoveg7").innerHTML=adatok[99]["szoveg_en"]
            document.getElementById("kereso").placeholder=adatok[102]["szoveg_en"]
            document.getElementById("szoveg8").innerHTML=adatok[100]["szoveg_en"]
            document.getElementById("szoveg9").innerHTML=adatok[101]["szoveg_en"]
            document.getElementById("szoveg10").innerHTML=adatok[103]["szoveg_en"]
            document.getElementById("szoveg11").innerHTML=adatok[104]["szoveg_en"]
            document.getElementById("szoveg12").innerHTML=adatok[105]["szoveg_en"]
            document.getElementById("szoveg13").innerHTML=adatok[106]["szoveg_en"]
            document.getElementById("szoveg14").innerHTML=adatok[107]["szoveg_en"]
            document.getElementById("szoveg15").innerHTML=adatok[108]["szoveg_en"]
            document.getElementById("szoveg16").innerHTML=adatok[111]["szoveg_en"]
            document.getElementById("szurokTorlese").innerHTML=adatok[112]["szoveg_en"]
            document.getElementById("termekGomb").innerHTML=adatok[113]["szoveg_en"]
        }
    } catch (error) {
        console.log(error)
    }
}
window.addEventListener("load",szoveg)
const beallitMagyar=()=>{
    localStorage.setItem("nyelv","hu")
    szoveg()
    kategoriakBetoltese()
}
document.getElementById("magyar").addEventListener("click",beallitMagyar)
const beallitAngol=()=>{
    localStorage.setItem("nyelv","en")
    szoveg()
    kategoriakBetoltese()
}
document.getElementById("angol").addEventListener("click",beallitAngol)