<?php
	$servername = "localhost";
	$username = "teceazbt_sth_eme";
	$password = "Swosth@123";
	$dbname = "teceazbt_swosth_emergency";
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error)
	{
	    die("Connection failed: " . $conn->connect_error);
	}
?>