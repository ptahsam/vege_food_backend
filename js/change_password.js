$("#change_password_form").on("submit",function(e){
  e.preventDefault();
  var status = false;
  var cusername = $("#input_cusername");
  var cpassword = $("#input_cpassword");
  var ccpassword = $("#input_ccpassword");

  if(cusername.val() == ""){
    cusername.addClass("is-invalid");
    status = false;
  }else{
    cusername.removeClass("is-invalid");
    status = true
  }

  if(cpassword.val() == ""){
    cpassword.addClass("is-invalid");
    status = false;
  }else{
    cpassword.removeClass("is-invalid");
    status = true
  }

  if(ccpassword.val() == ""){
    ccpassword.addClass("is-invalid");
    status = false;
  }else{
    ccpassword.removeClass("is-invalid");
    status = true
  }

  if (status == true && ccpassword.val() == cpassword.val()) {
    $.ajax({
      url : "./includes/action.php",
      method : "POST",
      data : $("#change_password_form").serialize(),
      success : function(data){
        if (data == "UPDATED") {
          $("#change_password_form")[0].reset();
          showSnackbar("Password was changed successfully.");
        }else if (data == "ADMIN_NOT_FOUND") {
          cusername.addClass("is-invalid");
          status = false;
          showSnackbar("The username you entered is wrong.");
        }
        else if(data == "UNKOWN_ERROR"){
          showSnackbar("An error occured!. Try again later.");
        }else{
          showSnackbar("An error occured!. Try again later.");
        }
      }
    });
  }else{
    ccpassword.addClass("is-invalid");
    status = false;
  }
  
});

function showSnackbar(message){
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

 // x.html(message);
  $("#snackbar").html(message);

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}