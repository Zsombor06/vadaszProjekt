-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Már 17. 13:03
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
(54, 'Kijelentkezés', 'Log out');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `szoveg`
--
ALTER TABLE `szoveg`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `szoveg`
--
ALTER TABLE `szoveg`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
