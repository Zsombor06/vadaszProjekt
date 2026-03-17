-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Már 17. 16:24
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
(2, 'Fegyverek', 'Weapons'),
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
(1, 'user', 1, '2026-03-03 17:01:30', '2026-03-17 16:14:58', NULL, 1),
(35, 'user', 0, NULL, NULL, NULL, NULL),
(36, 'admin', 0, NULL, NULL, NULL, NULL);

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
(67, 'Rendelés azonosítója', "Order's ID"),
(68, 'Elküldés dátuma', 'Date of sending'),
(69, 'Teljesítés dátuma', 'Date of completion');

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
(20, 'Trófea tisztító folyadék', 'Trophy Cleaning Solution', 'Kíméletes csonttisztító szer.', 'Gentle bone cleaning fluid.', 2490, 18, 90, 3, '../képek/trofeatisztito.png');

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
(31, 35, 2, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT a táblához `szallitasicimek`
--
ALTER TABLE `szallitasicimek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `szoveg`
--
ALTER TABLE `szoveg`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `tetelek`
--
ALTER TABLE `tetelek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
