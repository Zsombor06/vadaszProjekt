var token=""

// let httpValasz = await fetch(`../../backend/bejelentkezes/profile.php/authenticate?Authorization=${httpAdat["accessToken"]}`)
// httpAdat = await httpValasz.json();


// export const bejelentkezesiStatus = async () => {
//         try {
//             let httpValasz = await fetch(""); //be van e jelentkezve?
//             if (httpValasz.ok) {
//                 let httpAdat = await httpValasz.json();
//                 if (httpAdat == "") { //nincs bejelentkezve 
//                     return 0;
//                 } else { //be van jelentkezve
//                     switch (httpAdat["rangId"]) {
//                         case 1: //rangId 1 az admin
//                             return 1;
//                         case 2: //rangId 2 a dolgozó
//                             return 2;
//                         default: //rangId 3 a regisztrált felhasználó
//                             return 3;
//                     }
//                 }
//             }
//         } catch (error) {
//             return console.log(error);
//         }
//     }