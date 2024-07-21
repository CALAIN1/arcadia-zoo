<?php

//supression de compte

require '../../includes/api.php';


// Vérifier si l'ID utilisateur a été fourni
if (!isset($_POST['user_id'])) {
    echo json_encode([
        "success" => false,
        "error" => "L'ID utilisateur est requis"
    ]);
    return;
}

// Récupérer l'ID utilisateur
$user_id = $_POST['user_id'];

// Supprimer l'utilisateur de la base de données
$sql = "DELETE FROM `utilisateur` WHERE `id` = :user_id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':user_id', $user_id);

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
