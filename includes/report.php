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
		$pdf->SetFillColor(117,117,108);
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
		$pdf->cell(190, 10, '', 0, 1);
		$pdf->SetFont('Times', 'B', '13');
		$pdf->SetTextColor(45, 206, 137);
		$pdf->cell(10,12,'','L',true);
		$pdf->cell(180,12,'Order Details',0,1,'L',true);


		$pdf->PageNo();
		$pdf->Output("../reports/order".$order_refno.$timestamp.".pdf","F");
		return $timestamp;
	}
}

//$r = new Report();
//echo $r->generateOrder("1", "2");

?>