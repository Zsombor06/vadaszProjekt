const TermekKartyak = async () => {
    try {

        let httpResponse = await fetch("");
        if (httpResponse.ok) {
            let httpAdat = await httpResponse.json();
        }

        for (const termek of httpAdat) { //kellenek id-kformázások, meg a php -- lista elem no decor
            document.getElementById("KosarTartalom").innerHTML += `
            <li>
                <span class="product-name">${termek.termeknev}</span>
                <input type="number" min="1" value="${termek.mennyiseg}"/>
                <span>${termek.mennyiseg * termek.egysegar} Ft</span>
                <button type="button"> Törlés </button>
            </li>
            `
        }
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("load", TermekKartyak);