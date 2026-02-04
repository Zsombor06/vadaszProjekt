const regisztralasGomb = async () => {
        try {
            let bStatus = bejelentkezesiStatus();
            switch (bStatus) {
                case 0:
                    window.location.href = "" //regisztracios oldal
                    break;
                case 1:
                    window.location.href = "" //admin oldal
                    break;
                case 2:
                    window.location.href = "" //munkas oldal
                    break;
                case 3:
                    window.location.href = "" //sima felhasznalo oldal
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const felhasznaloGomb = async () => {
        try {
            let bStatus = bejelentkezesiStatus();
            switch (bStatus) {
                case 0:
                    window.location.href = "../bejelentkezes/bejelentkezes.html"
                    break;
                case 1:
                    window.location.href = "" //admin oldal
                    break;
                case 2:
                    window.location.href = "" //munkas oldal
                    break;
                case 3:
                    window.location.href = "" //sima felhasznalo oldal
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
 
    document.getElementById("Regisztralas").addEventListener("click", regisztralasGomb);
    document.getElementById("felhasznaloGomb").addEventListener("click", felhasznaloGomb);
    }
    