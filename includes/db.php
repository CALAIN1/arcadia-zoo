<?php
$dsn = 'mysql:host=mysql-calain.alwaysdata.net;dbname=calain_arcadia_zoo';
$username = 'calain';
$password = 'Julia17/06/2009'; // Remplacez par votre mot de passe MySQL*/

/*$dsn = 'mysql:host=localhost;dbname=arcadia_zoo';
$username = 'root';
$password = '';*/

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Échec de la connexion : ' . $e->getMessage();
    die();
}
