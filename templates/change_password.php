<div id="change_password_modal"data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-confirm">
    <div class="modal-content">
      <div class="modal-header text-center">           
        <h6 class="modal-title w-100">Change Passord</h6>  
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="change_password_form" onsubmit="return false">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="input_cusername" name="input_cusername">
            <label for="input_cusername">Enter username</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="input_cpassword" name="input_cpassword">
            <label for="input_cpassword">Enter password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="input_ccpassword" name="input_ccpassword">
            <label for="input_ccpassword">Re-enter confirmation password</label>
          </div>
          <div class="modal-options">
            <span class="btn-modal-cancel" data-bs-dismiss="modal">Cancel</span>
            <button type="submit" class="btn btn-primary btn-sm" id="btn-change_password">Change</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>