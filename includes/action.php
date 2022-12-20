<?php 
include_once("../database/constants.php");
include_once("./service.php");
include_once("./manage.php");
include_once("./time.php");
include_once("./user.php");

$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp' , 'pdf' , 'doc' , 'ppt');

$path = '../images/products/';
$categorypath = '../images/categories/';

if (isset($_POST['input_categoryname']) && isset($_FILES['input_passpost'])) {
	if ($_FILES['input_passpost']['name'] != "")
	{
		$img = $_FILES['input_passpost']['name'];
		$tmp = $_FILES['input_passpost']['tmp_name'];

		$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
		$final_image = rand(1000,1000000).$img;
		if(in_array($ext, $valid_extensions))
		{
			$newpath = $categorypath.strtolower($final_image); 
			if(move_uploaded_file($tmp,$newpath))
			{
				$s = new Service();
				$result = $s->addNewCategory($_POST['input_categoryname'], $final_image);
				echo $result;
				exit();
			}else{
				echo "NOT_UPLOADED";
				exit();
			}
		}
	}else{
		echo "NO_FILE_FOUND";
		exit();
	}
}

if (isset($_POST["input_productname"]) && isset($_POST['input_productprice'])) {

	if ($_FILES['input_passpost']['name'] != "")
	{
		$img = $_FILES['input_passpost']['name'];
		$tmp = $_FILES['input_passpost']['tmp_name'];

		$ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
		$final_image = rand(1000,1000000).$img;
		if(in_array($ext, $valid_extensions)) 
		{
			$newpath = $path.strtolower($final_image); 
			if(move_uploaded_file($tmp,$newpath)) 
			{
				$s = new Service();
				$result = $s->addNewProduct($_POST['input_category'], $_POST['input_productname'], $_POST['input_productprice'], $_POST['input_productamount'], $final_image, $_POST['input_productdescription']);
				echo $result;
				exit();
			}else{
				echo "NOT_UPLOADED";
				exit();
			}
		}else{
			echo "INVALID";
			exit();
		}
	}else{
		echo "NO_FILE_FOUND";
		exit();
	}
}

if (isset($_POST["input_username"]) && isset($_POST["input_password"])) {
	$u = new User();
	$result = $u->adminLogin($_POST["input_username"], $_POST["input_password"]);
	echo $result;
	exit();
}

if(isset($_POST["getAllCategories"])){
	$s = new Service();
	$rows = $s->getTableData("categories");
	if($rows != "NO_DATA"){
		foreach ($rows as $row) {
			echo "<option value='".$row["id"]."'  >".$row["category_name"]."</option>";
		}
	}
}

if(isset($_POST["getProductsCount"])){
	$m = new Manage();
	$totalrows = $m->countData("products");
	if($totalrows != "NO_DATA"){
		echo $totalrows["totalrows"];
		exit();
	}else{
		echo "0";
		exit();
	}
}

if(isset($_POST["getCustomerCount"])){
	$m = new Manage();
	$totalrows = $m->countData("users");
	if($totalrows != "NO_DATA"){
		echo $totalrows["totalrows"];
		exit();
	}else{
		echo "0";
		exit();
	}
}

if(isset($_POST["getOrdersCount"])){
	$m = new Manage();
	$totalrows = $m->countData("orders");
	if($totalrows != "NO_DATA"){
		echo $totalrows["totalrows"];
		exit();
	}else{
		echo "0";
		exit();
	}
}

if(isset($_POST["getLatestCustomers"])){
	$s = new Service();
	$rows = $s->getLatestCustomers();
	if($rows != "NO_DATA"){
		foreach($rows as $row){
			?>
				<tr>
					<td width="60px">
						<?php if($row["user_photo"] != "" && !strstr($row["user_photo"],"https")):?>
							<div class="imgBx"><img src="./images/profiles/<?php echo $row['user_photo'];?>"></div>
						<?php else: ?>	
							<div class="avatar">
								<div class="avatar-details">
									<?php echo ucfirst(substr($row["user_name"], 0, 1)); ?>
								</div>
							</div>
						<?php endif;?>	
					</td>
					<td><h4><?php echo $row["user_name"];?>
					<?php 
						$t = new TimeManager();
						$timereg = $t->getRecentTime($row["date_added"]);
					?>
						<br><span><?php echo $timereg;?></span></h4>
					</td>
				</tr>
			<?php
		}
	}else{
		?>
		<div class="container table-info-container">
			<div class="alert">
				<i class="fa-solid fa-triangle-exclamation"></i>
				<p>No new customers at the moment</p>
			</div>
		</div>
		<?php
	}

}

if (isset($_POST["getAllCategories"])) {
	$m = new Manage();
	$totalrows = $m->countData("categories");
	$result = $m->manageRecordWithPagination("categories",$_POST["pageno"],10);
	$rows = $result["rows"];
	$pagination = $result["pagination"];
	if (count($rows) > 0) {
		$n = (($_POST["pageno"] - 1) * 10)+1;
		?>
			<table class="table table-bordered all-categories-table">
				<thead>
					<tr>
						<td></td>
						<td>#</td>
						<td>Category Details</td>
						<td>Products</td>
						<td>Action</td>
					</tr>
				</thead>
				<tbody>
					<?php foreach ($rows as $row) { ?>
						<tr>
							<td>
								<label class="container">
				                   <input type="checkbox" class="inputSelectSingleCategory" id="inputSelectSingleCategory-<?php echo $row["id"];?>" crno="<?php echo ($n - 1);?>" cid="<?php echo $row["id"];?>">
				                   <span class="checkmark"></span>
				                </label>
							</td>
							<td><?php echo $n.".";?></td>
							<td>
								<div class="row">
									<div class="col-lg-2">
										<div class="table-category-image">
											<img src="./images/categories/<?php echo $row['category_image'];?>">
										</div>
									</div>
									<div class="col-lg-10">
										<p>
											<label>Category name : </label>
											<b><?php echo $row["category_name"];?></b>
										</p>
										<p>
										  <label>Date created : </label>
										  <b><?php echo(date("F d, Y", $row["created_date"]));?></b>
										</p>
									</div>
								</div>
							</td>
							<td></td>
							<td class="td-actions">
								<button class="btn btn-primary btn-sm" id="btn-edit-category" eid="<?php echo $row['id'];?>"><i class="fa-solid fa-pen-to-square"></i>&nbsp;Edit</button>
								<p></p>
								<button class="btn btn-danger btn-sm" id="btn-delete-category" lid="<?php echo $row['id'];?>"><i class="fa-solid fa-trash-can"></i>&nbsp;Delete</button>
							</td>
						</tr>
					<?php $n++;} ?>
				</tbody>
			</table>
		<?php
	}else{
		?>
		<div class="container table-info-container">
			<div class="alert">
				<i class="fa-solid fa-triangle-exclamation fa-fade"></i>
				<p>No available categories at the moment</p>
			</div>
		</div>
		<?php
	}
}

if (isset($_POST["getAllCustomers"])) {
	$m = new Manage();
	$totalrows = $m->countData("users");
	$result = $m->manageRecordWithPagination("users",$_POST["pageno"],10);
	$rows = $result["rows"];
	$pagination = $result["pagination"];
	if (count($rows) > 0) {
		$n = (($_POST["pageno"] - 1) * 10)+1;
		?>
		<table class="table table-bordered all-customer-table">
			<thead>
				<tr>
					<td></td>
					<td>#</td>
					<td>Customer Details</td>
					<td>Order Details</td>
					<td>Action</td>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($rows as $row) { 
					$s = new Service();
					$u = new User();
					$userdetails = $u->getUserData($row["id"]);
					$userorders = $s->getUserOrders($row["id"]);
				?>
				<tr>
					<td>
						<label class="container">
		                   <input type="checkbox" class="inputSelectSingleCustomer" id="inputSelectSingleCustomer-<?php echo $row["id"];?>" crno="<?php echo ($n - 1);?>" cid="<?php echo $row["id"];?>">
		                   <span class="checkmark"></span>
		                </label>
					</td>
					<td><?php echo $n.".";?></td>
					<td>
						<div class="row">
							<div class="col-lg-2">
								<div class="table-customer-image">
									<?php if($userdetails["user_photo"] != ""): ?>
										<?php if(strstr($userdetails["user_photo"], "https")): ?>
											<img src="<?php echo $row['user_photo'];?>">
										<?php else: ?>
											<img src="./images/profiles/<?php echo $userdetails['user_photo'];?>">
										<?php endif;?>
									<?php else: ?>
										<img src="./images/profiles/profile.jpg">
									<?php endif; ?>
								</div>
							</div>
							<div class="col-lg-10">
								<p>
									<label>Customer name : </label>
									<b><?php echo $userdetails["user_name"];?></b>
								</p>
								<p>
									<label>Customer phone : </label>
									<b><?php echo $userdetails["user_phone"];?></b>
								</p>
								<p>
									<label>Customer email : </label>
									<b><?php echo $userdetails["user_email"];?></b>
								</p>
								<p>
									<label>Address : </label>
									<b><?php echo $userdetails["address"];?></b>
								</p>
								<p>
									<label>County : </label>
									<b><?php echo $userdetails["county"];?></b>
								</p>
								<p>
									<label>City : </label>
									<b><?php echo $userdetails["city"];?></b>
								</p>
								<p>
									<label>Added date : </label>
									<b><?php echo(date("F d, Y", $userdetails["date_added"]));?></b>
								</p>
							</div>
						</div>
					</td>
					<td>
						<?php if($userorders != "NO_DATA"): ?>
							<p>
								<label>Orders : </label>
								<b><?php echo count($userorders);?></b>
							</p>
							<!--

							<div class="div-customer-order">
								<p>
									<label>Order ID : </label>
									<b><?php echo strtoupper($order["order_refno"]);?></b>
								</p>
								<p>
									<label>Items : </label>
									<b><?php echo $totalItems;?></b>
								</p>
								<p>
									<label>Amount : </label>
									<b><?php echo $totalSum;?></b>
								</p>
								<p>
									<label>Date : </label>
									<b><?php echo(date("F d, Y", $order["date_added"]));?></b>
								</p>
							</div>
							-->
						<?php else: ?>
							<p><span class="badge bg-danger element-with-cursor" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip danger" title="No orders">No orders</span>
						<?php endif; ?></p>
					</td>
					<td class="td-actions">
						<button class="btn btn-success btn-sm"><i class="fa-solid fa-message"></i>&nbsp;Message</button>
						<p></p>
						<button class="btn btn-primary btn-sm" id="customerEdit" cid="<?php echo $row["id"];?>"><i class="fa-solid fa-pen-to-square"></i>&nbsp;Edit</button>
						<p></p>
						<button class="btn btn-info btn-sm" id="customerRow" cid="<?php echo $row["id"];?>"><i class="fa-solid fa-eye"></i>&nbsp;View</button>
						<p></p>
						<button class="btn btn-danger btn-sm" id="btn-delete-customer" cid="<?php echo $row['id'];?>"><i class="fa-solid fa-trash-can"></i>&nbsp;Delete</button>
					</td>
				</tr>
				<?php $n++;} ?>
			</tbody>
		</table>
		<?php
	}else{
		?>
		<div class="container table-info-container">
			<div class="alert">
				<i class="fa-solid fa-triangle-exclamation fa-fade"></i>
				<p>No available customers at the moment</p>
			</div>
		</div>
		<?php
	}
}

if (isset($_POST["getAllProducts"])) {
	$m = new Manage();
	$totalrows = $m->countData("products");
	$result = $m->manageRecordWithPagination("products",$_POST["pageno"],10);
	$rows = $result["rows"];
	$pagination = $result["pagination"];
	if(count($rows) > 0){
		$n = (($_POST["pageno"] - 1) * 10)+1;
		?>
			<table class="table table-bordered all-products-table">
				<thead>
					<tr>
						<td>
							<label class="container" id="selectAllProducts">Select
			                   <input type="checkbox" id="inputSelectAllProducts">
			                   <span class="checkmark"></span>
			                </label>
			            </td>
						<td>#</td>
						<td>Category Details</td>
						<td>Product Details</td>
						<td>Action</td>
					</tr>
				</thead>
				<tbody>
					<?php foreach ($rows as $row) { ?>
					<tr>
						<td>
							<label class="container">
			                   <input type="checkbox" class="inputSelectSingleProduct" id="inputSelectSingleProduct-<?php echo $row["id"];?>" prno="<?php echo ($n - 1);?>" pid="<?php echo $row["id"];?>">
			                   <span class="checkmark"></span>
			                </label>
						</td>
						<td><?php echo $n.".";?></td>
						<td>
							<div class="row">
								<div class="col-lg-2">
									<div class="table-category-image">
										<img src="./images/categories/<?php echo $row['category_image'];?>">
									</div>
								</div>
								<div class="col-lg-10">
									<p>
										<label>Category name:</label>
										<b><?php echo $row["category_name"];?></b>
									</p>
								</div>
							</div>
						</td>
						<td>
							<div class="row">
								<div class="col-lg-2">
									<div class="table-product-image">
										<img src="./images/products/<?php echo $row['product_photo'];?>">
									</div>
								</div>
								<div class="col-lg-10">
									<p>
										<label>Product name : </label>
										<b><?php echo $row["product_name"];?></b>
									</p>
									<p>
										<label>Product Price(KES) : </label>
										<b><?php echo number_format(preg_replace("/,+/","", $row["product_price"]),2);?></b>
									</p>
									<p>
										<label>Product Quantity : </label>
										<b><?php echo $row["product_quantity"];?></b>
									</p>
									<p>
										<label>Description : </label>
										<?php if($row["product_description"] != ""):?>
											<b><?php echo $row["product_description"];?></b>
										<?php endif; ?>
										<?php if($row["product_description"] == ""):?>
											<b>No available description</b>
										<?php endif; ?>
									</p>
									<p>
										<label>Added date : </label>
										<b><?php echo(date("F d, Y", $row["date_added"]));?></b>
									</p>
								</div>
							</div>
						</td>
						<td class="td-actions">
							<button class="btn btn-primary btn-sm" id="btn-edit-product" eid="<?php echo $row['id'];?>"><i class="fa-solid fa-pen-to-square"></i>&nbsp;Edit</button>
							<p></p>
							<button class="btn btn-danger btn-sm" id="btn-delete-product" lid="<?php echo $row['id'];?>"><i class="fa-solid fa-trash-can"></i>&nbsp;Delete</button>
						</td>
					</tr>	
					<?php $n++;} ?>
				</tbody>
			</table>
			<div class="clearfix">
	            <div class="hint-text">Showing <b><?php echo count($rows);?></b> out of <b><?php echo $totalrows["totalrows"];?></b> entries</div>
	            <?php echo $pagination;?>
	        </div>
		<?php
	}else{
		?>
			<div class="container table-info-container">
				<div class="alert">
					<i class="fa-solid fa-triangle-exclamation fa-fade"></i>
					<p>No available products at the moment</p>
				</div>
			</div>
		<?php
	}
}

?>