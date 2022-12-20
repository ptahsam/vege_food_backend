getUserData();
var customerfirstname;
var customermiddlename;
var customerlastname;
var customeremail;
var customerid;
var customeridnumber;
var customerkrapin;
var customernotes;
var customerpassportphoto;
var customerphone;
var customeraltphone;
var customerreferername;
var customerrefereridnumber;
var customerrefererphone;
var customerrefereraltphone;
var customerspousename;
var customerspouseidnumber;
var customerspousephone;
var customerspousealtphone;
var customerbusinesstype;
var customerbusinessoperationduration;
var customerbusinesslocation;
var customerlocation;
var customerjoiningreason;
var customerregdate;
var customerupdatedate;

$("#update_customer_info").on("click", function()
{
	$("#create_newcustomer").modal("show");
});

$("#print_customer_info").on("click", function(){
	var customeridno = $("#customer_idno").val();
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {generateUserReport:1,customeridno:customeridno},
		success : function(data){

		}
	})
});

function getUserData(){
	var customerid = $("#customer_id").val();
	$.ajax({
		url : "./includes/process.php",
		method : "POST",
		data : {getTableRow:1,table:"customers",pk:"id",pkvalue:customerid},
		success : function(data){
			customerfirstname = data.firstname;
			customermiddlename = data.middlename;
			customerlastname = data.lastname;
			customeremail = data.email;
			customerid = data.id;
			customeridnumber = data.idnumber;
			customerkrapin = data.krapin;
			customernotes = data.notes;
			customerpassportphoto = data.passport_photo;
			customerphone = data.phonenumber_one;
			customeraltphone = data.phonenumber_two;
			customerregdate = data.registered_date;
			customerupdatedate = data.updated_date;
			customerreferername = data.referer_name;
			customerrefereridnumber = data.referer_idnumber;
			customerrefererphone = data.referer_primarycontact;
			customerrefereraltphone = data.referer_alternativecontact;
			customerspousename = data.spouse_name;
			customerspouseidnumber = data.spouse_idnumber;
			customerspousephone = data.spouse_primarycontact;
			customerspousealtphone = data.spouse_alternativecontact;
			customerbusinesstype = data.business_type;
			customerbusinessoperationduration = data.business_operationduration;
			customerbusinesslocation = data.business_location;
			customerlocation = data.customer_location;
			customerjoiningreason = data.joining_reason;
			setCustomerInfo();
			setUpdateInfo();
		}
	})
}

function setCustomerInfo(){
	var customername = "";
	if(customermiddlename != ""){
		customername = customerfirstname + " " + customermiddlename + " " + customerlastname;
	}else{
		customername = customerfirstname + " " + customerlastname;
	}
	$("#customer-info-title").text(customername);
	if(customerpassportphoto != ""){
		$(".user-info-img").html("<img src='./images/passports/"+customerpassportphoto+"'>");
	}
	if(customeremail != ""){
		$("#customer-info-email").text(customeremail);
	}else{
		$("#customer-info-email").text("No email available");
	}
	if(customeraltphone != ""){
		$("#customer-info-altphoneno").text(customeraltphone);
	}else{
		$("#customer-info-altphoneno").text("No alternative phone number")
	}
	$("#customer-info-krapin").text(customerkrapin);
	$("#customer-info-phoneno").text(customerphone);
	$("#customer-info-idno").text(customeridnumber);

	if(customerreferername != ""){
		$("#customer-info-referername").text(customerreferername);
	}else{
		$("#customer-info-referername").text("No referer available");
	}

	if(customerrefereridnumber != ""){
		$("#customer-info-refereridnumber").text(customerrefereridnumber);
	}else{
		$("#customer-info-refereridnumber").text("No referer id number available");
	}

	if(customerrefererphone != ""){
		$("#customer-info-refererphoneno").text(customerrefererphone);
	}else{
		$("#customer-info-refererphoneno").text("No referer phone number available");
	}

	if(customerrefereraltphone != ""){
		$("#customer-info-refereraltphoneno").text(customerrefereraltphone);
	}else{
		$("#customer-info-refereraltphoneno").text("No referer alt phone number available");
	}

	if(customerspousename != ""){
		$("#customer-info-spousename").text(customerspousename);
	}else{
		$("#customer-info-spousename").text("No spouse available");
	}

	if(customerspouseidnumber != ""){
		$("#customer-info-spouseidnumber").text(customerspouseidnumber);
	}else{
		$("#customer-info-spouseidnumber").text("No spouse id number available");
	}

	if(customerspousephone != ""){
		$("#customer-info-spousephoneno").text(customerspousephone);
	}else{
		$("#customer-info-spousephoneno").text("No spouse phone number available");
	}

	if(customerspousealtphone != ""){
		$("#customer-info-spousealtphoneno").text(customerspousealtphone);
	}else{
		$("#customer-info-spousealtphoneno").text("No spouse alt phone number available");
	}

	if(customerbusinesstype != ""){
		$("#customer-info-businesstype").text(customerbusinesstype);
	}else{
		$("#customer-info-businesstype").text("No business available");
	}

	if(customerbusinessoperationduration != ""){
		$("#customer-info-businessduration").text(customerbusinessoperationduration);
	}else{
		$("#customer-info-businessduration").text("No business operation duration available");
	}

	if(customerbusinesslocation != ""){
		$("#customer-info-businesslocation").text(customerbusinesslocation);
	}else{
		$("#customer-info-businesslocation").text("No business location available");
	}

	if(customerjoiningreason != ""){
		$("#customer-info-joiningreason").text(customerjoiningreason);
	}else{
		$("#customer-info-joiningreason").text("No reason for joining available");
	}

	if(customernotes != ""){
		$("#customer-info-notes").text(customernotes);
	}else{
		$("#customer-info-notes").text("No customer notes available");
	}

	if(customerlocation != ""){
		$("#customer-info-location").text(customerlocation);
	}else{
		$("#customer-info-location").text("No customer location available");
	}

	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {convertTimestamp:1,timestamp:customerregdate},
		success : function(data){
			$("#customer-info-regdate").text(data);
		}
	})

}

function setUpdateInfo(){
	$("#customer-modal-title").text("Update customer details");
	$("#input_firstname").val(customerfirstname);
	$("#input_middlename").val(customermiddlename);
	$("#input_lastname").val(customerlastname);
	if(customerpassportphoto != ""){
		$(".displayPassport").html("<img src='./images/passports/"+customerpassportphoto+"'>");
		$(".select_passport").addClass("no-show");
		$(".change_passport").removeClass("no-show");	
	}
	$("#input_idnumber").val(customeridnumber);
	$("#input_idnumber").attr("readonly", "readonly");
	$("#input_krapin").val(customerkrapin);
	$("#input_primarycontact").val(customerphone);
	$("#input_alternativecontact").val(customeraltphone);
	$("#input_email").val(customeremail);
	$("#input_notes").val(customernotes);
	$("#btn-customer").text("Update");
}