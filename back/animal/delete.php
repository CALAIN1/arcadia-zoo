<?php

//supression de compte

require '../../includes/api.php';


// Vérifier si l'ID name a été fourni
if (!isset($_POST['animal_id'])) {
    echo json_encode([
        "success" => false,
        "error" => "L'ID animal est requis"
    ]);
    return;
}
if (is_numeric($_POST['animal_id']) == false) {
    echo json_encode([
        'success' => false,
        'error' => 'L\'ID de l\'animal doit être numérique'
    ]);
    return;
}

// Récupérer l'ID name
$animal_id = $_POST['animal_id'];

// Supprimer l'animal de la base de données
$sql = "DELETE FROM `animal` WHERE `id` = :animal_id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':animal_id', $animal_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "L'animal a été supprimé avec succès"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Erreur lors de la suppression de l'animal"
    ]);
}
