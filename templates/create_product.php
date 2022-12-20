<div id="create_newproduct" data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title">New Product</h6>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="customer-form">
					<form id="product-form" onsubmit="return false">
						<input type="hidden" name="product_action" id="product_action" value="new_product">
						<input type="hidden" name="product_id" id="product_id">
						<div class="row">
							<div class="col-6">
								<div class="form-floating mb-3">
									<select class="form-control" id="input_category" name="input_category">
										
									</select>
									<label for="input_category">Category</label>
								</div>
								<div class="form-floating mb-3">
									<input type="text" class="form-control" name="input_productname" id="input_productname">
									<label for="input_productname">Product name</label>
								</div>
								<div class="form-floating mb-3">
									<input type="number" class="form-control" name="input_productprice" id="input_productprice">
									<label for="input_productprice">Product price</label>
								</div>
							</div>
							<div class="col-6">
								<div class="form-floating mb-3">
									<div class="uploadPassport">
		        						<div class="displayPassport">
		        							
		        						</div>
		        						<label for="input_passpost" class="select_passport">Select product image</label>
			          					<label for="input_passpost" class="change_passport no-show">Change image</label>
			          					<input type="file" accept="images/*" name="input_passpost" class="input_passpost" id="input_passpost">
			          					<div class="smallLoader no-show"></div>
		        					</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-6">
								<div class="form-floating mb-3">
									<input type="number" class="form-control" name="input_productamount" id="input_productamount">
									<label for="input_prodcutamount">Product Quantity</label>
								</div>
							</div>
							<div class="col-6">
								<div class="form-floating mb-3">
									<textarea class="form-control" name="input_productdescription" id="input_productdescription"></textarea>
									<label for="input_productdescription">Product Description</label>
								</div>
							</div>
						</div>
						<div class="modal-bottom">
            				<div class="btn btn-default" data-bs-dismiss="modal" aria-label="Close">Cancel</div>
            				<button type="submit" id="btn-product" class="btn btn-success">Save</button>
            			</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>