<?php


require_once('./function.php');
set_exception_handler('error_handler');
startup();
require_once('./db_connection.php');
if(!empty($_GET['id'])){
  $whereClause = "WHERE `id`=" . $_GET['id'];
}else{
  $whereClause = "";
};
$query = "SELECT * FROM `wicked`" . $whereClause;
$result = $conn->query($query);
if (!$result) {
  throw new Exception("error:" . mysqli_connect_error());
}
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
  $data[] = $row;
};
print(json_encode($data));

?>
