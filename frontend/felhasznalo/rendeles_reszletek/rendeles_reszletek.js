const params = new URLSearchParams(window.location.search);
const rendelesId = params.get("rendelesId");

async function reszletekBetolt() {
    const res = await fetch(
        `../../backend/rendelesReszletek.php?rendelesId=${rendelesId}`
    );
    const data = await res.json();

    let osszeg = 0;
    const tbody = document.getElementById("tetelLista");
    tbody.innerHTML = "";

    data.tetelek.forEach(t => {
        osszeg += parseInt(t.reszosszeg);
        tbody.innerHTML += `
            <tr>
                <td>${t.nev}</td>
                <td>${t.ar} Ft</td>
                <td>${t.mennyiseg}</td>
                <td>${t.reszosszeg} Ft</td>
            </tr>
        `;
    });

    document.getElementById("vegosszeg").innerText = osszeg;
    
}

window.addEventListener("load", reszletekBetolt);
