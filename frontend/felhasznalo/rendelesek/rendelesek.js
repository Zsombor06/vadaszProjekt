fetch("http://localhost/backend/rendelesHistory.php?felhasznalo=user1")
    .then(res => res.json())
    .then(data => {
        const tabla = document.getElementById("rendelesLista");
        tabla.innerHTML = "";

        data.rendelesek.forEach(r => {
            let statusClass = "status-feldolgozas";
            let statusText = "Feldolgozás alatt";

            if (r.teljesitve) {
                statusClass = "status-teljesitve";
                statusText = "Teljesítve";
            } else if (r.elkuldve) {
                statusClass = "status-elkuldve";
                statusText = "Elküldve";
            }

            tabla.innerHTML += `
                <tr>
                    <td>#${r.rendelesId}</td>
                    <td>${r.fizetesIdeje ?? "-"}</td>        
                    <td>${r.vegosszeg} Ft</td>
                    <td>
                        <span class="status-badge ${statusClass}">
                            ${statusText}
                        </span>
                    </td>
                    <td>
                        <a href="rendeles_reszletek.html?rendelesId=${r.rendelesId}"
                           class="btn btn-sm btn-primary">
                           Részletek
                        </a>
                    </td>
                </tr>
            `;
        });
    });

