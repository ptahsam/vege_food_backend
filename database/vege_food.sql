-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2022 at 01:49 PM
-- Server version: 10.4.24-MariaDB
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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `date_registered` varchar(20) NOT NULL,
  `last_logindate` varchar(20) NOT NULL,
  `update_date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `name`, `email`, `password`, `profile_image`, `date_registered`, `last_logindate`, `update_date`) VALUES
(1, 'admin', 'Admin', 'admin@vegefood.com', '$2y$08$2aAG/167.His7/Lgu.Twgu.lu3lmeEy5vVPmU4QlEGjjMnTuVII.m', '', '1668417199', '', '');

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

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `items_no`, `added_date`) VALUES
(67, 6, 23, 1, '1668497175');

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
(3, 'Cereals', 'cereals.webp', '1665569606'),
(4, 'Beverages', '596518beverages-removebg-preview.png', '1669822589');

-- --------------------------------------------------------

--
-- Table structure for table `mpesa_info`
--

CREATE TABLE `mpesa_info` (
  `id` int(11) NOT NULL,
  `payment_refno` varchar(100) NOT NULL,
  `MerchantRequestID` varchar(100) NOT NULL,
  `CheckoutRequestID` varchar(100) NOT NULL,
  `ResultCode` varchar(20) NOT NULL,
  `ResultDesc` text NOT NULL,
  `Amount` varchar(20) NOT NULL,
  `MpesaReceiptNumber` varchar(20) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `TransactionDate` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_refno` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_id` varchar(40) NOT NULL,
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
-- Table structure for table `payments_table`
--

CREATE TABLE `payments_table` (
  `id` int(11) NOT NULL,
  `payment_refno` varchar(100) NOT NULL,
  `payment_type` varchar(20) NOT NULL,
  `payment_purpose` varchar(20) NOT NULL,
  `payment_amount` varchar(20) NOT NULL,
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
(9, 2, 'Blackberries', '60', '5690', 'blackberry.png', 'Nice blackberry fruits', '1666788457'),
(22, 2, 'Ripen Bananas', '20', '4500', '960317the-fruits-of-thailand-1-removebg-preview.png', 'Sweet yellow ripen bananas', '1668423303'),
(23, 2, 'Straw Berries', '50', '3200', '137074fruits-in-german-2-removebg-preview.png', 'Fresh straw berries for sale', '1668426980'),
(25, 1, 'African night shade(Manangu)', '50', '6790', '982749Managu_Osuga-removebg-preview.png', 'Easy to prepare nutritious ', '1668854616'),
(27, 1, 'Cauliflower', '70', '1240', '634088cauliflower-white-background-clipping-path-cauliflower-white-background-109470967-removebg-preview.png', 'Sweet organically grown cauliflower', '1668859520'),
(28, 1, 'Broccoli cauliflower', '90', '290', '589154122-1223278_chinese-broccoli-cauliflower-vegetable-nutrition-broccoli-png-transparent-removebg-preview.png', 'Green broccoli cauliflower', '1668859749'),
(29, 3, 'I kg Dawaat Biryani Rice', '250', '3400', '32467dawaat-removebg-preview.png', '\r\nDaawat Biryani, World\'s Longest Grain, Aged Basmati Rice, 1 Kg', '1668870563'),
(30, 3, 'Daawat Ultima Extra Long Grain Basmati Rice', '270', '780', '587504dawaat1-removebg-preview.png', '\r\nDaawat Ultima Extra Long Grain Basmati Rice', '1668871383'),
(31, 1, 'Fresh Basket Packed Carrot - English, 1kg Pack', '65', '4800', '363024carrot-removebg-preview.png', '\r\nFresh Basket Packed Carrot - English, 1kg Pack', '1668872005'),
(33, 2, 'Dry A grade yellow onion', '1', '5690', '122460ezgif.com-gif-maker-removebg-preview.png', 'Dry A grade yellow onion', '1669460618'),
(34, 1, 'Red bulb onion', '1', '6700', '962661red-onion-removebg-preview.png', 'Red bulb onion', '1669460730');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_table`
--

CREATE TABLE `transaction_table` (
  `id` int(11) NOT NULL,
  `ref_no` varchar(100) NOT NULL,
  `transaction_id` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `date_added` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_table`
--

INSERT INTO `transaction_table` (`id`, `ref_no`, `transaction_id`, `status`, `date_added`) VALUES
(1, 'VG63A1A261E67F9', 'ws_CO_20122022145423388706209779', 'paid', '1671537276');

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
(1, 'peter samuel', '0706209779', 'ptahsamuel@gmail.com', '90200CAP2229837311134588126.jpg', '$2y$08$fAQmDJIg5TM7y6PF1My.gu2/O3.SANrv5dYivglPxS.bC4e.J0k6y', '1666859871'),
(4, 'Peter Samuel', '', 'petersamuelsam6@gmail.com', 'https://lh3.googleusercontent.com/a/ALm5wu3IP8dCMWEc1ul2C4k1uNt7ggj3NURYgs8QTgz-=s96-c', '', '1668083619'),
(5, 'samuel peter', '', 'fromtuk@gmail.com', 'https://lh3.googleusercontent.com/a/ALm5wu1dbMONKTlwrMAoKp1Yl1mgzXjSgvG0F5B6J-IT=s96-c', '', '1668085722'),
(6, 'John Hantes', '0789209778', '', '8806352022-05-29.21.56.010', '$2y$08$N4mJQ1VgeUFy8q2ez3vhCuML.I.QcYhFOI9v1sahtXGJ4AL3ndLSa', '1668441706');

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
(1, 1, 'Greatwall, Pridelands, Athiriver', 'Machakos', 'Athiriver, Pridelands', '1666859871'),
(4, 4, 'Kitui', 'Kwavonza', 'Kyaithani', '1668083620'),
(5, 5, '', '', '', '1668085722'),
(6, 6, 'Narok', 'Narok', '', '1668441706');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `mpesa_info`
--
ALTER TABLE `mpesa_info`
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
-- Indexes for table `payments_table`
--
ALTER TABLE `payments_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction_table`
--
ALTER TABLE `transaction_table`
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
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `mpesa_info`
--
ALTER TABLE `mpesa_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders_info`
--
ALTER TABLE `orders_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments_table`
--
ALTER TABLE `payments_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `transaction_table`
--
ALTER TABLE `transaction_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
