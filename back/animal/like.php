<?php
require '../../includes/api.php';
require '../../includes/mongodb.php';

if (isset($_GET['animal']) == false) {
    http_response_code(400);
    return;
}

// Récupération des données pour les vues et likes
$animal_id = (int)$_GET['animal'];

$stmt = $conn->prepare("SELECT * FROM `animal` WHERE id = ?"); //recherche de l'animal par l'id
$stmt->execute([$animal_id]);

$animal = $stmt->fetch(PDO::FETCH_ASSOC);
if ($animal == null) {
    http_response_code(404);
    return;
}

if (isset($_SESSION['liked_animals']) == false) {
    $_SESSION['liked_animals'] = [];
}

if (isset($_SESSION['liked_animals'][$animal_id])) {
    $inc = -1; //dislike
    unset($_SESSION['liked_animals'][$animal_id]);
} else {
    $inc = 1; //like
    $_SESSION['liked_animals'][$animal_id] = true;
}

$animalViewsCollection = $mongo->selectCollection('animal_view');
$animalViewsCollection->updateOne(
    ['habitat.animals.id_animal' => $animal_id],
    ['$inc' => ['habitat.animals.$[animal].likes' => $inc]],
    ['arrayFilters' => [['animal.id_animal' => $animal_id]]]
);
