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
            //console.log("termek: " + Object.values(termek), termek.id);
            //<img src="${termek.kep}" alt="${termek.nev}" width="100" height="100">
            document.getElementById("KosarTartalom").innerHTML += `
            <li id="termek_${termek.id}" class="kosar-tetel"> 
                <div class="tetel-adatok">
                    <span class="termek-nev" id="nevMezo_${termek.id}" >${termek.nev}</span>
                    <div class="termek-menny">
                        <button type="button" class="minusz" data-kosar-id="${termek.id}">−</button>
                        <span class="mennyiseg" id="mennyiseg_${termek.id}">${termek.mennyiseg}</span>
                        <button type="button" class="plusz" data-kosar-id="${termek.id}">+</button>
                    </div>
                    <div class="termek-ar">
                        <span id="arMezo_${termek.id}" data-egysegar="${termek.ar}">${termek.mennyiseg * termek.ar} Ft</span>
                    </div>
                </div>
                <button type="button" class="torlesGomb" data-id="${termek.id}"> Törlés </button>
            </li>
            `;
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
    console.log("csokkentMennyiseg id: " + id);
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
    console.log("novelMennyiseg id: " + id);
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
/*
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