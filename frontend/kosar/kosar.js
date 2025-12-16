let termeknev = "Nadrág";
let mennyiseg = 2;
let egysegar = 7999;

const TermekKartyak = async () => {
    try {
/*
        let httpResponse = await fetch("./test.php/test");
        let httpAdat = await httpResponse.json();
        if (httpResponse.ok) {
            console.log(httpAdat);
        }
*/
         //kellenek id-k, formázások, meg a php -- lista elem no decor
         for (let i = 1; i < 4; i++) { //for helyett forof --> i helyett termekId
             document.getElementById("KosarTartalom").innerHTML += `
             <li id="termek_${i}">
                 <span id="nevMezo_${i}" >${termeknev}</span>
                 <input type="number" min="1" value="${mennyiseg}" id="mennyisegMezo_${i}" class="mennyisegMezo" data-id="${i}" data-egysegar="${egysegar}"/>
                 <span id="arMezo_${i}">${mennyiseg * egysegar} Ft</span>
                 <button type="button" class="torlesGomb" data-id=""${i}"> Törlés </button>
             </li>
             `;
         }
    } catch (error) {
        console.log(error);
    }
}

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

window.addEventListener("load", TermekKartyak);
window.addEventListener("load", vegosszegSzamitas);