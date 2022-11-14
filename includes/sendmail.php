<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * 
 */
class Email
{
	
	private $con;
	function __construct()
	{
		include_once("../database/db.php");
		require '../mail/autoload.php';

		$db = new Database();
		$this->con = $db->connect();
	}

	public function sendEmailWithPDF($useremail, $subject, $message, $pdfpath, $pdfname)
	{
		$mail = new PHPMailer(true);
		try {
			//Server settings
	        $mail->isSMTP();                                     
	        $mail->Host = 'smtp.gmail.com';                      
	        $mail->SMTPAuth = true;                               
	        $mail->Username = 'petersamuelsam6@gmail.com';     
	        $mail->Password = 'ffshuinhthmofvzb';                    
	        $mail->SMTPOptions = array(
	            'ssl' => array(
	            'verify_peer' => false,
	            'verify_peer_name' => false,
	            'allow_self_signed' => true
	            )
	        );                         
	        $mail->SMTPSecure = 'ssl';                           
	        $mail->Port = 465;                                   

	        $mail->setFrom('petersamuelsam6@gmail.com');
	        
	        //Recipients
	        $mail->addAddress($useremail);
	        //$mail->addAddress($useremail);               
	        $mail->addReplyTo('petersamuelsam6@gmail.com');
	       
	        //Content
	        $mail->isHTML(true); 
			$mail->AddAttachment($pdfpath, $pdfname);

			$mail->Subject = $subject;
			$mail->Body = $message;

			$mail->send();

			return "An order was send to your email. Please check your email. Incase you did not receive the email, confirm your email address.";

		}
		catch (Exception $e){
			return $e;
		}
	}
}

?>