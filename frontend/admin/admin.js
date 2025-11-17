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
        let httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/rangokNeve")
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
        let httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/rangokNeve")
        let adatok=await httpvalasz.json()
        for (const rang of rangok) {
            for (const adat of adatok) {
            rang.innerHTML+=`<option value=${adat["id"]}>${adat["rang"]}</option>`
        }
        }


        //nevek feltöltése select-be
        httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/felhasznaloNevek")
        adatok=await httpvalasz.json()
        for (const felhasznalo of felhasznalok) {
            felhasznalok.innerHTML=""
        }
        for (const felhasznalo of felhasznalok) {
            for (const adat of adatok) {
            felhasznalo.innerHTML+=`<option value=${adat["felhasználónév"]}>${adat["felhasználónév"]}</option>`
        }
        }
        //kategóriák feltöltése select-be
        httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/kategoriakNeve")
        adatok=await httpvalasz.json()
        for (const kategoria of kategoriak) {
            for (const adat of adatok) {
            kategoria.innerHTML+=`<option value=${adat["id"]}>${adat["kategória"]}</option>`
        }
        }

        //leárazások feltöltése select-be
        httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/learazasokMerteke")
        adatok=await httpvalasz.json()
        for (const learazas of learazasok) {
            for (const adat of adatok) {
            learazas.innerHTML+=`<option value=${adat["id"]}>${adat["LeárazásMértéke"]}</option>`
        }
        }

        //leárazások feltöltése select-be
        httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/termekNeve")
        adatok=await httpvalasz.json()
        for (const termekNeve of termekNevek) {
            for (const adat of adatok) {
            termekNeve.innerHTML+=`<option value=${adat["id"]}>${adat["név"]}</option>`
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
        httpvalasz=await fetch(`http://localhost/vadaszprojekt/backend/admin/index.php/felhasznaloAdatok?felhasznalo=${felhasznalok[0].value}`)
        adatok=await httpvalasz.json()
        document.getElementById("modositJelszo").value=adatok["jelszó"]
        document.getElementById("modositEmail").value=adatok["email"]
        document.getElementById("modositSzamla").value=adatok["számlázásicím"]
        rangok[0].value=adatok["rangId"]
    } catch (error) {
        console.log(error)
    }
}

async function felhasznaloFeltolt() {
    try {
         httpvalasz=await fetch(`http://localhost/vadaszprojekt/backend/admin/index.php/ujFelhasznalo`,{
            method:"POST",
            body:JSON.stringify({
                "felhasználónév":document.getElementById("ujNev").value,
                "jelszó":document.getElementById("ujJelszo").value,
                "email":document.getElementById("ujEmail").value,
                "számlázásicím":document.getElementById("ujSzamla").value,
                "rangId":rangok[0].value                
            })
         })
        adatok=await httpvalasz.json()
        document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
         httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/felhasznaloNevek")
        adatok=await httpvalasz.json()
        for (const felhasznalo of felhasznalok) {
            felhasznalo.innerHTML=""
        }
        for (const felhasznalo of felhasznalok) {
            for (const adat of adatok) {
            felhasznalo.innerHTML+=`<option value=${adat["felhasználónév"]}>${adat["felhasználónév"]}</option>`
        }
        }
    } catch (error) {
        console.log(error)
    }
}
async function felhasznaloModosit() {
    try {
         httpvalasz=await fetch(`http://localhost/vadaszprojekt/backend/admin/index.php/modositFelhasznalo`,{
            method:"PUT",
            body:JSON.stringify({
                "felhasználónév":felhasznalok[0].value,
                "jelszó":document.getElementById("modositJelszo").value,
                "email":document.getElementById("modositEmail").value,
                "számlázásicím":document.getElementById("modositSzamla").value,
                "rangId":rangok[1].value                
            })
         })
        adatok=await httpvalasz.json()
        document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
    } catch (error) {
        console.log(error)
    }
}

async function felhasznaloTorles() {
    try {
        httpvalasz=await fetch(`http://localhost/vadaszprojekt/backend/admin/index.php/felhasznaloTorles`,{
            method:"DELETE",
            body:JSON.stringify({"felhasználónév":felhasznalok[1].value})})
 document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
    } catch (error) {
        console.log(error)
    }
}

async function termekFeltolt() {
    try {
         httpvalasz=await fetch(`http://localhost/vadaszprojekt/backend/admin/index.php/ujTermekT`,{
            method:"POST",
            body:JSON.stringify({
                "név":document.getElementById("ujTermekNev").value,
                "névEn":document.getElementById("ujEnNev").value,
                "leírás":document.getElementById("ujLeiras").value,
                "leírásEn":document.getElementById("ujEnLeiras").value,
                "ár":document.getElementById("ujAr").value,
                "készlet":document.getElementById("ujRaktar").value,
                "kategóriaId":kategoriak[0].value,
                "leárazásId":learazasok[0].value            
            })
         })
        adatok=await httpvalasz.json()
        document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
         httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/termekNeve")
        adatok=await httpvalasz.json()
        for (const termekNeve of termekNevek) {
            termekNeve.innerHTML=""
        }
        for (const termekNeve of termekNevek) {
            for (const adat of adatok) {
            termekNeve.innerHTML+=`<option value=${adat["id"]}>${adat["név"]}</option>`
        }
        }
         
    } catch (error) {
        console.log(error)
    }
}
async function termekAdatok() {
    try {
        let httpvalasz=await fetch(`http://localhost/vadaszprojekt/backend/admin/index.php/termekAdatok?id=${termekNevek[0].value}`)
        let adatok=await httpvalasz.json()
        document.getElementById("modositNev").value=adatok["név"]
        document.getElementById("modositEnNev").value=adatok["névEn"]
        document.getElementById("modositLeiras").value=adatok["leírás"]
        document.getElementById("modositEnLeiras").value=adatok["leírásEn"]
        document.getElementById("modositAr").value=adatok["ár"]
        document.getElementById("modositRaktar").value=adatok["készlet"]
        kategoriak[1].value=adatok["kategóriaId"],
        learazasok[1].value=adatok["leárazásid"]        
    } catch (error) {
        console.log(error)
    }
}
 
async function termekModosit() {
     try {
         httpvalasz=await fetch(`http://localhost/vadaszprojekt/backend/admin/index.php/modositTermekT`,{
            method:"PUT",
            body:JSON.stringify({
                "id":termekNevek[0].value,
                "név":document.getElementById("modositNev").value,
                "névEn":document.getElementById("modositEnNev").value,
                "leírás":document.getElementById("modositLeiras").value,
                "leírásEn":document.getElementById("modositEnLeiras").value,
                "ár":document.getElementById("modositAr").value,
                "készlet":document.getElementById("modositRaktar").value,
                "kategóriaId":kategoriak[1].value,
                "leárazásId":learazasok[1].value            
            })
         })
        adatok=await httpvalasz.json()
        document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
         httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/termekNeve")
        adatok=await httpvalasz.json()
        for (const termekNeve of termekNevek) {
            termekNeve.innerHTML=""
        }
        for (const termekNeve of termekNevek) {
            for (const adat of adatok) {
            termekNeve.innerHTML+=`<option value=${adat["id"]}>${adat["név"]}</option>`
        }
        }
         
    } catch (error) {
        console.log(error)
    }
}
async function termekTorles() {
    try {
        let httpvalasz=await fetch(`http://localhost/vadaszprojekt/backend/admin/index.php/termekTorles`,{
            method:"DELETE",
            body:JSON.stringify({
                "termekId":termekNevek[1].value           
            })
         })
         let adatok=await httpvalasz.json()
         document.getElementById("muveletEredmeny").innerHTML=Object.values(adatok)
          httpvalasz=await fetch("http://localhost/vadaszprojekt/backend/admin/index.php/termekNeve")
        adatok=await httpvalasz.json()
        for (const termekNeve of termekNevek) {
            termekNeve.innerHTML=""
        }
        for (const termekNeve of termekNevek) {
            for (const adat of adatok) {
            termekNeve.innerHTML+=`<option value=${adat["id"]}>${adat["név"]}</option>`
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