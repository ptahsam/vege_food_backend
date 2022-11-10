<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * 
 */
class Email
{
	
	$private $con;
	function __construct()
	{
		include_once("../database/db.php");
		require '../mail/autoload.php';

		$db = new Database();
		$this->con = $db->connect();
		$mail = new PHPMailer(true);
	}

	public function sendEmailWithPDF($useremail, $subject, $message, $pdfpath, $pdfname)
	{
		
		try {
			$mail->isSMTP();
			$mail->HOST = 'smtp.gmail.com';
			$mail->SMTPAuth = true;
			$mail->Username = 'petersamuelsam6@gmail.com';
			$mail->Password = '0703861887';
			$mail->SMTPOptions = array(
				'ssl' => array(
					'verify_peer' => false,
					'verify_peer_name' => false,
					'allow_self_signed' => true
				)
			);
			$mail->SMTPSecure = 'ssl';
			$mail->Port = 445;

			$mail->setFrom($useremail);
			$mail->addAddress('petersamuelsam6@gmail.com');
			$mail->addReplyTo($useremail);

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