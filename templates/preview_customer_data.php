<div id="preview_data_customer_modal"data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-confirm modal-lg">
    <div class="modal-content">
      <div class="modal-header">           
        <h6 class="modal-title w-100">Preview Data</h6>  
        <!--<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
      </div>
      <div class="modal-body no-bottom">
        <div class="modal_preview_data-header">
          <div class="modal_preview_data-div-left">
            <h6 class="modal_preview_data_total_rows"></h6>
            <h6 class="modal_preview_data_selected no-show"></h6>
          </div>
        </div>
        <div class="modal_preview_data">
          <table class="table">
            <thead>
              <tr>
                <td>
                  <label class="container" id="selectAll">Select
                    <input type="checkbox" id="inputSelectAll">
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>#</td>
                <td>Customer Name</td>
                <td>Phone</td>
                <td></td>
              </tr>
            </thead>
            <tbody class="preview_data_details" id="preview_data_details">
              
            </tbody>
          </table>
          <div class="progress-box-preview no-show">
            
          </div>
        </div>
      </div>
      <div class="modal-options light-background modal-options-bottom">
        <span class="btn-modal-cancel" data-bs-dismiss="modal" aria-label="Close">Cancel</span>
        <div class="modal-options-bottom-right">
          <h6 class="modal_preview_data_progress no-show"></h6>
          <h6 class="saving-percentage"></h6>
          <i class="fa-solid fa-check-double saving-icon-finish no-show"></i>
          <i class="fa-solid fa-circle-notch fa-spin fa-2x saving-icon-progress no-show"></i>
          <button type="button" class="btn btn-primary btn-sm" id="btn-save-data" disabled>Save to database</button>
        </div>
      </div>
    </div>
  </div>
</div>