-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2019 at 08:44 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `insurance_system`
--
CREATE DATABASE IF NOT EXISTS `insurance_system` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `insurance_system`;

-- --------------------------------------------------------

--
-- Table structure for table `broker`
--

CREATE TABLE `broker` (
  `broker_ID` int(11) NOT NULL,
  `City` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bulding`
--

CREATE TABLE `bulding` (
  `id` int(11) NOT NULL,
  `estimate_Value` double NOT NULL,
  `address` varchar(150) NOT NULL,
  `type` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bulding`
--

INSERT INTO `bulding` (`id`, `estimate_Value`, `address`, `type`, `user_id`) VALUES
(1, 100000, 'abcd', '2 storey', 11);

-- --------------------------------------------------------

--
-- Table structure for table `bulling_quatation`
--

CREATE TABLE `bulling_quatation` (
  `Cover_Type` int(11) NOT NULL,
  `quotation_ID` int(11) NOT NULL,
  `broker_ID` int(11) NOT NULL,
  `building_ID` int(11) NOT NULL,
  `customer_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `clam_report`
--

CREATE TABLE `clam_report` (
  `Clam_ID` int(11) NOT NULL,
  `Amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_request`
--

CREATE TABLE `customer_request` (
  `Request_ID` int(11) NOT NULL,
  `is_Accepted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `poky_message`
--

CREATE TABLE `poky_message` (
  `Message_ID` int(11) NOT NULL,
  `M_Date` date NOT NULL,
  `Message_Des` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `policy_document`
--

CREATE TABLE `policy_document` (
  `Polidy_ID` int(11) NOT NULL,
  `Start_date` date NOT NULL,
  `Due_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `premum`
--

CREATE TABLE `premum` (
  `Premum_ID` int(11) NOT NULL,
  `Property_ID` int(11) NOT NULL,
  `Payment_date` date NOT NULL,
  `Payment_Amount` double NOT NULL,
  `Quatation_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `premum_details`
--

CREATE TABLE `premum_details` (
  `Premum_ID` int(11) NOT NULL,
  `Period` date NOT NULL,
  `Due_date` date NOT NULL,
  `Property_ID` int(11) NOT NULL,
  `Amount` double NOT NULL,
  `id_Pay` tinyint(1) NOT NULL,
  `Payment_Ex_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `privileges`
--

CREATE TABLE `privileges` (
  `privilege_ID` int(11) NOT NULL,
  `privilege_Name` varchar(150) NOT NULL,
  `privilege_Status` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `Property_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `quotation`
--

CREATE TABLE `quotation` (
  `Quotation_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `user` text NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`user`, `role_id`) VALUES
('Admin', 1),
('Customer', 2),
('Broker', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` text NOT NULL,
  `phone_num` varchar(25) NOT NULL,
  `nic` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `isActivated` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `address`, `city`, `phone_num`, `nic`, `password`, `email`, `role_id`, `isActivated`) VALUES
(2, 'Tharindu Kulasinghe', 'ssde', '', '774625226', '951751286v', '$2b$10$1MSL7WzAKwvYaxvxHd6aJe65zDK/F0GZ9FmHAWlCE2ckRp2E4.FK2', 'T@gmail.com', 1, 0),
(4, 'Tharindu Dilshan', 'fddfadfasdfadf', '', '0774625226', '951751294v', '$2b$10$XmV8RyeIiuGNAXl85W3D3uWn0265YnypWoUQ1HYFAIVczwpAA3PLC', 'dilshantharinduk@gmail.com', 1, 0),
(7, 'Ravindu Kulasinghe', 'No 62/3/1,Ratnapura', '', '0715326215', '951751286v', '$2b$10$97W5a1WWYiCLtQlScrjfs.PuV5hZaKoQr9vRpkRuv2Jt9MyVHZL.C', 'ravindu@gmail.com', 2, 0),
(8, 'Ravindu Kulasinghe', 'No 62/3/1,Ratnapura', '', '0715326215', '951751286v', '$2b$10$97W5a1WWYiCLtQlScrjfs.PuV5hZaKoQr9vRpkRuv2Jt9MyVHZL.C', 'ravindu@gmail.com', 3, 1),
(9, 'Bisendi Kulasinghe', 'efasdfasdfasdf', 'Galle', '0774625226', '951751294v', '$2b$10$7/Y8QI7qUkoFJNlSZJgxVO1irtvpwa0Fo.Dqjvyk6PlOEeLBQeRKi', 'testadmin@ins.com', 1, 1),
(11, 'Test Customer', 'sfzdfzd', 'Galle', '0774625226', '951751294v', '$2b$10$IwiBIFmm06WA3jQwplw5l.uHs6RTwXlQ4pn.DrD5ubfl2Sv7fKm1m', 'testcustomer@ins.com', 2, 0),
(12, 'Dilan Sachintha', 'abcd', 'Galle', '1234567890', '123456789', '$2b$10$5pr7TH/nBvbrPDh.fqJQLupHV/UmJVAH7sQzuTIpvU1/vcdbgkEzm', 'dilansachinthanos@gmail.com', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `vehicle_ID` int(11) NOT NULL,
  `Model` varchar(20) NOT NULL,
  `type` varchar(50) NOT NULL,
  `number` varchar(50) NOT NULL,
  `Mauf_Year` varchar(10) NOT NULL,
  `Market_Value` double NOT NULL,
  `v_usage` varchar(200) NOT NULL,
  `fugi_type` varchar(20) NOT NULL,
  `meta` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`vehicle_ID`, `Model`, `type`, `number`, `Mauf_Year`, `Market_Value`, `v_usage`, `fugi_type`, `meta`, `user_id`) VALUES
(15, 'vb', 'vb', 'cfvb', 'vb', 0, 'vb', 'vb', 'vbn', 11),
(16, 'qwsdf', 'qasd', 'sdfgh', 'qwsd', 0, 'qwe', 'qwde', 'qwed', 11);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_quatation`
--

CREATE TABLE `vehicle_quatation` (
  `Quatation_ID` int(11) NOT NULL,
  `Insurance_Type` varchar(50) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `vehicle_ID` int(11) NOT NULL,
  `broker_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `broker`
--
ALTER TABLE `broker`
  ADD PRIMARY KEY (`broker_ID`);

--
-- Indexes for table `bulding`
--
ALTER TABLE `bulding`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property constraint` (`user_id`);

--
-- Indexes for table `bulling_quatation`
--
ALTER TABLE `bulling_quatation`
  ADD KEY `a` (`broker_ID`),
  ADD KEY `b` (`building_ID`),
  ADD KEY `c` (`customer_ID`);

--
-- Indexes for table `clam_report`
--
ALTER TABLE `clam_report`
  ADD PRIMARY KEY (`Clam_ID`);

--
-- Indexes for table `customer_request`
--
ALTER TABLE `customer_request`
  ADD PRIMARY KEY (`Request_ID`);

--
-- Indexes for table `poky_message`
--
ALTER TABLE `poky_message`
  ADD PRIMARY KEY (`Message_ID`);

--
-- Indexes for table `policy_document`
--
ALTER TABLE `policy_document`
  ADD PRIMARY KEY (`Polidy_ID`);

--
-- Indexes for table `premum`
--
ALTER TABLE `premum`
  ADD PRIMARY KEY (`Premum_ID`);

--
-- Indexes for table `premum_details`
--
ALTER TABLE `premum_details`
  ADD PRIMARY KEY (`Premum_ID`);

--
-- Indexes for table `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`privilege_ID`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`Property_ID`);

--
-- Indexes for table `quotation`
--
ALTER TABLE `quotation`
  ADD PRIMARY KEY (`Quotation_ID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_id` (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `id` (`user_id`,`fullname`,`address`,`phone_num`,`nic`,`email`,`role_id`,`isActivated`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`vehicle_ID`),
  ADD KEY `vehicle constraint` (`user_id`);

--
-- Indexes for table `vehicle_quatation`
--
ALTER TABLE `vehicle_quatation`
  ADD PRIMARY KEY (`Quatation_ID`),
  ADD KEY `user constraint` (`customer_id`),
  ADD KEY `broker constraint` (`broker_ID`),
  ADD KEY `vehi constraint` (`vehicle_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `broker`
--
ALTER TABLE `broker`
  MODIFY `broker_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bulding`
--
ALTER TABLE `bulding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `clam_report`
--
ALTER TABLE `clam_report`
  MODIFY `Clam_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_request`
--
ALTER TABLE `customer_request`
  MODIFY `Request_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poky_message`
--
ALTER TABLE `poky_message`
  MODIFY `Message_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `policy_document`
--
ALTER TABLE `policy_document`
  MODIFY `Polidy_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `premum`
--
ALTER TABLE `premum`
  MODIFY `Premum_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `premum_details`
--
ALTER TABLE `premum_details`
  MODIFY `Premum_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `privilege_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `Property_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quotation`
--
ALTER TABLE `quotation`
  MODIFY `Quotation_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `vehicle_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vehicle_quatation`
--
ALTER TABLE `vehicle_quatation`
  MODIFY `Quatation_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bulding`
--
ALTER TABLE `bulding`
  ADD CONSTRAINT `property constraint` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `bulling_quatation`
--
ALTER TABLE `bulling_quatation`
  ADD CONSTRAINT `a` FOREIGN KEY (`broker_ID`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `b` FOREIGN KEY (`building_ID`) REFERENCES `bulding` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `c` FOREIGN KEY (`customer_ID`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `roles` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

--
-- Constraints for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD CONSTRAINT `vehicle constraint` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vehicle_quatation`
--
ALTER TABLE `vehicle_quatation`
  ADD CONSTRAINT `broker constraint` FOREIGN KEY (`broker_ID`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user constraint` FOREIGN KEY (`customer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vehi constraint` FOREIGN KEY (`vehicle_ID`) REFERENCES `vehicle` (`vehicle_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
