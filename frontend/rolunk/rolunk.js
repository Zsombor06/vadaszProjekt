const szoveg=async()=>{
    try {
        let httpvalasz=await fetch("../../backend/szoveg/szoveg.php/szoveg")
        let adatok=await httpvalasz.json()
        if(localStorage.getItem("nyelv")==null || localStorage.getItem("nyelv")=="hu"){
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg"]
            document.getElementById("szoveg4").innerHTML=adatok[72]["szoveg"]
            document.getElementById("szoveg5").innerHTML=adatok[3]["szoveg"]
            document.getElementById("szoveg6").innerHTML=adatok[73]["szoveg"]
            document.getElementById("szoveg7").innerHTML=adatok[74]["szoveg"]
            document.getElementById("szoveg8").innerHTML=adatok[75]["szoveg"]
            document.getElementById("szoveg9").innerHTML=adatok[76]["szoveg"]
            document.getElementById("szoveg10").innerHTML=adatok[77]["szoveg"]
            document.getElementById("szoveg11").innerHTML=adatok[78]["szoveg"]
            document.getElementById("szoveg12").innerHTML=adatok[79]["szoveg"]
            document.getElementById("szoveg13").innerHTML=adatok[80]["szoveg"]
            document.getElementById("szoveg14").innerHTML=adatok[81]["szoveg"]
            document.getElementById("footer1").innerHTML=adatok[82]["szoveg"]
            document.getElementById("footer2").innerHTML=adatok[83]["szoveg"]
            document.getElementById("footer3").innerHTML=adatok[84]["szoveg"]
            document.getElementById("footer4").innerHTML=adatok[85]["szoveg"]
            document.getElementById("footer5").innerHTML=adatok[86]["szoveg"]
            document.getElementById("footer6").innerHTML=adatok[87]["szoveg"]
            document.getElementById("footer7").innerHTML=adatok[88]["szoveg"]
            document.getElementById("footer8").innerHTML=adatok[89]["szoveg"]
            document.getElementById("footer9").innerHTML=adatok[90]["szoveg"]
            document.getElementById("footer10").innerHTML=adatok[91]["szoveg"]
            document.getElementById("footer11").innerHTML=adatok[92]["szoveg"]

        }
        else{
            document.getElementById("kosarGomb").innerHTML=adatok[0]["szoveg_en"]
            document.getElementById("felhasznaloGomb").innerHTML=adatok[1]["szoveg_en"]
            document.getElementById("szoveg3").innerHTML=adatok[2]["szoveg_en"]
            document.getElementById("szoveg4").innerHTML=adatok[72]["szoveg_en"]
            document.getElementById("szoveg5").innerHTML=adatok[3]["szoveg_en"]
            document.getElementById("szoveg6").innerHTML=adatok[73]["szoveg_en"]
            document.getElementById("szoveg7").innerHTML=adatok[74]["szoveg_en"]
            document.getElementById("szoveg8").innerHTML=adatok[75]["szoveg_en"]
            document.getElementById("szoveg9").innerHTML=adatok[76]["szoveg_en"]
            document.getElementById("szoveg10").innerHTML=adatok[77]["szoveg_en"]
            document.getElementById("szoveg11").innerHTML=adatok[78]["szoveg_en"]
            document.getElementById("szoveg12").innerHTML=adatok[79]["szoveg_en"]
            document.getElementById("szoveg13").innerHTML=adatok[80]["szoveg_en"]
            document.getElementById("szoveg14").innerHTML=adatok[81]["szoveg_en"]
            document.getElementById("footer1").innerHTML=adatok[82]["szoveg_en"]
            document.getElementById("footer2").innerHTML=adatok[83]["szoveg_en"]
            document.getElementById("footer3").innerHTML=adatok[84]["szoveg_en"]
            document.getElementById("footer4").innerHTML=adatok[85]["szoveg_en"]
            document.getElementById("footer5").innerHTML=adatok[86]["szoveg_en"]
            document.getElementById("footer6").innerHTML=adatok[87]["szoveg_en"]
            document.getElementById("footer7").innerHTML=adatok[88]["szoveg_en"]
            document.getElementById("footer8").innerHTML=adatok[89]["szoveg_en"]
            document.getElementById("footer9").innerHTML=adatok[90]["szoveg_en"]
            document.getElementById("footer10").innerHTML=adatok[91]["szoveg_en"]
            document.getElementById("footer11").innerHTML=adatok[92]["szoveg_en"]

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