<?php
    include_once("config.php");

    //create connection and select DB
    $db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
    if($db->connect_error){
        die("Unable to connect database: " . $db->connect_error);
    }
    
    //get user data from DB
    $query = $db->query("SELECT name, max(score) as score, max(level) as level FROM jackTetris GROUP BY name ORDER BY score DESC");  /*ORDER BY score DESC*/
    $json = mysqli_fetch_all ($query, MYSQLI_ASSOC);
    echo json_encode($json );
?>