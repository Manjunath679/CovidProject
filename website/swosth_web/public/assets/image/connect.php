<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "docapp";
	$dbchild="superdoc_medicine";
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	$child= new mysqli($servername, $username, $password, $dbchild);
	// Check connection
	if ($conn->connect_error)
	{
	    die("Connection failed: " . $conn->connect_error);
	}
	if ($child->connect_error)
	{
	    die("Connection failed: " . $child->connect_error);
	} 
?>