<?php
$dsn = 'mysql:host=mysql-calain.alwaysdata.net;dbname=calain_zoo_arcadia';
$username = 'calain';
$password = 'Julia2009^^'; // Remplacez par votre mot de passe MySQL

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Échec de la connexion : ' . $e->getMessage();
    die();
}
