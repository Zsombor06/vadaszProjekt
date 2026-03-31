-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Már 31. 11:08
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `arany_agancs`
--
CREATE DATABASE IF NOT EXISTS `arany_agancs` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `arany_agancs`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `felhasznalonev` varchar(255) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rangId` int(11) NOT NULL,
  `szamlazasi_orszag` varchar(100) NOT NULL,
  `szamlazasi_iranyitoszam` int(11) NOT NULL,
  `szamlazasi_varos` varchar(100) NOT NULL,
  `szamlazasi_utca` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`felhasznalonev`, `jelszo`, `email`, `rangId`, `szamlazasi_orszag`, `szamlazasi_iranyitoszam`, `szamlazasi_varos`, `szamlazasi_utca`) VALUES
('admin', '$2y$10$p/VsqPDZalVnOXcz1fmLrum08lLeUN7ZWfrjbov455I8/ckrVCk.O', 'admin@admin', 1, 'Magyarország', 8200, 'Veszprém', 'Valami'),
('user', '$2y$10$1zHqp7Cn4s4UuUplZFobeeT/vooF3564V3pvl.e7ZVUosIfzQz1fG', 'user@user', 3, 'Magyarország', 8200, 'Veszprém', 'Valami'),
('worker', '$2y$10$O1H/L1Ar4RgOqf4PdqcNMODM5Pg6VZkC2/ohxrp6hY4imxzqyq7oq', 'worker@worker', 2, 'Magyarország', 8200, 'Veszprém', 'Valami');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoria`
--

CREATE TABLE `kategoria` (
  `id` int(11) NOT NULL,
  `kategoria` varchar(255) NOT NULL,
  `kategoriaEn` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategoria`
--

INSERT INTO `kategoria` (`id`, `kategoria`, `kategoriaEn`) VALUES
(1, 'Vadászruházat', 'Hunting Clothing'),
(2, 'Fegyver alkatrészek', 'Weapon parts'),
(3, 'Távcsövek', 'Binoculors'),
(4, 'Túlélési felszerelés', 'Survival gear'),
(5, 'Kések', 'Knifes'),
(6, 'Csapdák', 'Traps'),
(7, 'Kiegészítők', 'Accessories'),
(8, 'Terepfelszerelés', 'Field equipment'),
(9, 'Optika', 'Optics'),
(10, 'Vadászautó kiegészítők', 'Hunting vehicle accessories'),
(11, 'Táskák és tokok', 'Backpacks and cases'),
(12, 'Karbantartás', 'Maintenance'),
(13, 'Éjjellátók', 'Nightvison'),
(14, 'Terepszínezés', 'Camoflage'),
(15, 'Kézmelegítők', 'Handwarmers'),
(16, 'Kutyafelszerelés', 'Dog equipment'),
(17, 'Hívók és sípok', 'Whistles'),
(18, 'Trófea tartók', 'Trophy holders'),
(19, 'Vadász könyvek', 'Hunting Books'),
(20, 'Ajándéktárgyak', 'Gift items');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `learazas`
--

CREATE TABLE `learazas` (
  `id` int(11) NOT NULL,
  `LearazasMerteke` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `learazas`
--

INSERT INTO `learazas` (`id`, `LearazasMerteke`) VALUES
(1, 0),
(2, 5),
(3, 10),
(4, 15),
(5, 20),
(6, 25),
(7, 30),
(8, 35),
(9, 40),
(10, 45),
(11, 50),
(12, 55),
(13, 60),
(14, 65),
(15, 70),
(16, 75),
(17, 80),
(18, 85),
(19, 90),
(20, 95);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rang`
--

CREATE TABLE `rang` (
  `id` int(11) NOT NULL,
  `rang` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rang`
--

INSERT INTO `rang` (`id`, `rang`) VALUES
(1, 'Admin'),
(2, 'Dolgozó'),
(3, 'Vásárló');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `id` int(11) NOT NULL,
  `felhasznalo` varchar(255) NOT NULL,
  `fizetve` tinyint(1) NOT NULL,
  `fizetesIdeje` datetime DEFAULT NULL,
  `elkuldve` datetime DEFAULT NULL,
  `teljesitve` datetime DEFAULT NULL,
  `szallitasId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles`
--

INSERT INTO `rendeles` (`id`, `felhasznalo`, `fizetve`, `fizetesIdeje`, `elkuldve`, `teljesitve`, `szallitasId`) VALUES
(1, 'user', 1, '2026-03-03 17:01:30', NULL, NULL, 1),
(35, 'user', 1, '2026-03-19 10:53:35', NULL, NULL, 1),
(36, 'admin', 1, '2026-03-19 11:43:27', NULL, NULL, 2),
(37, 'user', 1, '2026-03-24 16:39:52', NULL, NULL, 1),
(38, 'admin', 0, NULL, NULL, NULL, NULL),
(39, 'user', 0, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szallitasicimek`
--

CREATE TABLE `szallitasicimek` (
  `id` int(11) NOT NULL,
  `felhasznalo` varchar(255) NOT NULL,
  `orszag` varchar(255) NOT NULL,
  `iranyitoszam` int(11) NOT NULL,
  `varos` varchar(255) NOT NULL,
  `utca` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `szallitasicimek`
--

INSERT INTO `szallitasicimek` (`id`, `felhasznalo`, `orszag`, `iranyitoszam`, `varos`, `utca`) VALUES
(1, 'user', 'Magyarország', 8200, 'Veszprém', 'Valami'),
(2, 'admin', 'Magyarország', 8200, 'Veszprém', 'Valami'),
(3, 'worker', 'Magyarország', 8200, 'Veszprém', 'Valami');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szoveg`
--

CREATE TABLE `szoveg` (
  `id` int(255) NOT NULL,
  `szoveg` varchar(500) NOT NULL,
  `szoveg_en` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szoveg`
--

INSERT INTO `szoveg` (`id`, `szoveg`, `szoveg_en`) VALUES
(1, 'Kosár', 'Cart'),
(2, 'Felhasználó', 'User'),
(3, 'Kategóriák', 'Categories'),
(4, '„Az erdő hív – mi felszerelünk rá.”', '„The forest calls – we answer it.”'),
(5, 'Üdvözlünk az Arany Agancsnál!', 'We welcome you to Arany Agancs!'),
(6, 'Az Arany Agancs vadászfelszerelés szaküzlet célja, hogy a természetben töltött idő valódi élmény legyen. Kínálatunkban megtalálod a megbízható ruházatot, kiegészítőket és felszereléseket, amelyekre minden vadásznak szüksége lehet – legyen szó kezdőről vagy tapasztalt erdőjáróról.<br>Hiszünk a minőségben, a hagyományban és abban, hogy a megfelelő felszerelés nem luxus, hanem alapfeltétel. Az erdő kiszámíthatatlan – mi segítünk felkészülten érkezni.', 'The goal of the Arany Agancs hunting equipment store is to make time spent in nature a real experience. In our offer you will find reliable clothing, accessories and equipment that every hunter needs - whether you are a beginner or an experienced hiker\r\n.<br>We believe in quality, tradition and that proper equipment is not a luxury, but a basic requirement. The forest is unpredictable - we help you arrive prepared.'),
(7, 'Regisztráció', 'Register'),
(8, 'Termék hozzáadása', 'Add product'),
(9, ' A termék sikeresen hozzáadva a kosarához!', 'The product has been successfully added to your cart!'),
(10, 'Rendben', 'Alright'),
(11, 'Kosár megtekintése', 'View Cart'),
(12, 'Bejelentkezés', 'Login'),
(13, 'Nincs még fiókod? Regisztrálj:', 'Dont have an account yet? Register:'),
(14, 'Már van fiókod? Jelentkezz be:', 'Already have an account? Log in:'),
(15, 'Számlázási cím', 'Billing Address'),
(16, 'Szállítási cím', 'Shipping address'),
(17, 'Kosár tartalma', 'Contents of the cart'),
(18, 'További termék hozzáadása', 'Add another product'),
(19, 'Összegzés', 'Summary'),
(20, 'Végösszeg', 'Total amount'),
(21, 'Válasszon szállítási címet:', 'Choose shipping address:'),
(22, 'Fizetés', 'Pay'),
(23, 'Törlés megerősítése', 'Confirm deletion'),
(24, ' Biztosan törölni szeretné a terméket a kosárból? <br>\r\n            Ezt a műveletet nem lehet visszavonni! <br>', 'Are you sure you want to remove the product from the cart? <br>This action cannot be undone! <br>'),
(25, 'Mégsem', 'Cancel'),
(26, 'Törlés', 'Delete'),
(27, 'Adataid', 'Your data'),
(28, 'Felhasználónév', 'Username'),
(29, 'Jelszó módosítás', 'Change password'),
(30, 'Régi jelszó', 'Old password'),
(31, 'Új jelszó', 'New password'),
(32, 'Szállítási címek', 'Shipping addresses'),
(33, 'Ország', 'Country'),
(34, 'Irányítószám', 'ZIP code'),
(35, 'Város', 'City'),
(36, 'Utca', 'Street'),
(37, 'Hozzáadás', 'Add address'),
(38, 'Módosítás', 'Change address'),
(39, 'Rendeléseim', 'Previous orders'),
(40, 'Dátum', 'Date'),
(41, 'Státusz', 'Status'),
(42, 'Folyamatban', 'In progress'),
(43, 'Teljesítve', 'Completed'),
(44, 'Elküldve', 'Sent'),
(45, 'Részletek', 'Details'),
(46, 'Rendelés részletei', 'Order details'),
(47, 'Termék', 'Product'),
(48, 'Egységár', 'Unit price'),
(49, 'Mennyiség', 'Amount'),
(50, 'Részösszeg', 'Subtotal'),
(54, 'Kijelentkezés', 'Log out'),
(55, 'Név:', 'Hungarian name:'),
(56, 'Leírás:', 'Hungarian description:'),
(57, 'Ár:', 'Price:'),
(58, 'Kategória:', 'Category:'),
(59, 'Angol név:', 'Name:'),
(60, 'Angol leírás:', 'Description:'),
(61, 'Kép:', 'Picture:'),
(62, 'Raktáron:', 'In stock:'),
(63, 'Küldés', 'Send'),
(64, 'Termék:', 'Product:'),
(65, 'Leárazásmértéke:', 'Discount rate:'),
(66, 'Rendelő neve', 'Customer name'),
(67, 'Rendelés azonosítója', 'Orders ID'),
(68, 'Elküldés dátuma', 'Date of sending'),
(69, 'Teljesítés dátuma', 'Date of completion'),
(70, 'Válasszon fizetési módot:', 'Choose payment method:'),
(71, 'Bankkártya', 'Bank card'),
(72, 'Fizetés megerősítése', 'Payment confirmation'),
(73, 'Biztosan véglegesíteni szeretné a rendelést? <br>Ezt a műveletet nem lehet visszavonni! <br>', 'Are you sure you want to finalize the order? <br>This action cannot be undone! <br>'),
(74, 'Válasszon kategóriát:', 'Choose a category:'),
(75, 'Vásárlási statisztika', 'Purchase statistics'),
(76, 'Rólunk', 'About us'),
(77, '  Az Arany Agancs egy olyan közösségből született, ahol a természet tisztelete és a vadászat hagyománya alapérték.Küldetésünk, hogy minden vadász számára megbízható és minőségi felszerelést biztosítsunk.', 'Arany Agancs was born from a community where respect for nature and the tradition of hunting are core values. Our mission is to provide every hunter with reliable and quality equipment.'),
(78, 'Termékeinket gondosan válogatjuk, hogy azok megfeleljenek a valós terepi kihívásoknak. Számunkra a minőség és a tartósság nem opció, hanem alapelv.', 'We carefully select our products to ensure they meet real field challenges. For us, quality and durability are not an option, but a principle.'),
(79, ' Legyen szó kezdő vagy tapasztalt vadászról, nálunk mindenki megtalálja a megfelelő eszközöket.', 'Whether you are a beginner or an experienced hunter, everyone can find the right tools with us.'),
(80, 'Minőség', 'Quality'),
(81, 'Csak bevált felszerelések', 'Only proven equipment'),
(82, 'Tapasztalat', 'Experience'),
(83, 'Valódi terepi tudás', 'Real field knowledge'),
(84, 'Megbízhatóság', 'Reliability'),
(85, 'Gyors és biztos kiszállítás', 'Fast and reliable delivery'),
(86, 'Prémium vadászfelszerelések és kiegészítők. Minőség, hagyomány és szakértelem az erdő szerelmeseinek.', 'Premium hunting equipment and accessories. Quality, tradition, and expertise for lovers of the forest.'),
(87, 'Linkek', 'Links'),
(88, 'Főoldal', 'Main page'),
(89, 'Rólunk', 'About us'),
(90, 'Termékek', 'Products'),
(91, 'Kapcsolatok', 'Contacts'),
(92, 'Nyitvatartás', 'Opening hours'),
(93, 'Hétfő - Péntek:', 'Monday - Friday:'),
(94, 'Szombat:', 'Saturday:'),
(95, 'Vasárnap', 'Sunday:'),
(96, '©2025 Arany Agancs Vadászbolt. Minden jog fenntartva.', '©2025 Arany Agancs Vadászbolt. All rights reserved.'),
(97, 'Zárva', 'Closed'),
(98, 'Helytelen Captcha', 'Incorrect Captcha'),
(99, 'Helytelen felhasználónév vagy jelszó', 'Incorrect username or password'),
(100, 'Minden mező kitöltése kötelező!', 'All fields are required!'),
(101, 'Felhasználónév már foglalt!', 'Username already in use!'),
(102, 'Email cím már foglalt!', 'Email address already in use!'),
(103, 'Keresés', 'Search'),
(104, 'Min ár', 'Min price'),
(105, 'Max ár', 'Max price'),
(106, 'Termék neve...', 'Products name...'),
(107, 'Rendezés', 'Order'),
(108, 'Nincs', 'None'),
(109, 'Ár ↑', 'Price ↑'),
(110, 'Ár ↓', 'Price ↓'),
(111, 'Akciós', 'On sale'),
(112, 'Raktáron', 'In stock'),
(113, 'találat', 'products found'),
(114, 'Nincs találat', 'No products found'),
(115, 'Szűrők automatikusan frissülnek', 'Filters update automatically'),
(116, 'Szűrők törlése', 'Clear filters');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termek`
--

CREATE TABLE `termek` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `nevEn` varchar(255) NOT NULL,
  `leiras` varchar(255) NOT NULL,
  `leirasEn` varchar(255) NOT NULL,
  `ar` int(11) NOT NULL,
  `kategoriaId` int(11) NOT NULL,
  `keszlet` int(11) NOT NULL,
  `learazasid` int(11) NOT NULL,
  `kep` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `termek`
--

INSERT INTO `termek` (`id`, `nev`, `nevEn`, `leiras`, `leirasEn`, `ar`, `kategoriaId`, `keszlet`, `learazasid`, `kep`) VALUES
(1, 'Terepmintás dzseki', 'Camo Jacket', 'Meleg, vízálló vadászdzseki.', 'Warm waterproof hunting jacket.', 34990, 1, 25, 3, '../képek/kabat.png'),
(2, 'Vadászpuskatus', 'Shotgun Stock', 'Tölgyfából készült puskatus.', 'Oak shotgun stock.', 19990, 2, 10, 2, '../képek/puskatus.png'),
(3, 'Távcső 10x50', 'Binoculars 10x50', 'Kiváló látótávolság vadászathoz.', 'Excellent range for hunting.', 59990, 3, 15, 5, '../képek/tavcso.png'),
(4, 'Medve csapda', 'Bear trap', 'Medvék és nagy testű állatok elleni csapda.', 'Traps against bears and large animals.', 14990, 6, 200, 1, '../képek/medvecsapda.png'),
(5, 'Vadászkés', 'Hunting Knife', 'Rozsdamentes acél vadászkés.', 'Stainless steel hunting knife.', 12990, 5, 50, 4, '../képek/vadaszkes.png'),
(6, 'Róka csapda', 'Fox Trap', 'Professzionális élvefogó csapda.', 'Professional live trap.', 24990, 6, 12, 2, '../képek/csapda.png'),
(7, 'Vadász sapka', 'Hunting Cap', 'Zöld terepmintás sapka.', 'Green camo hunting cap.', 3990, 1, 100, 1, '../képek/vadaszkalap.png'),
(8, 'Terep hátizsák', 'Field Backpack', '50 literes vadászhátizsák.', '50L hunting backpack.', 17990, 8, 60, 3, '../képek/hatizsak.png'),
(9, 'Vadászlámpa', 'Hunting Flashlight', 'Erős LED lámpa 300 méteres hatótávval.', 'Powerful 300m LED flashlight.', 14990, 8, 40, 5, '../képek/lampa.png'),
(10, 'Optikai irányzék', 'Rifle Scope', '4-16x50 távcső irányzék.', '4-16x50 rifle scope.', 69990, 9, 20, 7, '../képek/puskatavcso.png'),
(11, 'Fegyvertisztító készlet', 'Gun Cleaning Kit', 'Teljes tisztító szett puskákhoz.', 'Complete cleaning kit for rifles.', 8990, 12, 80, 2, '../képek/fegyvertisztito.png'),
(12, 'Trófea tartó falap', 'Trophy Mount Board', 'Tölgyfából készült trófeaalap.', 'Oak trophy mount board.', 4990, 18, 150, 1, '../képek/trofealap.png'),
(13, 'Kutyanyakörv fényvisszaverővel', 'Reflective Dog Collar', 'Biztonságos és kényelmes.', 'Safe and comfortable.', 6990, 16, 60, 2, '../képek/nyakkorv.png'),
(14, 'Őz síp', 'Deer Caller', 'Őzhívó síp természetes hanggal.', 'Deer caller with natural tone.', 2990, 17, 200, 3, '../képek/ozsip.png'),
(15, 'Éjjellátó monokulár', 'Night Vision Monocular', 'Digitális éjjellátó készülék.', 'Digital night vision device.', 119990, 13, 8, 8, '../képek/ejjellato.png'),
(16, 'Vadász bakancs', 'Hunting Boots', 'Vízálló, csúszásmentes talppal.', 'Waterproof non-slip boots.', 44990, 1, 30, 4, '../képek/vadaszbakancs.png'),
(17, 'Fegyvertok', 'Gun Case', 'Párnázott fegyvertok.', 'Padded gun case.', 15990, 11, 35, 5, '../képek/fegyvertok.png'),
(18, 'Kézmelegítő párna', 'Hand Warmer', 'Terepen hasznos hőpárna.', 'Field-use heat pack.', 1990, 15, 120, 1, '../képek/kezmelegito.png'),
(19, 'Vadászkalap', 'Hunting Hat', 'Gyapjúból készült kalap.', 'Woolen hunting hat.', 7990, 1, 50, 2, '../képek/vadaszsapka.png'),
(20, 'Trófea tisztító folyadék', 'Trophy Cleaning Solution', 'Kíméletes csonttisztító szer.', 'Gentle bone cleaning fluid.', 2490, 18, 90, 3, '../képek/trofeatisztito.png'),
(21, 'Magnéziumos tűzgyújtó', 'Magnesium Fire Starter', 'Vízálló, extrém körülmények között is működik.', 'Waterproof, works in extreme conditions.', 3200, 4, 150, 1, '../képek/tuzgyujto.png'),
(22, 'Vízhatlan elsősegély csomag', 'Waterproof First Aid Kit', 'Kompakt készlet vadászbalesetek esetére.', 'Compact kit for hunting accidents.', 8500, 4, 40, 2, '../képek/elsosegely.png'),
(23, 'Kihúzható vadászháló', 'Retractable Hunting Net', 'Könnyű álcázóháló madárleshez.', 'Lightweight camouflage net for bird watching.', 12500, 14, 25, 3, '../képek/halo.png'),
(24, 'Napelemes Powerbank', 'Solar Powerbank', '20000mAh kapacitás terepre.', '20000mAh capacity for the field.', 18900, 8, 30, 1, '../képek/powerbank.png'),
(25, 'Vadhús hűtőtáska', 'Game Meat Cooler Bag', 'Vastag hőszigetelés, 40 literes.', 'Thick insulation, 40L capacity.', 15500, 11, 20, 4, '../képek/hutotaska.png'),
(26, 'Professzionális vadkamera 4K', 'Trail Camera 4K', 'Éjjellátó funkcióval és mozgásérzékelővel.', '4K resolution with night vision and motion sensor.', 42900, 9, 15, 6, '../képek/vadkamera.png'),
(27, 'Tölgyfa szék (összecsukható)', 'Folding Oak Stool', 'Kényelmes, bőr ülőfelülettel.', 'Comfortable with leather seat.', 9900, 8, 45, 1, '../képek/szek.png'),
(30, 'Szarvasagancs mintás bicska', 'Antler Handle Pocket Knife', 'Díszes markolatú zsebkés.', 'Pocket knife with decorative antler handle.', 14500, 5, 35, 3, '../képek/bicska.png'),
(31, 'Neoprén fegyverszíj', 'Neoprene Gun Sling', 'Csúszásmentes, párnázott vállszíj.', 'Non-slip padded shoulder strap.', 8990, 2, 25, 1, '../képek/fegyverszij.png'),
(32, 'Bőr tustalp-hosszabbító', 'Leather Recoil Pad', 'Védi a vállat és hosszabbítja a tust.', 'Protects shoulder and extends stock.', 12500, 2, 15, 2, '../képek/tustalp.png'),
(33, 'Vízhatlan túlélőcsomag', 'Waterproof Survival Kit', 'Síp, tükör, tűzgyújtó egy szettben.', 'Whistle, mirror, fire starter in a kit.', 6500, 4, 30, 3, '../képek/survival_kit.png'),
(34, 'Vadhús jelölő kártya', 'Game Tag Set', '10 darabos tartós jelölő szett.', '10-piece durable marking set.', 1990, 7, 100, 1, '../képek/jelolo.png'),
(35, 'Összecsukható vadszállító rács', 'Folding Game Carrier', 'Terepen való vadmozgatáshoz.', 'For moving game in the field.', 24900, 8, 10, 5, '../képek/szallitoracs.png'),
(36, 'Csomagtartó tálca (vadvédelmi)', 'Heavy Duty Boot Liner', 'Könnyen mosható, strapabíró gumitálca.', 'Easy-to-clean durable rubber mat.', 18500, 10, 12, 1, '../képek/autotalca.png'),
(37, 'Mágneses fegyvertartó (autóba)', 'Magnetic Gun Rack for Car', 'Biztonságos rögzítés az utastérben.', 'Safe mounting in the cabin.', 9900, 10, 20, 2, '../képek/automagnes.png'),
(38, 'Fegyverolaj spray (200ml)', 'Gun Oil Spray', 'Korrózióvédelem és kenés.', 'Corrosion protection and lubrication.', 3490, 12, 50, 1, '../képek/olaj.png'),
(39, '3-színű arcfesték stift', '3-Color Camo Face Paint', 'Bőrbarát, matt terepszínek.', 'Skin-friendly matte camo colors.', 2990, 14, 60, 1, '../képek/arcfestek.png'),
(40, 'Benzines kézmelegítő', 'Refillable Hand Warmer', 'Akár 12 órán át tartó meleg.', 'Up to 12 hours of warmth.', 7990, 15, 40, 4, '../képek/benzin_melegito.png'),
(41, 'GPS-es kutyanyakörv', 'GPS Dog Collar', 'Valós idejű követés az erdőben.', 'Real-time tracking in the forest.', 55000, 16, 5, 5, '../képek/gps_nyakorv.png'),
(42, 'Trófeafehérítő paszta', 'Trophy Whitening Paste', 'Visszaadja a csont eredeti fehérségét.', 'Restores original bone whiteness.', 4200, 18, 35, 1, '../képek/feherito.png'),
(43, 'Nagy Vadászkalendárium', 'Hunting Almanac', 'Hasznos tanácsok minden évszakra.', 'Useful tips for every season.', 5900, 19, 20, 1, '../képek/konyv.png'),
(44, 'Szarvasmintás pálinkás készlet', 'Deer Pattern Flask Set', 'Díszdobozos üveg és poharak.', 'Gift-boxed bottle and glasses.', 14900, 20, 15, 2, '../képek/ajandek_szett.png'),
(45, 'Vadászkürt alakú kulcstartó', 'Hunting Horn Keychain', 'Apró, fém ajándéktárgy.', 'Small metal gift item.', 1500, 20, 100, 1, '../képek/kulcstarto.png'),
(46, 'Piros pontos irányzék (Red Dot)', 'Red Dot Sight', 'Gyors célrögzítéshez, 11 fényerő fokozattal.', 'Fast target acquisition, 11 brightness levels.', 34900, 9, 12, 1, '../képek/reddot.png'),
(47, 'Céltávcső védő kupak', 'Scope Lens Cover', 'Védi az optikát a karcolásoktól és esőtől.', 'Protects optics from scratches and rain.', 4500, 9, 40, 1, '../képek/kupak.png'),
(48, 'Univerzális fegyvertisztító készlet', 'Universal Gun Cleaning Kit', 'Kefe szett és tisztítóvessző minden kaliberhez.', 'Brush set and cleaning rod for all calibers.', 12900, 12, 15, 1, '../képek/tisztitoszett.png'),
(49, 'Fegyverzsír (50ml)', 'Gun Grease', 'Hosszú távú védelem a mozgó alkatrészeknek.', 'Long-term protection for moving parts.', 2800, 12, 30, 1, '../képek/zsir.png'),
(50, 'Őzhívó síp (állítható)', 'Adjustable Roe Deer Call', 'Élethű hangutánzás, állítható tónus.', 'Realistic sound imitation, adjustable tone.', 7200, 17, 25, 2, '../képek/ozsipo.png'),
(51, 'Vaddisznó hívó kürt', 'Wild Boar Grunter', 'Mély, rezonáló hang a kondák csalogatásához.', 'Deep resonant sound to attract sounders.', 8900, 17, 10, 1, '../képek/vaddiszno_hivo.png'),
(52, 'Vadhús ételek szakácskönyv', 'Wild Game Cookbook', 'Hagyományos és modern receptek gyűjteménye.', 'Collection of traditional and modern recipes.', 6500, 19, 18, 1, '../képek/szakacskonyv.png'),
(53, 'Erdőjárók zsebkönyve', 'Forest Guidebook', 'Növény- és állatvilág meghatározó kézikönyv.', 'Handy guide for flora and fauna identification.', 4200, 19, 25, 1, '../képek/utmutato.png'),
(54, 'Szarvasos kerámia bögre', 'Deer Ceramic Mug', 'Kézzel festett, 3dl-es bögre.', 'Hand-painted 300ml mug.', 3500, 20, 50, 1, '../képek/bogre.png'),
(55, 'Bőr pénztárca (vaddisznó mintával)', 'Leather Wallet with Boar', 'Valódi bőr, egyedi nyomott mintával.', 'Genuine leather with unique embossed pattern.', 11500, 20, 14, 3, '../képek/penztarca.png'),
(56, 'Fényvisszaverő kutyamellény', 'Reflective Dog Vest', 'Láthatóság és védelem a hajtóvadászatokon.', 'Visibility and protection during drives.', 9800, 16, 20, 2, '../képek/kutyamelleny.png'),
(57, 'Kutyasíp (ultrahangos)', 'Ultrasonic Dog Whistle', 'Nagy távolságból is hallható jelzés.', 'Signal audible from long distances.', 3900, 16, 45, 1, '../képek/kutyasip.png'),
(58, 'Mágneses sárvédő védő', 'Magnetic Fender Protector', 'Védi a fényezést pakolás közben.', 'Protects paintwork during loading.', 13500, 10, 8, 1, '../képek/sarvedo_vedo.png'),
(59, 'Nagy teljesítményű fejlámpa', 'High Power Headlamp', '1000 lumen, újratölthető akkumulátorral.', '1000 lumens with rechargeable battery.', 15900, 8, 22, 4, '../képek/fejlampa.png'),
(60, 'Összecsukható vizeskanna (10L)', 'Folding Water Canister', 'Helytakarékos megoldás víztárolásra.', 'Space-saving water storage solution.', 2900, 8, 35, 1, '../képek/kanna.png'),
(61, 'Digitális éjjellátó monokulár', 'Digital Night Vision Monocular', '5x optikai zoom, videórögzítési lehetőség.', '5x optical zoom, video recording capability.', 68000, 13, 5, 5, '../képek/ejjellato_mono.png'),
(62, 'Zselés kézmelegítő párna', 'Gel Hand Warmer Pad', 'Gombnyomásra melegszik, újrafelhasználható.', 'Heats up at a click, reusable.', 1200, 15, 100, 1, '../képek/zseles_melegito.png'),
(63, 'Élvefogó nyestcsapda', 'Live Marten Trap', 'Humanitárius megoldás kártevők ellen.', 'Humane solution against pests.', 19500, 6, 7, 1, '../képek/nyestcsapda.png'),
(64, 'Párnázott fegyvertok (130cm)', 'Padded Rifle Case', 'Vízlepergető anyag, extra zsebekkel.', 'Water-repellent material with extra pockets.', 14900, 11, 15, 1, '../képek/fegyvertok.png'),
(65, 'Álcázó szalag (terepmintás)', 'Camo Stealth Tape', 'Távcsövek és fegyverek álcázásához.', 'For camouflaging optics and guns.', 2500, 14, 50, 1, '../képek/alcaszalag.png'),
(66, 'Narancssárga láthatósági sapka', 'High-Visibility Orange Cap', 'Hajtóvadászatokhoz kötelező, állítható méret.', 'Mandatory for drive hunts, adjustable size.', 4500, 1, 50, 1, '../képek/sapka.png'),
(67, 'Vízlepergető vadásznadrág', 'Water-Repellent Hunting Pants', 'Erősített térdrész, csendes anyagból.', 'Reinforced knees, made of silent material.', 18900, 1, 15, 2, '../képek/nadrag.png'),
(68, 'Kompakt keresőtávcső 8x42', 'Compact Binoculars 8x42', 'Nitrogén töltésű, páramentes lencsék.', 'Nitrogen-filled, fog-proof lenses.', 29900, 3, 8, 1, '../képek/tavcso_8x42.png'),
(69, 'Távcső lencsetisztító toll', 'Binocular Lens Cleaning Pen', 'Kefe és karbonhegy a tökéletes tisztaságért.', 'Brush and carbon tip for perfect clarity.', 3200, 3, 25, 1, '../képek/tisztitotoll.png'),
(70, 'Zsigerelő kés szett', 'Field Dressing Knife Set', '3 részes készlet cserélhető pengékkel.', '3-piece set with replaceable blades.', 16500, 5, 12, 1, '../képek/kesszett.png'),
(71, 'Élező kő (kombinált)', 'Combination Sharpening Stone', 'Kétoldalú finomság a borotvaéles pengékért.', 'Double-sided grit for razor-sharp blades.', 5800, 5, 20, 1, '../képek/elezo.png'),
(72, 'Egérfogó láda (élvefogó)', 'Humane Mouse Trap', 'Biztonságos és kíméletes megoldás.', 'Safe and humane solution.', 2200, 6, 40, 1, '../képek/egerfogo.png'),
(73, 'Elektronikus lőtéren használatos fültok', 'Electronic Ear Defenders', 'Felerősíti a beszédet, tompítja a dörrenést.', 'Amplifies speech, muffles gunshots.', 21500, 7, 18, 1, '../képek/fultok.png'),
(74, 'Rókahívó (nyúlsírás)', 'Fox Call (Rabbit Distress)', 'Élethű hang a ragadozók csalogatásához.', 'Lifelike sound to attract predators.', 5900, 17, 15, 1, '../képek/rokahivo.png'),
(75, 'Vaddisznóagyar alátét (fa)', 'Wild Boar Tusk Shield', 'Faragott tölgyfa díszalap agyarakhoz.', 'Carved oak shield for boar tusks.', 7800, 18, 12, 1, '../képek/agyartarto.png'),
(76, 'Vadászati etika és hagyományok', 'Hunting Ethics and Traditions', 'Alapmű minden vizsgázónak és szakembernek.', 'Essential book for every hunter.', 5200, 19, 10, 1, '../képek/etika_konyv.png'),
(77, 'Szarvasos falidísz (fém)', 'Deer Metal Wall Art', 'Lézerrel vágott acél dekoráció.', 'Laser-cut steel wall decoration.', 12900, 20, 5, 1, '../képek/falidisz.png'),
(78, 'Lőszerhüvely alakú toll', 'Bullet Shaped Pen', 'Egyedi golyóstoll díszdobozban.', 'Unique ballpoint pen in a gift box.', 2500, 20, 30, 1, '../képek/toll.png'),
(79, 'Kézvédő tisztító kendő', 'Lead Removing Hand Wipes', 'Lövészet utáni fémpor eltávolításához.', 'Removes metal dust after shooting.', 1800, 12, 100, 1, '../képek/kendo.png'),
(80, 'Hátizsák integrált székkel', 'Backpack with Integrated Stool', 'Ideális hajtóknak és cserkelő vadászoknak.', 'Ideal for beaters and stalkers.', 14900, 11, 8, 4, '../képek/szekeshatizsak.png'),
(81, 'Thermo vadászmellény', 'Thermal Hunting Vest', 'Szélálló, sokzsebes kivitel hideg hajnalokra.', 'Windproof, multi-pocket design for cold dawns.', 14500, 1, 20, 1, '../képek/melleny.png'),
(82, 'Vízhatlan vadászbakancs', 'Waterproof Hunting Boots', 'Vibram talppal, egész napos kényelem.', 'Vibram sole, all-day comfort.', 42000, 1, 12, 1, '../képek/bakancs.png'),
(83, 'Mágneses fegyvertisztító vessző', 'Magnetic Cleaning Rod', 'Precíziós tisztítás a cső sérülése nélkül.', 'Precision cleaning without barrel damage.', 5500, 2, 30, 1, '../képek/vesszo.png'),
(84, 'Puskatus védő huzat', 'Stock Protection Cover', 'Neoprén anyag, védi a fát a karcolásoktól.', 'Neoprene material, protects wood from scratches.', 3900, 2, 25, 1, '../képek/tushuzat.png'),
(85, 'Távcső hordozó heveder', 'Binocular Harness', 'Tehermentesíti a nyakat hosszú cserkelésnél.', 'Relieves neck strain during long stalks.', 7500, 3, 15, 1, '../képek/heveder.png'),
(86, 'Állvány adapter távcsőhöz', 'Tripod Adapter for Binoculars', 'Stabil megfigyeléshez hosszabb távon.', 'For stable long-term observation.', 4800, 3, 10, 1, '../képek/adapter.png'),
(87, 'Sürgősségi izofólia', 'Emergency Space Blanket', 'Testhő megtartására, kompakt méret.', 'Retains body heat, compact size.', 990, 4, 100, 1, '../képek/izofolia.png'),
(88, 'Vadásztőr (rozsdamentes)', 'Hunting Dagger (Stainless)', 'Klasszikus forma, csúszásmentes markolat.', 'Classic shape, non-slip handle.', 12900, 5, 15, 1, '../képek/tor.png'),
(89, 'Összecsukható fűrész', 'Folding Bone Saw', 'Vadhús és ágak vágásához egyaránt.', 'For cutting game meat and branches.', 6500, 5, 20, 1, '../képek/furesz.png'),
(90, 'Vakondcsapda (dugattyús)', 'Mole Trap', 'Hatékony védelem a kertben és a mezőn.', 'Effective protection for garden and field.', 3500, 6, 25, 1, '../képek/vakondcsapda.png'),
(91, 'Lőbot (háromlábú)', 'Hunting Shooting Stick', 'Stabil célzás álló helyzetben is.', 'Stable aiming even when standing.', 18500, 7, 10, 1, '../képek/lobot.png'),
(92, 'Vadfelhúzó csörlő', 'Game Winch for Car', 'Segít a nehéz vadat az autóba emelni.', 'Helps lift heavy game into the car.', 32000, 10, 5, 1, '../képek/csorlo.png'),
(93, 'Sisakrögzítő éjjellátóhoz', 'Night Vision Helmet Mount', 'Stabil rögzítés taktikai sisakokhoz.', 'Stable mounting for tactical helmets.', 12500, 13, 8, 1, '../képek/sisakrogzito.png'),
(94, 'Infra fényvető (pót)', 'IR Illuminator Flashlight', 'Látótávolság növeléséhez éjszaka.', 'To increase visibility range at night.', 15900, 13, 12, 1, '../képek/infra_lampa.png'),
(95, 'Álcaruha szett (Ghillie)', 'Ghillie Suit Set', 'Tökéletes beolvadás az erdei környezetbe.', 'Perfect blending into the forest environment.', 24500, 14, 5, 1, '../képek/ghillie.png'),
(96, 'Elektromos USB kézmelegítő', 'Electric USB Hand Warmer', 'Beépített akkuval, powerbank funkcióval.', 'Built-in battery, with powerbank function.', 9500, 15, 15, 1, '../képek/usb_melegito.png'),
(97, 'Varjúhívó síp', 'Crow Call', 'Speciális hang a kártevőirtáshoz.', 'Special sound for pest control.', 4200, 17, 20, 1, '../képek/varjuhivo.png'),
(98, 'Digitális vadmérleg (500kg)', 'Digital Game Scale', 'Precíziós mérés, háttérvilágítással és kampóval.', 'Precision measurement with backlight and hook.', 12900, 7, 15, 1, '../képek/merleg.png');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tetelek`
--

CREATE TABLE `tetelek` (
  `id` int(11) NOT NULL,
  `rendelesId` int(11) NOT NULL,
  `termekId` int(11) NOT NULL,
  `mennyiseg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tetelek`
--

INSERT INTO `tetelek` (`id`, `rendelesId`, `termekId`, `mennyiseg`) VALUES
(31, 35, 2, 1),
(32, 36, 2, 1),
(33, 37, 68, 2);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`felhasznalonev`),
  ADD KEY `rangId` (`rangId`);

--
-- A tábla indexei `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `learazas`
--
ALTER TABLE `learazas`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rang`
--
ALTER TABLE `rang`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo` (`felhasznalo`),
  ADD KEY `szallitasId` (`szallitasId`);

--
-- A tábla indexei `szallitasicimek`
--
ALTER TABLE `szallitasicimek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo` (`felhasznalo`);

--
-- A tábla indexei `szoveg`
--
ALTER TABLE `szoveg`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `termek`
--
ALTER TABLE `termek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategoriaId` (`kategoriaId`),
  ADD KEY `learazasid` (`learazasid`);

--
-- A tábla indexei `tetelek`
--
ALTER TABLE `tetelek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rendelesId` (`rendelesId`),
  ADD KEY `termekId` (`termekId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `learazas`
--
ALTER TABLE `learazas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `rang`
--
ALTER TABLE `rang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT a táblához `szallitasicimek`
--
ALTER TABLE `szallitasicimek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `szoveg`
--
ALTER TABLE `szoveg`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT a táblához `tetelek`
--
ALTER TABLE `tetelek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD CONSTRAINT `felhasznalo_ibfk_1` FOREIGN KEY (`rangId`) REFERENCES `rang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `rendeles`
--
ALTER TABLE `rendeles`
  ADD CONSTRAINT `rendeles_ibfk_1` FOREIGN KEY (`felhasznalo`) REFERENCES `felhasznalo` (`felhasznalonev`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rendeles_ibfk_2` FOREIGN KEY (`szallitasId`) REFERENCES `szallitasicimek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `szallitasicimek`
--
ALTER TABLE `szallitasicimek`
  ADD CONSTRAINT `szallitasicimek_ibfk_1` FOREIGN KEY (`felhasznalo`) REFERENCES `felhasznalo` (`felhasznalonev`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `termek`
--
ALTER TABLE `termek`
  ADD CONSTRAINT `termek_ibfk_1` FOREIGN KEY (`learazasid`) REFERENCES `learazas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `termek_ibfk_2` FOREIGN KEY (`kategoriaId`) REFERENCES `kategoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `tetelek`
--
ALTER TABLE `tetelek`
  ADD CONSTRAINT `tetelek_ibfk_1` FOREIGN KEY (`rendelesId`) REFERENCES `rendeles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tetelek_ibfk_2` FOREIGN KEY (`termekId`) REFERENCES `termek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
