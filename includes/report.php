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

		$pdf->SetTextColor(117,117,60);
		$pdf->cell(50, 50, $pdf->Image('../images/icons/logo_only.png', $pdf->GetX(), $pdf->GetY(), 40), 0, 0, 'L', false);
		$pdf->cell(140, 40, "VegeFood", 0, 1, 'L', false);
		$pdf->PageNo();
		$pdf->Output("../reports/order".$order_refno.$timestamp.".pdf","F");
	}
}

?>