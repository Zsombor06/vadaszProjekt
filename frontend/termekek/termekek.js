
const kategoriakBetoltese=async() => {
    const termekKategoria = document.getElementById('termekKategoria');
    termekKategoria.innerHTML=""
    termekKartyaMezo.innerHTML=""
    try {
        const httpValasz = await fetch('../../backend/navbar/index.php/kategoriakNeve');
        const kategoriak = await httpValasz.json(); 
        for (const kat of kategoriak) {
            const option = document.createElement('option');
            option.value = kat["id"];
            if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            option.textContent = kat["kategoria"];
            }
            else{
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
            let termekek = await httpValasz.json();
            for (const termek of termekek) {
                const kartya = document.createElement('div');
                kartya.className = 'mb-4 col-sm-6 col-md-4 col-lg-3';
                if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
                if (termek.regiar == Math.round(termek.ujar, 0)) {
                    kartya.innerHTML = `
                        <div class="card h-100">
                            <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nev}">
                            <div class="card-body">
                                <h5 class="card-title">${termek.nev}</h5>
                                <p class="card-text">${termek.leiras}</p>
                                <small class="text-muted">Ár: ${termek.regiar} Ft</small> <br>
                                <small class="text-muted">Raktáron: ${termek.keszlet} db </small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                            </div>
                        </div>
                    `;
                } else {
                    kartya.innerHTML = `
                        <div class="card h-100">
                            <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nev}">
                            <div class="card-body">
                                <h5 class="card-title">${termek.nev}</h5>
                                <p class="card-text">${termek.leiras}</p>
                                <small class="text-muted">Leárazott ár: ${Math.round(termek.ujar, 0)} Ft</small> <br>
                                <small class="text-muted">Raktáron: ${termek.keszlet} db </small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                            </div>
                        </div>
                    `;
                }}
                else{
                    if (termek.regiar == Math.round(termek.ujar, 0)) {
                    kartya.innerHTML = `
                        <div class="card h-100">
                            <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nevEn}">
                            <div class="card-body">
                                <h5 class="card-title">${termek.nevEn}</h5>
                                <p class="card-text">${termek.leirasEn}</p>
                                <small class="text-muted">Price: ${termek.regiar} Ft</small> <br>
                                <small class="text-muted">In store: ${termek.keszlet} </small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="To cart" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                            </div>
                        </div>
                    `;
                } else {
                    kartya.innerHTML = `
                        <div class="card h-100">
                            <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nev}">
                            <div class="card-body">
                                <h5 class="card-title">${termek.nevEn}</h5>
                                <p class="card-text">${termek.leirasEn}</p>
                                <small class="text-muted">Marked down price: ${Math.round(termek.ujar, 0)} Ft</small> <br>
                                <small class="text-muted">In store: ${termek.keszlet} </small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="To cart" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                            </div>
                        </div>
                    `;
                }
                }
                termekKartyaMezo.appendChild(kartya);
            }
        }
        document.querySelectorAll(".kosarbaGomb").forEach(btn => {
          btn.addEventListener("click", async (e) => {
            await Kosaraba(e);
          });
        });
    } catch (error) {
        console.error('Hiba a termékek lekérésekor:', error);
    }};
window.addEventListener('load',kategoriakBetoltese) 

termekKategoria.addEventListener('change', async () => {
    try {
        const termekKartyaMezo = document.getElementById('termekKartyaMezo');
        const selectedKategoria = termekKategoria.value;
        termekKartyaMezo.innerHTML = '';
        let httpValasz = await fetch(`../../backend/termekek/index.php/termekAdatok?kategoria=${selectedKategoria}`);
        let termekek = await httpValasz.json();
        for (const termek of termekek) {
            const kartya = document.createElement('div');
                kartya.className = 'mb-4 col-sm-6 col-md-4 col-lg-3';
                if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
                if (termek.regiar == Math.round(termek.ujar, 0)) {
                    kartya.innerHTML = `
                        <div class="card h-100">
                            <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nev}">
                            <div class="card-body">
                                <h5 class="card-title">${termek.nev}</h5>
                                <p class="card-text">${termek.leiras}</p>
                                <small class="text-muted">Ár: ${termek.regiar} Ft</small> <br>
                                <small class="text-muted">Raktáron: ${termek.keszlet} </small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                            </div>
                        </div>
                    `;
                } else {
                    kartya.innerHTML = `
                        <div class="card h-100">
                            <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nev}">
                            <div class="card-body">
                                <h5 class="card-title">${termek.nev}</h5>
                                <p class="card-text">${termek.leiras}</p>
                                <small class="text-muted">Leárazott ár: ${Math.round(termek.ujar, 0)} Ft</small> <br>
                                <small class="text-muted">Raktáron: ${termek.keszlet} </small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                            </div>
                        </div>
                    `;
                }}
                else{
                    if (termek.regiar == Math.round(termek.ujar, 0)) {
                    kartya.innerHTML = `
                        <div class="card h-100">
                            <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nevEn}">
                            <div class="card-body">
                                <h5 class="card-title">${termek.nevEn}</h5>
                                <p class="card-text">${termek.leirasEn}</p>
                                <small class="text-muted">Price: ${termek.regiar} Ft</small> <br>
                                <small class="text-muted">In store: ${termek.keszlet} </small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="To cart" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                            </div>
                        </div>
                    `;
                } else {
                    kartya.innerHTML = `
                        <div class="card h-100">
                            <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nev}">
                            <div class="card-body">
                                <h5 class="card-title">${termek.nevEn}</h5>
                                <p class="card-text">${termek.leirasEn}</p>
                                <small class="text-muted">Marked down price: ${Math.round(termek.ujar, 0)} Ft</small> <br>
                                <small class="text-muted">In store: ${termek.keszlet} </small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="To cart" data-id="${termek.id}" data-bs-toggle="modal" data-bs-target="#hozzaadasModal">
                            </div>
                        </div>
                    `;
                }
                }
                termekKartyaMezo.appendChild(kartya);
        }
        document.querySelectorAll(".kosarbaGomb").forEach(btn => {
          btn.addEventListener("click", async (e) => {
            await Kosaraba(e);
          });
        });
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


        }
        else{
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
            document.getElementById("hozzaadasModalLabel").innerHTML=adatok[7]["szoveg_en"]
            document.getElementById("szoveg4").innerHTML=adatok[8]["szoveg_en"]
            document.getElementById("szoveg5").innerHTML=adatok[9]["szoveg_en"]
            document.getElementById("hozzaadasConfirm").innerHTML=adatok[10]["szoveg_en"]
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