<?php
require '../../includes/api.php';
require '../../includes/mongodb.php';


//Fetch liste des animaux

$sql = "SELECT * FROM `animal`";
$stmt = $conn->prepare($sql);
$stmt->execute();
$animal = $stmt->fetchAll(PDO::FETCH_ASSOC);
$animalCount = sizeof($animal);

$animalViewsCollection = $mongo->selectCollection('animal_view');
$allAnimalViews = $animalViewsCollection->find()->toArray();

for ($i = 0; $i < $animalCount; $i++) {
    $sql = 'SELECT image.* FROM image_animal INNER JOIN image ON image.id = image_animal.image WHERE animal = ?';
    $stmt = $conn->prepare($sql);
    $stmt->execute([$animal[$i]['id']]);

    $animal[$i]['photos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($allAnimalViews as $habitatView) {
        if ($animal[$i]['habitat'] == $habitatView['habitat']['id_habitat']) {
            foreach ($habitatView["habitat"]['animals'] as $animalView) {
                if ($animalView['id_animal'] == $animal[$i]['id']) {
                    $animal[$i]['view_data'] = $animalView;
                    break;
                }
            }
            break;
        }
    }
}


echo json_encode([
    "success" => true,
    "data" => $animal
]);
