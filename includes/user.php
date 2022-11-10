<?php 

/**
 * 
 */
class User
{
	
	function __construct()
	{
		include_once("../database/db.php");
		$db = new Database();
		$this->con = $db->connect();
	}

	public function checkUserExists($identifier)
	{
		$pre_stmt = $this->con->prepare("SELECT * FROM users WHERE user_phone = ? OR user_email = ?");
		$pre_stmt->bind_param("ss", $identifier, $identifier);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows > 0) {
			return 1;
		}else{
			return 0;
		}
	}

	public function registerUser($identifier, $password)
	{
		if ($this->checkUserExists($identifier)) {
			return "USER_ALREADY_EXISTS";
		}else{
			$name = "";
			$phone = "";
			$email = "";
			$photo = "";
			$pass = password_hash($password, PASSWORD_BCRYPT, ['cost'=>8]);
			$date_added = time();
			if(is_numeric($identifier)){
				$phone = $identifier;
			}else{
				$email = $identifier;
			}

			$pre_stmt = $this->con->prepare("INSERT INTO `users`(`user_name`, `user_phone`, `user_email`, `user_photo`, `user_password`, `date_added`) VALUES (?,?,?,?,?,?)");
			$pre_stmt->bind_param("ssssss", $name, $phone, $email, $photo, $pass, $date_added);
			$result = $pre_stmt->execute() or die($this->con->error);
			if($result) {
				return $this->addUserAddress($pre_stmt->insert_id);
			}else{
				return "UNKNOWN_ERROR";
			}
		}
	}

	public function addUserAddress($userid)
	{
		$address = "";
		$county = "";
		$city = "";
		$date_added = time();
		$pre_stmt = $this->con->prepare("INSERT INTO `user_address`(`user_id`, `address`, `county`, `city`, `date_added`) VALUES (?,?,?,?,?)");
		$pre_stmt->bind_param("issss", $userid, $address, $county, $city, $date_added);
		$result = $pre_stmt->execute() or die($this->con->error);
		if ($result) {
			return "SUCCESSFULLY_REGISTERED";
		}else{
			return "UNKNOWN_ERROR";
		}
	}

	public function googleSignIn($name, $email, $photo){
		$pre_stmt = $this->con->prepare("SELECT * FROM users WHERE user_email = ?");
		$pre_stmt->bind_param("s", $email);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows < 1) {
			$phone = "";
			$pass = "";
			$date_added = time();
			$pre_stmt = $this->con->prepare("INSERT INTO `users`(`user_name`, `user_phone`, `user_email`, `user_photo`, `user_password`, `date_added`) VALUES (?,?,?,?,?,?)");
			$pre_stmt->bind_param("ssssss", $name, $phone, $email, $photo, $pass, $date_added);
			$result = $pre_stmt->execute() or die($this->con->error);
			if($result) {
				if($this->addUserAddress($pre_stmt->insert_id) == "SUCCESSFULLY_REGISTERED"){
					return $this->getUserData($pre_stmt->insert_id);
				}else return "UNKNOWN_ERROR";
			}else{
				return "UNKNOWN_ERROR";
			}
		}else{
			$row = $result->fetch_assoc();
			if ($this->updateUserDetails("user_name", $name, $pre_stmt->$row['id']) == "SUCCESSFULLY_UPDATED") {
				if ($this->updateUserDetails("user_email", $email, $pre_stmt->$row['id']) == "SUCCESSFULLY_UPDATED") {
					if ($this->updateUserDetails("user_photo", $photo, $pre_stmt->$row['id']) == "SUCCESSFULLY_UPDATED") {
						return $this->getUserData($row['id']);
					}else{
						return "UNKNOWN_ERROR";
					}
				}else{
					return "UNKNOWN_ERROR";
				}
			}else{
				return "UNKNOWN_ERROR";
			}
		}
	}

	public function userLogin($identifier, $password)
	{
		$pre_stmt = $this->con->prepare("SELECT * FROM users WHERE user_phone = ? OR user_email = ?");
		$pre_stmt->bind_param("ss", $identifier, $identifier);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows < 1) {
			return "NOT_REGISTERED";
		}else{
			$row = $result->fetch_assoc();
			if (password_verify($password, $row['user_password'])) {

				//return ["message"=>"LOGGED_IN", $row];
				return $this->getUserData($row['id']);
			}else{
				return "PASSWORD_NOT_MATCHED";
			}
		}
	}

	public function getUserData($userid)
	{
		$pre_stmt = $this->con->prepare("SELECT a.id AS address_id, a.address, a.county, a.city, u.id, u.user_name, u.user_phone, u.user_email, u.user_photo FROM users u, user_address a WHERE u.id = a.user_id AND u.id = ?");
		$pre_stmt->bind_param("i", $userid);
		$pre_stmt->execute() or die($this->con->error);
		$result = $pre_stmt->get_result();
		if ($result->num_rows < 1) {
			return "NOT_REGISTERED";
		}else{
			$row = $result->fetch_assoc();
			return $row;
		}
	}

	public function updateUserAddress($field, $field_value, $userid)
	{
		$pre_stmt = $this->con->prepare("UPDATE `user_address` SET ".$field." = ? WHERE id = ?");
		$pre_stmt->bind_param("si", $field_value, $userid);
		$result = $pre_stmt->execute() or die($this->con->error);
		if($result) {
			return "SUCCESSFULLY_UPDATED";
		}else{
			return "UNKNOWN_ERROR";
		}
	}

	public function updateUserDetails($field, $field_value, $userid)
	{
		$pre_stmt = $this->con->prepare("UPDATE `users` SET ".$field." = ? WHERE id = ?");
		$pre_stmt->bind_param("si", $field_value, $userid);
		$result = $pre_stmt->execute() or die($this->con->error);
		if($result) {
			return "SUCCESSFULLY_UPDATED";
		}else{
			return "UNKNOWN_ERROR";
		}
	}
}

//$user = new User();
//echo $user->userLogin("0706209779","PETER/sam123");
//echo $user->registerUser("0706209779", "PETER/sam123");
//echo $user->updateUserDetails("user_phone", "0706209779", "1");
//print_r($user->getUserData("1"));

?>