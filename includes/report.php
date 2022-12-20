<?php

/**
 * 
 */
class Report
{
	
	function __construct()
	{
		include_once("../vendor/fpdf/fpdf.php");
		include_once("./service.php");
		include_once("./user.php");
		include_once("./sendmail.php");
	}

	public function generateOrder($order_refno, $userid){
		$timestamp = time();
		$pdf = new FPDF('P','mm','A4');
		$pdf->SetFillColor(255,255,255);
		$pdf->AddPage();
		$pdf->SetTitle('VegeFood Orders');
		$pdf->SetFont('Times');
		$pdf->SetTextColor(117,117,60);
		$pdf->cell(190, 20, $pdf->Image('../images/icons/logo_only.png', $pdf->GetX(), $pdf->GetY(), 95), 0, 1, 'C', false);
		//$pdf->cell(190, 5, '', 0, 1);
		$pdf->SetFont('Times', 'B', '20');
		$pdf->SetTextColor(45, 206, 137);
		$pdf->cell(190, 12, "VegeFood", 0, 1, 'C', false);
		//$pdf->cell(190, 5, '', 0, 1);
		$pdf->SetFont('Times', 'B', '10');
		$pdf->SetTextColor(9,9,9);
		$pdf->cell(190, 12, date("F d, Y H:i A", $timestamp), 0, 1, "R", false);
		$pdf->SetFillColor(255, 255, 255);
		$pdf->cell(190, 20, '', 0, 1, true);
		$pdf->SetFont('Times', 'B', '13');
		//$pdf->cell(190,12,'','L',true);
		$pdf->SetFillColor(45, 206, 137);
		$pdf->SetTextColor(255, 255, 255);
		$pdf->cell(95,12,'Order Details',0,0,'L',true);
		$pdf->cell(95,12,'Order ID:'.strtoupper($order_refno),0,1,'R',true);

		$s = new Service();
		$orders = $s->getOrderItems($order_refno);
		$n = 0;
		$totalproducts = 0;
		$totalprice = 0;

		$pdf->SetFont('Times', 'B', '13');
		$pdf->SetTextColor(9,9,9);
		$pdf->SetFillColor(255,255,255);
		$pdf->SetDrawColor(45,206,137);

		$pdf->cell(10,10,"#",1,0,'C',true);
		$pdf->cell(70,10,"Name",1,0,'C',true);
		$pdf->cell(40,10,"Quantity",1,0,'C',true);
		$pdf->cell(40,10,"Price",1,0,'C',true);
		$pdf->cell(30,10,"Total",1,1,'C',true);

		$pdf->SetFont('Times', '', '12');

		foreach ($orders as $order) {
			$n = $n + 1;
			$totalproducts = $totalproducts + $order["items_no"];
			$totalprice = $totalprice + ($order["items_no"]*$order["product_price"]);
			$pdf->cell(10,10,$n.'.',1,0,'C',false);
			$pdf->cell(70,10,$order["product_name"],1,0,'L',false);
			$pdf->cell(40,10,$order["items_no"],1,0,'C',false);
			$pdf->cell(40,10,$order["product_price"],1,0,'C',false);
			$pdf->cell(30,10,$order["items_no"]*$order["product_price"],1,1,'C',false);
		}

		$pdf->SetFont('Times', 'B', '13');

		$pdf->cell(80,10,"Totals",1,0,'L',false);
		$pdf->cell(40,10,$totalproducts,1,0,'C',false);
		$pdf->cell(40,10,"",1,0,'C',true);
		$pdf->cell(30,10,$totalprice,1,1,'C',true);

		$pdf->PageNo();
		$pdf->Output("../reports/order".$order_refno.$timestamp.".pdf","F");

		$pdfname = "order".$order_refno.$timestamp.".pdf";
		$pdfpath = "../reports/".$pdfname;

		$u = new User();
		$user = $u->getUserData($userid);
		$useremail = $user["user_email"];

		$subject = "A new order from VegeFood";

		$message = "<p><h4>Hello, ".$user["user_name"]."</h4></br>
			We are glad to email you the order that you requested. 
		</p>";

		$m = new Email();
		$result = $m->sendEmailWithPDF($useremail, $subject, $message, $pdfpath, $pdfname);

		return $pdfname; 
	}
}

//$r = new Report();
//echo $r->generateOrder("VG636b9fd91a731", "1");

?>