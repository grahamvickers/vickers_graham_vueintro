<?php
    include('connect.php');

    function getUsers($conn){
        $getData = 'SELECT * FROM tbl_users';
        $runQuery = $conn->query($getData);

        $result = array();

        while($row = $runQuery->fetch(PDO::FETCH_ASSOC)) {

            $result[] = $row;
        }

        return $result;
    }