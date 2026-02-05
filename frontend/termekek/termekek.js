
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
            let httpValasz = await fetch(`../../backend/termekek/index.php/termekAdatok?kategoria=${kategoria}`);
            let termekek = await httpValasz.json();
            for (const termek of termekek) {
                const kartya = document.createElement('div');
                kartya.className = 'mb-4 col-sm-6 col-md-4 col-lg-3';
                if (termek.regiar == Math.round(termek.ujar, 0)) {
                    kartya.innerHTML = `
                        <div class="card h-100">
                            <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nev}">
                            <div class="card-body">
                                <h5 class="card-title">${termek.nev}</h5>
                                <p class="card-text">${termek.leiras}</p>
                                <small class="text-muted">Ár: ${termek.regiar} Ft</small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}">
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
                                <small class="text-muted">Leárazott ár: ${Math.round(termek.ujar, 0)} Ft</small>
                            </div>
                            <div class="card-footer">
                                <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}">
                            </div>
                        </div>
                    `;
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
            kartya.className = 'mb-4 col-sm-6 col-md-4 col-lg-3';
            if (termek.regiar == Math.round(termek.ujar, 0)) {
                kartya.innerHTML = `
                    <div class="card h-100">
                        <img src="${termek.kep}" class="card-img-top termek-kep" alt="${termek.nev}">
                        <div class="card-body">
                            <h5 class="card-title">${termek.nev}</h5>
                            <p class="card-text">${termek.leiras}</p>
                            <small class="text-muted">Ár: ${termek.regiar} Ft</small>
                        </div>
                        <div class="card-footer">
                            <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}">
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
                            <small class="text-muted">Leárazott ár: ${Math.round(termek.ujar, 0)} Ft</small>
                        </div>
                        <div class="card-footer">
                            <input type="button" class="kosarbaGomb" value="Kosárba" data-id="${termek.id}">
                        </div>
                    </div>
                `;
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
                alert('Termék hozzáadva a kosárhoz!');
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


