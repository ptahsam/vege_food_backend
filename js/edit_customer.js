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
var customersavingplan;
var customerjoiningreason;
var customerregdate;
var customerupdatedate;

function getUserData(){
	customerid = $("#customer_id").val();
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
			customerupdatedate =data.updated_date;
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
			customersavingplan = data.saving_planschedule;
			customerjoiningreason = data.joining_reason;
			setCustomerInfo();
		}
	})
}

function setCustomerInfo(){
	$("#input_firstname").val(customerfirstname);
	$("#input_middlename").val(customermiddlename);
	$("#input_lastname").val(customerlastname);
	$("#input_idnumber").val(customeridnumber);
	$("#input_krapin").val(customerkrapin);
	$("#input_primarycontact").val(customerphone);
	$("#input_alternativecontact").val(customeraltphone);
	$("#input_email").val(customeremail);
	$("#input_notes").val(customernotes);
	$("#input_refname").val(customerreferername);
	$("#input_refidnumber").val(customerrefereridnumber);
	$("#input_refprimarycontact").val(customerrefererphone);
	$("#input_refalternativecontact").val(customerrefereraltphone);
	$("#input_spousename").val(customerspousename);
	$("#input_spouseidnumber").val(customerspouseidnumber);
	$("#input_spouseprimarycontact").val(customerspousephone);
	$("#input_spousealternativecontact").val(customerspousealtphone);
	$("#input_businesstype").val(customerbusinesstype);
	$("#input_operationduration").val(customerbusinessoperationduration);
	$("#input_businesslocation").val(customerbusinesslocation);
	$("#input_residentlocation").val(customerlocation);
	$("#input_savingplan").val(customersavingplan);
	$("#input_joiningreason").val(customerjoiningreason);
}

$("body").delegate("#input_firstname","keyup",function(){
	if($("#input_firstname").val() != ""){
		if($("#btn_input_firstname").hasClass("no-show")){
			$("#btn_input_firstname").removeClass("no-show");
		}
	}else{
		if($("#btn_input_firstname").hasClass("no-show")){
			
		}else{
			$("#btn_input_firstname").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_firstname","click",function(){
	if($("#input_firstname").val() != ""){
		updateCustomerData("firstname",$("#input_firstname").val(),$(this));
	}
});

$("body").delegate("#input_middlename","keyup",function(){
	if($("#input_middlename").val() != ""){
		if($("#btn_input_middlename").hasClass("no-show")){
			$("#btn_input_middlename").removeClass("no-show");
		}
	}else{
		if($("#btn_input_middlename").hasClass("no-show")){
			
		}else{
			$("#btn_input_middlename").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_middlename","click",function(){
	if($("#input_middlename").val() != ""){
		updateCustomerData("middlename",$("#input_middlename").val(),$(this));
	}
});

$("body").delegate("#input_lastname","keyup",function(){
	if($("#input_lastname").val() != ""){
		if($("#btn_input_lastname").hasClass("no-show")){
			$("#btn_input_lastname").removeClass("no-show");
		}
	}else{
		if($("#btn_input_lastname").hasClass("no-show")){
			
		}else{
			$("#btn_input_lastname").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_lastname","click",function(){
	if($("#input_lastname").val() != ""){
		updateCustomerData("lastname",$("#input_lastname").val(),$(this));
	}
});

$("body").delegate("#input_idnumber","keyup",function(){
	if($("#input_idnumber").val() != ""){
		if($("#btn_input_idnumber").hasClass("no-show")){
			$("#btn_input_idnumber").removeClass("no-show");
		}
	}else{
		if($("#btn_input_idnumber").hasClass("no-show")){
			
		}else{
			$("#btn_input_idnumber").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_idnumber","click",function(){
	if($("#input_idnumber").val() != ""){
		updateCustomerData("idnumber",$("#input_idnumber").val(),$(this));
	}
});

$("body").delegate("#input_krapin","keyup",function(){
	if($("#input_krapin").val() != ""){
		if($("#btn_input_krapin").hasClass("no-show")){
			$("#btn_input_krapin").removeClass("no-show");
		}
	}else{
		if($("#btn_input_krapin").hasClass("no-show")){
			
		}else{
			$("#btn_input_krapin").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_krapin","click",function(){
	if($("#input_krapin").val() != ""){
		updateCustomerData("krapin",$("#input_krapin").val(),$(this));
	}
});

$("body").delegate("#input_primarycontact","keyup",function(){
	if($("#input_primarycontact").val() != ""){
		if($("#btn_input_primarycontact").hasClass("no-show")){
			$("#btn_input_primarycontact").removeClass("no-show");
		}
	}else{
		if($("#btn_input_primarycontact").hasClass("no-show")){
			
		}else{
			$("#btn_input_primarycontact").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_primarycontact","click",function(){
	if($("#input_primarycontact").val() != ""){
		updateCustomerData("phonenumber_one",$("#input_primarycontact").val(),$(this));
	}
});

$("body").delegate("#input_alternativecontact","keyup",function(){
	if($("#input_alternativecontact").val() != ""){
		if($("#btn_input_alternativecontact").hasClass("no-show")){
			$("#btn_input_alternativecontact").removeClass("no-show");
		}
	}else{
		if($("#btn_input_alternativecontact").hasClass("no-show")){
			
		}else{
			$("#btn_input_alternativecontact").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_alternativecontact","click",function(){
	if($("#input_alternativecontact").val() != ""){
		updateCustomerData("phonenumber_two",$("#input_alternativecontact").val(),$(this));
	}
});

$("body").delegate("#input_email","keyup",function(){
	if($("#input_email").val() != ""){
		if($("#btn_input_email").hasClass("no-show")){
			$("#btn_input_email").removeClass("no-show");
		}
	}else{
		if($("#btn_input_email").hasClass("no-show")){
			
		}else{
			$("#btn_input_email").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_email","click",function(){
	if($("#input_email").val() != ""){
		updateCustomerData("email",$("#input_email").val(),$(this));
	}
});

$("body").delegate("#input_notes","keyup",function(){
	if($("#input_notes").val() != ""){
		if($("#btn_input_notes").hasClass("no-show")){
			$("#btn_input_notes").removeClass("no-show");
		}
	}else{
		if($("#btn_input_notes").hasClass("no-show")){
			
		}else{
			$("#btn_input_notes").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_notes","click",function(){
	if($("#input_notes").val() != ""){
		updateCustomerData("notes",$("#input_notes").val(),$(this));
	}
});

$("body").delegate("#input_refname","keyup",function(){
	if($("#input_refname").val() != ""){
		if($("#btn_input_refname").hasClass("no-show")){
			$("#btn_input_refname").removeClass("no-show");
		}
	}else{
		if($("#btn_input_refname").hasClass("no-show")){
			
		}else{
			$("#btn_input_refname").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_refname","click",function(){
	if($("#input_refname").val() != ""){
		updateCustomerData("referer_name",$("#input_refname").val(),$(this));
	}
});

$("body").delegate("#input_refidnumber","keyup",function(){
	if($("#input_refidnumber").val() != ""){
		if($("#btn_input_refidnumber").hasClass("no-show")){
			$("#btn_input_refidnumber").removeClass("no-show");
		}
	}else{
		if($("#btn_input_refidnumber").hasClass("no-show")){
			
		}else{
			$("#btn_input_refidnumber").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_refidnumber","click",function(){
	if($("#input_refidnumber").val() != ""){
		updateCustomerData("referer_idnumber",$("#input_refidnumber").val(),$(this));
	}
});

$("body").delegate("#input_refprimarycontact","keyup",function(){
	if($("#input_refprimarycontact").val() != ""){
		if($("#btn_input_refprimarycontact").hasClass("no-show")){
			$("#btn_input_refprimarycontact").removeClass("no-show");
		}
	}else{
		if($("#btn_input_refprimarycontact").hasClass("no-show")){
			
		}else{
			$("#btn_input_refprimarycontact").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_refprimarycontact","click",function(){
	if($("#input_refprimarycontact").val() != ""){
		updateCustomerData("referer_primarycontact",$("#input_refprimarycontact").val(),$(this));
	}
});

$("body").delegate("#input_refalternativecontact","keyup",function(){
	if($("#input_refalternativecontact").val() != ""){
		if($("#btn_input_refalternativecontact").hasClass("no-show")){
			$("#btn_input_refalternativecontact").removeClass("no-show");
		}
	}else{
		if($("#btn_input_refalternativecontact").hasClass("no-show")){
			
		}else{
			$("#btn_input_refalternativecontact").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_refalternativecontact","click",function(){
	if($("#input_refalternativecontact").val() != ""){
		updateCustomerData("referer_alternativecontact",$("#input_refalternativecontact").val(),$(this));
	}
});

$("body").delegate("#input_spousename","keyup",function(){
	if($("#input_spousename").val() != ""){
		if($("#btn_input_spousename").hasClass("no-show")){
			$("#btn_input_spousename").removeClass("no-show");
		}
	}else{
		if($("#btn_input_spousename").hasClass("no-show")){
			
		}else{
			$("#btn_input_spousename").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_spousename","click",function(){
	if($("#input_spousename").val() != ""){
		updateCustomerData("spouse_name",$("#input_spousename").val(),$(this));
	}
});

$("body").delegate("#input_spouseidnumber","keyup",function(){
	if($("#input_spouseidnumber").val() != ""){
		if($("#btn_input_spouseidnumber").hasClass("no-show")){
			$("#btn_input_spouseidnumber").removeClass("no-show");
		}
	}else{
		if($("#btn_input_spouseidnumber").hasClass("no-show")){
			
		}else{
			$("#btn_input_spouseidnumber").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_spouseidnumber","click",function(){
	if($("#input_spouseidnumber").val() != ""){
		updateCustomerData("spouse_idnumber",$("#input_spouseidnumber").val(),$(this));
	}
});

$("body").delegate("#input_spouseprimarycontact","keyup",function(){
	if($("#input_spouseprimarycontact").val() != ""){
		if($("#btn_input_spouseprimarycontact").hasClass("no-show")){
			$("#btn_input_spouseprimarycontact").removeClass("no-show");
		}
	}else{
		if($("#btn_input_spouseprimarycontact").hasClass("no-show")){
			
		}else{
			$("#btn_input_spouseprimarycontact").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_spouseprimarycontact","click",function(){
	if($("#input_spouseprimarycontact").val() != ""){
		updateCustomerData("spouse_primarycontact",$("#input_spouseprimarycontact").val(),$(this));
	}
});

$("body").delegate("#input_spousealternativecontact","keyup",function(){
	if($("#input_spousealternativecontact").val() != ""){
		if($("#btn_input_spousealternativecontact").hasClass("no-show")){
			$("#btn_input_spousealternativecontact").removeClass("no-show");
		}
	}else{
		if($("#btn_input_spousealternativecontact").hasClass("no-show")){
			
		}else{
			$("#btn_input_spousealternativecontact").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_spousealternativecontact","click",function(){
	if($("#input_spousealternativecontact").val() != ""){
		updateCustomerData("spouse_alternativecontact",$("#input_spousealternativecontact").val(),$(this));
	}
});

$("body").delegate("#input_businesstype","keyup",function(){
	if($("#input_businesstype").val() != ""){
		if($("#btn_input_businesstype").hasClass("no-show")){
			$("#btn_input_businesstype").removeClass("no-show");
		}
	}else{
		if($("#btn_input_businesstype").hasClass("no-show")){
			
		}else{
			$("#btn_input_businesstype").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_businesstype","click",function(){
	if($("#input_businesstype").val() != ""){
		updateCustomerData("business_type",$("#input_businesstype").val(),$(this));
	}
});

$("body").delegate("#input_operationduration","keyup",function(){
	if($("#input_operationduration").val() != ""){
		if($("#btn_input_operationduration").hasClass("no-show")){
			$("#btn_input_operationduration").removeClass("no-show");
		}
	}else{
		if($("#btn_input_operationduration").hasClass("no-show")){
			
		}else{
			$("#btn_input_operationduration").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_operationduration","click",function(){
	if($("#input_operationduration").val() != ""){
		updateCustomerData("business_operationduration",$("#input_operationduration").val(),$(this));
	}
});

$("body").delegate("#input_businesslocation","keyup",function(){
	if($("#input_businesslocation").val() != ""){
		if($("#btn_input_businesslocation").hasClass("no-show")){
			$("#btn_input_businesslocation").removeClass("no-show");
		}
	}else{
		if($("#btn_input_businesslocation").hasClass("no-show")){
			
		}else{
			$("#btn_input_businesslocation").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_businesslocation","click",function(){
	if($("#input_businesslocation").val() != ""){
		updateCustomerData("business_location",$("#input_businesslocation").val(),$(this));
	}
});

$("body").delegate("#input_residentlocation","keyup",function(){
	if($("#input_residentlocation").val() != ""){
		if($("#btn_input_residentlocation").hasClass("no-show")){
			$("#btn_input_residentlocation").removeClass("no-show");
		}
	}else{
		if($("#btn_input_residentlocation").hasClass("no-show")){
			
		}else{
			$("#btn_input_residentlocation").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_residentlocation","click",function(){
	if($("#input_residentlocation").val() != ""){
		updateCustomerData("customer_location",$("#input_residentlocation").val(),$(this));
	}
});

$("body").delegate("#input_savingplan","keyup",function(){
	if($("#input_savingplan").val() != ""){
		if($("#btn_input_savingplan").hasClass("no-show")){
			$("#btn_input_savingplan").removeClass("no-show");
		}
	}else{
		if($("#btn_input_savingplan").hasClass("no-show")){
			
		}else{
			$("#btn_input_savingplan").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_savingplan","click",function(){
	if($("#input_savingplan").val() != ""){
		updateCustomerData("saving_planschedule",$("#input_savingplan").val(),$(this));
	}
});

$("body").delegate("#input_joiningreason","keyup",function(){
	if($("#input_joiningreason").val() != ""){
		if($("#btn_input_joiningreason").hasClass("no-show")){
			$("#btn_input_joiningreason").removeClass("no-show");
		}
	}else{
		if($("#btn_input_joiningreason").hasClass("no-show")){
			
		}else{
			$("#btn_input_joiningreason").addClass("no-show");
		}
	}
});

$("body").delegate("#btn_input_joiningreason","click",function(){
	if($("#input_joiningreason").val() != ""){
		updateCustomerData("joining_reason",$("#input_joiningreason").val(),$(this));
	}
});

function updateCustomerData(update_field,update_value,btn){
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {updateCustomerData:1,pkvalue:customerid,field:update_field,fieldvalue:update_value},
		success : function(data){
			if (data == "UPDATED") {
				btn.addClass("no-show");
				/*if (update_field === "idnumber") {
					window.location.href = "./edit_customer/?cid="+update_value;
				}*/
				getUserData();
			}
		}
	});
}