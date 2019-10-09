<?php
require_once 'cart.php';
if (!INTERNAL) {
  exit("Direct access not allowed.");
}
$bodyData = getBodyData();

$count = $bodyData['count'];


if ($bodyData['count'] <= 0) {
  throw new Exception("count is invalid");
}

$id = $bodyData['product']['id'];

if ($id <= 0) {
  throw new Exception("Id is invalid");
}


if (array_key_exists('cartID',$_SESSION)) {
  $cartID = $_SESSION['cartID'];
} else {
  $cartID = false;
}

$priceQuery = "SELECT wicked.price FROM `wicked` WHERE `id`=$id";

$priceResult = mysqli_query($conn, $priceQuery);

if (!$priceResult) {
  throw new Exception("price result connection failed " . $id);
}

$row_cnt = mysqli_num_rows($priceResult);


if ($row_cnt === 0) {
  throw new Exception("invalid product id " . $id);
}

$productData = [];
while ($row = mysqli_fetch_assoc($priceResult)) {
  $productData[] = $row;
}

$startTransactionQuery = "START TRANSACTION";

$transactionResult = mysqli_query($conn, $startTransactionQuery);

if(!$cartID) {
  $insertQuery = "INSERT INTO `cart` SET `created`=NOW()";
  $insertResult = mysqli_query($conn, $insertQuery);
  $cartID = mysqli_insert_id($conn);
  $_SESSION['cartID'] = $cartID;
}
$price  = $productData[0]['price'];

$insertToTableQuery = "INSERT INTO `cartItems` SET `count`=$count, `productID`=$id, `price`=$price,
 `cartID`= $cartID ON DUPLICATE KEY UPDATE `count`=`count`+ $count";

$insertToTableResult = mysqli_query($conn, $insertToTableQuery);

if (!$insertToTableResult) {
  throw new Exception("failed to get insert result" . $insertToTableResult);
};

if (mysqli_affected_rows($conn) < 1) {
  mysqli_query($conn, "ROLLBACK");
  throw new Exception("affected rows is not equal to 1");
};

mysqli_query($conn, "COMMIT");

?>
