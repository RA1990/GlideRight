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

$query = "SELECT wicked.id, wicked.name, wicked.price, wicked.shortDescription,
GROUP_CONCAT(images.url) AS  images
FROM  wicked
JOIN  images
ON wicked.id = images.productId
$whereClause
GROUP BY wicked.id";

$result = $conn->query($query);
if (!$result) {
  throw new Exception("error:" . mysqli_connect_error());
}
if(mysqli_num_rows($result) === 0){
  throw new Exception("invalid ID:" . $_GET['id']);
}

$output = [];
while ($row = mysqli_fetch_assoc($result)) {
  $row['images'] = explode(",", $row['images']);
  $output[] = $row;
};
print(json_encode($output));

?>
