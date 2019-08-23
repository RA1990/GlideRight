<?php

header('Content-Type: application/json');
require_once('./function.php');
require_once('./db_connection.php');
set_exception_handler('error_handler');
if(!$conn) {
        throw new Exception("error:" . mysqli_connect_error());
      }
$output = file_get_contents('dummy-products-list.json');
print($output);

?>
