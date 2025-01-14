-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2025 at 05:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `b59_finaltask_a`
--

-- --------------------------------------------------------

--
-- Table structure for table `hero_tb`
--

CREATE TABLE `hero_tb` (
  `id` varchar(6) NOT NULL,
  `name` varchar(20) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `id_user` varchar(6) DEFAULT NULL,
  `id_type` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_tb`
--

INSERT INTO `hero_tb` (`id`, `name`, `photo`, `id_user`, `id_type`) VALUES
('HER001', 'Del mora', 'phsdaww.jpg', 'USR002', 'TYP002'),
('HER002', 'Batman', 'phBatmansdaww.jpg', 'USR001', 'TYP002'),
('HER003', 'Flash', 'phsdFlashaww.jpg', 'USR005', 'TYP003'),
('HER004', 'Iron Man', 'phsMandaww.jpg', 'USR001', 'TYP004'),
('HER005', 'Superman', 'phsdasdsdww.jpg', 'USR002', 'TYP002'),
('HER006', 'Green Arrow', 'phsdgreenaww.jpg', 'USR001', 'TYP003'),
('HER007', 'Ricardo Milos', 'phsricardodaww.jpg', 'USR003', 'TYP002'),
('HER008', 'Black Widow', 'phBlacksdaww.jpg', 'USR004', 'TYP002'),
('HER009', 'DeadPool', 'phsdaldeadpoolww.jpg', 'USR005', 'TYP005'),
('HER010', 'Hulk', 'hulkphsdaww.jpg', 'USR003', 'TYP002'),
('HER011', 'Loki', 'phlokisdaww.jpg', 'USR004', 'TYP004'),
('HER012', 'Thor', 'phsthordaww.jpg', 'USR001', 'TYP001');

-- --------------------------------------------------------

--
-- Table structure for table `type_tb`
--

CREATE TABLE `type_tb` (
  `id` varchar(6) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type_tb`
--

INSERT INTO `type_tb` (`id`, `name`) VALUES
('TYP001', 'durability'),
('TYP002', 'agility'),
('TYP003', 'hp'),
('TYP004', 'strengh'),
('TYP005', 'mana');

-- --------------------------------------------------------

--
-- Table structure for table `user_tb`
--

CREATE TABLE `user_tb` (
  `id` varchar(6) NOT NULL,
  `email` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tb`
--

INSERT INTO `user_tb` (`id`, `email`, `username`, `password`) VALUES
('USR001', 'budi@gmail.com', 'budi hidayat', 'root'),
('USR002', 'randi@gmail.com', 'randi yusuf', 'user'),
('USR003', 'dimas@gmail.com', 'dimas wahyu', 'user'),
('USR004', 'rudy@gmail.com', 'rudy rahmat', 'root'),
('USR005', 'dayat@gmail.com', 'dayat hartono', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hero_tb`
--
ALTER TABLE `hero_tb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_type` (`id_type`);

--
-- Indexes for table `type_tb`
--
ALTER TABLE `type_tb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_tb`
--
ALTER TABLE `user_tb`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hero_tb`
--
ALTER TABLE `hero_tb`
  ADD CONSTRAINT `hero_tb_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user_tb` (`id`),
  ADD CONSTRAINT `hero_tb_ibfk_2` FOREIGN KEY (`id_type`) REFERENCES `type_tb` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
