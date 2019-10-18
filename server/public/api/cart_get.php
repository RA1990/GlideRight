<?php
require_once('./function.php');
require_once('cart.php');
set_exception_handler('error_handler');
require_once('db_connection.php');
startup();
$json = file_get_contents('php://input');
$id = json_decode($json, true);
intval($id);
$id = $id['id'];
$cartID = null;


if (empty($_SESSION['cartID'])) {
  print("[]");
  exit();
} else {
  $cartId = intval($_SESSION['cartID']);
}

  $query = "SELECT cartItems.count, wicked.id, wicked.name, wicked.price, wicked.shortDescription, wicked.image FROM `cartItems` JOIN `wicked` ON cartItems.productID = wicked.id";

  $result = mysqli_query($conn, $query);

  $data = [];
  while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }
  if($data === []) {
    print("[]");
    exit();
} else {
    print(json_encode($data));
};
