<?php
require '../../includes/db.php';

//Fetch liste des races

$sql = "SELECT race.*, espece.name as espece_name FROM `race` INNER JOIN `espece` ON `espece`.id = `race`.espece";
$stmt = $conn->prepare($sql);
$stmt->execute();
$race = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "data" => $race
]);
