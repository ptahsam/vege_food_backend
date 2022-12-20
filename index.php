
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
		<!--sidebar navigation-->

		<?php include_once("./templates/left_dashboardsidebar.php");?>

		<!---Main--->
		<div class="main">
			
			<!---Top appbar --->

			<?php include_once("./templates/topappbar.php");?>

			<!---Cards--->
			<div class="cardBox">
				<a href="./customers/">
					<div class="card-Dash">
						<div>
							<div class="numbers" id="customerCount"></div>
							<div class="cardName">Customers</div>
						</div>
						<div class="iconBox">
							<i class="fa-solid fa-users"></i>
						</div>
					</div>
				</a>
				<a href="./products/">
					<div class="card-Dash">
						<div>
							<div class="numbers" id="productsCount"></div>
							<div class="cardName">Products</div>
						</div>
						<div class="iconBox">
							<i class="fa-solid fa-money-bill"></i>
						</div>
					</div>
				</a>
				<a href="./orders/">
					<div class="card-Dash">
						<div>
							<div class="numbers" id="ordersCount"></div>
							<div class="cardName">Orders</div>
						</div>
						<div class="iconBox">
							<i class="fa-solid fa-piggy-bank"></i>
						</div>
					</div>
				</a>
				<a href="./loans/">
					<div class="card-Dash">
						<div>
							<div class="numbers" id="loansCount"></div>
							<div class="cardName">Payments</div>
						</div>
						<div class="iconBox">
							<i class="fa-solid fa-building-columns"></i>
						</div>
					</div>
				</a>
			</div>
		<!--
			<div class="middle-details">
				<div class="recentPayments">
					<div class="cardHeader">
						<h4>Payments Summary</h4>
					</div>
					<div class="cardDetails">
						<div class="card-item">
							<h6>Savings</h6>
							<p id="p-summary-savings-amount"></p>
						</div>
						<div class="vertical-div"></div>
						<div class="card-item">
							<h6>Loans</h6>
							<p id="p-summary-loans-amount"></p>
						</div>
						<div class="vertical-div"></div>
						<div class="card-item">
							<h6>Total</h6>
							<p id="p-summary-total-amount"></p>
						</div>
					</div>
				</div>
				<div class="recentSavings">
					<div class="cardHeader">
						<h4>Savings Summary</h4>
					</div>
					<div class="cardDetails">
						<div class="card-item item-saving">
							<h6>Savings</h6>
							<p id="s-summary-savings-no"></p>
						</div>
						<div class="vertical-div"></div>
						<div class="card-item">
							<h6>Total</h6>
							<p id="s-summary-savings-amount"></p>
						</div>
					</div>
				</div>
			</div>
		-->
			<div class="details">
				<div class="recentOrders">
					<div class="cardHeader">
						<h4>Payments Summary</h4>
						<a href="#" class="btn">View All</a>
					</div>
					<!--
					<table>
						<thead>
							<tr>
								<td>No of loans</td>
								<td>Loan amount(KES)</td>
								<td>Status</td>
							</tr>
						</thead>
						<tbody>
							<tr id=applied>
								
							</tr>
							<tr id="approved">
								
							</tr>
							<tr id="released">
								
							</tr>
							<tr id="completed">
								
							</tr>
							<tr id="denied">
								
							</tr>
						</tbody>
					</table>
					-->
				</div>

				<!--- New customers --->
				<div class="recentCustomers">
					<div class="cardHeader">
						<h4>Recent Customers</h4>
					</div>
					<table id="latest-customers">
						
						
					</table>
				</div>
			</div>
		</div>
		<div class="admin no-show">
			<?php include_once("./templates/profiletopappbar.php");?>
		</div>
		<div id="snackbar"></div>
	</div>
	<?php include_once("./templates/change_password.php");?>
	<?php include_once("./templates/scripts.php");?>
	<script src="./js/index.js"></script>
	<script src="./js/project.js"></script>
</body>
</html>