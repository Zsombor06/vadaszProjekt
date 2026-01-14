const TermekKartyak = async () => {
    try {
        let httpResponse = await fetch("../../backend/kosar/kosarAdatok.php?felhasznalo=user1"); //user1 tesztadat
        if (!httpResponse.ok) {
            alert("Hiba a termékek lekérése során");
            return;
        }
        let httpAdat = await httpResponse.json();
        //console.log("httpAdat: " + Object.values(httpAdat));
        for (const termek of httpAdat.tetelek) {
            //console.log("termek: " + Object.values(termek));
            document.getElementById("KosarTartalom").innerHTML += `
            <li id="termek_${termek.termekId}">
                <span id="nevMezo_${termek.termekID}" >${termek.nev}</span>
                <button class="minusz" data-kosar-id="${termek.termekId}">−</button>
                <span class="mennyiseg" id="mennyiseg_${termek.termekId}">${termek.mennyiseg}</span>
                <button class="plusz" data-kosar-id="${termek.termekId}">+</button>
                <span id="arMezo_${termek.termekId}">${termek.mennyiseg * termek.ar} Ft</span>
                <button type="button" class="torlesGomb" data-id="${termek.termekId}"> Törlés </button>
            </li>
            `;
        }
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("plusz")) {
        console.log("Plusz:", e.target.dataset.kosarId);
    }
});
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("minusz")) {
        console.log("Minusz:", e.target.dataset.kosarId);
    }
});/*
document.getElementById("minusz").addEventListener("click", async (e) => {
    const id = e.target.dataset.kosarId;
    const mennyiseg = parseInt(document.getElementById(`mennyiseg_${id}`).innerText);
    if (mennyiseg > 1) {
        document.getElementById(`mennyiseg_${id}`).innerText = mennyiseg - 1;
        document.getElementById(`arMezo_${id}`).innerText = (mennyiseg - 1) * egysegar + " Ft";
        vegosszegSzamitas();
        try {
            let httpResponse = await fetch("../../backend/kosar/csokkenMenny.php", {
                body : JSON.stringify({
                    "id" : id
                })
            });
            if (httpResponse.ok) {
                let httpAdat = await httpResponse.json();
                console.log(httpAdat);
            } else {
                alert("Hiba a termékek mennyiségének csökkentése során");
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }
});

document.getElementById("plusz").addEventListener("click", async (e) => {
    const id = e.target.dataset.kosarId;
    const mennyiseg = parseInt(document.getElementById(`mennyiseg_${id}`).innerText);
    document.getElementById(`mennyiseg_${id}`).innerText = mennyiseg + 1;
    document.getElementById(`arMezo_${id}`).innerText = (mennyiseg + 1) * egysegar + " Ft";
    vegosszegSzamitas();
    try {
        let httpResponse = await fetch("../../backend/kosar/novelMenny.php", {
            body : JSON.stringify({
                "id" : id
            })
        });
        if (httpResponse.ok) {
            let httpAdat = await httpResponse.json();
            console.log(httpAdat);
        } else {
            alert("Hiba a termékek mennyiségének növelése során");
            return;
        }
    } catch (error) {
        console.error(error);
    }
});

document.addEventListener("change", (e) => {
    if (e.target.classList.contains("mennyisegMezo")) {
        const mennyiseg = parseInt(e.target.value);
        const egysegar = parseInt(e.target.dataset.egysegar);
        const termekId = e.target.dataset.id;
        const termekAr = mennyiseg * egysegar;
        document.getElementById(`arMezo_${termekId}`).innerText = termekAr + " Ft";
        vegosszegSzamitas();
    }
})

const vegosszegSzamitas = () => {
    let vegOsszeg = 0;
    document.querySelectorAll("[id^='arMezo_']").forEach(elem => {
        vegOsszeg += parseInt(elem.innerText);
    });
    document.getElementById("vegOsszeg").innerText = vegOsszeg + " Ft";
}

document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("torlesGomb")) return;
    const termekId = e.target.dataset.id;
    if (!confirm("Biztosan törlöd a terméket?")) return;
    try {
        let httpResponse = await fetch(``, {
            method: "DELETE" });
        let httpAdat = await httpResponse.json();
        if (httpResponse.ok) {
            e.target.closest("li").remove();
            vegosszegSzamitas();
        } else {
            console.error(httpAdat); //hibaüzenet
        }
    } catch (error) {
        console.error(error);
    }
});
window.addEventListener("load", vegosszegSzamitas);
*/
window.addEventListener("load", TermekKartyak);