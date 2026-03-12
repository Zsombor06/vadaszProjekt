tablaValaszt=document.getElementById("tablaValaszt")
muveletValaszt=document.getElementById("muveletValaszt")
rangok=document.querySelectorAll("#rangok")
felhasznalok=document.querySelectorAll("#felhasznalok")
kategoriak=document.querySelectorAll("#kategoriak")
learazasok=document.querySelectorAll("#learazasok")
termekNevek=document.querySelectorAll("#termekNevek")
function muveletFeltolt(){
    if(tablaValaszt.value!=""){
        muveletValaszt.innerHTML='<option value="">Kérem válasszon műveletet</option>'
        muveletValaszt.innerHTML+='<option value="hozzadas">Hozzáadás</option>'
        muveletValaszt.innerHTML+='<option value="modositas">Módosítás</option>'
        muveletValaszt.innerHTML+='<option value="torles">Törlés</option>'
        document.getElementById("modositFelhasznaloDiv").hidden=true
        document.getElementById("ujFelhasznaloDiv").hidden=true
        document.getElementById("torlesFelhasznaloDiv").hidden=true
        document.getElementById("ujTermekDiv").hidden=true
        document.getElementById("modositTermekDiv").hidden=true
        document.getElementById("torlesTermekDiv").hidden=true

    }
    else{
        muveletValaszt.innerHTML='<option value="">Kérem válasszon műveletet</option>'
        document.getElementById("modositFelhasznaloDiv").hidden=true
        document.getElementById("ujFelhasznaloDiv").hidden=true
        document.getElementById("torlesFelhasznaloDiv").hidden=true
        document.getElementById("ujTermekDiv").hidden=true
        document.getElementById("modositTermekDiv").hidden=true
        document.getElementById("torlesTermekDiv").hidden=true

    }
}
async function rangFeltoltes() {
    try {
        let httpvalasz=await fetch("../../backend/admin/index.php/rangokNeve")
        let adatok=await httpvalasz.json()
        for (const rang of rangok) {
            for (const adat of adatok) {
            rang.innerHTML+=`<option value=${adat["id"]}>${adat["rang"]}</option>`
        }
        }
        
    }
    catch{
              console.log(error)
    }
}
async function felToltesek() {
    try {

        //rangok feltöltése select-be
        let httpvalasz=await fetch("../../backend/admin/index.php/rangokNeve")
        let adatok=await httpvalasz.json()
        for (const rang of rangok) {
            for (const adat of adatok) {
            rang.innerHTML+=`<option value=${adat["id"]}>${adat["rang"]}</option>`
        }
        }


        //nevek feltöltése select-be
        httpvalasz=await fetch("../../backend/admin/index.php/felhasznaloNevek")
        adatok=await httpvalasz.json()
        for (const felhasznalo of felhasznalok) {
            felhasznalok.innerHTML=""
        }
        for (const felhasznalo of felhasznalok) {
            for (const adat of adatok) {
            felhasznalo.innerHTML+=`<option value=${adat["felhasznalonev"]}>${adat["felhasznalonev"]}</option>`
        }
        }
        //kategóriák feltöltése select-be
        httpvalasz=await fetch("../../backend/admin/index.php/kategoriakNeve")
        adatok=await httpvalasz.json()
        for (const kategoria of kategoriak) {
            for (const adat of adatok) {
            kategoria.innerHTML+=`<option value=${adat["id"]}>${adat["kategoria"]}</option>`
        }
        }

        //leárazások feltöltése select-be
        httpvalasz=await fetch("../../backend/admin/index.php/learazasokMerteke")
        adatok=await httpvalasz.json()
        for (const learazas of learazasok) {
            for (const adat of adatok) {
            learazas.innerHTML+=`<option value=${adat["id"]}>${adat["LearazasMerteke"]}</option>`
        }
        }

        //leárazások feltöltése select-be
        httpvalasz=await fetch("../../backend/admin/index.php/termekNeve")
        adatok=await httpvalasz.json()
        for (const termekNeve of termekNevek) {
            for (const adat of adatok) {
            termekNeve.innerHTML+=`<option value=${adat["id"]}>${adat["nev"]}</option>`
        }
        }
    } catch (error) {
        console.log(error)
    }
}
function vegpont(){
    if(tablaValaszt.value=="felhasznalo"){
            switch(muveletValaszt.value){
                case "hozzadas":
                    document.getElementById("ujFelhasznaloDiv").hidden=false
                    document.getElementById("modositFelhasznaloDiv").hidden=true
                    document.getElementById("torlesFelhasznaloDiv").hidden=true
                break
                case "modositas":
                    document.getElementById("modositFelhasznaloDiv").hidden=false
                    document.getElementById("ujFelhasznaloDiv").hidden=true
                    document.getElementById("torlesFelhasznaloDiv").hidden=true
                    break
                case "torles":
                    document.getElementById("modositFelhasznaloDiv").hidden=true
                    document.getElementById("ujFelhasznaloDiv").hidden=true
                    document.getElementById("torlesFelhasznaloDiv").hidden=false
                    break
                default:
                    document.getElementById("modositFelhasznaloDiv").hidden=true
                    document.getElementById("ujFelhasznaloDiv").hidden=true
                    document.getElementById("torlesFelhasznaloDiv").hidden=true
        break
            }
    }
    else{
        switch(muveletValaszt.value){
                case "hozzadas":
                document.getElementById("ujTermekDiv").hidden=false
                document.getElementById("modositTermekDiv").hidden=true
                document.getElementById("torlesTermekDiv").hidden=true
                break
                case "modositas":
                document.getElementById("ujTermekDiv").hidden=true
                document.getElementById("modositTermekDiv").hidden=false
                document.getElementById("torlesTermekDiv").hidden=true
                break
                case "torles":
                document.getElementById("ujTermekDiv").hidden=true
                document.getElementById("modositTermekDiv").hidden=true
                document.getElementById("torlesTermekDiv").hidden=false
                break
                default:
                document.getElementById("ujTermekDiv").hidden=true
                document.getElementById("modositTermekDiv").hidden=true
                document.getElementById("torlesTermekDiv").hidden=true
                break    
            }
    }
}

async function felhasznaloAdatok() {
    try {
        httpvalasz=await fetch(`../../backend/admin/index.php/felhasznaloAdatok?felhasznalo=${felhasznalok[0].value}`)
        adatok=await httpvalasz.json()
        document.getElementById("modositEmail").value=adatok["email"]
        document.getElementById("modositorszagSzamla").value=adatok["szamlazasi_orszag"]
        document.getElementById("modositirszSzamla").value=adatok["szamlazasi_iranyitoszam"]
        document.getElementById("modositvarosSzamla").value=adatok["szamlazasi_varos"]
    document.getElementById("modositutcaSzamla").value=adatok["szamlazasi_utca"]
        rangok[1].value=adatok["rangId"]
    } catch (error) {
        console.log(error)
    }
}

async function felhasznaloFeltolt() {
    try {
         httpvalasz=await fetch(`../../backend/admin/index.php/ujFelhasznalo`,{
            method:"POST",
            body:JSON.stringify({
                "felhasznalonev":document.getElementById("ujNev").value,
                "email":document.getElementById("ujEmail").value,
                "szamlazasi_orszag":document.getElementById("ujorszagSzamla").value,
                "szamlazasi_irsz":document.getElementById("ujirszSzamla").value,
                "szamlazasi_varos":document.getElementById("ujvarosSzamla").value,
                "szamlazasi_utca":document.getElementById("ujutcaSzamla").value,
                "rangId":rangok[0].value                
            })
         })
        if(httpvalasz.ok){
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
        else{
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
         httpvalasz=await fetch("../../backend/admin/index.php/felhasznaloNevek")
        adatok=await httpvalasz.json()
        for (const felhasznalo of felhasznalok) {
            felhasznalo.innerHTML=""
        }
        for (const felhasznalo of felhasznalok) {
            for (const adat of adatok) {
            felhasznalo.innerHTML+=`<option value=${adat["felhasznalonev"]}>${adat["felhasznalonev"]}</option>`
        }
        }
    } catch (error) {
        console.log(error)
    }
}
async function felhasznaloModosit() {
    try {
         httpvalasz=await fetch(`../../backend/admin/index.php/modositFelhasznalo`,{
            method:"PUT",
            body:JSON.stringify({
                "felhasznalonev":felhasznalok[0].value,
                "email":document.getElementById("modositEmail").value,
                "szamlazasi_orszag":document.getElementById("modositorszagSzamla").value,
                "szamlazasi_irsz":document.getElementById("modositirszSzamla").value,
                "szamlazasi_varos":document.getElementById("modositvarosSzamla").value,
                "szamlazasi_utca":document.getElementById("modositutcaSzamla").value,
                "rangId":rangok[1].value                
            })
         })
         if(httpvalasz.ok){
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
        else{
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
    } catch (error) {
        console.log(error)
    }
}

async function felhasznaloTorles() {
    try {
        if(felhasznalok[1].value!="admin"){
            httpvalasz=await fetch(`../../backend/admin/index.php/felhasznaloTorles`,{
            method:"DELETE",
            body:JSON.stringify({"felhasznalonev":felhasznalok[1].value})}
        )
         if(httpvalasz.ok){
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML="Sikers törlés"
        }
        else{
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }}
        else{
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML="Admin felhasználót nem lehet törölni!"
        }
        
        }
     catch (error) {
        console.log(error)
    }
}

async function termekFeltolt() {
    try { 
        if(document.getElementById("ujKep").files.length!=0){
        httpvalasz=await fetch(`../../backend/admin/index.php/modositTermek`,{
            method:"PUT",
            body:JSON.stringify({
                "nev":document.getElementById("ujTermekNev").value,
                "nevEn":document.getElementById("ujEnNev").value,
                "leiras":document.getElementById("ujLeiras").value,
                "leirasEn":document.getElementById("ujEnLeiras").value,
                "ar":document.getElementById("ujAr").value,
                "keszlet":document.getElementById("ujRaktar").value,
                "kategoriaId":kategoriak[0].value,
                "learazasId":learazasok[0].value,
                "kep":("../képek/"+(document.getElementById("ujKep").files[0].name))
            })
         })}
         else{
             httpvalasz=await fetch(`../../backend/admin/index.php/modositTermekT`,{
            method:"PUT",
            body:JSON.stringify({
                "nev":document.getElementById("ujTermekNev").value,
                "nevEn":document.getElementById("ujEnNev").value,
                "leiras":document.getElementById("ujLeiras").value,
                "leirasEn":document.getElementById("ujEnLeiras").value,
                "ar":document.getElementById("ujAr").value,
                "keszlet":document.getElementById("ujRaktar").value,
                "kategoriaId":kategoriak[0].value,
                "learazasId":learazasok[0].value
            })
         })
         }
         if(httpvalasz.ok){
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
        else{
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
         httpvalasz=await fetch("../../backend/admin/index.php/termekNeve")
        adatok=await httpvalasz.json()
        for (const termekNeve of termekNevek) {
            termekNeve.innerHTML=""
        }
        for (const termekNeve of termekNevek) {
            for (const adat of adatok) {
            termekNeve.innerHTML+=`<option value=${adat["id"]}>${adat["nev"]}</option>`
        }
        }
         
    } catch (error) {
        console.log(error)
    }
}
async function termekAdatok() {
    try {
        let httpvalasz=await fetch(`../../backend/admin/index.php/termekAdatok?id=${termekNevek[0].value}`)
        let adatok=await httpvalasz.json()
        document.getElementById("modositNev").value=adatok["nev"]
        document.getElementById("modositEnNev").value=adatok["nevEn"]
        document.getElementById("modositLeiras").value=adatok["leiras"]
        document.getElementById("modositEnLeiras").value=adatok["leirasEn"]
        document.getElementById("modositAr").value=adatok["ar"]
        document.getElementById("modositRaktar").value=adatok["keszlet"]
        kategoriak[1].value=adatok["kategoriaId"],
        learazasok[1].value=adatok["learazasid"]        
    } catch (error) {
        console.log(error)
    }
}
 
async function termekModosit() {
     try {
        if(document.getElementById("modositKep").files.length!=0){
         httpvalasz=await fetch(`../../backend/admin/index.php/modositTermek`,{
            method:"PUT",
            body:JSON.stringify({
                "id":termekNevek[0].value,
                "nev":document.getElementById("modositNev").value,
                "nevEn":document.getElementById("modositEnNev").value,
                "leiras":document.getElementById("modositLeiras").value,
                "leirasEn":document.getElementById("modositEnLeiras").value,
                "ar":document.getElementById("modositAr").value,
                "keszlet":document.getElementById("modositRaktar").value,
                "kategoriaId":kategoriak[1].value,
                "learazasId":learazasok[1].value,
                "kep":("../képek/"+(document.getElementById("modositKep").files[0].name))
            })
         })}
         else{
            httpvalasz=await fetch(`../../backend/admin/index.php/modositTermekT`,{
            method:"PUT",
            body:JSON.stringify({
                "id":termekNevek[0].value,
                "nev":document.getElementById("modositNev").value,
                "nevEn":document.getElementById("modositEnNev").value,
                "leiras":document.getElementById("modositLeiras").value,
                "leirasEn":document.getElementById("modositEnLeiras").value,
                "ar":document.getElementById("modositAr").value,
                "keszlet":document.getElementById("modositRaktar").value,
                "kategoriaId":kategoriak[1].value,
                "learazasId":learazasok[1].value        
            })
         })
         }
         if(httpvalasz.ok){
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
        else{
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
         httpvalasz=await fetch("../../backend/admin/index.php/termekNeve")
        adatok=await httpvalasz.json()
        for (const termekNeve of termekNevek) {
            termekNeve.innerHTML=""
        }
        for (const termekNeve of termekNevek) {
            for (const adat of adatok) {
            termekNeve.innerHTML+=`<option value=${adat["id"]}>${adat["nev"]}</option>`
        }
        }
         
    } catch (error) {
        console.log(error)
    }
}
async function termekTorles() {
    try {
        let httpvalasz=await fetch(`../../backend/admin/index.php/termekTorles`,{
            method:"DELETE",
            body:JSON.stringify({
                "termekId":termekNevek[1].value           
            })
         })
         if(httpvalasz.ok){
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-success d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
        else{
            adatok=await httpvalasz.json()
            document.getElementById("muveletEredmeny").setAttribute("class","alert alert-danger d-flex justify-content-center")
            document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
        }
          httpvalasz=await fetch("../../backend/admin/index.php/termekNeve")
        adatok=await httpvalasz.json()
        for (const termekNeve of termekNevek) {
            termekNeve.innerHTML=""
        }
        for (const termekNeve of termekNevek) {
            for (const adat of adatok) {
            termekNeve.innerHTML+=`<option value=${adat["id"]}>${adat["nev"]}</option>`
        }
        }
    } catch (error) {
        console.log(error)
    }
}

tablaValaszt.addEventListener("change",muveletFeltolt)
muveletValaszt.addEventListener("change",vegpont)
felhasznalok[0].addEventListener("click",felhasznaloAdatok)
window.addEventListener("load",felToltesek)
document.getElementById("ujFelhasznalo").addEventListener("click",felhasznaloFeltolt)
document.getElementById("modositFelhasznalo").addEventListener("click",felhasznaloModosit)
document.getElementById("torolFelhasznalo").addEventListener("click",felhasznaloTorles)
document.getElementById("ujTermek").addEventListener("click",termekFeltolt)
document.getElementById("torlesTermek").addEventListener("click",termekTorles)
document.getElementById("modositTermek").addEventListener("click",termekModosit)
termekNevek[0].addEventListener("click",termekAdatok)

   
document.getElementById("kijelentkezes").addEventListener("click",()=>{
    localStorage.removeItem('token')
    window.location.href="../fooldal/fooldal.html"
})

const szoveg=async()=>{
    try {
        let httpvalasz=await fetch("../../backend/szoveg/szoveg.php/szoveg")
        let adatok=await httpvalasz.json()
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg"]
            }
        else{
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
        }
    } catch (error) {
        console.log(error)
    }
}
window.addEventListener("load",szoveg)
const beallitMagyar=()=>{
    localStorage.setItem("nyelv","hu")
    szoveg()
}
document.getElementById("magyar").addEventListener("click",beallitMagyar)
const beallitAngol=()=>{
    localStorage.setItem("nyelv","en")
    szoveg()
}
document.getElementById("angol").addEventListener("click",beallitAngol)