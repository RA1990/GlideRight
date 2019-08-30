<?php

require_once('./function.php');
set_exception_handler('error_handler');
startup();
require_once('./db_connection.php');

if(empty($_GET['id'])){
  $whereClause = "";
}else if(!is_numeric($_GET['id'])){
  throw new Exception("id needs to be a number");
}else{
  $whereClause = "WHERE `wicked`.id=" . $_GET['id'];
}

$query = "SELECT wicked.id,wicked.name,wicked.price,wicked.shortDescription,
images.url
FROM `wicked`
JOIN `images`
ON wicked.id=images.productId" . $whereClause;
$result = $conn->query($query);
if (!$result) {
  throw new Exception("error:" . mysqli_connect_error());
}
if(mysqli_num_rows($result) === 0){
  throw new Exception("invalid ID:" . $_GET['id']);
}
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
  $data[] = $row;
};
print(json_encode($data));

?>
