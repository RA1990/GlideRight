<?php
require_once('./function.php');
require_once('cart.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

$query = "DELETE FROM `cartItems` WHERE cartItems.productID=" . $_GET['id'];

$result = mysqli_query($conn, $query);
