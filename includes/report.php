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
		$pdf->cell(190, 50, $pdf->Image('../images/icons/logo_only.png', $pdf->GetX(), $pdf->GetY(), 40), 0, 1, 'C', false);
		$pdf->cell(190, 5, '', 0, 1);
		$pdf->SetFont('Times', 'B', '20');
		$pdf->SetTextColor(1,1,1);
		$pdf->cell(190, 40, "VegeFood", 0, 1, 'C', false);
		$pdf->cell(190, 5, '', 0, 1);
		$pdf->SetFont('Times', 'B', '14');
		$pdf->SetTextColor(9,9,9);
		$pdf->cell(190, 12, date("F d, Y H:i A", $timestamp), 0, 1, "R", false);
		$pdf->PageNo();
		$pdf->Output("../reports/order".$order_refno.$timestamp.".pdf","F");
		return $timestamp;
	}
}

//$r = new Report();
//echo $r->generateOrder("1", "2");

?>