<?php
require '../../includes/db.php';

//Fetch liste des habitats

$sql = "SELECT * FROM `habitat`";
$stmt = $conn->prepare($sql);
$stmt->execute();
$habitat = $stmt->fetchAll(PDO::FETCH_ASSOC);
$habitatCount = count($habitat);

for ($i = 0; $i < $habitatCount; $i++) {
    $sql = 'SELECT * FROM image_habitat WHERE habitat = ?';
    $stmt = $conn->prepare($sql);
    $stmt->execute([$habitat[$i]['id']]);

    $habitat[$i]['photos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
echo json_encode([
    "success" => true,
    "data" => $habitat
]);
