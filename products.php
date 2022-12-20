
<?php
	include_once("./database/constants.php");
	if (!isset($_SESSION["adminid"])) {
	  header("location:".DOMAIN."/login/");
	}
?>

<!DOCTYPE html>
<html>
<head>
	<base href="http://localhost/vege_food/" />
	<?php include_once("./templates/header.php");?>
</head>
<body>
	<div class="main-container">
		<?php include_once("./templates/left_productssidebar.php");?>
		<div class="main">
			<?php include_once("./templates/topappbar.php");?>
			<div class="infoContainer">
				<div class="infoContainer-header">
					<h4>Product Details</h4>
				</div>
				<div class="infoContainer-body">
					<div class="infoContainer-body-actions">
						<h6>Products</h6>
						<div class="infoContainer-body-actions-center">
							<h6 class="payment-action-progress-info no-show"></h6>
							<span class="payment-action-progress-span no-show"><small class="payment-action-progress-count"></small><small class="payment-action-progress-percentage"></small></span>
							<i class="fa-solid fa-sync fa-spin fa-2x payment-action-progress-icon no-show"></i>
						</div>
						<div class="infoContainer-body-actions-right">
							<button class="btn btn-success btn-sm small-space" id="import_payments"><i class="fa-solid fa-file-import"></i>Import Payments</button>
							<button class="btn btn-primary btn-sm" id="add_new_product"><i class="fa-solid fa-plus"></i>Add New Product</button>
						</div>
					</div>
					<div class="infoContainer-body-data">
						<div class="info-table-actions no-show">
							<div class="info-table-actions-left">
								<h6 class="table-total-rows no-show"></h6>
								<h6 class="table-selected-rows no-show"></h6>
							</div>
							<div class="info-table-actions-center no-vis">
								<!--<button class="btn btn-primary btn-sm"><i class="fa-solid fa-print"></i>Print</button>-->
								<button class="btn btn-danger btn-sm btn-delete-selected btn-delete-selected-payments"><i class="fa-solid fa-trash-can"></i>Delete</button>
							</div>
							<div class="info-table-actions-right">
								<div class="search-box no-vis">
		                            <i class="fa-solid fa-magnifying-glass"></i>
		                            <input type="text" class="form-control" id="seach-data" placeholder="Search&hellip;">
		                            <span class="fa-solid fa-circle-notch fa-spin seach-data-loader no-show"></span>
		                        </div>
							</div>
						</div>					
						<div class="products-table"></div>	
					</div>
				</div>
			</div>
		</div>
		<div id="snackbar"></div>
	</div>
<?php include_once("./templates/preview_data.php");?>	
<?php include_once("./templates/select_upload_file.php");?>
<?php include_once("./templates/change_password.php");?>
<?php include_once("./templates/scripts.php");?>
<?php include_once("./templates/delete_modal.php");?>
<?php include_once("./templates/create_product.php");?>
<script src="./js/product.js"></script>	
<script src="./js/project.js"></script>	
</body>
</html>