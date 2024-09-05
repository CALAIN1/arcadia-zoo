<?php
require '../../includes/db.php';

if (isset($_GET['habitat']) == false) {
    echo json_encode([
        'success' => false,
        'error' => 'missing values'
    ]);
    http_response_code(400);
    return;
}

$sql = "SELECT * FROM habitat WHERE `name` = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$_GET['habitat']]);

$habitat = $stmt->fetch(PDO::FETCH_ASSOC);
if ($habitat == null) {
    echo json_encode([
        'success' => false,
        'error' => 'Cet habitat n\'existe pas'
    ]);
    http_response_code(404);
    return;
}

$sql = "SELECT * FROM animal WHERE habitat = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$habitat['id']]);
$animals = $stmt->fetchAll(PDO::FETCH_ASSOC);

$sql = "SELECT image.* FROM image_animal INNER JOIN image ON image.id = image_animal.image WHERE image_animal.animal = ?";
$animalCount = sizeof($animals);
for ($i = 0; $i < $animalCount; $i++) {
    $stmt = $conn->prepare($sql);
    $stmt->execute([$animals[$i]['id']]);
    $animals[$i]['images'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode([
    'success' => true,
    'data' => $animals
]);
