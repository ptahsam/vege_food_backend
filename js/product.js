getAllCategories();
getAllProducts(1);
getPaymentsData();
var deleteID = "";
var deleteTable = "";
var deletePk = "";

$("#import_payments").on("click", function(){
	$("#upload_select_file").modal("show");
});

$("#add_new_product").on("click",function(){
	$("#create_newproduct").modal("show");
});

$('[name="input_passpost"]').change(function(e)
{
	$(".smallLoader").removeClass("no-show");
    for (var i = 0; i < e.target.files.length; i++) {
        var reader = new FileReader();
        reader.onload = function(e) {
        	var bin = e.target.result;
        	$(".displayPassport").html("<img src='"+bin+"'>");
        	$(".select_passport").addClass("no-show");
        	$(".change_passport").removeClass("no-show");
        	$(".smallLoader").addClass("no-show");
        }
        reader.readAsDataURL(e.target.files[i]);
    }  
})

$("body").delegate("#btn-edit-payment","click",function(){
	var eid = $(this).attr("eid");
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		data : {getTableRow:1,table:"payments_table",pk:"id",pkvalue:eid},
		success : function(data){
			

			$.ajax({
				url : "./includes/process.php",
				method : "POST",
				data : {getTableData:1,table:"customers"},
				success : function(info){
					info = sortByFirstname(info);
					var choose = "<option value=''>- Select Customer -</option>";
					$("#input_customer").html(choose);
					for(var i in info){
						if(info[i].id == data.customer_idno){
							$("#input_customer").append("<option value='"+info[i].id+"' selected>"+info[i].firstname+" "+info[i].middlename+" "+info[i].lastname+"</option>");
						}else{
							$("#input_customer").append("<option value='"+info[i].id+"'>"+info[i].firstname+" "+info[i].middlename+" "+info[i].lastname+"</option>");
						}
					}
				}
			});

			var choose = "";
			if(data.payment_method == "cash"){
				choose =  '<option value="">-Select Payment Mode-</option>' +
										'<option value="cash" selected>Cash</option>' +
										'<option value="mpesa">Mpesa</option>' +
										'<option value="other">Other</option>';
			}else if (data.payment_method == "mpesa") {
				choose =  '<option value="">-Select Payment Mode-</option>' +
										'<option value="cash">Cash</option>' +
										'<option value="mpesa" selected>Mpesa</option>' +
										'<option value="other">Other</option>';
			}else if (data.payment_method == "other") {
				choose =  '<option value="">-Select Payment Mode-</option>' +
										'<option value="cash">Cash</option>' +
										'<option value="mpesa">Mpesa</option>' +
										'<option value="other" selected>Other</option>';
			}else{
				choose =  '<option value="">-Select Payment Mode-</option>' +
										'<option value="cash">Cash</option>' +
										'<option value="mpesa">Mpesa</option>' +
										'<option value="other">Other</option>';
			}	
			$("#input_paymentmode").html(choose);	

			var choose = "";
			if(data.payment_purpose == "deposit"){
				choose =  '<option value="">-Select Payment Purpose-</option>' +
										'<option value="deposit" selected>Deposit</option>' +
										'<option value="saving">Saving</option>' +
										'<option value="loan">Loan</option>';
			}else if (data.payment_purpose == "saving") {
				choose =  '<option value="">-Select Payment Purpose-</option>' +
										'<option value="deposit">Deposit</option>' +
										'<option value="saving" selected>Saving</option>' +
										'<option value="loan">Loan</option>';
			}else if (data.payment_purpose == "loan") {
				choose =  '<option value="">-Select Payment Purpose-</option>' +
										'<option value="deposit">Deposit</option>' +
										'<option value="saving">Saving</option>' +
										'<option value="loan" selected>Loan</option>';
			}else{
				choose =  '<option value="">-Select Payment Purpose-</option>' +
										'<option value="deposit">Deposit</option>' +
										'<option value="saving">Saving</option>' +
										'<option value="loan">Loan</option>';
			}	

			$("#input_paymentpurpose").html(choose);
			$("#input_paymentpurpose").removeAttr("disabled");
			$("#payment_purposeref").val(data.payment_purposeid);
			$("#input_paymentamount").val((data.amount).replace(',',''));
			$("#input_comment").val(data.comments);
			$("#payment_action").val("update_payment");
			$("#btn-payment").text("Update");
			$("#payment_id").val(eid);
			$("#create_newpayment").modal("show");
					
			//$("#plan_frequency").val(data.frequency);
			//$("#min_amount").val(data.min_amount);
			//$("#plan_action").val("update_plan");
			//$("#btn-plan").text("Update");
			//$("#plan_id").val(eid);
		}
	});
});

var paymentsData = [];
var selectedPaymentsData = [];
var inputSelectAllPaymentsCheckbox = false;

$(".btn-delete-selected-payments").on("click", function(){
	if(selectedPaymentsData.length > 0){
		console.log(selectedPaymentsData.length);
		$(".btn-delete-selected-payments").attr("disabled","disabled");
		$(".payment-action-progress-info").removeClass("no-show");
		$(".payment-action-progress-info").text("Deleting ...")
		$(".payment-action-progress-icon").removeClass("no-show");
		deleteDataFromDatabase(0, selectedPaymentsData);
	}
});

function deleteDataFromDatabase (counter, data){
	//console.log(data);
   if(counter === undefined) 
     	counter = 0;   
   if(counter >= data.length) { 
   		$(".btn-delete-selected-payments").removeAttr("disabled");
   		$(".payment-action-progress-info").addClass("no-show");
   		$(".payment-action-progress-info").text("")
		$(".payment-action-progress-icon").addClass("no-show");
		$(".payment-action-progress-span").addClass("no-show");
		$(".payment-action-progress-percentage").html("");
		$(".payment-action-progress-count").html("");
		selectedPaymentsData = [];
		getPaymentsData();
		setPaymentDataInfo();
 		getAllPayments(1);		
 		window.location.reload();
   }

   $.ajax({
    url : "./includes/action.php",
    method : "POST",
    data : {deleteRecord:1,table:"payments_table",pk:"id",deleteId:data[counter].id},
    success : function(resp){
      if(resp == "RECORD_DELETED"){	
      	if ($(".payment-action-progress-span").hasClass("no-show")) {
			$(".payment-action-progress-span").removeClass("no-show");
		}
		$(".payment-action-progress-percentage").html(`${Math.round(((parseInt(counter) + 1)/data.length)*100).toFixed(2)}%`);
		$(".payment-action-progress-count").html(`${parseInt(counter) + 1}/${data.length}`);
		$("#payment-td-"+data[counter].ref_no).remove();
	
      }
      counter++;
      deleteDataFromDatabase(counter, data);
    }
  });
}

$("body").delegate("#inputSelectAllPayments","change", function(){
	if($(this).prop("checked")) {
		if (selectedPaymentsData.length > 0) {
			selectedPaymentsData = [];
		}
		for(var i in paymentsData){
			selectedPaymentsData.push(paymentsData[i]);
		}
		setPaymentDataInfo();
		$(".inputSelectSinglePayment").prop('checked', true);
		inputSelectAllPaymentsCheckbox = true;
	}else{
		selectedPaymentsData = [];
		setPaymentDataInfo();
		$(".inputSelectSinglePayment").prop('checked', false);
		inputSelectAllPaymentsCheckbox = false;
	}
});

$("body").delegate(".inputSelectSinglePayment","change",function(){
	var paymentrowno = $(this).attr("prno");
	var paymentrowid = $(this).attr("prid");
	var paymentrowdata = paymentsData[paymentrowno];
	if ($(this).prop("checked")) {
		selectedPaymentsData.splice(paymentrowno, 0, paymentrowdata);
		setPaymentDataInfo();
	}else{
		if(selectedPaymentsData.length > 0){
			for(var i in selectedPaymentsData){
				if(selectedPaymentsData[i].ref_no== paymentrowid){
					selectedPaymentsData.splice(i, 1);
				}
			}
			setPaymentDataInfo();
		}
	}
});

function getSelectedPayments(){
	if (selectedPaymentsData.length > 0){
		if (inputSelectAllPaymentsCheckbox) {
			$("#inputSelectAllPayments").prop('checked', true);
		}
		for(var i in selectedPaymentsData){
			$("#inputSelectSinglePayment-"+selectedPaymentsData[i].ref_no).prop('checked', true);
		}
	}
}

function setPaymentDataInfo() {
	if (selectedPaymentsData.length > 0) {
		$(".table-selected-rows").removeClass("no-show");
		$(".info-table-actions-center").removeClass("no-vis");
	}else{
		$(".table-selected-rows").addClass("no-show");
		$(".info-table-actions-center").addClass("no-vis");
	}
	$(".table-selected-rows").html(`selected ${selectedPaymentsData.length}/${paymentsData.length}`);
}

function setPaymentsData(){
	if(paymentsData.length > 0){
		paymentsData = paymentsData.reverse();
		$(".info-table-actions").removeClass("no-show");
		$(".table-total-rows").removeClass("no-show");
		$(".table-total-rows").html(`${paymentsData.length} rows`);
		$(".search-box").removeClass("no-vis");
	}else{
		$(".search-box").addClass("no-vis");
	}
}

function getPaymentsData(){
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		data : {getTableData:1,table:"payments_table"},
		success : function(data){
			if (data != "NO_DATA") {
				for(var i in data){
					paymentsData.push(data[i]);
				}
				setPaymentsData();
			}
		}
	});
}

var uploadedFile = '';

$('[name="upload_file"]').change(function(e)
{
	$(".smallLoaderUploadFile").removeClass("no-show");
  for (var i = 0; i < e.target.files.length; i++) {
      var reader = new FileReader();
      var fname = e.target.files[i].name;
      uploadedFile = e.target.files[i];
      reader.onload = function(e) {
      	var bin = e.target.result;
      	//$(".displayPassport").html("<img src='"+bin+"'>");
      	$(".upload_file_label").addClass("no-show");
      	$(".display-file").removeClass("no-show");
      	$(".file-upload_name").text(fname);
      	//$(".change_passport").removeClass("no-show");
      	$(".smallLoaderUploadFile").addClass("no-show");
      	$("#btn-import-data").removeAttr('disabled');
      }
      reader.readAsDataURL(e.target.files[i]);
  }  
})

$("#btn-import-data").on("click", function(){
    //var xl2json = new ExcelToJSON();
    $("#btn-import-data").attr("disabled","disabled");
    $("#btn-import-data span").text("Importing ...")
    $(".upload_file_bar").removeClass("no-vis");
    $(".icon-import-data").removeClass("no-show");
    parseExcel(uploadedFile);
});

var selectedData = [];
var totalData = [];

$("#btn-save-data").on("click", function(){
	$(this).attr("disabled","disabled");
	$("#btn-save-data").text("Saving data ... ");
	//$(".progress-box-preview").removeClass("no-show");
	//$(".modal_preview_data").addClass("no-scroll");
	$(".saving-icon-progress").removeClass("no-show");
	if (selectedData.length > 0) {
		saveDataToDatabase(0,selectedData);
	}else{
		saveDataToDatabase(0,totalData);
	}
});

function saveDataToDatabase (counter, data){
   if(counter === undefined) 
     	counter = 0;   
   if(counter >= data.length) {
   		//$(".progress-box-preview").addClass("no-show");
   		$("#btn-save-data").text("All have been saved");
   		$("#btn-save-data").removeClass("btn-primary");
   		$("#btn-save-data").addClass("btn-success");
   		$(".saving-icon-progress").addClass("no-show");
   		//$(".saving-percentage").addClass("no-show");
   		$(".saving-icon-finish").removeClass("no-show");
   		$(".saving-icon-finish").addClass("text-success");
   		selectedData = [];
   		setDataInfo();
   		getAllPayments(1);
   		getPaymentsData();
   		window.location.reload();
   }

   $.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {saveDataToDatabase:1,data:JSON.stringify(data[counter])},
		success : function(response){
			if (response === "SUCCESSFULLY_ADDED") {
				if ($(".modal_preview_data_progress").hasClass("no-show")) {
					$(".modal_preview_data_progress").removeClass("no-show");
				}
				var scrollElement = document.getElementById("item-row-"+data[counter].id);
				//scrollElement.scrollIntoView({ block: 'end',  behavior: 'smooth' });
				scrollElement.scrollIntoView(false);
				$(".item-row-"+data[counter].id).find(".status-icon").removeClass("no-show");
				$(".saving-percentage").html(`${Math.round(((parseInt(counter) + 1)/data.length)*100).toFixed(2)}%`);
				$(".modal_preview_data_progress").html(`Saved ${parseInt(counter) + 1}/${data.length}`);
			}
			counter++;
        	saveDataToDatabase(counter, data);
		}
	});
}   

/*function saveDataToDatabase(data){
	var n = 0;
	for(var i in data){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data : {saveDataToDatabase:1,data:JSON.stringify(data[i])},
			success : function(response){
				if (response === "SUCCESSFULLY_ADDED") {
					$(".modal_preview_data_progress").html(`selected ${i}/${data.length}`);
				}
				if (n === data.length) {
					window.location.reload();
				}
			}
		});
		n = n + 1;
	}	
}*/

$("body").delegate("#inputSelectAll","change", function(){
	if($(this).prop("checked")) {
		if (selectedData.length > 0) {
			selectedData = [];
		}
		for(var i in totalData){
			selectedData.push(totalData[i]);
		}
		setDataInfo();
		$(".inputSelectSingle").prop('checked', true);
	}else{
		selectedData = [];
		setDataInfo();
		$(".inputSelectSingle").prop('checked', false);
	}
});

$("body").delegate(".inputSelectSingle","change",function(){
	var rowno = $(this).attr("rno");
	var rowid = $(this).attr("rid");
	var rowdata = totalData[rowno];
	if ($(this).prop("checked")) {
		selectedData.splice(rowno, 0, rowdata);
		setDataInfo();
	}else{
		if(selectedData.length > 0){
			for(var i in selectedData){
				if(selectedData[i].id == rowid){
					selectedData.splice(i, 1);
				}
			}
			setDataInfo();
		}
	}
});

/*$("body").delegate(".selectSingle","click",function(){
	var inputCheckbox = $(this).find(".inputSelectSingle");
	var rowid = $(this).attr("rid");
	var receiptno = $(this).attr("rno");
	var rowdata = totalData[rowid];
		console.log(rowdata);
	if(inputCheckbox.prop("checked") == true) {
		if(selectedData.length > 0){
			for(var i in selectedData){
				if(i == rowid && selectedData[i]['Receipt No'] == receiptno){
					selectedData.splice(i, 1);
				}
			}
			setDataInfo();
		}
	}else{	
		if(selectedData.includes(receiptno)){
			alert("present")
		
		}else{
			alert("absent");
		}	
		//selectedData.splice(rowid, 0, rowdata);
		//setDataInfo();
	}
});*/

function setDataInfo(){
	if (selectedData.length > 0) {
		$(".modal_preview_data_selected").removeClass("no-show");
		$("#btn-save-data").removeAttr("disabled");
	}else{
		$(".modal_preview_data_selected").addClass("no-show");
		$("#btn-save-data").attr("disabled","disabled");
	}
	$(".modal_preview_data_total_rows").text(totalData.length + " rows");
	$(".modal_preview_data_selected").html(`selected ${selectedData.length}/${totalData.length}`);
}

function resetUploadModal(){
		uploadedFile = "";
  	$(".upload_file_label").removeClass("no-show");
  	$(".display-file").addClass("no-show");
  	$(".file-upload_name").text("");
  	$("#btn-import-data").attr('disabled','disabled');
}

function renderData(info){
	var data = info.map(v => ({...v, id: randomId()}));
	if(data.length == info.length){
		$(".icon-import-data").addClass("no-show");
		$(".upload_file_bar").addClass("no-vis");
		$("#upload_select_file").modal("hide");
		$("#preview_data_modal").modal("show");
		resetUploadModal();
	}

	for (var i in data) {
		//console.log(data[i]);
		if (data[i].Details != undefined) {
			console.log(data[i].Details);
			totalData.push(data[i]);
			var content = '<tr class="item-row-'+data[i].id+'" id="item-row-'+data[i].id+'">' +
							'<td>' + '<label class="container">' +
										  '<input type="checkbox" class="inputSelectSingle"  rno="'+i+'" rid="'+data[i].id+'">' +
										  '<span class="checkmark"></span>' +
									  '</label>' + 
							'</td>' +
							'<td>' + (parseInt(i) + 1) + '</td>' +
							'<td>' + data[i]['Receipt No'] + '</td>' +
							'<td>' + '</td>' +
							'<td>' + data[i].Details + '</td>' +
							'<td>' + data[i]['Transaction Status'] + '</td>' +
							'<td>' + data[i]['Paid in'] + '</td>' +
							'<td>' + data[i].Withdrawn + '</td>' +
							'<td>' + data[i]['Completion Time'] + '</td>' +
							'<td>' + data[i]['Transaction Type'] + '</td>' +
							'<td>' + '<i class="fa-solid fa-circle-check status-icon no-show"></i>' + '</td>' +
						  '</tr>';
			$("#preview_data_details").append(content);			  
			//console.log(`data info ${i}`, data[i]['Receipt No']);
			//console.log(`data info ${i}`, (data[i].Details).substring(data[i].Details.indexOf('-') + 1));
		}
	}
	setDataInfo();
}

function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

function randomId(){
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

function parseExcel(file){
	var reader = new FileReader();

    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        //console.log(JSON.parse(json_object));
        renderData(JSON.parse(json_object));
        jQuery( '#xlx_json' ).val( json_object );
      })
    };

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
}

/*var ExcelToJSON = function() {
  this.parseExcel = function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        console.log(JSON.parse(json_object));
        return JSON.parse(json_object);
        jQuery( '#xlx_json' ).val( json_object );
        
      })
    };

    reader.onerror = function(ex) {
      //console.log(ex);
      return ex;
    };

    reader.readAsBinaryString(file);
  };
};*/

var searchtext = "";
var spn = 1;

$("#seach-data").on("keyup input", function() {
  var inputVal = $(this).val();
  searchtext = inputVal;
  if(inputVal.length){
  	$(".seach-data-loader").removeClass("no-show");
  	searchAllPayments(inputVal,spn);
  } else{
  		spn = 1;
  		searchtext = "";
  		$(".seach-data-loader").addClass("no-show");
      getAllPayments(1);
  }
});

$("body").delegate(".page-link","click",function(){
	if (searchtext != "") {
		spn = $(this).attr("pn");
		searchAllPayments(searchtext,spn);
	}else{
		var pn = $(this).attr("pn");
		getAllProducts(pn);
	}
});

function searchAllPayments(term,pn) {
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {searchAllPayments:1,pageno:pn,keyword:term},
		success : function(data){
			$(".payments-table").html(data);
			$(".seach-data-loader").addClass("no-show");
			getAllToolTips();
			getSelectedPayments();
		}
	})
}

function getAllProducts(pn)
{
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllProducts:1,pageno:pn},
		success : function(data){
			$(".products-table").html(data);
			getAllToolTips();
		}
	})
}

function getAllCategories(){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllCategories:1},
		success : function(data){
			var choose = "<option value=''>- Select Category -</option>";
			$("#input_category").html(choose + data);
		}
	})
}

$("#input_paymentpurpose").attr("disabled","disabled");

$("#input_customer").on("change",function(){
	if($(this).val() != ""){
		$("#input_paymentpurpose").removeAttr("disabled");
	}else{
		$("#input_paymentpurpose").attr("disabled","disabled");
		$("#input_paymentpurpose").val("");
	}
});

$("body").delegate("#btn-delete-payment","click",function(){
	$("#delete_modal").modal("show");
	deleteID = $(this).attr("lid");
	deleteTable = "payments_table";
	deletePk = "id";
});

$("#input_paymentpurpose").on("change",function(){
	var selectedValue = $(this).val();
	if($(this).val() != ""){
		if($(this).val() == "saving"){
			$.ajax({
				url : "./includes/process.php",
				method : "POST",
				data : {getTableRow:1,table:"savings_table",pk:"customer_idno",pkvalue:$("#input_customer").val()},
				success : function(data){
					if(data == "NO_DATA"){
						$("#payment_purposeref").addClass("is-invalid");
						$("#payment_purposeref").val("No saving for this customer");
					}else{
						
						$("#payment_purposeref").removeClass("is-invalid");
						$("#payment_purposeref").val((data.ref_no).toUpperCase());
						$("#payment_purposeref-info").html("Saving");
						//$("#btn-payment").removeAttr("disabled");
					}
				}
			});
		}

		if($(this).val() == "loan"){
			$.ajax({
				url : "./includes/process.php",
				method : "POST",
				data : {getTableRow:1,table:"loans_table",pk:"borrower_id",pkvalue:$("#input_customer").val()},
				success : function(data){
					if(data == "NO_DATA"){
						$("#payment_purposeref").addClass("is-invalid");
						$("#payment_purposeref").val("No current loan for this customer");
					}else{
						$("#payment_purposeref").removeClass("is-invalid");
						$("#payment_purposeref").val((data.ref_no).toUpperCase());
						//$("#btn-payment").removeAttr("disabled");
					}
				}
			});
		}
	}
});

$("#product-form").on("submit",function(e){
	e.preventDefault();
	var status = false;
	var category = $("#input_category");
	var productname = $("#input_productname");
	var productprice = $("#input_productprice");
	var amount = $("#input_productamount");
	var comment = $("#input_productdescription");
	var productaction = $("#product_action");

	if(category.val() == ""){
		category.addClass("is-invalid");
		status = false;
	}else{
		category.removeClass("is-invalid");
		status = true
	}

	if(productname.val() == ""){
		productname.addClass("is-invalid");
		status = false;
	}else{
		productname.removeClass("is-invalid");
		status = true
	}

	if(productprice.val() == ""){
		productprice.addClass("is-invalid");
		status = false;
	}else{
		productprice.removeClass("is-invalid");
		status = true
	}

	if(amount.val() == ""){
		amount.addClass("is-invalid");
		status = false;
	}else{
		amount.removeClass("is-invalid");
		status = true
	}

	if(comment.val() == ""){
		comment.addClass("is-invalid");
		status = false;
	}else{
		comment.removeClass("is-invalid");
		status = true
	}

	if(status == true){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data:  new FormData(this),
			   contentType: false,
			         cache: false,
			   processData:false,
			success : function(data){
				if (productaction.val() == "new_product") {
					if (data == "SUCCESSFULLY_ADDED") {
						$("#product-form")[0].reset();
						productaction.val("new_payment");
						$("#create_newproduct").modal("hide");
						$("#btn-product").text("Save");
						getAllProducts(1);
					}else if(data == "UNKOWN_ERROR"){
						showSnackbar("An error occured!. Try again later.");
					}else{
						showSnackbar("An error occured!. Try again later.");
					}
				}

				if (paymentaction.val() == "update_product") {
					if (data == "UPDATED") {
						$("#product-form")[0].reset();
						productprice.val("new_product");
						$("#create_newproduct").modal("hide");
						$("#btn-product").text("Save");
						getAllProducts(1);
					}else if(data == "UNKOWN_ERROR"){
						showSnackbar("An error occured!. Try again later.");
					}else{
						showSnackbar("An error occured!. Try again later.");
					}
				}
			}
		});
	}
});