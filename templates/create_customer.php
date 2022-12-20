
<div id="create_newcustomer" data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header text-center">
				<button class="btn btn-primary btn-sm no-show" id="btn-navigate"><i class="fa-solid fa-arrow-left"></i></button>
        <h6 class="modal-title w-100" id="customer-modal-title">Add new customer</h6>
    		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="bar no-vis">
        <div></div>
      </div>
      <div class="modal-body">
      	<div class="customer-form">
      		<form id="newcustomer-form" action="./includes/action.php" method="post" enctype="multipart/form-data">
      			<div class="personal-details">
        			<div class="row">
        				<div class="col-8">
        					<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_firstname" id="input_firstname" placeholder="Enter customer first name">
									  <label for="input_firstname">Customer First Name*</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_middlename" id="input_middlename" placeholder="Enter customer middle name">
									  <label for="input_middlename">Customer Middle Name</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_lastname" id="input_lastname" placeholder="Enter customer last name">
									  <label for="input_lastname">Customer Last Name*</label>
									</div>
        				</div>
        				<div class="col-4">
        					<div class="uploadPassport">
        						<div class="displayPassport">
        							
        						</div>
        						<label for="input_passpost" class="select_passport">Select passport photo</label>
          					<label for="input_passpost" class="change_passport no-show">Change passport</label>
          					<input type="file" accept="images/*" name="input_passpost" class="input_passpost" id="input_passpost">
          					<div class="smallLoader no-show"></div>
        					</div>
        				</div>
        			</div>
        			<div class="row">
        				<div class="col-6 mb-3">
        					<div class="form-floating">
									  <input type="text" class="form-control" name="input_idnumber" id="input_idnumber" placeholder="Enter customer id number">
									  <label for="input_idnumber">Customer ID Number*</label>
									</div>
        				</div>
        				<div class="col-6 mb-3">
        					<div class="form-floating">
									  <input type="text" class="form-control" name="input_krapin" id="input_krapin" placeholder="Enter customer kra pin">
									  <label for="input_krapin">Customer KRA Pin*</label>
									</div>
        				</div>
        			</div>
        			<div class="row">
        				<div class="col-6">
        					<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_primarycontact" id="input_primarycontact" placeholder="Enter customer phone number">
									  <label for="input_primarycontact">Customer Phone Number*</label>
									</div>
        				</div>
        				<div class="col-6">
        					<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_alternativecontact" id="input_alternativecontact" placeholder="Enter customer alternative phone number">
									  <label for="input_alternativecontact">Customer Alternative Phone Number</label>
									</div>
        				</div>
        			</div>
        			<div class="row">
        				<div class="col-6">
        					<div class="form-floating">
									  <input type="text" class="form-control" name="input_email" id="input_email" placeholder="Enter customer email address">
									  <label for="input_email">Customer Email Address</label>
									</div>
        				</div>
        				<div class="col-6">
        					<div class="form-floating">
									  <textarea class="form-control" placeholder="Enter customer notes" name="input_notes" id="input_notes"></textarea>
									  <label for="input_notes">Customer Notes</label>
									</div>
        				</div>
        			</div>
        			<div class="modal-bottom">
        				<div class="btn btn-default" data-bs-dismiss="modal" aria-label="Close">Cancel</div>
        				<!--<button type="submit" id="btn-customer" class="btn btn-success">Save</button>-->
        				<span class="btn btn-success" id="personal-details-btn">Next</span>
        			</div>
        		</div>
        		<div class="referer-details no-show">
        			<div class="row">
        				<div class="col-6">
        					<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_refname" id="input_refname" placeholder="Enter referer name">
									  <label for="input_refname">Referer name*</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_refidnumber" id="input_refidnumber" placeholder="Enter referer id number">
									  <label for="input_refidnumber">Referer idnumber*</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_refprimarycontact" id="input_refprimarycontact" placeholder="Enter referer contact">
									  <label for="input_refname">Referer phone number</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_refalternativecontact" id="input_refalternativecontact" placeholder="Enter referer alternative contact">
									  <label for="input_refalternativecontact">Referer alt phone number</label>
									</div>
        				</div>
        				<div class="col-6">
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_spousename" id="input_spousename" placeholder="Enter spouse name">
									  <label for="input_spousename">Spouse name*</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_spouseidnumber" id="input_spouseidnumber" placeholder="Enter spouse id number">
									  <label for="input_spouseidnumber">Spouse id number*</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_spouseprimarycontact" id="input_spouseprimarycontact" placeholder="Enter spouse contact">
									  <label for="input_spouseprimarycontact">Spouse phone number*</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_spousealternativecontact" id="input_spousealternativecontact" placeholder="Enter spouse alternative contact">
									  <label for="input_spousealternativecontact">Spouse alt phone number*</label>
									</div>
        				</div>
        				<div class="modal-bottom">
	        				<div class="btn btn-default" data-bs-dismiss="modal" aria-label="Close">Cancel</div>
	        				<span class="btn btn-success" id="referer-details-btn">Next</span>
	        			</div>
        			</div>
        		</div>
        		<div class="business-details no-show">
        			<div class="row">
        				<div class="col-6">
        					<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_businesstype" id="input_businesstype" placeholder="Enter business type">
									  <label for="input_businesstype">Business type</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_operationduration" id="input_operationduration" placeholder="Enter operation duration">
									  <label for="input_operationduration">Operation duration</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_businesslocation" id="input_businesslocation" placeholder="Enter business location">
									  <label for="input_businesslocation">Business location</label>
									</div>
        				</div>
        				<div class="col-6">
        					<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_residentlocation" id="input_residentlocation" placeholder="Enter resident location">
									  <label for="input_residentlocation">Residential location</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_savingplan" id="input_savingplan" placeholder="Enter how often to save">
									  <label for="input_savingplan">How often to save</label>
									</div>
									<div class="form-floating mb-3">
									  <input type="text" class="form-control" name="input_joiningreason" id="input_joiningreason" placeholder="Enter reason for joining">
									  <label for="input_joiningreason">Reason for joining</label>
									</div>
        				</div>
        			</div>
        			<div class="modal-bottom">
        				<div class="btn btn-default" data-bs-dismiss="modal" aria-label="Close">Cancel</div>
        				<button type="submit" class="btn btn-success" id="business-details-btn">Save</button>
        				<!--<span class="btn btn-success" id="business-details-btn">Save</span>-->
        			</div>
        		</div>
      		</form>
      	</div>
      </div>
		</div>
	</div>
</div>