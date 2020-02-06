<?php 
include('functions.php');

if(isset($_GET["getUsers"])){
    $users = getUsers($pdo);

    echo json_encode($users);
}