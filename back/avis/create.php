<?php

require '../../includes/db.php';

if (!isset($_POST['pseudo']) || !isset($_POST['commentaire'])) {
    echo json_encode([
        "success" => false,
        "error" => "Les champs commentaire et pseudo sont obligatoires."
    ]);
    return;
}

$pseudo = $_POST['pseudo'];
$commentaire = $_POST['commentaire'];

if (strlen($pseudo) <= 3) {
    echo json_encode([
        'success' => false,
        'error' => 'Le pseudo doit être supérieur à 3 charactères'
    ]);
    return;
}

$words = explode(' ', trim($commentaire));
if (sizeof($words) < 2) {
    echo json_encode([
        'success' => false,
        'error' => 'L\'avis doit comporter au moins deux mots'
    ]);
    return;
}

// Préparer et exécuter la requête pour insérer un nouvel avis
$stmt = $conn->prepare('INSERT INTO avis (`date`, `isvisible`, `pseudo`, `commentaire`) VALUES (NOW(), 0, ?, ?)');
try {
    $stmt->execute([$pseudo, $commentaire]);

    // Vérifier si l'insertion a réussi
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to create avis.'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
