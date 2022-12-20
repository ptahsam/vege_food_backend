<!DOCTYPE html>
<html>
<head>
	<base href="http://localhost/vege_food/" />
	<?php include_once("./templates/header.php");?>
</head>
<body>
	<div class="login">
		<div class="login-form">
			<div class="login-form-img">
				<img src="./icons/logo.png">
			</div>
		    <form id="login-form" onsubmit="return false">
		    	<div class="form-floating mb-3">
				  <input type="text" class="form-control" name="input_username" id="input_username" placeholder="Enter username">
				  <label for="input_username">Enter Username</label>
				  <small class="form-text text-muted" id="input_username_error"></small>
				</div>
				<div class="form-floating mb-3">
				  <input type="password" class="form-control" name="input_password" id="input_password" placeholder="Enter password">
				  <label for="input_password">Enter Password</label>
				  <small class="form-text text-muted" id="input_password_error"></small>
				</div>
				<div class="form-floating mb-3">
					<button class="btn btn-success" id="btn-login">
						<i class="fa-solid fa-circle-notch fa-spin login-progress no-show"></i>Login
					</button>
				</div>
				<a href="./change_password/"><span class="forgot-password">Forgot Password?</span></a>
		    </form>
		</div>
		<div id="snackbar"></div>
	</div>
	<?php include_once("./templates/scripts.php");?>
	<script src="./js/login.js"></script>
</body>
</html>