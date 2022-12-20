getAllCustomers(1);
getCustomersData();

var deleteID = "";
var deleteTable = "";
var deletePk = "";

$("#import_payments").on("click", function(){
	$("#upload_select_customer_file").modal("show");
});

var uploadedFile = '';
var totalData = [];
var selectedData = [];

$("#btn-save-data").on("click", function(){
	$(this).attr("disabled","disabled");
	$("#btn-save-data").text("Saving data ... ");
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
   		getAllCustomers(1);
   		getCustomersData();
   		window.location.reload();
   		return;
   }

   $.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {saveCustomerDataToDatabase:1,data:JSON.stringify(data[counter])},
		success : function(response){
			if (response === "SUCCESSFULLY_REGISTERED") {
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
});

$("#btn-import-data").on("click", function(){
    //var xl2json = new ExcelToJSON();
    $("#btn-import-data").attr("disabled","disabled");
    $("#btn-import-data span").text("Importing ...")
    $(".upload_file_bar").removeClass("no-vis");
    $(".icon-import-data").removeClass("no-show");
    parseExcel(uploadedFile);
});

function resetUploadModal(){
		uploadedFile = "";
  	$(".upload_file_label").removeClass("no-show");
  	$(".display-file").addClass("no-show");
  	$(".file-upload_name").text("");
  	$("#btn-import-data").attr('disabled','disabled');
}

function randomId(){
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

function renderData(info){
	var data = info.map(v => ({...v, id: randomId()}));
	if(data.length == info.length){
		$(".icon-import-data").addClass("no-show");
		$(".upload_file_bar").addClass("no-vis");
		$("#upload_select_customer_file").modal("hide");
		$("#preview_data_customer_modal").modal("show");
		resetUploadModal();
	}

	for (var i in data) {
		//console.log(data[i]);
		if (data[i].Name != undefined) {
			//console.log(data[i].Details);
			totalData.push(data[i]);
			var content = '<tr class="item-row-'+data[i].id+'" id="item-row-'+data[i].id+'">' +
							'<td>' + '<label class="container">' +
										  '<input type="checkbox" class="inputSelectSingle"  rno="'+i+'" rid="'+data[i].id+'">' +
										  '<span class="checkmark"></span>' +
									  '</label>' + 
							'</td>' +
							'<td>' + (parseInt(i) + 1) + '</td>' +
							'<td>' + data[i].Name + '</td>' +
							'<td>' + '</td>' +
							'<td>' + '<i class="fa-solid fa-circle-check status-icon no-show"></i>' + '</td>' +
						  '</tr>';
			$("#preview_data_details").append(content);			  
			//console.log(`data info ${i}`, data[i]['Receipt No']);
			//console.log(`data info ${i}`, (data[i].Details).substring(data[i].Details.indexOf('-') + 1));
		}
	}
	setDataInfo();
}

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
        //jQuery( '#xlx_json' ).val( json_object );
      })
    };

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
}

var customersData = [];
var selectedCustomersData = [];
var inputSelectAllCustomersCheckbox = false;

var selectedRecipients = [];

$("#btn-message-customers").on("click", function(){
	if (selectedCustomersData.length > 0) {
		selectedRecipients = selectedCustomersData;
		$("#create_newmessage").modal("show");
		setMessageList();
	}
});

var selectedContacts = [];

function setMessageList() {
	console.log(selectedRecipients);
	selectedContacts = selectedRecipients;
	setRecipientCount(selectedRecipients);
	for(var i in selectedRecipients){
		var content = '<li class="active" id="contact-list" rowno="'+i+'" cid="'+selectedRecipients[i].id+'"><div class="item-left"><div class="avatar"><div class="avatar-details">'+(selectedRecipients[i].firstname.slice(0,1)).toUpperCase()+'</div></div><h6>'+selectedRecipients[i].firstname+" "+selectedRecipients[i].middlename+" "+selectedRecipients[i].lastname+'</h6></div><i class="fa-solid fa-circle-minus selected-icon danger"></i></li>';
		$(".user-message-list").append(content);
	}
}

function setRecipientCount(data) {
	$("#selected-recipients-span").text(`${data.length} contacts`);
}

$("body").delegate("#contact-list","click",function(){
	var cid = $(this).attr("cid");
	var rowno = $(this).attr("rowno");
	var contact = selectedRecipients[rowno];
	console.log(contact);
	if ($(this).hasClass("active")) {
		$(this).removeClass("active");
		$(this).find(".selected-icon").toggleClass("danger success");
		$(this).find(".selected-icon").toggleClass("fa-circle-minus fa-circle-plus");
		for (var i in selectedContacts) {
      if (selectedContacts[i].id == cid) {
        selectedContacts.splice(i, 1);
      }
    }
    console.log(selectedContacts);
    setRecipientCount(selectedContacts);
	}else{
		$(this).addClass("active");
		$(this).find(".selected-icon").toggleClass("success danger");
		$(this).find(".selected-icon").toggleClass("fa-circle-plus fa-circle-minus");
		selectedContacts.splice(rowno, 0, contact);
		console.log(selectedContacts);
		setRecipientCount(selectedContacts);
	}
});

$("body").delegate("#btn-print-customers","click",function(){
	if (selectedCustomersData.length > 0 && selectedCustomersData.length == customersData.length) {
			$.ajax({
				url : "./includes/action.php",
				method : "POST",
				data : {generateAllCustomersReport:1},
				success : function(data){
					window.location.href = `./reports/customers/userinfor${data}.pdf`;
				}
			});
	}

	if (selectedCustomersData.length > 0 && selectedCustomersData.length < customersData.length) {
			$.ajax({
				url : "./includes/action.php",
				method : "POST",
				data : {generateSelectedCustomersReport:1,customers:selectedCustomersData},
				success : function(data){
					window.location.href = `./reports/customers/userinfor${data}.pdf`;
				}
			});
	}
});

$("body").delegate(".btn-delete-selected-customers","click",function(){
	if(selectedCustomersData.length > 0){
		$(this).attr("disabled","disabled");
		$(".customer-action-progress-info").removeClass("no-show");
		$(".customer-action-progress-info").text("Deleting ...")
		$(".customer-action-progress-icon").removeClass("no-show");
		deleteDataFromDatabase(0, selectedCustomersData);
	}
});

function deleteDataFromDatabase (counter, data){
	//console.log(data);
   if(counter === undefined) 
     	counter = 0;   
   if(counter >= data.length) { 
   	$(".btn-delete-selected-customers").removeAttr("disabled");
   		$(".customer-action-progress-info").addClass("no-show");
   		$(".customer-action-progress-info").text("")
		$(".customer-action-progress-icon").addClass("no-show");
		$(".customer-action-progress-span").addClass("no-show");
		$(".customer-action-progress-percentage").html("");
		$(".customer-action-progress-count").html("");
		selectedCustomersData = [];
		window.location.reload();
		//getCustomersData();
		//setCustomerInfo();
 		//getAllCustomers(1);
   }

   $.ajax({
    url : "./includes/action.php",
    method : "POST",
    data : {deleteRecord:1,table:"customers",pk:"id",deleteId:data[counter].id},
    success : function(resp){
      if(resp == "RECORD_DELETED"){	
      	if ($(".customer-action-progress-span").hasClass("no-show")) {
					$(".customer-action-progress-span").removeClass("no-show");
				}
				$(".customer-action-progress-percentage").html(`${Math.round(((parseInt(counter) + 1)/data.length)*100).toFixed(2)}%`);
				$(".customer-action-progress-count").html(`${parseInt(counter) + 1}/${data.length}`);
				//$("#payment-td-"+data[counter].ref_no).remove();
			
      }else{
      	showSnackbar("This record is in use");
      }
      counter++;
      deleteDataFromDatabase(counter, data);
    }
  });
}

$("body").delegate("#inputSelectAllCustomers","change", function(){
	if($(this).prop("checked")) {
		if (selectedCustomersData.length > 0) {
			selectedCustomersData = [];
		}
		for(var i in customersData){
			selectedCustomersData.push(customersData[i]);
		}
		setCustomerDataInfo();
		$(".inputSelectSingleCustomer").prop('checked', true);
		inputSelectAllCustomersCheckbox = true;
	}else{
		selectedCustomersData = [];
		setCustomerDataInfo();
		$(".inputSelectSingleCustomer").prop('checked', false);
		inputSelectAllCustomersCheckbox = false;
	}
});

$("body").delegate(".inputSelectSingleCustomer","change",function(){
	var customerrowno = $(this).attr("crno");
	var customerrowid = $(this).attr("crid");
	var customerrowdata = customersData[customerrowno];
	if ($(this).prop("checked")) {
		selectedCustomersData.splice(customerrowno, 0, customerrowdata);
		setCustomerDataInfo();
	}else{
		if(selectedCustomersData.length > 0){
			for(var i in selectedCustomersData){
				if(selectedCustomersData[i].idnumber== customerrowid){
					selectedCustomersData.splice(i, 1);
				}
			}
			setCustomerDataInfo();
		}
	}
});

function setCustomerDataInfo() {
	if (selectedCustomersData.length > 0) {
		$(".table-selected-rows").removeClass("no-show");
		$(".info-table-actions-center").removeClass("no-vis");
	}else{
		$(".table-selected-rows").addClass("no-show");
		$(".info-table-actions-center").addClass("no-vis");
	}
	$(".table-selected-rows").html(`selected ${selectedCustomersData.length}/${customersData.length}`);
}

function setCustomersData(){
	if(customersData.length > 0){
		customersData = customersData.reverse();
		$(".info-table-actions").removeClass("no-show");
		$(".table-total-rows").removeClass("no-show");
		$(".table-total-rows").html(`${customersData.length} rows`);
		$(".search-box").removeClass("no-vis");
	}else{
		$(".search-box").addClass("no-vis");
	}
}

function getCustomersData(){
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		data : {getTableData:1,table:"customers"},
		success : function(data){
			if (data != "NO_DATA") {
				for(var i in data){
					customersData.push(data[i]);
				}
				setCustomersData();
			}
		}
	});
}

var searchtext = "";
var spn = 1;

$("#seach-data").on("keyup input", function() {
  var inputVal = $(this).val();
  searchtext = inputVal;
  if(inputVal.length){
  		$(".seach-data-loader").removeClass("no-show");
  		searchAllCustomers(inputVal,spn);
  } else{
  		spn = 1;
  		searchtext = "";
  		$(".seach-data-loader").addClass("no-show");
      getAllCustomers(1);
  }
});

$("body").delegate(".page-link","click",function(){
	if (searchtext != "") {
		spn = $(this).attr("pn");
		searchAllCustomers(searchtext,spn);
	}else{
		var pn = $(this).attr("pn");
		getAllCustomers(pn);
	}
});

function searchAllCustomers(term,pn) {
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {searchAllCustomers:1,pageno:pn,keyword:term},
		success : function(data){
			$(".seach-data-loader").addClass("no-show");
			$(".customer-table").html(data);
		}
	})
}

function getAllCustomers(pn)
{
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllCustomers:1,pageno:pn},
		success : function(data){
			$(".customer-table").html(data);
		}
	})
}

$("body").delegate("#customerRow","click",function(){
	var cid = $(this).attr("cid");
	window.location.href = "./user/?id="+cid;
});

$("body").delegate("#customerEdit","click",function(){
	var cid = $(this).attr("cid");
	window.location.href = "./edit_customer/?id="+cid;
});

$("#add_new_customer").on("click", function()
{
	$("#create_newcustomer").modal("show");
});

$("body").delegate("#btn-delete-customer","click",function(){
	$("#delete_modal").modal("show");
	deleteID = $(this).attr("cid");
	deleteTable = "customers";
	deletePk = "id";
});

function closeNewCustomerModal()
{
	$("#create_newcustomer").modal("hide");
}

function showProgressBar(){
	$(".bar").removeClass("no-vis");
}

function hideProgressBar(){
	$(".bar").addClass("no-vis");
}

function resetFormElement(element)
{
	element[0].reset();
}

function resetPassport()
{
	$(".displayPassport").html("");
	$(".select_passport").removeClass("no-show");
	$(".change_passport").addClass("no-show");
}

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

$("body").delegate("#input_idnumber","keypress", (e) => 
{
  if (isNaN(parseInt(e.key, 10)) && e.key !== "Backspace" && e.key !== "Enter") {
      e.preventDefault();
    }
});

$("body").delegate("#input_primarycontact","keypress", (e) => 
{
  if (isNaN(parseInt(e.key, 10)) && e.key !== "Backspace" && e.key !== "Enter") {
      e.preventDefault();
    }
});

$("body").delegate("#input_alternativecontact","keypress", (e) => 
{
  if (isNaN(parseInt(e.key, 10)) && e.key !== "Backspace" && e.key !== "Enter") {
      e.preventDefault();
    }
});

$("#personal-details-btn").on("click",function(){
	var status = false;
	var e_patt = new RegExp(/^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9_-]+(\.[a-z0-9_-]+)*(\.[a-z]{2,4})$/);
	var firstname = $("#input_firstname");
	var middlename = $("#input_middlename");
	var lastname = $("#input_lastname");
	var passport = $("#input_passpost");
	var idnumber = $("#input_idnumber");
	var krapin = $("#input_krapin");
	var primarycontact = $("#input_primarycontact");
	var altcontact = $("#input_alternativecontact");
	var email = $("#input_email");
	var notes = $("#input_notes");

	if(firstname.val() == ""){
		firstname.addClass("is-invalid");
		status = false;
	}else{
		firstname.removeClass("is-invalid");
		status = true
	}

	if(lastname.val() == ""){
		lastname.addClass("is-invalid");
		status = false;
	}else{
		lastname.removeClass("is-invalid");
		status = true
	}

	if(idnumber.val() == ""){
		idnumber.addClass("is-invalid");
		status = false;
	}else{
		idnumber.removeClass("is-invalid");
		status = true
	}

	/*if(krapin.val() == ""){
		krapin.addClass("is-invalid");
		status = false;
	}else{
		krapin.removeClass("is-invalid");
		status = true
	}*/

	if(primarycontact.val() == ""){
		primarycontact.addClass("is-invalid");
		status = false;
	}else{
		primarycontact.removeClass("is-invalid");
		status = true
	}

	if(email.val() != ""){
		if(!e_patt.test(email.val())){
			email.addClass("is-invalid");
			status = false;
		}else{
			email.removeClass("is-invalid");
			status = true
		}
	}

	if (status) {
		$(".personal-details").addClass("no-show");
		$(".referer-details").removeClass("no-show");
		$("#btn-navigate").removeClass("no-show");
		$("#btn-navigate").attr("bn","referer-details");
	}
});

$("#btn-navigate").on("click",function(){
	if($(this).attr("bn") == "referer-details"){
		$(".referer-details").addClass("no-show");
		$(".personal-details").removeClass("no-show");
		$("#btn-navigate").addClass("no-show");
		$("#btn-navigate").attr("bn","personal-details");
	}

	if($(this).attr("bn") == "business-details") {
		$(".business-details").addClass("no-show");
		$(".referer-details").removeClass("no-show");
		$("#btn-navigate").attr("bn","referer-details");
	}
});

$("#referer-details-btn").on("click",function(){

	var status = false;
	var refname = $("#input_refname");
	var refidno = $("#input_refidnumber");
	var refphoneno = $("#input_refprimarycontact");

	if(refname.val() == ""){
		refname.addClass("is-invalid");
		status = false;
	}else{
		refname.removeClass("is-invalid");
		status = true
	}

	if(refidno.val() == ""){
		refidno.addClass("is-invalid");
		status = false;
	}else{
		refidno.removeClass("is-invalid");
		status = true
	}

	if(refphoneno.val() == ""){
		refphoneno.addClass("is-invalid");
		status = false;
	}else{
		refphoneno.removeClass("is-invalid");
		status = true
	}

	if(status){
		$(".referer-details").addClass("no-show");
		$(".business-details").removeClass("no-show");
		$("#btn-navigate").attr("bn","business-details");
	}
});

$("#newcustomer-form").on("submit",function(e)
{
	e.preventDefault();
		showProgressBar();
		$.ajax({
		   url : "./includes/action.php",
		   method: "POST",
		   data:  new FormData(this),
		   contentType: false,
		         cache: false,
		   processData:false,
		   beforeSend : function()
		   {
		    
		   },
		   success: function(data)
		   {
		   	if(data == 'INVALID')
		    {
		    	hideProgressBar();
		    	resetPassport();
		    	showSnackbar("The passport photo is invalid! Use a different passport");
		    }
		    else if(data == 'CUSTOMER_ALREADY_REGISTERED')
		    {
		    	hideProgressBar();
		    	showSnackbar("This customer details already exists!. Try to update the customer details");
		    }
		    else if (data == 'NOT_UPLOADED') 
		    {
		    	hideProgressBar();
		    	showSnackbar("The passport photo was not uploaded! Try again or use a different passport");
		    }
		    else if(data == 'UNKNOWN_ERROR')
		    {
		    	hideProgressBar();
		     	showSnackbar("An error occured! Please try again later");
		    }
		    else if(data == 'SUCCESSFULLY_REGISTERED')
		    {
		    	hideProgressBar();
		    	resetFormElement($("#newcustomer-form"));
		    	resetPassport();
		    	showSnackbar("Customer details saved successfully.");
		    	closeNewCustomerModal();
		    	getAllCustomers(1);
		    }
		   },
		   error: function(e) 
		   {
		   	hideProgressBar();
		    showSnackbar("An error occured! Please try again later");
		   }
		});
});