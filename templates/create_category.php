<div id="create_newcategory" data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title">New Category</h6>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="customer-form">
					<form id="category-form" onsubmit="return false">
						<input type="hidden" name="category_action" id="category_action" value="new_category">
						<input type="hidden" name="category_id" id="category_id">
						<div class="row">
							<div class="col-6">
								<div class="form-floating mb-3">
									<input type="text" class="form-control" name="input_categoryname" id="input_categoryname">
									<label for="input_categoryname">Category name</label>
								</div>
							</div>
							<div class="col-6">
								<div class="form-floating mb-3">
									<div class="uploadPassport">
		        						<div class="displayPassport">
		        							
		        						</div>
		        						<label for="input_passpost" class="select_passport">Select category image</label>
			          					<label for="input_passpost" class="change_passport no-show">Change image</label>
			          					<input type="file" accept="images/*" name="input_passpost" class="input_passpost" id="input_passpost">
			          					<div class="smallLoader no-show"></div>
		        					</div>
								</div>
							</div>
						</div>
						<div class="modal-bottom">
            				<div class="btn btn-default" data-bs-dismiss="modal" aria-label="Close">Cancel</div>
            				<button type="submit" id="btn-category" class="btn btn-success">Save</button>
            			</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>