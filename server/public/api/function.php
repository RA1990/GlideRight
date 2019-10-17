<?php
function error_handler($error)
{
  $output = [
    "success" => false,
    "error" => $error->getMessage()
  ];
  http_response_code(500);
  $json_output = json_encode($output);
  print($json_output);
}
function startup()
{
  header("Content-type:application/json");
}
function getBodyData()
{
  $bodyData = file_get_contents('php://input');
  $assocData = json_decode($bodyData, true);
  return $assocData;
}
?>
