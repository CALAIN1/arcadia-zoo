<?php
require '../../includes/api.php';

//Fetch liste des comptes

$sql = "SELECT * FROM `utilisateur`";
$stmt = $conn->prepare($sql);
$stmt->execute();
$accounts = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $accounts
]);
