<?php

//supression de compte

require '../../includes/api.php';


// Vérifier si l'ID utilisateur a été fourni
if (!isset($_POST['habitat_id'])) {
    echo json_encode([
        "success" => false,
        "error" => "L'ID habitat est requis"
    ]);
    return;
}
if (!is_numeric($_POST['habitat_id'])) {
    echo json_encode([
        'success' => false,
        'error' => "L'ID de l'habitat doit être numérique"
    ]);
    return;
}

// Récupérer l'ID utilisateur
$habitat_id = $_POST['habitat_id'];

// Supprimer l'utilisateur de la base de données
$sql = "DELETE FROM `habitat` WHERE `id` = :habitat_id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':habitat_id', $habitat_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "L'utilisateur a été supprimé avec succès"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Erreur lors de la suppression de l'utilisateur"
    ]);
}
