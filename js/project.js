var ranges = [
  { divider: 1e18 , suffix: 'E' },
  { divider: 1e15 , suffix: 'P' },
  { divider: 1e12 , suffix: 'T' },
  { divider: 1e9 , suffix: 'G' },
  { divider: 1e6 , suffix: 'M' },
  { divider: 1e3 , suffix: 'k' }
];

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function getAllToolTips(){
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

var formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'KES',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

toggle.onclick = function(){
	navigation.classList.toggle('active');
	main.classList.toggle('active');
}

/*let list = document.querySelectorAll('.navigation li');
function activeLink() {
	list.forEach((item)=>
	item.classList.remove('hovered'));
	this.classList.add('hovered');
}
list.forEach((item)=>
item.addEventListener('mouseover',activeLink));*/

$("#main-admin-profile").on("click",function(){
  $(".main").addClass("no-show");
  $(".admin").removeClass("no-show");
  //$(".admin").addClass("active");
});

const sorter = (a, b) => {
   return a.firstname.localeCompare(b.firstname);
};

const sortByFirstname = arr => {
   return arr.sort(sorter);
};

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

$("#btn-delete-item").on("click",function(){
  $.ajax({
    url : "./includes/action.php",
    method : "POST",
    data : {deleteRecord:1,table:deleteTable,pk:deletePk,deleteId:deleteID},
    success : function(data){
      if(data == "DEPENDENT_RECORD"){
        $("#delete_modal").modal("hide");
          showSnackbar("This record is in use!");
      }else if(data == "RECORD_DELETED"){
        showSnackbar("Record has been deleted successfully.");
        $("#delete_modal").modal("hide");
        if(deleteTable == "loan_plans"){
          getAllLoanPlans(1);
        }

        if(deleteTable == "saving_plans"){
          getAllSavingPlans(1);
        }

        if (deleteTable == "loans_table") {
          getLoansData();
          getAllLoans(1);
        }

        if (deleteTable == "customers") {
          getAllCustomers(1);
        }

        if (deleteTable == "savings_table") {
          getAllSavings(1);
        }

        if (deleteTable == "payments_table") {
          getAllPayments(1);
        }
      }else{
        showSnackbar("An error has occurred. Please try again later!");
      }
    }
  });
});

function showDatatable() {
  $('.data-table').DataTable({
    dom: 'Bfrtip',
    select: true,
    buttons: [
        'copy', 'excel', 'pdf', 'print'
    ]
  });
}

function formatNumber(n) {
  for (var i = 0; i < ranges.length; i++) {
    if (n >= ranges[i].divider) {
      return parseFloat(n / ranges[i].divider).toFixed(1).toString() + ranges[i].suffix;
    }
  }
  return n.toString();
}

$("#change_password").on("click",function(){
  $("#change_password_modal").modal("show");
});

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
          $("#change_password_modal").modal("hide");
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