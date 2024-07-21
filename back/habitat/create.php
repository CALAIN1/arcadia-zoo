<?php

require '../../includes/api.php';

if (!(isset($_POST['name']) && isset($_POST['description']))) {
    echo json_encode([
        "success" => false,
        "error" => "Les champs name et description sont obligatoires."
    ]);
    return;
}

if ($_POST['name'] == '') {
    echo json_encode([
        'success' => false,
        'error' => 'Le champs name ne peut pas être vide'
    ]);
    return;
}

$name = $_POST['name'];
$description = $_POST['description'];

// Préparer et exécuter la requête pour insérer un nouvel habitat
$stmt = $conn->prepare('INSERT INTO habitat (`name`, `description`) VALUES (?, ?)');
try {
    $stmt->execute([$name, $description]);

    // Vérifier si l'insertion a réussi
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to create habitat.'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
