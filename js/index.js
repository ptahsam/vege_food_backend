getCustomerCount();
getOrdersCount();
getLoansCount();
getProductsCount();
getAppliedLoans();
getApprovedLoans();
getReleasedLoans();
getCompletedLoans();
getDeniedLoans();
getLatestCustomers();
getTotalPaymentsAmount();
getTotalSavingsAmount();
getTotalLoansAmount();
getSavingsAmount();

function getLatestCustomers() {
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getLatestCustomers:1},
		success : function(data){
			$("#latest-customers").html(data);
		}
	})
}

function getAppliedLoans(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAppliedLoans:1},
		success : function(data){
			$("#applied").html(data);
		}
	});
}

function getApprovedLoans(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getApprovedLoans:1},
		success : function(data){
			$("#approved").html(data);
		}
	})
}

function getReleasedLoans(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getReleasedLoans:1},
		success : function(data){
			$("#released").html(data);
		}
	})
}

function getCompletedLoans(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getCompletedLoans:1},
		success : function(data){
			$("#completed").html(data);
		}
	})
}

function getDeniedLoans(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getDeniedLoans:1},
		success : function(data){
			$("#denied").html(data);
		}
	})
}


function getCustomerCount(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getCustomerCount:1},
		success : function(data){
			$("#customerCount").html(data);
		}
	})
}

function getOrdersCount(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getOrdersCount:1},
		success : function(data){
			$("#ordersCount").html(data);
		}
	})
}

function getLoansCount(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getLoansCount:1},
		success : function(data){
			$("#loansCount").html(data);
		}
	})
}

function getProductsCount(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getProductsCount:1},
		success : function(data){
			$("#productsCount").html(data);
		}
	})
}

function getTotalPaymentsAmount(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getTotalPaymentsAmount:1},
		success : function(data){
			$("#p-summary-total-amount").html(data);
		}
	})
}

function getTotalSavingsAmount(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getTotalSavingsAmount:1},
		success : function(data){
			$("#p-summary-savings-amount").html(data);
		}
	})
}

function getTotalLoansAmount(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getTotalLoansAmount:1},
		success : function(data){
			$("#p-summary-loans-amount").html(data);
		}
	})
}

function getSavingsAmount(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getSavingsAmount:1},
		success : function(data){
			$("#s-summary-savings-amount").html(data);
		}
	})
}