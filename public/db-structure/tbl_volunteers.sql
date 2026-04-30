-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 14, 2026 at 01:11 PM
-- Server version: 10.6.25-MariaDB
-- PHP Version: 8.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `volunteermedic_vmcdbase_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_volunteers`
--

CREATE TABLE `tbl_volunteers` (
  `vol_id` int(11) NOT NULL,
  `vol_vid` varchar(100) NOT NULL,
  `vol_fname` varchar(100) NOT NULL,
  `vol_lname` varchar(100) NOT NULL,
  `vol_email` varchar(100) NOT NULL,
  `vol_phone` varchar(100) NOT NULL,
  `vol_bio` longtext NOT NULL,
  `vol_pwd` varchar(100) NOT NULL,
  `vol_img` varchar(100) NOT NULL,
  `vol_gender` varchar(100) NOT NULL,
  `vol_dob` varchar(100) NOT NULL,
  `vol_profession` varchar(100) NOT NULL,
  `vol_qualification` varchar(30) NOT NULL,
  `vol_preferred` varchar(100) NOT NULL,
  `vol_church` varchar(100) NOT NULL,
  `vol_location` varchar(100) NOT NULL,
  `vol_country` varchar(100) NOT NULL,
  `vol_blood` varchar(100) DEFAULT NULL,
  `vol_newsletter` int(11) DEFAULT NULL,
  `vol_volunteer` int(11) NOT NULL,
  `vol_stats` int(11) NOT NULL,
  `vol_date` date NOT NULL,
  `vol_time` varchar(8) NOT NULL,
  `ref` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_volunteers`
--
ALTER TABLE `tbl_volunteers`
  ADD PRIMARY KEY (`vol_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_volunteers`
--
ALTER TABLE `tbl_volunteers`
  MODIFY `vol_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
