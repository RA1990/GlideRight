<?php

header('Content-Type: application/json');
require_once('./function.php');
set_exception_handler('error_handler');
$output = file_get_contents('dummy-products-list.json');
print($output);

?>
