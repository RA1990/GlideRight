<?php

header('Content-Type: application/json');
require_once('./function.php');
require_once('./db_connection.php');
$query = "SELECT * FROM `wicked`";
$result = $conn->query($query);
$data =[];
while($row = mysqli_fetch_assoc($result)){
  $data[]=$row;
};
print(json_encode($data));

set_exception_handler('error_handler');
if(!$conn) {
        throw new Exception("error:" . mysqli_connect_error());
      }
$output = file_get_contents('dummy-products-list.json');
print($output);

?>
