<?php

/**
 * 
 */
class Service 
{
	
	function __construct()
	{
		include_once("../database/db.php");
		$db = new Database();
		$this->con = $db->connect();
	}

	public function clearUserCart($userid)
	{
		$pre_stmt = $this->con->prepare("DELETE FROM `cart` WHERE user_id = ?");
		$pre_stmt->bind_param("i", $userid);
		$result = $pre_stmt->execute() or die($this->con->error);
		if($result) {
			return "SUCCESSFULLY_CLEARED";
		}
		return "UNKNOWN_ERROR";
	}

	public function addItemToCart($userid, $productid, $productquantity)
	{
		$pre_stmt = $this->con->prepare("SELECT * FROM cart WHERE user_id = ? AND product_id = ?");
		$pre_stmt->bind_param("ii", $userid, $productid);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			$quantity = $row['items_no'] + $productquantity;
			$date_added = time();
			$pre_stmt = $this->con->prepare("UPDATE `cart` SET `items_no`=?,`added_date`=? WHERE user_id = ? AND product_id = ?");
			$pre_stmt->bind_param("isii", $quantity, $date_added, $userid, $productid);
			$result = $pre_stmt->execute() or die($this->con);
			if($result) {
				return "SUCCESSFULLY_ADDED";
			}
			return "UNKNOWN_ERROR";
		}else{
			$date_added = time();
			$pre_stmt = $this->con->prepare("INSERT INTO `cart`(`user_id`, `product_id`, `items_no`, `added_date`) VALUES (?,?,?,?)");
			$pre_stmt->bind_param("iiis", $userid, $productid, $productquantity, $date_added);
			$result = $pre_stmt->execute() or die($this->con->error);
			if($result) {
				return "SUCCESSFULLY_ADDED";
			}
			return "UNKNOWN_ERROR";
		}
	}

	public function removeItemFromCart($userid, $productid, $productquantity)
	{
		$pre_stmt = $this->con->prepare("SELECT * FROM cart WHERE user_id = ? AND product_id = ?");
		$pre_stmt->bind_param("ii", $userid, $productid);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			if ($row['items_no'] > 1) {
				$quantity = $row['items_no'] - $productquantity;
				$date_added = time();
				$pre_stmt = $this->con->prepare("UPDATE `cart` SET `items_no`=?,`added_date`=? WHERE user_id = ? AND product_id = ?");
				$pre_stmt->bind_param("isii", $quantity, $date_added, $userid, $productid);
				$result = $pre_stmt->execute() or die($this->con->error);
				if($result) {
					return "SUCCESSFULLY_REMOVED";
				}
				return "UNKNOWN_ERROR";
			}else{
				$pre_stmt = $this->con->prepare("DELETE FROM `cart` WHERE user_id = ? AND product_id = ?");
				$pre_stmt->bind_param("ii", $userid, $productid);
				$result = $pre_stmt->execute() or die($this->con->error);
				if($result) {
					return "SUCCESSFULLY_REMOVED";
				}
				return "UNKNOWN_ERROR";
			}
		}
	}

	public function addNewOrder($userid)
	{
		$ref_no = uniqid("VG");
		$paymentid = "";
		$date_added = time();
		$description = "";

		$pre_stmt = $this->con->prepare("INSERT INTO `orders`(`order_refno`, `user_id`, `payment_id`, `date_added`) VALUES (?,?,?,?)");
		$pre_stmt->bind_param("siis", $ref_no, $userid, $paymentid, $date_added);
		$result = $pre_stmt->execute() or die($this->con->error);
		if($result) {
			$rows = $this->getUserCartItems($userid);
			if($rows != "NO_DATA"){
				foreach ($rows as $row) {
					$pre_stmt = $this->con->prepare("INSERT INTO `orders_info`(`order_ref`, `user_id`, `product_id`, `items_no`, `description`, `date_added`) VALUES (?,?,?,?,?,?)");
					$pre_stmt->bind_param("siisss", $ref_no, $userid, $row['product_id'], $row['items_no'], $description, $date_added);
					$pre_stmt->execute() or die($this->con->error);
				}
				if($this->clearUserCart($userid) == "SUCCESSFULLY_CLEARED"){
					return "SUCCESSFULLY_ADDED";
				}
			}
		}
		return "UNKNOWN_ERROR";
	}

	public function addNewProduct($category_id, $product_name, $product_price, $product_quantity, $product_photo, $product_description)
	{
		$date_added = time();
		$pre_stmt = $this->con->prepare("INSERT INTO `products`(`category_id`, `product_name`, `product_price`, `product_quantity`, `product_photo`, `product_description`, `date_added`) VALUES (?,?,?,?,?,?,?)");
		$pre_stmt->bind_param("issssss", $category_id, $product_name, $product_price, $product_quantity, $product_photo, $product_description, $date_added);
		$result = $pre_stmt->execute() or die($this->con->error);
		if($result) {
			return "SUCCESSFULLY_ADDED";
		}
		return "UNKNOWN_ERROR";
	}

	public function addNewCategory($category_name, $category_image)
	{
		$date_added = time();
		$pre_stmt = $this->con->prepare("INSERT INTO `categories`(`category_name`, `category_image`, `created_date`) VALUES (?,?,?)");
		$pre_stmt->bind_param("sss", $category_name, $category_image, $date_added);
		$result = $pre_stmt->execute() or die($this->con->error);
		if($result) {
			return "SUCCESSFULLY_ADDED";
		}
		return "UNKNOWN_ERROR";
	}

	public function getTopProducts(){
		$pre_stmt = $this->con->prepare("SELECT c.id AS category_id, c.category_name, c.category_image, p.id, p.product_name, p.product_price, p.product_quantity, p.product_photo, p.product_description, p.date_added FROM products p, categories c WHERE c.id = p.category_id LIMIT 10");
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		$rows = array();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
			return $rows;
		}
	}

	public function getProductsByCategory($category_id){
		$pre_stmt = $this->con->prepare("SELECT c.id AS category_id, c.category_name, c.category_image, p.id, p.product_name, p.product_price, p.product_quantity, p.product_photo, p.product_description, p.date_added FROM products p, categories c WHERE c.id = p.category_id AND p.category_id = ?");
		$pre_stmt->bind_param("i", $category_id);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		$rows = array();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
			return $rows;
		}
	}

	public function getOrderItems($order_refno)
	{
		$pre_stmt = $this->con->prepare("SELECT p.id AS product_id, p.product_name, p.product_price, p.product_quantity, p.product_photo, p.product_description, o.id, o.items_no, o.date_added FROM orders_info o, products p WHERE p.id = o.product_id AND o.order_ref = ?");
		$pre_stmt->bind_param("s", $order_refno);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		$rows = array();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
			return $rows;
		}
		return "NO_DATA";
	}

	public function removeOrder($order_refno)
	{
		$pre_stmt = $this->con->prepare("DELETE FROM `orders` WHERE order_refno = ?");
		$pre_stmt->bind_param("s", $order_refno);
		$result = $pre_stmt->execute() or die($this->con->error);
		if ($result) {
			$pre_stmt = $this->con->prepare("DELETE FROM `orders_info` WHERE order_ref = ?");
			$pre_stmt->bind_param("s", $order_refno);
			$result = $pre_stmt->execute() or die($this->con->error);
			if ($result) {
				return "SUCCESSFULLY_REMOVED";
			}else{
				return "UNKNOWN_ERROR";
			}
		}else{
			return "UNKNOWN_ERROR";
		}
	}

	public function getUserOrders($userid)
	{
		$pre_stmt = $this->con->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY date_added DESC");
		$pre_stmt->bind_param("i", $userid);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		$rows = array();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
				//$rows["items"] = $this->getOrderItems($row['order_refno']);
			}
			return $rows;
		}
		return "NO_DATA";
	}

	public function getUserCartItems($userid)
	{
		$pre_stmt = $this->con->prepare("SELECT p.id AS product_id, p.product_name, p.product_price, p.product_quantity, p.product_photo, p.product_description, c.id, c.items_no, c.added_date FROM cart c, products p WHERE c.product_id = p.id AND c.user_id = ?");
		$pre_stmt->bind_param("i", $userid);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		$rows = array();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
			return $rows;
		}
		return "NO_DATA";

	}

	public function getTableData($table)
	{
		if($table == "products"){
			$pre_stmt = $this->con->prepare("SELECT c.id AS category_id, c.category_name, c.category_image, p.id, p.product_name, p.product_price, p.product_quantity, p.product_photo, p.product_description, p.date_added FROM products p, categories c WHERE c.id = p.category_id ORDER BY p.date_added DESC");
		}else{
			$pre_stmt = $this->con->prepare("SELECT * FROM ".$table);
		}
		
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		$rows = array();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
			return $rows;
		}
		return "NO_DATA";
	}

}

//$s = new Service();
//echo $s->addNewProduct("2","Blackberries", "60", "608", "blackberry.png", "Nice blackberry fruits");
//echo $s->addNewCategory("Cereals", "cereals.jpeg");
//echo $s->addItemToCart("1","1","1");
//print_r($s->getUserOrders("1"));

?>