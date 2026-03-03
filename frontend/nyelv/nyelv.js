const magyarNyelv=()=>{
    document.getElementById("nyelv").setAttribute("href","../nyelv/magyar.css")
    localStorage.setItem("nyelv","hu")
}
document.getElementById("magyar").addEventListener("click",magyarNyelv)
const angolNyelv=()=>{
    document.getElementById("nyelv").setAttribute("href","../nyelv/angol.css")
    localStorage.setItem("nyelv","en")
}
document.getElementById("angol").addEventListener("click",angolNyelv)
const nyelvBeallitas=()=>{
    switch(localStorage.getItem("nyelv")){
        case "hu":
    document.getElementById("nyelv").setAttribute("href","../nyelv/magyar.css")
        break
        case "en":
    document.getElementById("nyelv").setAttribute("href","../nyelv/angol.css")
        break
        default:
    document.getElementById("nyelv").setAttribute("href","../nyelv/magyar.css")
        break
    }
}
window.addEventListener("load",nyelvBeallitas)