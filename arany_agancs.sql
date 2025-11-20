-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 20. 10:14
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
  `szamlazasicim` varchar(255) NOT NULL,
  `rangId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`felhasznalonev`, `jelszo`, `email`, `szamlazasicim`, `rangId`) VALUES
('admin', 'admin123', 'admin@aranyagancs.hu', 'Budapest, Admin tér 1.', 1),
('user1', 'pass1', 'user1@example.com', 'Budapest, Fő utca 1.', 2),
('user10', 'pass10', 'user10@example.com', 'Veszprém, Vár utca 10.', 3),
('user11', 'pass11', 'user11@example.com', 'Tatabánya, Fő tér 11.', 2),
('user12', 'pass12', 'user12@example.com', 'Békéscsaba, Bartók utca 7.', 2),
('user13', 'pass13', 'user13@example.com', 'Nagykanizsa, Erzsébet tér 9.', 3),
('user14', 'pass14', 'user14@example.com', 'Zalaegerszeg, Rákóczi út 6.', 2),
('user15', 'pass15', 'user15@example.com', 'Salgótarján, Madách utca 1.', 2),
('user16', 'pass16', 'user16@example.com', 'Miskolc, Petőfi tér 5.', 3),
('user17', 'pass17', 'user17@example.com', 'Kaposvár, Ady utca 7.', 3),
('user18', 'pass18', 'user18@example.com', 'Szombathely, Fő tér 4.', 2),
('user19', 'pass19', 'user19@example.com', 'Nyíregyháza, Kossuth tér 2.', 3),
('user2', 'pass2', 'user2@example.com', 'Debrecen, Piac utca 3.', 2),
('user3', 'pass3', 'user3@example.com', 'Győr, Baross Gábor út 5.', 3),
('user4', 'pass4', 'user4@example.com', 'Szeged, Kossuth Lajos utca 8.', 2),
('user5', 'pass5', 'user5@example.com', 'Pécs, Király utca 12.', 2),
('user6', 'pass6', 'user6@example.com', 'Sopron, Deák tér 2.', 3),
('user7', 'pass7', 'user7@example.com', 'Kecskemét, Petőfi S. utca 9.', 2),
('user8', 'pass8', 'user8@example.com', 'Eger, Dobó tér 4.', 2),
('user9', 'pass9', 'user9@example.com', 'Szolnok, Tisza park 3.', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoria`
--

CREATE TABLE `kategoria` (
  `id` int(11) NOT NULL,
  `kategoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategoria`
--

INSERT INTO `kategoria` (`id`, `kategoria`) VALUES
(1, 'Vadászruházat'),
(2, 'Fegyverek'),
(3, 'Távcsövek'),
(4, 'Lőszer'),
(5, 'Kések'),
(6, 'Csapdák'),
(7, 'Kiegészítők'),
(8, 'Terepfelszerelés'),
(9, 'Optika'),
(10, 'Vadászautó kiegészítők'),
(11, 'Táskák és tokok'),
(12, 'Karbantartás'),
(13, 'Éjjellátók'),
(14, 'Terepszínezés'),
(15, 'Kézmelegítők'),
(16, 'Kutyafelszerelés'),
(17, 'Hívók és sípok'),
(18, 'Trófea tartók'),
(19, 'Vadász könyvek'),
(20, 'Ajándéktárgyak');

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
(3, 'Vásáréó');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `id` int(11) NOT NULL,
  `felhasznalo` varchar(255) NOT NULL,
  `fizetve` tinyint(1) NOT NULL,
  `elkuldve` datetime NOT NULL,
  `teljesitve` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles`
--

INSERT INTO `rendeles` (`id`, `felhasznalo`, `fizetve`, `elkuldve`, `teljesitve`) VALUES
(1, 'user1', 1, '2025-11-01 10:00:00', '2025-11-03 12:00:00'),
(2, 'user2', 1, '2025-11-02 14:00:00', '2025-11-04 16:00:00'),
(3, 'user3', 0, '2025-11-05 09:00:00', '2025-11-06 11:00:00'),
(4, 'user4', 1, '2025-11-06 15:00:00', '2025-11-08 10:00:00'),
(5, 'user5', 0, '2025-11-07 12:00:00', '2025-11-08 18:00:00'),
(6, 'user6', 1, '2025-11-03 11:00:00', '2025-11-05 13:00:00'),
(7, 'user7', 1, '2025-11-09 13:00:00', '2025-11-11 15:00:00'),
(8, 'user8', 0, '2025-11-10 10:30:00', '2025-11-11 12:00:00'),
(9, 'user9', 1, '2025-11-01 08:30:00', '2025-11-02 09:00:00'),
(10, 'user10', 1, '2025-11-04 10:00:00', '2025-11-05 11:30:00'),
(11, 'user11', 0, '2025-11-02 13:00:00', '2025-11-03 16:00:00'),
(12, 'user12', 1, '2025-11-05 14:00:00', '2025-11-06 18:00:00'),
(13, 'user13', 1, '2025-11-06 10:00:00', '2025-11-07 15:00:00'),
(14, 'user14', 0, '2025-11-07 11:00:00', '2025-11-08 12:30:00'),
(15, 'user15', 1, '2025-11-08 12:00:00', '2025-11-09 14:00:00'),
(16, 'user16', 0, '2025-11-09 09:00:00', '2025-11-10 10:00:00'),
(17, 'user17', 1, '2025-11-10 14:00:00', '2025-11-11 17:00:00'),
(18, 'user18', 1, '2025-11-11 13:00:00', '2025-11-12 15:00:00'),
(19, 'user19', 1, '2025-11-12 10:00:00', '2025-11-13 11:00:00'),
(20, 'admin', 1, '2025-11-01 09:00:00', '2025-11-02 10:00:00');

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
(1, 'user1', 'Magyarország', 1011, 'Budapest', 'Fő utca 1.'),
(2, 'user2', 'Magyarország', 4025, 'Debrecen', 'Piac utca 3.'),
(3, 'user3', 'Magyarország', 9022, 'Győr', 'Baross út 5.'),
(4, 'user4', 'Magyarország', 6720, 'Szeged', 'Kossuth L. utca 8.'),
(5, 'user5', 'Magyarország', 7621, 'Pécs', 'Király utca 12.'),
(6, 'user6', 'Magyarország', 9400, 'Sopron', 'Deák tér 2.'),
(7, 'user7', 'Magyarország', 6000, 'Kecskemét', 'Petőfi S. utca 9.'),
(8, 'user8', 'Magyarország', 3300, 'Eger', 'Dobó tér 4.'),
(9, 'user9', 'Magyarország', 5000, 'Szolnok', 'Tisza park 3.'),
(10, 'user10', 'Magyarország', 8200, 'Veszprém', 'Vár utca 10.'),
(11, 'user11', 'Magyarország', 2800, 'Tatabánya', 'Fő tér 11.'),
(12, 'user12', 'Magyarország', 5600, 'Békéscsaba', 'Bartók utca 7.'),
(13, 'user13', 'Magyarország', 8800, 'Nagykanizsa', 'Erzsébet tér 9.'),
(14, 'user14', 'Magyarország', 8900, 'Zalaegerszeg', 'Rákóczi út 6.'),
(15, 'user15', 'Magyarország', 3100, 'Salgótarján', 'Madách utca 1.'),
(16, 'user16', 'Magyarország', 3525, 'Miskolc', 'Petőfi tér 5.'),
(17, 'user17', 'Magyarország', 7400, 'Kaposvár', 'Ady utca 7.'),
(18, 'user18', 'Magyarország', 9700, 'Szombathely', 'Fő tér 4.'),
(19, 'user19', 'Magyarország', 4400, 'Nyíregyháza', 'Kossuth tér 2.'),
(20, 'admin', 'Magyarország', 1011, 'Budapest', 'Admin tér 1.');

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
  `kep` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `termek`
--

INSERT INTO `termek` (`id`, `nev`, `nevEn`, `leiras`, `leirasEn`, `ar`, `kategoriaId`, `keszlet`, `learazasid`, `kep`) VALUES
(1, 'Terepmintás dzseki', 'Camo Jacket', 'Meleg, vízálló vadászdzseki.', 'Warm waterproof hunting jacket.', 34990, 1, 25, 3, ''),
(2, 'Vadászpuskatus', 'Shotgun Stock', 'Tölgyfából készült puskatus.', 'Oak shotgun stock.', 19990, 2, 10, 2, ''),
(3, 'Távcső 10x50', 'Binoculars 10x50', 'Kiváló látótávolság vadászathoz.', 'Excellent range for hunting.', 59990, 3, 15, 5, ''),
(4, 'Kaliber .308 lőszer', 'Caliber .308 Ammo', 'Prémium minőségű golyós lőszer.', 'Premium quality bullets.', 4990, 4, 200, 1, ''),
(5, 'Vadászkés', 'Hunting Knife', 'Rozsdamentes acél vadászkés.', 'Stainless steel hunting knife.', 12990, 5, 50, 4, ''),
(6, 'Róka csapda', 'Fox Trap', 'Professzionális élvefogó csapda.', 'Professional live trap.', 24990, 6, 12, 2, ''),
(7, 'Vadász sapka', 'Hunting Cap', 'Zöld terepmintás sapka.', 'Green camo hunting cap.', 3990, 1, 100, 1, ''),
(8, 'Terep hátizsák', 'Field Backpack', '50 literes vadászhátizsák.', '50L hunting backpack.', 17990, 8, 60, 3, ''),
(9, 'Vadászlámpa', 'Hunting Flashlight', 'Erős LED lámpa 300 méteres hatótávval.', 'Powerful 300m LED flashlight.', 14990, 8, 40, 5, ''),
(10, 'Optikai irányzék', 'Rifle Scope', '4-16x50 távcső irányzék.', '4-16x50 rifle scope.', 69990, 9, 20, 7, ''),
(11, 'Fegyvertisztító készlet', 'Gun Cleaning Kit', 'Teljes tisztító szett puskákhoz.', 'Complete cleaning kit for rifles.', 8990, 12, 80, 2, ''),
(12, 'Trófea tartó falap', 'Trophy Mount Board', 'Tölgyfából készült trófeaalap.', 'Oak trophy mount board.', 4990, 18, 150, 1, ''),
(13, 'Kutyanyakörv fényvisszaverővel', 'Reflective Dog Collar', 'Biztonságos és kényelmes.', 'Safe and comfortable.', 6990, 16, 60, 2, ''),
(14, 'Őz síp', 'Deer Caller', 'Őzhívó síp természetes hanggal.', 'Deer caller with natural tone.', 2990, 17, 200, 3, ''),
(15, 'Éjjellátó monokulár', 'Night Vision Monocular', 'Digitális éjjellátó készülék.', 'Digital night vision device.', 119990, 13, 8, 8, ''),
(16, 'Vadász bakancs', 'Hunting Boots', 'Vízálló, csúszásmentes talppal.', 'Waterproof non-slip boots.', 44990, 1, 30, 4, ''),
(17, 'Fegyvertok', 'Gun Case', 'Párnázott fegyvertok.', 'Padded gun case.', 15990, 11, 35, 5, ''),
(18, 'Kézmelegítő párna', 'Hand Warmer', 'Terepen hasznos hőpárna.', 'Field-use heat pack.', 1990, 15, 120, 1, ''),
(19, 'Vadászkalap', 'Hunting Hat', 'Gyapjúból készült kalap.', 'Woolen hunting hat.', 7990, 1, 50, 2, ''),
(20, 'Trófea tisztító folyadék', 'Trophy Cleaning Solution', 'Kíméletes csonttisztító szer.', 'Gentle bone cleaning fluid.', 2490, 18, 90, 3, '');

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
(1, 1, 1, 2),
(2, 1, 5, 1),
(3, 2, 3, 1),
(4, 3, 4, 2),
(5, 4, 6, 3),
(6, 5, 2, 1),
(7, 6, 7, 1),
(8, 7, 10, 2),
(9, 8, 8, 1),
(10, 9, 11, 1),
(11, 10, 12, 1),
(12, 11, 13, 2),
(13, 12, 14, 1),
(14, 13, 15, 2),
(15, 14, 16, 1),
(16, 15, 17, 3),
(17, 16, 18, 2),
(18, 17, 19, 1),
(19, 18, 20, 4),
(20, 19, 9, 1);

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
  ADD KEY `felhasznalo` (`felhasznalo`);

--
-- A tábla indexei `szallitasicimek`
--
ALTER TABLE `szallitasicimek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo` (`felhasznalo`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `szallitasicimek`
--
ALTER TABLE `szallitasicimek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `tetelek`
--
ALTER TABLE `tetelek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
  ADD CONSTRAINT `rendeles_ibfk_1` FOREIGN KEY (`felhasznalo`) REFERENCES `felhasznalo` (`felhasznalonev`) ON DELETE CASCADE ON UPDATE CASCADE;

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
