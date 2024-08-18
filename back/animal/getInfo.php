<?php
require '../../includes/api.php';
require '../../includes/mongodb.php';

//Fetch récupérer bd pour view, let info animals
$stmt = $conn->prepare("SELECT * FROM `animal` WHERE id = ?"); //recherche de l'animal par l'id
$stmt->execute([$_GET['animal']]);

$animal = $stmt->fetch(PDO::FETCH_ASSOC);
if ($animal == null) {
    http_response_code(404);
    return;
}

$sql = 'SELECT image.* FROM image_animal INNER JOIN image ON image.id = image_animal.image WHERE animal = ?';
$stmt = $conn->prepare($sql);
$stmt->execute([$animal['id']]);

$animal['photos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);


$animalViewsCollection = $mongo->selectCollection('animal_view');


// Mise à jour pour s'assurer que l'habitat existe
$update = [
    '$setOnInsert' => [
        'habitat.id_habitat' => $animal['habitat'],
        'habitat.animals' => [] // Initialisation du tableau animals si l'habitat est créé
    ]
];

// Effectuer la mise à jour pour créer l'habitat si nécessaire
$animalViewsCollection->updateOne(
    ['habitat.id_habitat' => $animal['habitat']], // Critères de recherche pour l'habitat spécifique
    $update,
    ['upsert' => true] //Options pour l'upsert
);


$filter = [
    'habitat.id_habitat' => $animal['habitat'],
    'habitat.animals.id_animal' => (int)$_GET['animal']
];
$update = [
    '$inc' => ['habitat.animals.$[animal].vues' => 1],
    '$setOnInsert' => [
        'habitat.animals.$[animal].id_animal' => (int)$_GET['animal'],
        'habitat.animals.$[animal].likes' => 0,
        'habitat.animals.$[animal].vues' => 1
    ]
];
$options = [
    'arrayFilters' => [['animal.id_animal' => (int)$_GET['animal']]],
    'upsert' => true
];
$animalViewsCollection->updateOne($filter, $update, $options);

$projection = [
    'projection' => [
        'habitat.animals.$' => 1
    ]
];
$animalView = $animalViewsCollection->findOne($filter, $projection);
$animal['view_data'] = $animalView['habitat']['animals'][0];

echo json_encode([
    "success" => true,
    "data" => $animal
]);
