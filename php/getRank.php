<?php
    include_once("config.php");

    //create connection and select DB
    $db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
    if($db->connect_error){
        die("Unable to connect database: " . $db->connect_error);
    }
    
    //get user data from DB
    $query = $db->query("SELECT * FROM jackTetris ORDER BY score DESC LIMIT 5"); 
    $json = mysqli_fetch_all ($query, MYSQLI_ASSOC);
    echo json_encode($json );
?>