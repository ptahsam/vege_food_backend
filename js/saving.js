getAllSavingPlans(1);
getSavingPlans();
getAllBorrowers();
getAllSavings(1);
var deleteID = "";
var deleteTable = "";
var deletePk = "";

$("#add_new_plan").on("click",function(){
	$("#add_new_planmodal").modal("show");
});

$("#btn-new-saving").on("click",function(){
	$("#new_saving").modal("show");
});

function getSavingPlans(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getSavingPlans:1},
		success : function(data){
			var choose = "<option value=''>- Select Plan -</option>";
			$("#saving_plan").html(choose + data);
		}
	})
}

function getAllSavings(pn)
{
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllSavings:1,pageno:pn},
		success : function(data){
			$(".savings-table").html(data);
		}
	})
}

function getAllBorrowers(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllBorrowers:1},
		success : function(data){
			var choose = "<option value=''>- Select Customer -</option>";
			$("#saving_customer").html(choose + data);
		}
	})
}

function getAllSavingPlans(pn)
{
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllSavingPlans:1,pageno:pn},
		success : function(data){
			$(".saving-plans-table").html(data);
		}
	});
}

$("body").delegate("#btn-edit-plan","click",function(){
	var eid = $(this).attr("eid");
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		data : {getTableRow:1,table:"saving_plans",pk:"id",pkvalue:eid},
		success : function(data){
			$("#add_new_planmodal").modal("show");
			$("#plan_frequency").val(data.frequency);
			$("#min_amount").val(data.min_amount);
			$("#plan_action").val("update_plan");
			$("#btn-plan").text("Update");
			$("#plan_id").val(eid);
		}
	});
});

$("body").delegate("#btn-edit-saving","click",function(){
	var eid = $(this).attr("eid");
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		data : {getTableRow:1,table:"savings_table",pk:"id",pkvalue:eid},
		success : function(data){
			$("#new_saving").modal("show");
			$.ajax({
				url : "./includes/process.php",
				method : "POST",
				data : {getTableRow:1,table:"customers",pk:"idnumber",pkvalue:data.customer_idno},
				success : function(resp){
					$("#saving_customer").attr("disabled","disabled");
					$("#saving_customer").html("<option value='"+resp.idnumber+"' selected>"+resp.firstname+" "+resp.lastname+"[id="+resp.idnumber+"]"+"</option>");
				}
			});

			$.ajax({
				url : "./includes/process.php",
				method : "POST",
				data : {getTableData:1,table:"saving_plans"},
				success : function(info){
					var choose = "<option value=''>- Select Plan -</option>";
					$("#saving_plan").html(choose);
					for(var i in info){
						if(info[i].id == data.saving_planid){
							$("#saving_plan").append("<option value='"+info[i].id+"' selected>"+info[i].frequency+" [KES. "+info[i].min_amount+"]"+"</option>");
						}else{
							$("#saving_plan").append("<option value='"+info[i].id+"'>"+info[i].frequency+" [KES. "+info[i].min_amount+"]"+"</option>");
						}
					}
				}
			});

			$("#saving_purpose").val(data.purpose);
			$("#saving-plan-modal-title").text("Update Savings");
			$("#btn-saving-application").text("Update");
			$("#saving_action").val("update_saving");
			$("#saving_id").val(eid);

			/*$("#plan_frequency").val(data.frequency);
			$("#min_amount").val(data.min_amount);
			$("#plan_action").val("update_plan");
			$("#btn-plan").text("Update");
			$("#plan_id").val(eid);*/
		}
	});
});

$("body").delegate("#btn-delete-plan","click",function(){
	$("#delete_modal").modal("show");
	deleteID = $(this).attr("did");
	deleteTable = "saving_plans";
	deletePk = "id";
});

$("body").delegate("#btn-delete-saving","click",function(){
	$("#delete_modal").modal("show");
	deleteID = $(this).attr("lid");
	deleteTable = "savings_table";
	deletePk = "id";
});

$("#savingapplication-form").on("submit",function(e){
	e.preventDefault();
	var status = false;
	var customer = $("#saving_customer");
	var plan = $("#saving_plan");
	var action = $("#saving_action");

	if(plan.val() == ""){
		plan.addClass("is-invalid");
		status = false;
	}else{
		plan.removeClass("is-invalid");
		status = true
	}

	if(customer.val() == ""){
		customer.addClass("is-invalid");
		status = false;
	}else{
		customer.removeClass("is-invalid");
		status = true
	}

	if(status == true){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data : $("#savingapplication-form").serialize(),
			success : function(data){
				if (action.val() == "new_saving") {
					if (data == "SUCCESSFULLY_ADDED") {
						$("#savingapplication-form")[0].reset();
						$("#new_saving").modal("hide");
						getAllSavings(1);
						action.val("new_saving");
					}else if(data == "UNKOWN_ERROR"){
						showSnackbar("An error occured!. Try again later.");
					}else{
						showSnackbar("An error occured!. Try again later.");
					}
				}

				if (action.val() == "update_saving") {
					if (data == "UPDATED") {
						showSnackbar("Saving updated successfully.");
						$("#savingapplication-form")[0].reset();
						getAllSavings(1);
						$("#new_saving").modal("hide");
						action.val("new_saving");
						customer.removeAttr("disabled");
						getAllSavingPlans(1);
						getSavingPlans();
						getAllBorrowers();
						$("#btn-saving-application").text("Save");
						$("#saving-plan-modal-title").text("New Saving Application");
					}else if(data == "UNKOWN_ERROR"){
						showSnackbar("An error occured!. Try again later.");
						$("#new_saving").modal("hide");
					}else{
						showSnackbar("An error occured!. Try again later.");
						$("#new_saving").modal("hide");
					}
				}
			}
		});
	}

});

$("#saving_plan_form").on("submit",function(e){
	e.preventDefault();
	var status = false;
	var plan = $("#plan_frequency");
	var minamount = $("#min_amount");
	var action = $("#plan_action");

	if(plan.val() == ""){
		plan.addClass("is-invalid");
		status = false;
	}else{
		plan.removeClass("is-invalid");
		status = true
	}

	if(minamount.val() == ""){
		minamount.addClass("is-invalid");
		status = false;
	}else{
		minamount.removeClass("is-invalid");
		status = true
	}

	if(status == true){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data : $("#saving_plan_form").serialize(),
			success : function(data){
				if(action.val() == "new_plan"){
					if (data == "SUCCESSFULLY_ADDED") {
						showSnackbar("Plan added successfully.");
						$("#saving_plan_form")[0].reset();
						getSavingPlans();
						getAllSavingPlans(1);
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
						$("#saving_plan_form")[0].reset();
						getAllSavingPlans(1);
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