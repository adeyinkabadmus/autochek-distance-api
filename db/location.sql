-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 02, 2021 at 05:22 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `autochek_location`
--

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) UNSIGNED NOT NULL,
  `longitude` double(9,6) NOT NULL,
  `latitude` double(8,6) NOT NULL,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `longitude`, `latitude`, `last_updated`) VALUES
(2, 6.330000, 2.430000, '2021-06-02 14:35:22'),
(4, 6.330000, 2.430000, '2021-06-02 14:37:39'),
(5, 6.330000, 2.430000, '2021-06-02 14:37:40'),
(6, 6.330000, 2.430000, '2021-06-02 14:37:40'),
(7, 6.330000, 2.430000, '2021-06-02 14:37:41'),
(8, 6.330000, 2.430000, '2021-06-02 14:37:42'),
(9, 6.330000, 2.430000, '2021-06-02 14:37:42'),
(10, 6.330000, 2.430000, '2021-06-02 14:37:43'),
(100, 5.330000, 2.430000, '2021-06-02 17:54:59');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `website_url` varchar(1000) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `phone`, `website_url`, `created_at`) VALUES
(1, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:29:54'),
(3, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:35:22'),
(4, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:37:38'),
(5, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:37:39'),
(6, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:37:40'),
(7, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:37:40'),
(8, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:37:41'),
(9, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:37:42'),
(10, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:37:42'),
(11, 'Adeyinka', '09034342570', NULL, '2021-06-02 14:37:43');

-- --------------------------------------------------------

--
-- Table structure for table `user_location`
--

CREATE TABLE `user_location` (
  `id` int(11) UNSIGNED NOT NULL,
  `location_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_location`
--

INSERT INTO `user_location` (`id`, `location_id`, `user_id`) VALUES
(2, 2, 3),
(3, 100, 4),
(4, 4, 5),
(5, 5, 6),
(6, 6, 7),
(7, 7, 8),
(8, 8, 9),
(9, 9, 10),
(10, 10, 11);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_location`
--
ALTER TABLE `user_location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_coord` (`location_id`),
  ADD KEY `location_user` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_location`
--
ALTER TABLE `user_location`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_location`
--
ALTER TABLE `user_location`
  ADD CONSTRAINT `location_coord` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `location_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
