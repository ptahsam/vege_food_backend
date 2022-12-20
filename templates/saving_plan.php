<div id="add_new_planmodal"data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-confirm">
    <div class="modal-content">
      <div class="modal-header text-center">           
        <h6 class="modal-title w-100">New Saving Plan</h6>  
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="saving_plan_form" class="saving_plan_form" onsubmit="return false">
          <input type="hidden" name="plan_action" id="plan_action" value="new_plan">
          <input type="hidden" name="plan_id" id="plan_id">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" name="plan_frequency" id="plan_frequency" placeholder="Enter plan">
            <label for="plan_frequency">Plan(Daily,Weekly,Monthly)*</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" name="min_amount" id="min_amount" placeholder="Enter min amount">
            <label for="min_amount">Minimum amount(KES)</label>
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