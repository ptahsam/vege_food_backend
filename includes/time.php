<?php 
date_default_timezone_set('Africa/Nairobi');
/**
 * 
 */
class TimeManager
{
	
	function __construct()
	{
		include_once("../database/constants.php");
	}

	public function getRecentTime($timestamp){
		$month = date('m');
        $year = date('Y');
        $day = date('d');

        $d = date("Y-m-d",$timestamp);

        $dDate = new DateTime($d);

        $dDateDay = (int) $dDate->format('j');
	    $dDateMonth = (int) $dDate->format('n');
	    $dDateYear = (int) $dDate->format('Y'); 

        if($day == $dDateDay && $month == $dDateMonth && $year == $dDateYear){
        	$t = strtoupper((date("H:i a",$timestamp)));
        	return "Today at ".$t;
        }

        if((($dDateDay - $day) == 1) && $month == $dDateMonth && $year == $dDateYear){
        	$t = strtoupper((date("H:i a",$timestamp)));
        	return "Yesterday at ".$t;
        }

        $t = strtoupper((date("H:i a",$timestamp)));
        return date("d/m/Y",$timestamp)." at ".$t;
	}
}

//$t = new TimeManager();
//echo $t->getRecentTime(time());

?>