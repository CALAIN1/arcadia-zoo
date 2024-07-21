<?php

require '../../includes/api.php';

if (!(isset($_POST['name']) && isset($_POST['race']) && isset($_POST['habitat']))) {
    echo json_encode([
        "success" => false,
        "error" => "Les champs name, espece et race sont obligatoires."
    ]);
    return;
}

$name = $_POST['name'];
$race = $_POST['race'];
$habitat = $_POST['habitat'];


//Check if the race exists
$raceCheckStmt = $conn->prepare('SELECT * FROM race WHERE `id` = :race');
$raceCheckStmt->bindParam(':race', $race);
$raceCheckStmt->execute();
if ($raceCheckStmt->rowCount() == 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Cette race n existe pas'
    ]);
    return;
}

// Préparer et exécuter la requête pour insérer un nouvel animal
$stmt = $conn->prepare('INSERT INTO animal (`name`, `race`, `habitat`) VALUES (?, ?, ?)');
try {
    $stmt->execute([$name, $race, $habitat]);

    // Vérifier si l'insertion a réussi
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to create animal.'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
