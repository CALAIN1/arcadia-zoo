<?php
require '../../includes/api.php';

//Fetch liste des animaux

$sql = "SELECT * FROM `animal`";
$stmt = $conn->prepare($sql);
$stmt->execute();
$animal = $stmt->fetchAll(PDO::FETCH_ASSOC);
$animalCount = sizeof($animal);
for ($i = 0; $i < $animalCount; $i++) {
    $sql = 'SELECT image.* FROM image_animal INNER JOIN image ON image.id = image_animal.image WHERE animal = ?';
    $stmt = $conn->prepare($sql);
    $stmt->execute([$animal[$i]['id']]);

    $animal[$i]['photos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode([
    "success" => true,
    "data" => $animal
]);
