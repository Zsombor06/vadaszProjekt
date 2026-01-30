
window.addEventListener('load', async () => {
    const termekKategoria = document.getElementById('termekKategoria');
    try {
        const httpValasz = await fetch('../../backend/navbar/index.php/kategoriakNeve');
        const kategoriak = await httpValasz.json(); 
        for (const kat of kategoriak) {
            const option = document.createElement('option');
            option.value = kat["id"];
            option.textContent = kat["kategoria"];
            termekKategoria.appendChild(option);
            if(kat["kategoria"]==localStorage.getItem("kategoria")){
                option.selected=true
                localStorage.setItem("kategoriaId",kat["id"])
            }
        }
    
    
    if(localStorage.getItem("kategoria")){
        let kategoria=localStorage.getItem("kategoriaId")
        console.log(kategoria)
        let httpValasz = await fetch(`../../backend/termekek/index.php/termekAdatok?kategoria=${kategoria}`);
        let termekek = await httpValasz.json();
        for (const termek of termekek) {
            const kartya = document.createElement('div');
            kartya.className = 'col-md-4 mb-4';
            if (termek.regiar == Math.round(termek.ujar, 0)) {
                kartya.innerHTML = `
                    <div class="card h-100">
                        <img src="" class="card-img-top" alt="${termek.nev}">
                        <div class="card-body">
                            <h5 class="card-title">${termek.nev}</h5>
                            <p class="card-text">${termek.leiras}</p>
                            <small class="text-muted">Ár: ${termek.regiar} Ft</small>
                        </div>
                        <div class="card-footer">
                            <input type="button" onClick="${Kosaraba(termek.id)}" value="Kosárba">
                        </div>
                    </div>
                `;
            } else {
                kartya.innerHTML = `
                    <div class="card h-100">
                        <img src="" class="card-img-top" alt="${termek.nev}">
                        <div class="card-body">
                            <h5 class="card-title">${termek.nev}</h5>
                            <p class="card-text">${termek.leiras}</p>
                            <small class="text-muted">Leárazott ár: ${Math.round(termek.ujar, 0)} Ft</small>
                        </div>
                        <div class="card-footer">
                            <input type="button" onClick="${Kosaraba(termek.id)}" value="Kosárba">
                        </div>
                    </div>
                `;
                }
            termekKartyaMezo.appendChild(kartya);
        }
    }}
     catch (error) {
        console.error('Hiba a termékek lekérésekor:', error);
}});

termekKategoria.addEventListener('change', async () => {
    try {
        const termekKartyaMezo = document.getElementById('termekKartyaMezo');
        const selectedKategoria = termekKategoria.value;
        termekKartyaMezo.innerHTML = '';
        let httpValasz = await fetch(`../../backend/termekek/index.php/termekAdatok?kategoria=${selectedKategoria}`);
        let termekek = await httpValasz.json();
        for (const termek of termekek) {
            const kartya = document.createElement('div');
            kartya.className = 'col-md-4 mb-4';
            if (termek.regiar == Math.round(termek.ujar, 0)) {
                kartya.innerHTML = `
                    <div class="card h-100">
                        <img src="" class="card-img-top" alt="${termek.nev}">
                        <div class="card-body">
                            <h5 class="card-title">${termek.nev}</h5>
                            <p class="card-text">${termek.leiras}</p>
                            <small class="text-muted">Ár: ${termek.regiar} Ft</small>
                        </div>
                        <div class="card-footer">
                            <input type="button" onClick="${Kosaraba(termek.id)}" value="Kosárba">
                        </div>
                    </div>
                `;
            } else {
                kartya.innerHTML = `
                    <div class="card h-100">
                        <img src="" class="card-img-top" alt="${termek.nev}">
                        <div class="card-body">
                            <h5 class="card-title">${termek.nev}</h5>
                            <p class="card-text">${termek.leiras}</p>
                            <small class="text-muted">Leárazott ár: ${Math.round(termek.ujar, 0)} Ft</small>
                        </div>
                        <div class="card-footer">
                            <input type="button" onClick="${Kosaraba(termek.id)}" value="Kosárba">
                        </div>
                    </div>
                `;
                }
            termekKartyaMezo.appendChild(kartya);
        }
    } catch (error) {
        console.error(error);
    }
});

const Kosaraba = async (termekID) => {
    try { //fnev, termekID
        let felhasznaloNev = "user1"; //példa felhasználónév
        let httpValasz = await fetch(`../../backend/termekek/index.php/kosarHozzaad`, {
            method: 'POST',
            body: JSON.stringify({
                nev : felhasznaloNev,
                termek : termekID
            }),
        });
        let eredmeny = await httpValasz.json();
        console.log(eredmeny.valasz);
    } catch (error) {
        console.error(error);
    }
}