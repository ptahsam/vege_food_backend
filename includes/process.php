<?php

header('Content-Type: application/json');
include_once('../database/constants.php');
include_once('./service.php');
include_once('./user.php');
include_once('./report.php');

$path = '../images/profiles/';

if (isset($_POST['uploadUserProfile'])) {
	if ($_FILES['files']['name'] != "") {
		$img = $_FILES['files']['name'];
		$tmp = $_FILES['files']['tmp_name'];

		$finalimage = rand(1000,1000000).$img;
		$newpath = $path.strtolower($finalimage);
		if (move_uploaded_file($tmp, $newpath)) {
			$u = new User();
			$result = $u->updateUserDetails('user_photo', $finalimage, $_POST['userid']);
			echo json_encode($result);
		}else{
			echo json_encode("NOT_UPLOADED");
		}
	}else{
		echo json_encode("NO_FILE_FOUND");
	}
}

if (isset($_POST["generateOrder"])) {
	$r = new Report();
	$result = $r->generateOrder($_POST['orderrefno'], $_POST['userid']);
	echo json_encode($result);
}

if (isset($_POST["registerUser"])) {
	$u = new User();
	$result = $u->registerUser($_POST["identifier"], $_POST['password']);
	echo json_encode($result);
}

if (isset($_POST["loginUser"])) {
	$u = new User();
	$result = $u->userLogin($_POST["identifier"], $_POST['password']);
	echo json_encode($result);
}

if (isset($_POST['getUserData'])) {
	$u = new User();
	$row = $u->getUserData($_POST['userid']);
	echo json_encode($row);
}

if (isset($_POST['updateUserAddress'])) {
	$u = new User();
	$result = $u->updateUserAddress($_POST['field'], $_POST['field_value'], $_POST['userid']);
	echo json_encode($result);
}

if (isset($_POST['updateUserDetails'])) {
	$u = new User();
	$result = $u->updateUserDetails($_POST['field'], $_POST['field_value'], $_POST['userid']);
	echo json_encode($result);
}

if (isset($_POST['removeOrder'])) {
	$s = new Service();
	$result = $s->removeOrder($_POST['orderrefno']);
	echo json_encode($result);
}
 
if (isset($_POST['addNewOrder'])) {
	$s = new Service();
	$result = $s->addNewOrder($_POST['userid']);
	echo json_encode($result);
}

if (isset($_POST['getOrderItems'])) {
	$s = new Service();
	$rows = $s->getOrderItems($_POST['order_no']);
	echo json_encode($rows);
}

if (isset($_POST['getUserOrders'])) {
	$s = new Service();
	$rows = $s->getUserOrders($_POST['userid']);
	echo json_encode($rows);
}

if (isset($_POST['addItemToCart'])) {
	$s = new Service();
	$result = $s->addItemToCart($_POST['userid'], $_POST['productid'], $_POST['productquantity']);
	echo json_encode($result);
}

if (isset($_POST['removeItemFromCart'])) {
	$s = new Service();
	$result = $s->removeItemFromCart($_POST['userid'], $_POST['productid'], $_POST['productquantity']);
	echo json_encode($result);
}

if (isset($_POST['getUserCartItems'])) {
	$s = new Service();
	$rows = $s->getUserCartItems($_POST['userid']);
	echo json_encode($rows);
}

if (isset($_POST['getProducts'])) {
	$s = new Service();
	$rows = $s->getTableData("products");
	echo json_encode($rows);
}

if (isset($_POST['getCategories'])) {
	$s = new Service();
	$rows = $s->getTableData("categories");
	echo json_encode($rows);
}

if (isset($_POST['getTopProducts'])) {
	$s = new Service();
	$rows = $s->getTopProducts();
	echo json_encode($rows);
}

if (isset($_POST['getProductsByCategory'])) {
	$s = new Service();
	$rows = $s->getProductsByCategory($_POST['category_id']);
	echo json_encode($rows);
}
?>