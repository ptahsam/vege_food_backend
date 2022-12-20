<div id="add_new_planmodal"data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-confirm">
    <div class="modal-content">
      <div class="modal-header text-center">           
        <h6 class="modal-title w-100">New Loan Plan</h6>  
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="loan_plan_form" class="loan_plan_form" onsubmit="return false">
          <input type="hidden" name="plan_action" id="plan_action" value="new_plan">
          <input type="hidden" name="plan_id" id="plan_id">
          <div class="form-floating mb-3">
            <input type="number" class="form-control" name="plan_months" id="plan_months" placeholder="Enter months">
            <label for="plan_months">Plan(months)*</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" name="plan_interest" id="plan_interest" placeholder="Enter interest">
            <label for="plan_interest">Interest(%)*</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" name="plan_penalty" id="plan_penalty" placeholder="Enter penalty">
            <label for="plan_penalty">Monthly overdue penalty(%)*</label>
          </div>
          <div class="modal-bottom">
            <span class="btn-modal-cancel" data-bs-dismiss="modal">Cancel</span>
            <button type="submit" class="btn btn-success btn-sm" id="btn-plan">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>