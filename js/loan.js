getLoansData();
getAllLoanPlans(1);
getLoanTypes();
getLoanPlans();
getAllBorrowers();
getAllLoans(1);
var deleteID = "";
var deleteTable = "";
var deletePk = "";

var selectedLoansData = [];
var loanData = [];
var inputSelectAllLoansCheckbox = false;

$("body").delegate("#btn-print-loans","click",function(){
	if (selectedLoansData.length > 0 && selectedLoansData.length == loanData.length) {
			$.ajax({
				url : "./includes/action.php",
				method : "POST",
				data : {generateAllLoansReport:1},
				success : function(data){
					window.location.href = `./reports/loans/loandetails${data}.pdf`;
				}
			});
	}

	if (selectedLoansData.length > 0 && selectedLoansData.length < loanData.length) {
			$.ajax({
				url : "./includes/action.php",
				method : "POST",
				data : {generateSelectedLoansReport:1,loans:selectedLoansData},
				success : function(data){
					window.location.href = `./reports/loans/loandetails${data}.pdf`;
				}
			});
	}
});

$("body").delegate("#inputSelectAllLoans","change", function(){
	if($(this).prop("checked")) {
		if (selectedLoansData.length > 0) {
			selectedLoansData = [];
		}
		for(var i in loanData){
			selectedLoansData.push(loanData[i]);
		}
		setLoanDataInfo();
		$(".inputSelectSingleLoan").prop('checked', true);
		inputSelectAllLoansCheckbox = true;
	}else{
		selectedLoansData = [];
		setLoanDataInfo();
		$(".inputSelectSingleLoan").prop('checked', false);
		inputSelectAllLoansCheckbox = false;
	}
});

$("body").delegate(".inputSelectSingleLoan","change",function(){
	var loanrowno = $(this).attr("lrno");
	var loanrowid = $(this).attr("lrid");
	var loanrowdata = loanData[loanrowno];
	if ($(this).prop("checked")) {
		selectedLoansData.splice(loanrowno, 0, loanrowdata);
		setLoanDataInfo();
	}else{
		if(selectedLoansData.length > 0){
			for(var i in selectedLoansData){
				if(selectedLoansData[i].ref_no== loanrowid){
					selectedLoansData.splice(i, 1);
				}
			}
			setLoanDataInfo();
		}
	}
});

function setLoanDataInfo() {
	if (selectedLoansData.length > 0) {
		$(".table-selected-rows").removeClass("no-show");
		$(".info-table-actions-center").removeClass("no-vis");
	}else{
		$(".table-selected-rows").addClass("no-show");
		$(".info-table-actions-center").addClass("no-vis");
	}
	$(".table-selected-rows").html(`selected ${selectedLoansData.length}/${loanData.length}`);
}

function setLoansData(){
	if(loanData.length > 0){
		loanData = loanData.reverse();
		$(".info-table-actions").removeClass("no-show");
		$(".table-total-rows").removeClass("no-show");
		$(".table-total-rows").html(`${loanData.length} rows`);
	}
}

function getLoansData(){
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		data : {getTableData:1,table:"loans_table"},
		success : function(data){
			if (data != "NO_DATA") {
				for(var i in data){
					loanData.push(data[i]);
				}
				setLoansData();
			}
		}
	});
}

/*$("#print-loans").on("click",function(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {generateAllLoansReport:1},
		success : function(data){
			window.location.href = `./reports/loans/loandetails${data}.pdf`;
		}
	})
});*/

function getLoanTypes(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getLoanTypes:1},
		success : function(data){
			var choose = "<option value=''>- Select loan type -</option>";
			$("#loan_type").html(choose + data);
		}
	})
}

function getLoanPlans(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getLoanPlans:1},
		success : function(data){
			var choose = "<option value=''>- Select loan plan -</option>";
			$("#loan_plan").html(choose + data);
		}
	})
}

function getAllBorrowers(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllBorrowers:1},
		success : function(data){
			var choose = "<option value=''>- Select borrower -</option>";
			$("#loan_borrower").html(choose + data);
		}
	})
}

function getAllLoanPlans(pn)
{
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllLoanPlans:1,pageno:pn},
		success : function(data){
			$(".loan-plans-table").html(data);
		}
	})
}

function getAllLoans(pn)
{
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllLoans:1,pageno:pn},
		success : function(data){
			$(".loans-table").html(data);
		}
	})
}

function getTableRow(table,pk,pkvalue)
{
	var result = "";
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		async : false,
		data : {getTableRow:1,table:table,pk:pk,pkvalue:pkvalue},
		success : function(data){
			result = data;
		}
	})
	return result;
}

$("body").delegate(".page-link","click",function(){
	var pn = $(this).attr("pn");
	getAllLoanPlans(pn);
})

$("#btn-new-loan").on("click", function(){
	$("#new_loan").modal("show");
	getLoanPlans();
});

$("body").delegate("#btn-edit-loan","click",function(){
	var eid = $(this).attr("eid");
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		data : {getTableRow:1,table:"loans_table",pk:"id",pkvalue:eid},
		success : function(data){

			$.ajax({
				url : "./includes/process.php",
				method : "POST",
				data : {getTableData:1,table:"customers"},
				success : function(info){
					info = sortByFirstname(info);
					var choose = "<option value=''>- Select Customer -</option>";
					$("#loan_borrower").html(choose);
					for(var i in info){
						if(info[i].id == data.borrower_id){
							$("#loan_borrower").append("<option value='"+info[i].id+"' selected>"+info[i].firstname+" "+info[i].lastname+"</option>");
						}else{
							$("#loan_borrower").append("<option value='"+info[i].id+"'>"+info[i].firstname+" "+info[i].lastname+"</option>");
						}
					}
				}
			});

			$.ajax({
				url : "./includes/process.php",
				method : "POST",
				data : {getTableData:1,table:"loan_types"},
				success : function(info){
					var choose = "<option value=''>- Select loan type -</option>";
					$("#loan_type").html(choose);
					for(var i in info){
						if(info[i].id == data.loan_type_id){
							$("#loan_type").append("<option value='"+info[i].id+"' selected>"+info[i].loan_type+"</option>");
						}else{
							$("#loan_type").append("<option value='"+info[i].id+"'>"+info[i].loan_type+"</option>");
						}
					}
				}
			});

			$.ajax({
				url : "./includes/process.php",
				method : "POST",
				data : {getTableData:1,table:"loan_plans"},
				success : function(info){
					var choose = "<option value=''>- Select loan plan -</option>";
					$("#loan_plan").html(choose);
					for(var i in info){
						if(info[i].id == data.plan_id){
							$("#loan_plan").append("<option value='"+info[i].id+"' selected>"+ info[i].months +" month/s ["+ info[i].interest_percentage +"% "+ info[i].penalty_rate +"%]</option>");
						}else{
							$("#loan_plan").append("<option value='"+info[i].id+"'>"+ info[i].months +" month/s ["+ info[i].interest_percentage +"% "+ info[i].penalty_rate +"%]</option>");
						}
					}
				}
			});

			$("#loan_amount").val(data.amount);
			$("#loan_purpose").val(data.purpose);
			$("#loan_action").val("update_loan");
			$("#btn-loan").text("Update");
			$("#loan_id").val(eid);
			$("#new_loan").modal("show");
		}
	});
});

$("body").delegate("#btn-edit-plan","click",function(){
	var eid = $(this).attr("eid");
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		data : {getTableRow:1,table:"loan_plans",pk:"id",pkvalue:eid},
		success : function(data){
			$("#add_new_planmodal").modal("show");
			$("#plan_months").val(data.months);
			$("#plan_interest").val(data.interest_percentage);
			$("#plan_penalty").val(data.penalty_rate);
			$("#plan_action").val("update_plan");
			$("#btn-plan").text("Update");
			$("#plan_id").val(eid);
		}
	});
});


$("body").delegate("#btn-delete-plan","click",function(){
	$("#delete_modal").modal("show");
	deleteID = $(this).attr("did");
	deleteTable = "loan_plans";
	deletePk = "id";
});

$("body").delegate("#btn-delete-loan","click",function(){
	$("#delete_modal").modal("show");
	deleteID = $(this).attr("lid");
	deleteTable = "loans_table";
	deletePk = "id";
});

$("#add_new_plan").on("click",function(){
	$("#add_new_planmodal").modal("show");
});

function sendSms(phone,message){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {sendSms:1,phone:phone,message:message},
		success : function(data){
			console.log(data);
		}
	});		
}

$("body").delegate(".loan-action li","click",function(){
	var action = $(this).attr("action");
	var loanid = $(this).attr("lid");
	var customeridno = $(this).attr("cidno");
	var userdetails = getTableRow("customers","id",customeridno);
	var loandetails = getTableRow("loans_table","id",loanid);
	if(action == "Approve"){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data : {updateLoanStatus:1,pkvalue:loanid,fieldvalue:"1"},
			success : function(data){
				if(data == "UPDATED"){
					getAllLoans(1);
					showSnackbar("Loan approved");

					var phone = userdetails.phonenumber_one != "" ? userdetails.phonenumber_one : userdetails.phonenumber_two;

					if (phone.charAt(0) === '0') {
						phone = "+254" + phone.substring(1);
					}

					var message = "Hello " + userdetails.firstname + ", " + 
								  "Your loan ref no:" + (loandetails.ref_no).toUpperCase() +
								  " has been approved. You will receive more details about when your loan will be released very soon."
					;

					sendSms(phone,message);
				}else if(data =="UNKOWN_ERROR"){
					showSnackbar("An error occured!. Try again later.");
				}else{
					showSnackbar("An error occured!. Try again later.");
				}
			}
		});
	}else if(action == "Deny"){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data : {updateLoanStatus:1,pkvalue:loanid,fieldvalue:"4"},
			success : function(data){
				if(data == "UPDATED"){
					getAllLoans(1);
					showSnackbar("Loan denied");
				}else if(data =="UNKOWN_ERROR"){
					showSnackbar("An error occured!. Try again later.");
				}else{
					showSnackbar("An error occured!. Try again later.");
				}
			}
		});
	}else if(action == "Release"){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data : {updateLoanStatus:1,pkvalue:loanid,fieldvalue:"2"},
			success : function(data){
				if(data == "UPDATED"){
					getAllLoans(1);
					showSnackbar("Loan released");
					var phone = userdetails.phonenumber_one != "" ? userdetails.phonenumber_one : userdetails.phonenumber_two;

					if (phone.charAt(0) === '0') {
						phone = "+254" + phone.substring(1);
					}

					var message = "Hello " + userdetails.firstname + ", " + 
								  "Your loan ref no:" + (loandetails.ref_no).toUpperCase() +
								  " has been released. You will receive more details about when you will start paying your monthly repayments"
					;

					sendSms(phone,message);
				}else if(data =="UNKOWN_ERROR"){
					showSnackbar("An error occured!. Try again later.");
				}else{
					showSnackbar("An error occured!. Try again later.");
				}
			}
		});
	}
});

$("#btn-calculate").on("click", function(){
	var status = false;
	var loanplan = $("#loan_plan");
	var loanamount = $("#loan_amount");

	if(loanplan.val() == ""){
		loanplan.addClass("is-invalid");
		status = false;
	}else{
		loanplan.removeClass("is-invalid");
		status = true
	}

	if(loanamount.val() == ""){
		loanamount.addClass("is-invalid");
		status = false;
	}else{
		loanamount.removeClass("is-invalid");
		status = true
	}

	if(status == true){
		$.ajax({
			url : "./includes/process.php",
			method : "POST",
			data : {getTableRow:1,table:"loan_plans",pk:"id",pkvalue:loanplan.val()},
			success : function(data){
				var monthly = (parseInt(loanamount.val()) + (parseInt(loanamount.val()) * (data.interest_percentage/100))) / data.months;
				var penalty = monthly * (data.penalty_rate/100);
				var total = monthly * data.months;

				$(".calculation-table").removeClass("no-show");
				var content = '<div class="col-4">' +
			    				'<h6>Total payable amount</h6>' +
			    				'<p>' + parseFloat(total).toFixed(2) +'</p>' +
			    			  '</div>' +
			    			  '<div class="col-4">' +
			    				'<h6>Monthly payable amount</h6>' +
			    				'<p>' + parseFloat(monthly).toFixed(2) + '</p>' +
			    			  '</div>' +
			    			  '<div class="col-4">' +
			    				'<h6>Penalty amount</h6>' +
			    				'<p>' + parseFloat(penalty).toFixed(2) + '</p>' +
			    			  '</div>';
			    $(".calculation-table").html(content);
			}
		})
					  
	}

});

$("#loanapplication-form").on("submit",function(e){
	e.preventDefault();
	var status = false;
	var loanborrower = $("#loan_borrower");
	var loanplan = $("#loan_plan");
	var loantype = $("#loan_type");
	var loanamount = $("#loan_amount");
	var loanaction = $("#loan_action");

	if(loanborrower.val() == ""){
		loanborrower.addClass("is-invalid");
		status = false;
	}else{
		loanborrower.removeClass("is-invalid");
		status = true
	}

	if(loanplan.val() == ""){
		loanplan.addClass("is-invalid");
		status = false;
	}else{
		loanplan.removeClass("is-invalid");
		status = true
	}

	if(loantype.val() == ""){
		loantype.addClass("is-invalid");
		status = false;
	}else{
		loantype.removeClass("is-invalid");
		status = true
	}

	if(loanamount.val() == ""){
		loanamount.addClass("is-invalid");
		status = false;
	}else{
		loanamount.removeClass("is-invalid");
		status = true
	}

	if(status == true){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data : $("#loanapplication-form").serialize(),
			success : function(data){
				
				if (loanaction.val() == "update_loan") {
					if (data == "UPDATED") {
						$("#loanapplication-form")[0].reset();
						loanaction.val("new_loan");
						$("#btn-loan").text("Save");
						$("#new_loan").modal("hide");
						getAllLoans(1);
						getAllLoanPlans(1);
					}else{
						showSnackbar("An error occured! Please try again later.");
					}
				}

				if (loanaction.val() == "new_loan") {
					data = JSON.parse(data);
					var userdetails = getTableRow("customers","id",data.customerid);
					var loandetails = getTableRow("loans_table","id",data.loanid);
					var plandetails = getTableRow("loan_plans","id",data.planid);
					if (data.message == "SUCCESSFULLY_ADDED") {
						$("#loanapplication-form")[0].reset();
						loanaction.val("new_loan");
						$("#btn-loan").text("Save");
						$("#new_loan").modal("hide");
						getAllLoans(1);

						var monthly = (parseInt(loandetails.amount) + (parseInt(loandetails.amount) * (plandetails.interest_percentage/100))) / plandetails.months;
						var penalty = monthly * (plandetails.penalty_rate/100);
						var total = monthly * plandetails.months;
						
						var phone = userdetails.phonenumber_one != "" ? userdetails.phonenumber_one : userdetails.phonenumber_two;

						if (phone.charAt(0) === '0') {
							phone = "+254" + phone.substring(1);
						}

						var message = "Hello " + userdetails.firstname + ", " + 
									  `Application for a loan of ${formatter.format(loandetails.amount)} reference no ${(loandetails.ref_no).toUpperCase()} at ${plandetails.interest_percentage}% interest has been made, ` +
									  `Your loan will be repayed in ${plandetails.months} monthly repayments of ${formatter.format(parseFloat(monthly).toFixed(2))}, ` +
									  `Late repayments will accrue a monthly payment of ${formatter.format(parseFloat(penalty).toFixed(2))}, ` +
									  "You will be notified when your loan is approved."
						;

						sendSms(phone,message);

					}else{
						showSnackbar("An error occured. Please try again later.");
					}
				}
			}
		});
	}
});

$("#loan_plan_form").on("submit",function(e){
	e.preventDefault();
	var status = false;
	var planmonths = $("#plan_months");
	var planinterest = $("#plan_interest");
	var planpenalty = $("#plan_penalty");
	var action = $("#plan_action");

	if(planmonths.val() == ""){
		planmonths.addClass("is-invalid");
		status = false;
	}else{
		planmonths.removeClass("is-invalid");
		status = true
	}

	if(planinterest.val() == ""){
		planinterest.addClass("is-invalid");
		status = false;
	}else{
		planinterest.removeClass("is-invalid");
		status = true
	}

	if(planpenalty.val() == ""){
		planpenalty.addClass("is-invalid");
		status = false;
	}else{
		planpenalty.removeClass("is-invalid");
		status = true
	}

	if(status == true){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data : $("#loan_plan_form").serialize(),
			success : function(data){
				if(action.val() == "new_plan"){
					if (data == "SUCCESSFULLY_ADDED") {
						showSnackbar("Plan added successfully.");
						$("#loan_plan_form")[0].reset();
						getAllLoanPlans(1);
						$("#add_new_planmodal").modal("hide");
						action.val("new_plan");
					}else if(data == "UNKOWN_ERROR"){
						showSnackbar("An error occured!. Try again later.");
						$("#add_new_planmodal").modal("hide");
					}else{
						showSnackbar("An error occured!. Try again later.");
						$("#add_new_planmodal").modal("hide");
					}
				}

				if(action.val() == "update_plan"){
					if (data == "UPDATED") {
						showSnackbar("Plan updated successfully.");
						$("#loan_plan_form")[0].reset();
						getAllLoanPlans(1);
						$("#add_new_planmodal").modal("hide");
						action.val("new_plan");
						$("#btn-plan").text("Save");
					}else if(data == "UNKOWN_ERROR"){
						showSnackbar("An error occured!. Try again later.");
						$("#add_new_planmodal").modal("hide");
					}else{
						showSnackbar("An error occured!. Try again later.");
						$("#add_new_planmodal").modal("hide");
					}
				}
			}
		});
	}
});