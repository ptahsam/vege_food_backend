-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 28, 2022 at 08:45 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vege_food`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `items_no` int(11) NOT NULL,
  `added_date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_image` varchar(100) NOT NULL,
  `created_date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `category_image`, `created_date`) VALUES
(1, 'Vegetables', 'vegetables.jpeg', '1665569201'),
(2, 'Fruits', 'fruits.jpeg', '1665569352'),
(3, 'Cereals', 'cereals.webp', '1665569606');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_refno` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `date_added` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders_info`
--

CREATE TABLE `orders_info` (
  `id` int(11) NOT NULL,
  `order_ref` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `items_no` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `date_added` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` varchar(100) NOT NULL,
  `product_quantity` varchar(100) NOT NULL,
  `product_photo` varchar(255) NOT NULL,
  `product_description` text NOT NULL,
  `date_added` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `product_name`, `product_price`, `product_quantity`, `product_photo`, `product_description`, `date_added`) VALUES
(1, 1, 'Cabbage', '40', '3200', 'cabbage.png', 'Fresh organic cabbage for sale', '1665504884'),
(2, 1, 'Sukuma Wiki', '30', '24500', 'sukumawiki.png', 'Fresh organic sukuma wiki for sale', '1665511099'),
(3, 1, 'Kales', '25', '567890', 'kales.png', 'Fresh organic kales for sale', '1665567369'),
(4, 2, 'Mango', '15', '4100', 'mango.png', 'Fresh organic mango for sale', '1665636392'),
(5, 3, 'Green Corn', '10', '46790', 'greencorn.png', 'Green corn from Salmwe farm. Sweet and tender for your dietary needs', '1665662071'),
(6, 2, 'Pomme dalinette large', '35', '678', 'pomme.png', 'Sweet red apple', '1666081005'),
(7, 2, 'Green Pomme dalinette large apple', '50', '6060', 'green-apple.png', 'Green apple with better health benefits', '1666081220'),
(8, 2, 'Planthub Custard Apple Fruit Seed', '50', '608', 'squamosa.png', 'Planthub Custard Apple Fruit Seed, Sugar Apple, Annona Squamosa - Pack of 20 Seeds', '1666081982'),
(9, 2, 'Blackberries', '60', '5690', 'blackberry.png', 'Nice blackberry fruits', '1666788457');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(40) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `user_photo` varchar(200) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `date_added` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `user_phone`, `user_email`, `user_photo`, `user_password`, `date_added`) VALUES
(1, 'Peter Samuel', '0706209779', 'ptahsamuel@gmail.com', '', '$2y$08$fAQmDJIg5TM7y6PF1My.gu2/O3.SANrv5dYivglPxS.bC4e.J0k6y', '1666859871');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` varchar(100) NOT NULL,
  `county` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `date_added` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `address`, `county`, `city`, `date_added`) VALUES
(1, 1, 'Greatwall, Pridelands, Athiriver', 'Machakos', 'Athiriver, Pridelands', '1666859871');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders_info`
--
ALTER TABLE `orders_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders_info`
--
ALTER TABLE `orders_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
