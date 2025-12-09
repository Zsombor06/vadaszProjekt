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
        }
    } catch (error) {
        console.error('Hiba a termékek lekérésekor:', error);
    }
});

termekKategoria.addEventListener('change', async () => {
    const termekKartyaMezo = document.getElementById('termekKartyaMezo');
    const selectedKategoria = termekKategoria.value;
    termekKartyaMezo.innerHTML = '';
    let httpValasz = await fetch(`../../backend/termekek/index.php/termekAdatok?kategoria=${selectedKategoria}`);
    let termekek = await httpValasz.json();
    for (const termek of termekek) {
        const kartya = document.createElement('div');
        kartya.className = 'col-md-4 mb-4';
        kartya.innerHTML = `
            <div class="card h-100">
                <img src="" class="card-img-top" alt="${termek.nev}">
                <div class="card-body">
                    <h5 class="card-title">${termek.nev}</h5>
                    <p class="card-text">${termek.leiras}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Alap ár: ${termek.regiar} Ft</small>
                    <small class="text-muted">Leárazás: ${Math.round(termek.ujar, 0)} Ft</small>
                </div>
            </div>
        `;
        termekKartyaMezo.appendChild(kartya);
    }
});