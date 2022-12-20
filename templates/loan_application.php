
<div id="new_loan" data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
                <h6 class="modal-title">New Loan Application</h6>
        		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="bar no-vis">
              <div></div>
            </div>
            <div class="modal-body">
            	<div class="customer-form">
            		<form id="loanapplication-form" onsubmit="return false">
            			<input type="hidden" name="loan_id" id="loan_id">
            			<input type="hidden" name="loan_action" id="loan_action" value="new_loan">
            			<div class="row">
            				<div class="col-6">
            					<div class="form-floating mb-3">
										  	<select class="form-control" id="loan_borrower" name="loan_borrower">
		            					  	
		            				</select>
										  	<label for="loan_borrower">Borrower</label>
											</div>			
            				</div>
            				<div class="col-6">
            					<div class="form-floating mb-3">
            					  <select class="form-control" id="loan_type" name="loan_type">
            					  	
            					  </select>	
								  <label for="loan_type">Loan type</label>
								</div>
            				</div>
            			</div>
            			<div class="row">
            				<div class="col-6 mb-3">
            					<div class="form-floating">
								  <select class="form-control" id="loan_plan" name="loan_plan">
            					  	
            					  </select>
								  <label for="loan_plan">Loan plan(months [ interest%,penalty% ])</label>
								</div>
            				</div>
            				<div class="col-6 mb-3">
            					<div class="form-floating">
								  <input type="number" class="form-control" name="loan_amount" id="loan_amount" placeholder="Enter amount">
								  <label for="loan_amount">Amount(KES)</label>
								</div>
            				</div>
            			</div>
            			<div class="row">
            				<div class="col-6">
            					<div class="form-floating mb-3">
								  <input type="text" class="form-control" name="loan_purpose" id="loan_purpose" placeholder="Enter purpose">
								  <label for="loan_purpose">Purpose</label>
								</div>
            				</div>
            				<div class="col-6">
            					<div class="form-floating mb-3">
								  <span class="btn btn-success btn-sm" id="btn-calculate">Calculate</span>
								</div>
            				</div>
            			</div>
            			<div class="row calculation-table no-show">
            				
            			</div>
            			<div class="modal-bottom">
            				<div class="btn btn-default" data-bs-dismiss="modal" aria-label="Close">Cancel</div>
            				<button type="submit" id="btn-loan" class="btn btn-success">Save</button>
            			</div>
            		</form>
            	</div>
            </div>
		</div>
	</div>
</div>