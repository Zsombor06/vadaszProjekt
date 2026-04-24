var kategoriaSelect=document.getElementById("termekKategoria")
var kategorialearazSelect=document.getElementById("learazasKategoria")
var termeklearazasSelect=document.getElementById("learazasTermek")
var learazasMerteke=document.getElementById("learazasMertek")
var tabla=document.getElementById("tabla")
var valasztottSor = null;

const selectFeltoltes = async () => {
    let httpvalasz=await fetch("../../backend/dolgozo/index.php/kategoriakNeve")
    let adatok=await httpvalasz.json()
    kategorialearazSelect.innerHTML=""
    for (const adat of adatok) {
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            kategorialearazSelect.innerHTML+=`<option value=${adat["id"]}>${adat["kategoria"]}</option>`
            kategoriaSelect.innerHTML+=`<option value=${adat["id"]}>${adat["kategoria"]}</option>`
        } else {
            kategorialearazSelect.innerHTML+=`<option value=${adat["id"]}>${adat["kategoriaEn"]}</option>`
            kategoriaSelect.innerHTML+=`<option value=${adat["id"]}>${adat["kategoriaEn"]}</option>`
        }
    }
    httpvalasz=await fetch("../../backend/dolgozo/index.php/learazasokMerteke")
    adatok=await httpvalasz.json()
    learazasMerteke.innerHTML = ""
    for (const adat of adatok) {
        learazasMerteke.innerHTML+=`<option value=${adat["id"]}>${adat["LearazasMerteke"]}%</option>`
    }
    httpvalasz=await fetch(`../../backend/dolgozo/index.php/termekNeve?kategoriaId=${kategorialearazSelect.value}`)
    adatok=await httpvalasz.json()
    if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu")termeklearazasSelect.innerHTML="<option value='0'>Összes</option>"
    else termeklearazasSelect.innerHTML="<option value='0'>All</option>"
    for (const adat of adatok) {
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            termeklearazasSelect.innerHTML+=`<option value=${adat["id"]}>${adat["nev"]}</option>`
        }
        else{
            termeklearazasSelect.innerHTML+=`<option value=${adat["id"]}>${adat["nevEn"]}</option>`
        }
    }
    httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesekAdatai`)
    adatok=await httpvalasz.json()
    tabla.innerHTML=""
    for (const adat of adatok) {
        let httpValasz2=await fetch(`../../backend/dolgozo/index.php/rendelesiCim?szallitasId=${adat.szallitasId}`)
        let adat2=await httpValasz2.json()
        let sor=tabla.insertRow()
        let cell1=sor.insertCell()
        let cell2=sor.insertCell()
        let cell3=sor.insertCell()
        let cell4=sor.insertCell()
        let cell6=sor.insertCell()
        cell1.innerHTML=adat.felhasznalo
        cell2.innerHTML=adat.id
        cell3.innerHTML=adat.fizetesIdeje
        if(adat.elkuldve==null){
            cell4.innerHTML="0000-00-00"
        } else {
            cell4.innerHTML=adat.elkuldve
        } 
        cell6.innerHTML=`${adat2.orszag}, ${adat2.iranyitoszam} ${adat2.varos}, ${adat2.utca}`  
    }
}
document.getElementById("Kijelentkezes").addEventListener("click",()=>{
    localStorage.removeItem('token')
    window.location.href="../fooldal/fooldal.html"
})
const termekSelectFeltoltes = async () => {
    let httpvalasz=await fetch(`../../backend/dolgozo/index.php/termekNeve?kategoriaId=${kategorialearazSelect.value}`)
    let adatok=await httpvalasz.json()
    termeklearazasSelect.innerHTML="<option value=0>Összes</option>"
    for (const adat of adatok) {
        termeklearazasSelect.innerHTML+=`<option value=${adat["id"]}>${adat["nev"]}</option>`
    }
}
const termekFeltolt = async () => {
        if(document.getElementById("termekKep").files[0]==undefined){
            document.getElementById("termekEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("termekEredmeny").innerHTML="Hiányzó adatok"
        }
        let httpvalasz=await fetch(`../../backend/dolgozo/index.php/ujTermek`,{
            method:"POST",
            body:JSON.stringify({
                "nev":document.getElementById("termekNev").value,
                "nevEn":document.getElementById("termekNevEn").value,
                "leiras":document.getElementById("termekLeiras").value,
                "leirasEn":document.getElementById("termekLeirasEn").value,
                "ar":document.getElementById("termekAr").value,
                "keszlet":document.getElementById("termekMennyiseg").value,
                "kategoriaId":kategoriaSelect.value,
                "learazasId":1,
                "kep":("../képek/"+(document.getElementById("termekKep").files[0].name))
            })
        })
        if(httpvalasz.ok){
            let adatok=await httpvalasz.json()
            document.getElementById("termekEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("termekEredmeny").innerHTML=Object.values(adatok)
        }
        else{
            let adatok=await httpvalasz.json()
            document.getElementById("termekEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("termekEredmeny").innerHTML=Object.values(adatok)
        }
    }
const learazasValtoztatas = async () => {
    if(termeklearazasSelect.value==0){
        let httpvalasz=await fetch(`../../backend/dolgozo/index.php/kategoriaLearazas`,{
            method:"PUT",
            body:JSON.stringify({"kategoriaId":kategorialearazSelect.value,"learazasId":learazasMerteke.value})
        })
        if(httpvalasz.ok){
            let adatok=await httpvalasz.json()
            document.getElementById("learazasEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("learazasEredmeny").innerHTML=Object.values(adatok)
        }
        else{
            let adatok=await httpvalasz.json()
            document.getElementById("learazasEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("learazasEredmeny").innerHTML=Object.values(adatok)
        }
    }
    else{
        let httpvalasz=await fetch(`../../backend/dolgozo/index.php/termekLearazas`,{
            method:"PUT",
            body:JSON.stringify({"termekId":termeklearazasSelect.value,"learazasId":learazasMerteke.value})
        })
        if(httpvalasz.ok){
            let adatok=await httpvalasz.json()
            document.getElementById("learazasEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("learazasEredmeny").innerHTML=Object.values(adatok)
        }
        else{
            let adatok=await httpvalasz.json()
            document.getElementById("learazasEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("learazasEredmeny").innerHTML=Object.values(adatok)
        }
    }
}
const sorKivalaszt = (e) => {
    const sor = e.target.closest("tr");
    if (valasztottSor) {
        valasztottSor.classList.remove("table-primary");
    }
    if (sor === valasztottSor) {
        valasztottSor = null; 
    } else {
        sor.classList.add("table-primary");
        valasztottSor = sor;
    }
}
const rendelesKuldes = async () => {
    if (!valasztottSor) {
        document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
        document.getElementById("rendelesEredmeny").innerHTML="Válassz ki egy rendelést"
        return;
    }
    const cellak = valasztottSor.querySelectorAll("td");
    let httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesKuldes`,{
        method:"PUT",
        body:JSON.stringify({"nev":cellak[0].textContent,"rendelesId":cellak[1].textContent,"cim":cellak[4].textContent})
    })
    if(httpvalasz.ok){
        let adatok=await httpvalasz.json()
        document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
        document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
        httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesekAdatai`)
        adatok=await httpvalasz.json()
        tabla.innerHTML=""
        for (const adat of adatok) {
            let httpValasz2=await fetch(`../../backend/dolgozo/index.php/rendelesiCim?szallitasId=${adat.szallitasId}`)
            let adat2=await httpValasz2.json()
            let sor=tabla.insertRow()
            let cell1=sor.insertCell()
            let cell2=sor.insertCell()
            let cell3=sor.insertCell()
            let cell4=sor.insertCell()
            let cell6=sor.insertCell()
            cell1.innerHTML=adat.felhasznalo
            cell2.innerHTML=adat.id
            cell3.innerHTML=adat.fizetesIdeje
            if(adat.elkuldve==null){
                cell4.innerHTML="0000-00-00"
            } else {
                cell4.innerHTML=adat.elkuldve
            }
            cell6.innerHTML=`${adat2.orszag}, ${adat2.iranyitoszam} ${adat2.varos}, ${adat2.utca}`  
        }
    } else {
        let adatok=await httpvalasz.json()
        document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
        document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
    }
}
const rendelesTeljesitve = async () => {
    if (!valasztottSor) {
        document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
        document.getElementById("rendelesEredmeny").innerHTML="Válassz ki egy rendelést"
        return;
    }
    const cellak = valasztottSor.querySelectorAll("td");
    let httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesTeljesitve`,{
        method:"PUT",
        body:JSON.stringify({"nev":cellak[0].textContent,"rendelesId":cellak[1].textContent,"cim":cellak[4].textContent})
    })
    if(httpvalasz.ok){
        let adatok=await httpvalasz.json()
        document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
        document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
        httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesekAdatai`)
        adatok=await httpvalasz.json()
        tabla.innerHTML=""
        for (const adat of adatok) {
            let httpValasz2=await fetch(`../../backend/dolgozo/index.php/rendelesiCim?szallitasId=${adat.szallitasId}`)
            let adat2=await httpValasz2.json()
            let sor=tabla.insertRow()
            let cell1=sor.insertCell()
            let cell2=sor.insertCell()
            let cell3=sor.insertCell()
            let cell4=sor.insertCell()
            let cell6=sor.insertCell()
            cell1.innerHTML=adat.felhasznalo
            cell2.innerHTML=adat.id
            cell3.innerHTML=adat.fizetesIdeje
            if(adat.elkuldve==null){
                cell4.innerHTML="0000-00-00"
            } else {
                cell4.innerHTML=adat.elkuldve
            }
            cell6.innerHTML=`${adat2.orszag}, ${adat2.iranyitoszam} ${adat2.varos}, ${adat2.utca}` 
        }
    } else {
        let adatok=await httpvalasz.json()
        document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
        document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
    }
}
const rendelesTorles = async () => {
     if (!valasztottSor) {
        document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
        document.getElementById("rendelesEredmeny").innerHTML="Válassz ki egy rendelést"
        return;
    }
    const cellak = valasztottSor.querySelectorAll("td");
    let httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesTorles`,{
        method:"DELETE",
        body:JSON.stringify({"nev":cellak[0].textContent,"rendelesId":cellak[1].textContent,"cim":cellak[4].textContent})
    })
    if(httpvalasz.ok){
        document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
        document.getElementById("rendelesEredmeny").innerHTML="Sikeres törlés"
        httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesekAdatai`)
        let adatok=await httpvalasz.json()
        tabla.innerHTML=""
        for (const adat of adatok) {
            let httpValasz2=await fetch(`../../backend/dolgozo/index.php/rendelesiCim?szallitasId=${adat.szallitasId}`)
            let adat2=await httpValasz2.json()
            let sor=tabla.insertRow()
            let cell1=sor.insertCell()
            let cell2=sor.insertCell()
            let cell3=sor.insertCell()
            let cell4=sor.insertCell()
            let cell6=sor.insertCell()
            cell1.innerHTML=adat.felhasznalo
            cell2.innerHTML=adat.id
            cell3.innerHTML=adat.fizetesIdeje
            if(adat.elkuldve==null){
                cell4.innerHTML="0000-00-00"
            } else {
                cell4.innerHTML=adat.elkuldve
            }
            cell6.innerHTML=`${adat2.orszag}, ${adat2.iranyitoszam} ${adat2.varos}, ${adat2.utca}` 
        }
    } else {
        let adatok=await httpvalasz.json()
        document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
        document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
    }
}

kategorialearazSelect.addEventListener("change",termekSelectFeltoltes)
document.getElementById("termekKuldes").addEventListener("click",termekFeltolt)
document.getElementById("learazasKuldes").addEventListener("click",learazasValtoztatas)
tabla.addEventListener("click",sorKivalaszt)
document.getElementById("Kuldes").addEventListener("click",rendelesKuldes)
document.getElementById("Teljesites").addEventListener("click",rendelesTeljesitve)
document.getElementById("Torles").addEventListener("click",rendelesTorles)

const szoveg = async () => {
    try {
        let httpvalasz=await fetch("../../backend/szoveg/szoveg.php/szoveg")
        let adatok=await httpvalasz.json()
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg"]
            if(localStorage.getItem('token')){
            let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
            let adat=await httpValasz.json()
            if(adat["felhasznalonev"]==null){
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            }
            else{
            document.getElementById("felhasznaloGomb").innerHTML=adat["felhasznalonev"]
            }
            }
            else{
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            }
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg"]
            document.getElementById("szoveg4").innerHTML=adatok[46]["szoveg"]
            document.getElementById("szoveg5").innerHTML=adatok[51]["szoveg"]
            document.getElementById("szoveg6").innerHTML=adatok[52]["szoveg"]
            document.getElementById("szoveg7").innerHTML=adatok[53]["szoveg"]
            document.getElementById("szoveg8").innerHTML=adatok[54]["szoveg"]
            document.getElementById("szoveg9").innerHTML=adatok[55]["szoveg"]
            document.getElementById("szoveg10").innerHTML=adatok[56]["szoveg"]
            document.getElementById("szoveg11").innerHTML=adatok[57]["szoveg"]
            document.getElementById("szoveg12").innerHTML=adatok[58]["szoveg"]
            document.getElementById("termekKuldes").value=adatok[59]["szoveg"]
            selectFeltoltes()
            document.getElementById("learazasKuldes").value=adatok[59]["szoveg"]
            document.getElementById("szoveg13").innerHTML=adatok[54]["szoveg"]
            document.getElementById("szoveg14").innerHTML=adatok[60]["szoveg"]
            document.getElementById("szoveg15").innerHTML=adatok[61]["szoveg"]
            document.getElementById("szoveg16").innerHTML=adatok[62]["szoveg"]
            document.getElementById("szoveg17").innerHTML=adatok[63]["szoveg"]
            document.getElementById("szoveg18").innerHTML=adatok[64]["szoveg"]
            document.getElementById("szoveg20").innerHTML=adatok[15]["szoveg"]
            document.getElementById("Kuldes").value=adatok[43]["szoveg"]
            document.getElementById("Teljesites").value=adatok[42]["szoveg"]
            document.getElementById("Torles").value=adatok[25]["szoveg"]
            document.getElementById("Kijelentkezes").value=adatok[50]["szoveg"]
            document.getElementById("termekGomb").innerHTML=adatok[113]["szoveg"]
            document.getElementById("szoveg21").innerHTML=adatok[115]["szoveg"]
            document.getElementById("dolgozoGomb").innerHTML=adatok[116]["szoveg"]
        } else {
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            if(localStorage.getItem('token')){
            let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${localStorage.getItem('token')}`)
            let adat=await httpValasz.json()
            if(adat["felhasznalonev"]==null){
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            }
            else{
            document.getElementById("felhasznaloGomb").innerHTML=adat["felhasznalonev"]
            }
            }
            else{
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            }
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
            document.getElementById("szoveg4").innerHTML=adatok[46]["szoveg_en"]
            document.getElementById("szoveg5").innerHTML=adatok[51]["szoveg_en"]
            document.getElementById("szoveg6").innerHTML=adatok[52]["szoveg_en"]
            document.getElementById("szoveg7").innerHTML=adatok[53]["szoveg_en"]
            document.getElementById("szoveg8").innerHTML=adatok[54]["szoveg_en"]
            document.getElementById("szoveg9").innerHTML=adatok[55]["szoveg_en"]
            document.getElementById("szoveg10").innerHTML=adatok[56]["szoveg_en"]
            document.getElementById("szoveg11").innerHTML=adatok[57]["szoveg_en"]
            document.getElementById("szoveg12").innerHTML=adatok[58]["szoveg_en"]
            document.getElementById("termekKuldes").value=adatok[59]["szoveg_en"]
            selectFeltoltes()
            document.getElementById("learazasKuldes").value=adatok[59]["szoveg_en"]
            document.getElementById("szoveg13").innerHTML=adatok[54]["szoveg_en"]
            document.getElementById("szoveg14").innerHTML=adatok[60]["szoveg_en"]
            document.getElementById("szoveg15").innerHTML=adatok[61]["szoveg_en"]
            document.getElementById("szoveg16").innerHTML=adatok[62]["szoveg_en"]
            document.getElementById("szoveg17").innerHTML=adatok[63]["szoveg_en"]
            document.getElementById("szoveg18").innerHTML=adatok[64]["szoveg_en"]
            document.getElementById("szoveg20").innerHTML=adatok[15]["szoveg_en"]
            document.getElementById("Kuldes").value=adatok[43]["szoveg_en"]
            document.getElementById("Teljesites").value=adatok[42]["szoveg_en"]
            document.getElementById("Torles").value=adatok[25]["szoveg_en"]
            document.getElementById("Kijelentkezes").value=adatok[50]["szoveg_en"]
            document.getElementById("termekGomb").innerHTML=adatok[113]["szoveg_en"]
            document.getElementById("szoveg21").innerHTML=adatok[115]["szoveg_en"]
            document.getElementById("dolgozoGomb").innerHTML=adatok[116]["szoveg_en"]
        }
    } catch (error) {
        console.log(error)
    }
}
window.addEventListener("load",szoveg)
const beallitMagyar = () => {
    localStorage.setItem("nyelv","hu")
    szoveg()
}
document.getElementById("magyar").addEventListener("click",beallitMagyar)
const beallitAngol = () => {
    localStorage.setItem("nyelv","en")
    szoveg()
}
document.getElementById("angol").addEventListener("click",beallitAngol)