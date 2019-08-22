<?php
function error_handler($error){
$output=array(
 "success"=>false,
 "error"=> $error->getMeassage()
);
echo json_encode($output);
print($json_output);




}






?>
