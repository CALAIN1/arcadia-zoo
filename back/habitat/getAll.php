<?php
require '../../includes/db.php';

//Fetch liste des habitats

$sql = "SELECT * FROM `habitat`";
$stmt = $conn->prepare($sql);
$stmt->execute();
$habitat = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $habitat
]);
