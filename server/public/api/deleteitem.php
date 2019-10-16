<?php
require_once('./function.php');
require_once('cart.php');
set_exception_handler('error_handler');
require_once('db_connection.php');
startup();

$query = "DELETE FROM `cartItems` WHERE cartItems.productID=" . $_GET['id'];

$result = mysqli_query($conn, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
  $data[] = $row;
}
if ($data === []) {
  print("[]");
  exit();
} else {
  print(json_encode($data));
};
header('Location: ' . $_SERVER['REQUEST_URI']);
?>
