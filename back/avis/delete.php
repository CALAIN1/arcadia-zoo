<?php

//supression d'avis

require '../../includes/api.php';


// Vérifier si l'avis a été fourni
if (!isset($_POST['avis_id'])) {
    echo json_encode([
        "success" => false,
        "error" => "Le nom est requis"
    ]);
    return;
}
if (!is_numeric($_POST['avis_id'])) {
    echo json_encode([
        'success' => false,
        'error' => "L'ID de l'avis doit être numérique"
    ]);
    return;
}



// Récupérer l'avis
$avis_id = $_POST['avis_id'];

// Supprimer l'avis de la base de données
$sql = "DELETE FROM `avis` WHERE `id` = :avis_id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':avis_id', $avis_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "L'avis a été supprimé avec succès"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Erreur lors de la suppression de l'avis"
    ]);
}
