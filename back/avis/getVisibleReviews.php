<?php

require '../../includes/db.php';

//Fetch liste des avis

$sql = "SELECT * FROM `avis` WHERE isvisible = 1";
$stmt = $conn->prepare($sql);
$stmt->execute();
$avis = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $avis
]);
