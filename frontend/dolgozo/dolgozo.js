var kategoriaSelect=document.getElementById("termekKategoria")
var kategorialearazSelect=document.getElementById("learazasKategoria")
var termeklearazasSelect=document.getElementById("learazasTermek")
var learazasMerteke=document.getElementById("learazasMertek")
var tabla=document.getElementById("tabla")
var valasztottSor = null;
const selectFeltoltes=async()=>{
    let httpvalasz=await fetch("../../backend/dolgozo/index.php/kategoriakNeve")
    let adatok=await httpvalasz.json()
    for (const adat of adatok) {
        kategorialearazSelect.innerHTML+=`<option value=${adat["id"]}>${adat["kategoria"]}</option>`
        kategoriaSelect.innerHTML+=`<option value=${adat["id"]}>${adat["kategoria"]}</option>`
    }
    httpvalasz=await fetch("../../backend/dolgozo/index.php/learazasokMerteke")
    adatok=await httpvalasz.json()
    for (const adat of adatok) {
            learazasMerteke.innerHTML+=`<option value=${adat["id"]}>${adat["LearazasMerteke"]}%</option>`
    }
    httpvalasz=await fetch(`../../backend/dolgozo/index.php/termekNeve?kategoriaId=${kategorialearazSelect.value}`)
    adatok=await httpvalasz.json()
    for (const adat of adatok) {
            termeklearazasSelect.innerHTML+=`<option value=${adat["id"]}>${adat["nev"]}</option>`
    }
    httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesekAdatai`)
    adatok=await httpvalasz.json()
    for (const adat of adatok) {
        let sor=tabla.insertRow()
        let cell1=sor.insertCell()
        let cell2=sor.insertCell()
        let cell3=sor.insertCell()
        let cell4=sor.insertCell()
        cell1.innerHTML=adat.felhasznalo
        cell2.innerHTML=adat.id
        if(adat.elkuldve==null){
        cell3.innerHTML="0000-00-00"
        }
        else{
        cell3.innerHTML=adat.elkuldve
        }
        cell4.innerHTML="0000-00-00"       
}}
document.getElementById("Kijelentkezes").addEventListener("click",()=>{
    
})
const termekSelectFeltoltes=async()=>{
    let httpvalasz=await fetch(`../../backend/dolgozo/index.php/termekNeve?kategoriaId=${kategorialearazSelect.value}`)
    let adatok=await httpvalasz.json()
    termeklearazasSelect.innerHTML="<option value=0>Összes</option>"
    for (const adat of adatok) {
            termeklearazasSelect.innerHTML+=`<option value=${adat["id"]}>${adat["nev"]}</option>`
    }
}
const termekFeltolt=async()=> {
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
const learazasValtoztatas=async()=>{
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
const sorKivalaszt=(e)=>{
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
const rendelesKuldes=async()=>{
     if (!valasztottSor) {
            document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("rendelesEredmeny").innerHTML="Válassz ki egy rendelést"
            return;
    }
    const cellak = valasztottSor.querySelectorAll("td");
       let httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesKuldes`,{
            method:"PUT",
            body:JSON.stringify({"rendelesId":cellak[1].textContent})
        })
        if(httpvalasz.ok){
            let adatok=await httpvalasz.json()
            document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
            httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesekAdatai`)
            adatok=await httpvalasz.json()
            tabla.innerHTML=""
            for (const adat of adatok) {
            let sor=tabla.insertRow()
            let cell1=sor.insertCell()
            let cell2=sor.insertCell()
            let cell3=sor.insertCell()
            let cell4=sor.insertCell()
            cell1.innerHTML=adat.felhasznalo
            cell2.innerHTML=adat.id
            if(adat.elkuldve==null){
            cell3.innerHTML="0000-00-00"
            }
            else{
            cell3.innerHTML=adat.elkuldve
            }
            cell4.innerHTML="0000-00-00"
            }
        }
        else{
            let adatok=await httpvalasz.json()
            document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
        }
}
const rendelesTeljesitve=async()=>{
     if (!valasztottSor) {
            document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("rendelesEredmeny").innerHTML="Válassz ki egy rendelést"
            return;
    }
    const cellak = valasztottSor.querySelectorAll("td");
       let httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesTeljesitve`,{
            method:"PUT",
            body:JSON.stringify({"rendelesId":cellak[1].textContent})
        })
        if(httpvalasz.ok){
            let adatok=await httpvalasz.json()
            document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
            httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesekAdatai`)
            adatok=await httpvalasz.json()
            tabla.innerHTML=""
            for (const adat of adatok) {
            let sor=tabla.insertRow()
            let cell1=sor.insertCell()
            let cell2=sor.insertCell()
            let cell3=sor.insertCell()
            let cell4=sor.insertCell()
            cell1.innerHTML=adat.felhasznalo
            cell2.innerHTML=adat.id
            if(adat.elkuldve==null){
            cell3.innerHTML="0000-00-00"
            }
            else{
            cell3.innerHTML=adat.elkuldve
            }
            cell4.innerHTML="0000-00-00"
            }
        }
        else{
            let adatok=await httpvalasz.json()
            document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
        }
}
const rendelesTorles=async()=>{
     if (!valasztottSor) {
            document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("rendelesEredmeny").innerHTML="Válassz ki egy rendelést"
            return;
    }
    const cellak = valasztottSor.querySelectorAll("td");
       let httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesTorles`,{
            method:"DELETE",
            body:JSON.stringify({"rendelesId":cellak[1].textContent})
        })
        if(httpvalasz.ok){
            let adatok=await httpvalasz.json()
            document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
            httpvalasz=await fetch(`../../backend/dolgozo/index.php/rendelesekAdatai`)
            adatok=await httpvalasz.json()
            tabla.innerHTML=""
            for (const adat of adatok) {
            let sor=tabla.insertRow()
            let cell1=sor.insertCell()
            let cell2=sor.insertCell()
            let cell3=sor.insertCell()
            let cell4=sor.insertCell()
            cell1.innerHTML=adat.felhasznalo
            cell2.innerHTML=adat.id
            if(adat.elkuldve==null){
            cell3.innerHTML="0000-00-00"
            }
            else{
            cell3.innerHTML=adat.elkuldve
            }
            cell4.innerHTML="0000-00-00"
            }
        }
        else{
            let adatok=await httpvalasz.json()
            document.getElementById("rendelesEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("rendelesEredmeny").innerHTML=Object.values(adatok)
        }
}
window.addEventListener("load",selectFeltoltes)
kategorialearazSelect.addEventListener("change",termekSelectFeltoltes)
document.getElementById("termekKuldes").addEventListener("click",termekFeltolt)
document.getElementById("learazasKuldes").addEventListener("click",learazasValtoztatas)
tabla.addEventListener("click",sorKivalaszt)
document.getElementById("Kuldes").addEventListener("click",rendelesKuldes)
document.getElementById("Teljesites").addEventListener("click",rendelesTeljesitve)
document.getElementById("Torles").addEventListener("click",rendelesTorles)
