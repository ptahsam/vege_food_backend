<?php
header("Content-Type: application/json");
include_once("../database/constants.php");
include_once("./service.php");

// Response from M-PESA Stream
$mpesaResponse = file_get_contents('php://input');
$jsonMpesaResponse = json_decode($mpesaResponse, true); 
$response = $jsonMpesaResponse["Body"]["stkCallback"];
$data = $response["CallbackMetadata"]["Item"];

$log  = "User: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").PHP_EOL.
		':MerchantRequestID: '.$response['MerchantRequestID'].PHP_EOL.
        ':CheckoutRequestID: '.$response['CheckoutRequestID'].PHP_EOL.
        ':ResultCode: '.$response['ResultCode'].PHP_EOL.
        ':ResultDesc: '.$response['ResultDesc'].PHP_EOL.
        ':Amount: '.$data[0]["Value"].PHP_EOL.
        ':MpesaReceiptNumber: '.$data[1]['Value'].PHP_EOL.
        ':TransactionDate: '.$data[3]['Value'].PHP_EOL.
        ':PhoneNumber: '.$data[4]['Value'].PHP_EOL.
        "-------------------------".PHP_EOL;
    //-
//$log = json_encode($jsonMpesaResponse);
file_put_contents('../logs/log_'.date("j.n.Y").'.txt', $log, FILE_APPEND);

$s = new Service();
$s->saveMpesaData($response['MerchantRequestID'],$response['CheckoutRequestID'],$response['ResultCode'],$response['ResultDesc'],$data[0]["Value"],$data[1]['Value'],$data[4]['Value'],$data[3]['Value']);

?>
