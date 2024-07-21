<?php

require '../../includes/api.php';

if (!(isset($_POST['etat']) || !isset($_POST['animal']) || !isset($_POST['food']) || !isset($_POST['qte']) || !isset($_POST['detail']))) {
    echo json_encode([
        "success" => false,
        "error" => "Les champs name, espece et race sont obligatoires."
    ]);
    return;
}

$etat = $_POST['etat'];
$animal = $_POST['animal'];
$food = $_POST['food'];
$qte = $_POST['qte'];
$detail = $_POST['detail'];

if (!is_numeric($qte) || !is_numeric($animal)) {
    echo json_encode([
        'success' => false,
        'error' => 'Certaines données doivent être numériques'
    ]);
    return;
}


//Check if the race exists
$animalCheckStmt = $conn->prepare('SELECT * FROM animal WHERE `id` = :animal');
$animalCheckStmt->bindParam(':animal', $animal);
$animalCheckStmt->execute();
if ($animalCheckStmt->rowCount() == 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Cet animal n existe pas'
    ]);
    return;
}


// Préparer et exécuter la requête pour insérer un nouvel animal
$stmt = $conn->prepare('INSERT INTO rapport (`date`, `detail`, `food`, `qty_food`, `etat`, `animal`, `utilisateur`) VALUES (NOW(), ?, ?, ?, ?, ?, ?)');
try {
    $stmt->execute([$detail, $food, $qte, $etat, $animal, $_SESSION['user_id']]);

    // Vérifier si l'insertion a réussi
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to create report.'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
