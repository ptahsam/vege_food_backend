getAllCategories(1);

function getAllCategories(pn)
{
	$.ajax({
		url : "./includes/action.php",
		method : "POST",
		data : {getAllCategories:1,pageno:pn},
		success : function(data){
			$(".category-table").html(data);
		}
	})
}

$("#add_new_category").on("click",function(){
	$("#create_newcategory").modal("show");
});

$('[name="input_passpost"]').change(function(e)
{
	$(".smallLoader").removeClass("no-show");
    for (var i = 0; i < e.target.files.length; i++) {
        var reader = new FileReader();
        reader.onload = function(e) {
        	var bin = e.target.result;
        	$(".displayPassport").html("<img src='"+bin+"'>");
        	$(".select_passport").addClass("no-show");
        	$(".change_passport").removeClass("no-show");
        	$(".smallLoader").addClass("no-show");
        }
        reader.readAsDataURL(e.target.files[i]);
    }  
})

$("#category-form").on("submit",function(e){
	e.preventDefault();
	var status = false;
	var categoryname = $("#input_categoryname");
	var categoryaction = $("#category_action");

	if(categoryname.val() == ""){
		categoryname.addClass("is-invalid");
		status = false;
	}else{
		categoryname.removeClass("is-invalid");
		status = true
	}

	if(status == true){
		$.ajax({
			url : "./includes/action.php",
			method : "POST",
			data:  new FormData(this),
			   contentType: false,
			         cache: false,
			   processData:false,
			success : function(data){
				if (categoryaction.val() == "new_category") {
					if (data == "SUCCESSFULLY_ADDED") {
						$("#category-form")[0].reset();
						categoryaction.val("new_category");
						$("#create_newcategory").modal("hide");
						$("#btn-category").text("Save");
						getAllCategories(1);
					}else if(data == "UNKOWN_ERROR"){
						showSnackbar("An error occured!. Try again later.");
					}else{
						showSnackbar("An error occured!. Try again later.");
					}
				}
			}
		});
	}
});