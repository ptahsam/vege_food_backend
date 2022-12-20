<div id="upload_select_customer_file"data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-confirm">
    <div class="modal-content">
      <div class="modal-header">           
        <h6 class="modal-title w-100">Upload File</h6>  
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="bar upload_file_bar no-vis">
        <div></div>
      </div>
      <div class="modal-body modal_upload_file">
        <div class="display-file no-show">
          <i class="fa-solid fa-file-excel"></i>
          <h6 class="file-upload_name"></h6>
        </div>
        <label for="upload_file" class="upload_file_label"><i class="fa-solid fa-file-arrow-up"></i>Upload File</label>
        <input type="file" name="upload_file" id="upload_file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <div class="smallLoader smallLoaderUploadFile no-show"></div>
      </div>
      <div class="modal-options modal-options-file-upload">
        <span class="btn-modal-cancel" data-bs-dismiss="modal">Cancel</span>
        <button type="button" class="btn btn-success btn-sm" id="btn-import-data" disabled>
          <i class="fa-solid fa-sync fa-spin icon-import-data no-show"></i>
          <span>Import</span>
        </button>
      </div>
    </div>
  </div>
</div>