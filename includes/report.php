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
		$pdf->cell(190,12,'Order Details',0,1,'C',true);

		$s = new Service();
		$orders = $s->getOrderItems($_POST['order_refno']);

		$pdf->SetFont('Times', 'B', '13');
		$pdf->SetTextColor(9,9,9);

		$pdf->cell(10,10,"#",1,0,'C',true);
		$pdf->cell(55,10,"Name",1,0,'C',true);
		$pdf->cell(70,10,"Quantity",1,0,'C',true);
		$pdf->cell(55,10,"Price",1,1,'C',true);


		$pdf->PageNo();
		$pdf->Output("../reports/order".$order_refno.$timestamp.".pdf","F");
		return $timestamp;
	}
}

//$r = new Report();
//echo $r->generateOrder("1", "2");

?>