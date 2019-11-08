<?php
require_once('db_connection.php');
header('Content-Type: application/json');

if (empty($_GET['id'])) {
  $query = "SELECT * FROM `wicked`";
  $result = mysqli_query($conn, $query);
  if (!$result) {
    throw new Exception('mysql error ' . mysqli_error($conn));
  }
  $data = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }
  print(json_encode($data));
} else {
  $query = "SELECT * FROM `wicked`
  WHERE id =" . $_GET['id'];
  $result = mysqli_query($conn, $query);
  if (!$result) {
    throw new Exception('mysql error ' . mysqli_error($conn));
  }
  $data = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }
  print(json_encode($data));
<<<<<<< HEAD
}
=======
>>>>>>> 4dadddc05cbf34d4510fffaa0063d1b607e8abd6
?>
