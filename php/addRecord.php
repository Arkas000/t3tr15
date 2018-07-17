<?php
//include db configuration file
include_once("config.php");

if(isset($_POST["name"]) && strlen($_POST["name"])>0 && isset($_POST["score"]) && isset($_POST["level"])) 
{   //check $_POST["content_txt"] is not empty

    //sanitize post value, PHP filter FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH Strip tags, encode special characters.
    $name = filter_var($_POST["name"],FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH); 
    $name = substr($name, 0, 16);
    $score = filter_var($_POST["score"],FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH); 
    $level = filter_var($_POST["level"],FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH); 
    $date = date('Y-m-d H:i:s');

    $db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
    if($db->connect_error){
        die("Unable to connect database: " . $db->connect_error);
    }
    
    // Attempt insert query execution
    $sql = "INSERT INTO jackTetris (name, score, level, date) VALUES ('$name', '$score', '$level','$date')";
    if(mysqli_query($db, $sql)){
        echo "Records inserted successfully.";
    } else{
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($db);
    }
    
    // Close connection
    mysqli_close($db);
}
?>