<?php
require '../../includes/api.php';

//Fetch liste des avis

$sql = "SELECT * FROM `avis`";
$stmt = $conn->prepare($sql);
$stmt->execute();
$avis = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $avis
]);
