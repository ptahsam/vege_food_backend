
<div id="new_saving" data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
                <h6 class="modal-title" id="saving-plan-modal-title">New Saving Application</h6>
        		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="bar no-vis">
              <div></div>
            </div>
            <div class="modal-body">
            	<div class="customer-form">
            		<form id="savingapplication-form" onsubmit="return false">
            			<input type="hidden" name="saving_action" id="saving_action" value="new_saving">
            			<input type="hidden" name="saving_id" id="saving_id">
            			<div class="row">
            				<div class="col-6">
            					<div class="form-floating mb-3">
									  		<select class="form-control" id="saving_customer" name="saving_customer">
	            					  	
	            					</select>
									  		<label for="saving_customer">Customer</label>
											</div>			
            				</div>
            				<div class="col-6">
            					<div class="form-floating mb-3">
            					  <select class="form-control" id="saving_plan" name="saving_plan">
            					  	
            					  </select>	
								  			<label for="saving_plan">Plan</label>
											</div>
            				</div>
            			</div>
            			<div class="row">
            				<div class="col-12">
            					<div class="form-floating mb-3">
								  <input type="text" class="form-control" name="saving_purpose" id="saving_purpose" placeholder="Enter purpose">
								  <label for="saving_purpose">Purpose</label>
								</div>
            				</div>
            				
            			</div>
            			<div class="modal-bottom">
            				<div class="btn btn-default" data-bs-dismiss="modal" aria-label="Close">Cancel</div>
            				<button type="submit" id="btn-saving-application" class="btn btn-success">Save</button>
            			</div>
            		</form>
            	</div>
            </div>
		</div>
	</div>
</div>