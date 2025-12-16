let termeknev = "Nadrág";
let mennyiseg = 2;
let egysegar = 7999;

const TermekKartyak = async () => {
    try {
        let httpResponse = await fetch("./test.php/test");
        if (httpResponse.ok) {
            let httpAdat = await httpResponse.json();
        } else {
            alert("Hiba a termékek lekérése során");
            return;
        }
        for (const termek of httpAdat) {
            console.log(termek);
        }/*
         //kellenek id-k, formázások, meg a php -- lista elem no decor
        for (let i = 1; i < 4; i++) { //for helyett forof --> i helyett termekId
            document.getElementById("KosarTartalom").innerHTML += `
            <li id="termek_${i}">
                <span id="nevMezo_${i}" >${termeknev}</span>
                <button id="minusz" data-kosar-id="${i}">−</button>
                <span class="mennyiseg" id="mennyiseg_${i}">${mennyiseg}</span>
                <button id="plusz" data-kosar-id="${i}">+</button>
                <span id="arMezo_${i}">${mennyiseg * egysegar} Ft</span>
                <button type="button" class="torlesGomb" data-id=""${i}"> Törlés </button>
            </li>
            `;
        }*/
    } catch (error) {
        console.log(error);
    }
}
/*
document.getElementById("minusz").addEventListener("click", (e) => {
    const id = e.target.dataset.kosarId;
    const mennyiseg = parseInt(document.getElementById(`mennyiseg_${id}`).innerText);
    if (mennyiseg > 1) {
        document.getElementById(`mennyiseg_${id}`).innerText = mennyiseg - 1;
        document.getElementById(`arMezo_${id}`).innerText = (mennyiseg - 1) * egysegar + " Ft";
        vegosszegSzamitas();
    }
});

document.getElementById("plusz").addEventListener("click", (e) => {
    const id = e.target.dataset.kosarId;
    const mennyiseg = parseInt(document.getElementById(`mennyiseg_${id}`).innerText);
    document.getElementById(`mennyiseg_${id}`).innerText = mennyiseg + 1;
    document.getElementById(`arMezo_${id}`).innerText = (mennyiseg + 1) * egysegar + " Ft";
    vegosszegSzamitas();
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
        let httpResponse = await fetch(`./test.php/delete?id=${termekId}`, { //id --> termekId
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
*/
window.addEventListener("load", TermekKartyak);
//window.addEventListener("load", vegosszegSzamitas);