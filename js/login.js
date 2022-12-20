
$("#login-form").on("submit",function(e){
	var status = false;
	var username = $("#input_username");
	var password = $("#input_password");

	if(username.val() == ""){
		username.addClass("is-invalid");
		status = false;
	}else{
		username.removeClass("is-invalid");
		status = true
	}

	if(password.val() == ""){
		password.addClass("is-invalid");
		status = false;
	}else{
		password.removeClass("is-invalid");
		status = true
	}

	if (status == true) {
		$("#btn-login").attr("disabled","disabled");
		$("#btn-login").text("Logging in ...");
		$(".login-progress").removeClass("no-show");
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data : $("#login-form").serialize(),
			success : function(data){
				if (data == "NOT_REGISTERED") {
					$("#input_username_error").html("<span class='text-danger'>You entered wrong usersname.</span>");
					username.val("");
					username.addClass("is-invalid");
					$("#btn-login").removeAttr("disabled");
					$("#btn-login").text("Login");
					$(".login-progress").addClass("no-show");
				}else if(data == "PASSWORD_NOT_MATCHED"){
					$("#input_password_error").html("<span class='text-danger'>You entered wrong password.</span>");
					password.val("");
					password.addClass("is-invalid");
					$("#btn-login").removeAttr("disabled");
					$("#btn-login").text("Login");
					$(".login-progress").addClass("no-show");
				}else if(data == "LOGGED_IN"){
					$("#btn-login").removeAttr("disabled");
					$("#btn-login").text("Login");
					$(".login-progress").addClass("no-show");
					window.location.href = "./";
				}
			}
		});
	}

});