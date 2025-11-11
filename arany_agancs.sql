-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 11. 18:45
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

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
CREATE DATABASE IF NOT EXISTS `arany_agancs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `arany_agancs`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasználó`
--

CREATE TABLE `felhasználó` (
  `felhasználónév` varchar(255) NOT NULL,
  `jelszó` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `számlázásicím` varchar(255) NOT NULL,
  `rangId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasználó`
--

INSERT INTO `felhasználó` (`felhasználónév`, `jelszó`, `email`, `számlázásicím`, `rangId`) VALUES
('admin', 'admin', 'admin@gmail.com', 'teszt', 12345);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategória`
--

CREATE TABLE `kategória` (
  `id` int(11) NOT NULL,
  `kategória` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategória`
--

INSERT INTO `kategória` (`id`, `kategória`) VALUES
(54321, 'ruházat');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `leárazás`
--

CREATE TABLE `leárazás` (
  `id` int(11) NOT NULL,
  `LeárazásMértéke` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `leárazás`
--

INSERT INTO `leárazás` (`id`, `LeárazásMértéke`) VALUES
(11111, 20);

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
(12345, 'admin');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendelés`
--

CREATE TABLE `rendelés` (
  `id` int(11) NOT NULL,
  `felhasználó` varchar(255) NOT NULL,
  `fizetve` tinyint(1) NOT NULL,
  `elküldve` datetime NOT NULL,
  `teljesítve` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendelés`
--

INSERT INTO `rendelés` (`id`, `felhasználó`, `fizetve`, `elküldve`, `teljesítve`) VALUES
(647648, 'admin', 1, '2025-11-11 18:44:52', '2025-11-11 18:44:52');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szállításicímek`
--

CREATE TABLE `szállításicímek` (
  `id` int(11) NOT NULL,
  `felhasználó` varchar(255) NOT NULL,
  `ország` varchar(255) NOT NULL,
  `irányítószám` int(11) NOT NULL,
  `város` varchar(255) NOT NULL,
  `utca` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `szállításicímek`
--

INSERT INTO `szállításicímek` (`id`, `felhasználó`, `ország`, `irányítószám`, `város`, `utca`) VALUES
(9999, 'admin', 'Magyarország', 8184, 'Balatonfűzfő', 'Gagarin utca 3');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termék`
--

CREATE TABLE `termék` (
  `id` int(11) NOT NULL,
  `név` varchar(255) NOT NULL,
  `névEn` varchar(255) NOT NULL,
  `leírás` varchar(255) NOT NULL,
  `leírásEn` varchar(255) NOT NULL,
  `ár` int(11) NOT NULL,
  `kategóriaId` int(11) NOT NULL,
  `készlet` int(11) NOT NULL,
  `leárazásid` int(11) NOT NULL,
  `kép` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `termék`
--

INSERT INTO `termék` (`id`, `név`, `névEn`, `leírás`, `leírásEn`, `ár`, `kategóriaId`, `készlet`, `leárazásid`, `kép`) VALUES
(55555, 'kabát', 'jacket', 'több rétegű kabát', 'multi-layer jacket', 12000, 54321, 67, 11111, '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tételek`
--

CREATE TABLE `tételek` (
  `id` int(11) NOT NULL,
  `rendelésId` int(11) NOT NULL,
  `termékId` int(11) NOT NULL,
  `mennyiség` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `tételek`
--

INSERT INTO `tételek` (`id`, `rendelésId`, `termékId`, `mennyiség`) VALUES
(76543456, 647648, 55555, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasználó`
--
ALTER TABLE `felhasználó`
  ADD PRIMARY KEY (`felhasználónév`),
  ADD KEY `rangId` (`rangId`);

--
-- A tábla indexei `kategória`
--
ALTER TABLE `kategória`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `leárazás`
--
ALTER TABLE `leárazás`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rang`
--
ALTER TABLE `rang`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rendelés`
--
ALTER TABLE `rendelés`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasználó` (`felhasználó`);

--
-- A tábla indexei `szállításicímek`
--
ALTER TABLE `szállításicímek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasználó` (`felhasználó`);

--
-- A tábla indexei `termék`
--
ALTER TABLE `termék`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategóriaId` (`kategóriaId`),
  ADD KEY `leárazásid` (`leárazásid`);

--
-- A tábla indexei `tételek`
--
ALTER TABLE `tételek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rendelésId` (`rendelésId`),
  ADD KEY `termékId` (`termékId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kategória`
--
ALTER TABLE `kategória`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54322;

--
-- AUTO_INCREMENT a táblához `leárazás`
--
ALTER TABLE `leárazás`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11112;

--
-- AUTO_INCREMENT a táblához `rang`
--
ALTER TABLE `rang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12346;

--
-- AUTO_INCREMENT a táblához `rendelés`
--
ALTER TABLE `rendelés`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=647649;

--
-- AUTO_INCREMENT a táblához `szállításicímek`
--
ALTER TABLE `szállításicímek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10000;

--
-- AUTO_INCREMENT a táblához `termék`
--
ALTER TABLE `termék`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55556;

--
-- AUTO_INCREMENT a táblához `tételek`
--
ALTER TABLE `tételek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76543457;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `felhasználó`
--
ALTER TABLE `felhasználó`
  ADD CONSTRAINT `felhasználó_ibfk_1` FOREIGN KEY (`rangId`) REFERENCES `rang` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `rendelés`
--
ALTER TABLE `rendelés`
  ADD CONSTRAINT `rendelés_ibfk_1` FOREIGN KEY (`felhasználó`) REFERENCES `felhasználó` (`felhasználónév`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `szállításicímek`
--
ALTER TABLE `szállításicímek`
  ADD CONSTRAINT `szállításicímek_ibfk_1` FOREIGN KEY (`felhasználó`) REFERENCES `felhasználó` (`felhasználónév`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `termék`
--
ALTER TABLE `termék`
  ADD CONSTRAINT `termék_ibfk_1` FOREIGN KEY (`leárazásid`) REFERENCES `leárazás` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `termék_ibfk_2` FOREIGN KEY (`kategóriaId`) REFERENCES `kategória` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `tételek`
--
ALTER TABLE `tételek`
  ADD CONSTRAINT `tételek_ibfk_1` FOREIGN KEY (`rendelésId`) REFERENCES `rendelés` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tételek_ibfk_2` FOREIGN KEY (`termékId`) REFERENCES `termék` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
