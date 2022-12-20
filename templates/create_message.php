<div id="create_newmessage" data-bs-backdrop="static" data-keyboard="true" class="modal" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title">New message</h6>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body message-form">
				<div class="row">
					<div class="col-lg-6">
						<h6>Compose new message</h6>
						<textarea class="form-control" rows="12" placeholder="Type your message here..."></textarea>
					</div>
					<div class="col-lg-6">
						<div class="selected-recipients-div"><h6>Selected recipient(s)</h6><span id="selected-recipients-span"></span></div>
						<ul class="user-message-list">
							
						</ul>
					</div>
				</div>
				<div class="modal-bottom">
    				<div class="btn btn-default" data-bs-dismiss="modal" aria-label="Close">Cancel</div>
    				<button class="btn btn-success" id="business-details-btn">SEND</button>
    			</div>
			</div>
		</div>
	</div>
</div>