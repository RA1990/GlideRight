<?php
define("INTERNAL", true);
require_once('./function.php');
session_start();
set_exception_handler('error_handler');

require_once('db_connection.php');
startup();
$method = $_SERVER['REQUEST_METHOD'];

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    require_once('cart_get.php');
    break;
  case "POST":
    require_once('cart_add.php');
    break;
};
