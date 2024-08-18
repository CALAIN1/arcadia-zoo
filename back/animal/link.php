<?php
require '../../includes/api.php';
require '../../includes/mongodb.php';

// Récupération des données pour les vues et likes
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

// Route pour incrémenter les likes
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['like'])) {
    $likeFilter = [
        'habitat.id_habitat' => $animal['habitat'],
        'habitat.animals.id_animal' => (int)$_GET['animal']
    ];
    $likeUpdate = [
        '$inc' => ['habitat.animals.$[animal].likes' => 1]
    ];
    $likeOptions = [
        'arrayFilters' => [['animal.id_animal' => (int)$_GET['animal']]],
        'upsert' => true
    ];
    $animalViewsCollection->updateOne($likeFilter, $likeUpdate, $likeOptions);

    echo json_encode([
        "success" => true,
        "message" => "Like ajouté"
    ]);
}
