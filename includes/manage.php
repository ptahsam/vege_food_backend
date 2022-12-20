<?php

/**
 * 
 */
class Manage
{
	
	private $con;
	
	function __construct()
	{
		include_once("../database/db.php");
		$db = new Database();
		$this->con = $db->connect();
	}

	public function summarizeLoan($pk,$pkvalue){
		$pre_stmt = $this->con->prepare("SELECT COUNT(*) AS totalrows,SUM(amount) AS totalamount FROM loans_table WHERE ".$pk." = '".$pkvalue."'");
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			return $row;
		}else{
			return "NO_DATA";
		}
	}

	public function countData($table){
		$pre_stmt = $this->con->prepare("SELECT COUNT(*) AS totalrows FROM ".$table);
    	$pre_stmt->execute() or die($this->con->error);
    	$result = $pre_stmt->get_result();
    	if ($result->num_rows > 0) {
        	$count = $result->fetch_assoc();
            	return $count;
    	}else{
        	return "NO_DATA";
    	}
	}

	public function sumTotalAmount($table,$field){
		$pre_stmt = $this->con->prepare("SELECT SUM(".$field.") AS totalamount FROM ".$table);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			return $row;
		}else{
			return "NO_DATA";
		}
	}

	public function countRows($table,$pk,$pkvalue){
		$pre_stmt = $this->con->prepare("SELECT COUNT(*) AS totalrows FROM ".$table." WHERE ".$pk." = '".$pkvalue."'");
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			return $row;
		}else{
			return "NO_DATA";
		}
	}

	public function sumAmount($table,$field,$pk,$pkvalue){
		$pre_stmt = $this->con->prepare("SELECT SUM(".$field.") AS totalamount FROM ".$table." WHERE ".$pk." = '".$pkvalue."'");
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			return $row;
		}else{
			return "NO_DATA";
		}
	}

	public function searchRecordWithPagination($table,$pno,$p,$keyword){
		$a = $this->pagination($this->con,$table,$pno,$p,$isSearch=true,$keyword=$keyword);
		if ($table == "customers") {
			$sql = "SELECT * FROM customers WHERE firstname LIKE '%$keyword%' OR middlename LIKE '%$keyword%' OR lastname LIKE '%$keyword%' OR idnumber LIKE '%$keyword%' OR krapin LIKE '%$keyword%' OR phonenumber_one LIKE '%$keyword%' OR phonenumber_two LIKE '%$keyword%' OR email LIKE '%$keyword%' OR notes LIKE '%$keyword%' ".$a["limit"];
		}else if($table == "loan_plans"){
			$sql = "SELECT * FROM loan_plans ORDER BY id DESC ".$a["limit"];
		}else if($table == "savings_table"){
			$sql = "SELECT * FROM savings_table ORDER BY id DESC ".$a["limit"];
		}else if($table == "loans_table"){
			$sql = "SELECT * FROM loans_table ORDER BY id DESC ".$a["limit"];
		}else if($table == "payments_table"){
			$sql = "SELECT * FROM payments_table WHERE ref_no LIKE '%$keyword%' OR mpesa_receiptno LIKE '%$keyword%' OR transaction_type LIKE '%$keyword%' OR customer_idno LIKE '%$keyword%' OR payment_method LIKE '%$keyword%' OR comments LIKE '%$keyword%' ".$a["limit"];
		}else{
			$sql = "SELECT * FROM ".$table." ".$a["limit"];
		}
		$result = $this->con->query($sql) or die($this->con->error);
		$rows = array();
		if($result->num_rows > 0){
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
		}
		return ["rows"=>$rows,"pagination"=>$a["pagination"],"rowsno"=>$a["rows"]];

	}

	public function manageRecordWithPagination($table,$pno,$p){
		$a = $this->pagination($this->con,$table,$pno,$p);
		if ($table == "products") {
			$sql = "SELECT c.id AS category_id, c.category_name, c.category_image, p.id, p.product_name, p.product_price, p.product_quantity, p.product_photo, p.product_description, p.date_added FROM products p, categories c WHERE c.id = p.category_id ORDER BY p.date_added DESC ".$a["limit"];
		}else if($table == "loan_plans"){
			$sql = "SELECT * FROM loan_plans ORDER BY id DESC ".$a["limit"];
		}else if($table == "savings_table"){
			$sql = "SELECT * FROM savings_table ORDER BY id DESC ".$a["limit"];
		}else if($table == "loans_table"){
			$sql = "SELECT * FROM loans_table ORDER BY id DESC ".$a["limit"];
		}else if($table == "payments_table"){
			$sql = "SELECT * FROM payments_table ORDER BY id DESC ".$a["limit"];
		}else{
			$sql = "SELECT * FROM ".$table." ".$a["limit"];
		}
		$result = $this->con->query($sql) or die($this->con->error);
		$rows = array();
		if($result->num_rows > 0){
			while ($row = $result->fetch_assoc()) {
				$rows[] = $row;
			}
		}
		return ["rows"=>$rows,"pagination"=>$a["pagination"]];

	}

	private function pagination($con,$table,$pno,$n,$isSearch=false,$keyword=""){
		$query = $con->query("SELECT COUNT(*) as 'rows' FROM ".$table);
		if ($isSearch && $table == "payments_table") {
			$query = $con->query("SELECT COUNT(*) as 'rows' FROM ".$table." WHERE ref_no LIKE '%$keyword%' OR mpesa_receiptno LIKE '%$keyword%' OR transaction_type LIKE '%$keyword%' OR customer_idno LIKE '%$keyword%' OR payment_method LIKE '%$keyword%' OR comments LIKE '%$keyword%' ");
		}

		if ($isSearch && $table == "customers") {
			$query = $con->query("SELECT COUNT(*) as 'rows' FROM ".$table." WHERE firstname LIKE '%$keyword%' OR middlename LIKE '%$keyword%' OR lastname LIKE '%$keyword%' OR idnumber LIKE '%$keyword%' OR krapin LIKE '%$keyword%' OR phonenumber_one LIKE '%$keyword%' OR phonenumber_two LIKE '%$keyword%' OR email LIKE '%$keyword%' OR notes LIKE '%$keyword%' ");
		}
		
		$row = mysqli_fetch_assoc($query);
		//$totalRecords = 100000;
		$pageno = $pno;
		$numberOfRecordsPerPage = $n;

		$last = ceil($row["rows"]/$numberOfRecordsPerPage);

		$pagination = "<ul class='pagination'>";

		if ($last != 1) {
			if ($pageno > 1) {
				$previous = "";
				$previous = $pageno - 1;
				$pagination .= "<li class='page-item'><span class='page-link previous' pn='".$previous."'> previous </span></li></li>";
			}
			for($i=$pageno - 5;$i< $pageno ;$i++){
				if ($i > 0) {
					$pagination .= "<li class='page-item'><span class='page-link' pn='".$i."'> ".$i." </span></li>";
				}
				
			}
			$pagination .= "<li class='page-item active'><span class='page-link' pn='".$pageno."'> $pageno </span></li>";
			for ($i=$pageno + 1; $i <= $last; $i++) { 
				$pagination .= "<li class='page-item'><span class='page-link' pn='".$i."'> ".$i." </span></li>";
				if ($i > $pageno + 4) {
					break;
				}
			}
			if ($last > $pageno) {
				$next = $pageno + 1;
				$pagination .= "<li class='page-item'><span class='page-link next' pn='".$next."'> Next </span></li></ul>";
			}
		}

		$limit = "LIMIT ".($pageno - 1) * $numberOfRecordsPerPage.",".$numberOfRecordsPerPage;

		return ["pagination"=>$pagination,"limit"=>$limit,"rows"=>$row['rows']];
	}

	public function deleteRecord($table,$pk,$id){
		if($table == "loan_plans"){
			$pre_stmt = $this->con->prepare("SELECT l.plan_id,p.id FROM loan_plans p,loans_table l WHERE l.plan_id='$id' AND p.id='$id'");
			$pre_stmt->execute();
			$result = $pre_stmt->get_result() or die($this->con->error);
			if ($result->num_rows > 0) {
				return "DEPENDENT_RECORD";
			}else{
				$pre_stmt = $this->con->prepare("DELETE FROM ".$table." WHERE ".$pk." = ?");
				$pre_stmt->bind_param("i",$id);
				$result = $pre_stmt->execute() or die($this->con->error);
				if ($result) {
					return "RECORD_DELETED";
				}
			}
		}

		if($table == "saving_plans"){
			$pre_stmt = $this->con->prepare("SELECT s.saving_planid,p.id FROM saving_plans p,savings_table s WHERE s.saving_planid = '$id' AND p.id = '$id'");
			$pre_stmt->execute();
			$result = $pre_stmt->get_result() or die($this->con->error);
			if ($result->num_rows > 0) {
				return "DEPENDENT_RECORD";
			}else{
				$pre_stmt = $this->con->prepare("DELETE FROM ".$table." WHERE ".$pk." = ?");
				$pre_stmt->bind_param("i",$id);
				$result = $pre_stmt->execute() or die($this->con->error);
				if ($result) {
					return "RECORD_DELETED";
				}
			}
		}

		if($table == "loans_table"){
			$pre_stmt = $this->con->prepare("SELECT l.id,s.loan_id FROM loan_schedules s,loans_table l WHERE l.id = '$id' AND s.loan_id = '$id'");
			$pre_stmt->execute();
			$result = $pre_stmt->get_result() or die($this->con->error);
			if($result->num_rows > 0){
				return "DEPENDENT_RECORD";
			}else{
				$pre_stmt = $this->con->prepare("DELETE FROM ".$table." WHERE ".$pk." = ?");
				$pre_stmt->bind_param("i",$id);
				$result = $pre_stmt->execute() or die($this->con->error);
				if ($result) {
					return "RECORD_DELETED";
				}
			}
		}

		if($table == "savings_table"){
			$pre_stmt = $this->con->prepare("SELECT * FROM savings_table WHERE id = '$id'");
			$pre_stmt->execute() or die($this->con->error);
			$result = $pre_stmt->get_result();
			if ($result->num_rows > 0) {
				$row = $result->fetch_assoc();
				$saving_refid = $row["ref_no"];
				$pre_stmt = $this->con->prepare("SELECT s.id,p.payment_purposeid FROM payments_table p, savings_table s WHERE s.id = '$id' AND p.payment_purposeid = '$saving_refid'");
				$pre_stmt->execute();
				$result = $pre_stmt->get_result() or die($this->con->error);
				if($result->num_rows > 0){
					return "DEPENDENT_RECORD";
				}else{
					$pre_stmt = $this->con->prepare("DELETE FROM ".$table." WHERE ".$pk." = ?");
					$pre_stmt->bind_param("i",$id);
					$result = $pre_stmt->execute() or die($this->con->error);
					if ($result) {
						return "RECORD_DELETED";
					}
				}
			}
		}

		if($table == "customers"){
			$pre_stmt = $this->con->prepare("SELECT c.id,l.id FROM loans_table l,customers c WHERE l.borrower_id = '$id' AND c.id = '$id'");
			$pre_stmt->execute();
			$result = $pre_stmt->get_result() or die($this->con->error);
			if($result->num_rows > 0){
				return "DEPENDENT_RECORD";
			}else{
				$pre_stmt = $this->con->prepare("DELETE FROM ".$table." WHERE ".$pk." = ?");
				$pre_stmt->bind_param("s",$id);
				$result = $pre_stmt->execute() or die($this->con->error);
				if ($result) {
					return "RECORD_DELETED";
				}
			}
		}

		if($table == "payments_table"){
			$pre_stmt = $this->con->prepare("DELETE FROM ".$table." WHERE ".$pk." = ?");
			$pre_stmt->bind_param("i",$id);
			$result = $pre_stmt->execute() or die($this->con->error);
			if ($result) {
				return "RECORD_DELETED";
			}
		}
	}
}

//$m = new Manage();
//print_r($m->manageRecordWithPagination("products",1,10));

?>