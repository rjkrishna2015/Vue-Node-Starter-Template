-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 04, 2022 at 06:38 PM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `home_dp`
--

-- --------------------------------------------------------

--
-- Table structure for table `common_users`
--

DROP TABLE IF EXISTS `common_users`;
CREATE TABLE IF NOT EXISTS `common_users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(255) NOT NULL,
  `USER_DISPLAY_NAME` varchar(255) NOT NULL,
  `USER_PWD` varchar(255) NOT NULL,
  `USER_EMAIL` varchar(255) NOT NULL,
  `USER_AVATAR_COLOR` varchar(11) NOT NULL,
  `USER_TOKEN` varchar(255) NOT NULL,
  `USER_OTP` int(11) NOT NULL,
  `USER_OTP_EXPIRE` datetime NOT NULL,
  `USER_LAST_LOGIN` datetime NOT NULL,
  `USER_TYPE` varchar(11) NOT NULL,
  `USER_STATUS` enum('Y','N') NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `common_users`
--

INSERT INTO `common_users` (`ID`, `USER_NAME`, `USER_DISPLAY_NAME`, `USER_PWD`, `USER_EMAIL`, `USER_AVATAR_COLOR`, `USER_TOKEN`, `USER_OTP`, `USER_OTP_EXPIRE`, `USER_LAST_LOGIN`, `USER_TYPE`, `USER_STATUS`) VALUES
(1, 'yash', 'Yash Sharma', '3dded7259cacb37ef39c9cd408b525abacfed488', 'yashsharma.karate@gmail.com', '#9653cf', '4cf23cbf-91be-4836-ad5f-36b2cd926aa2', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'U', 'Y'),
(2, 'rjkrishna', 'Ram Jee', 'c2ba91d7a3a67be4645290b50967aebb22e8be3f', 'rjkrishna2015@gmail.com', '#13fd64', '5c1e026a-34b8-4e68-be94-7c5cb0c11308', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'U', 'Y');
