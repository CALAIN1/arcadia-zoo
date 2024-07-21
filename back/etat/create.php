<?php

require '../../includes/api.php';

if (!isset($_POST['avis']) || !isset($_POST['amelioration']) || !isset($_POST['habitat'])) {
    echo json_encode([
        "success" => false,
        "error" => "Les champs habitat est obligatoire."
    ]);
    return;
}

$habitat = $_POST['habitat'];
$avis = $_POST['avis'];
$amelioration = $_POST['amelioration'];

if (!is_numeric($habitat)) {
    echo json_encode([
        'success' => false,
        'error' => 'L\'habitat doit être un ID'
    ]);
    return;
}
if ($amelioration != "oui" && $amelioration != "non") {
    echo json_encode([
        'success' => false,
        'error' => 'L\'amélioration doit être oui ou non'
    ]);
    return false;
}


//Check if the habitat exists
$habitatCheckStmt = $conn->prepare('SELECT * FROM habitat WHERE `id` = :habitat');
$habitatCheckStmt->bindParam(':habitat', $habitat);
$habitatCheckStmt->execute();
if ($habitatCheckStmt->rowCount() == 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Cet habitat n existe pas'
    ]);
    return;
}


// Préparer et exécuter la requête pour insérer un nouvel habitat
$stmt = $conn->prepare('INSERT INTO etat_habitat (`date`, `habitat`, `avis`, `amelioration`) VALUES (NOW(), ?, ?, ?)');
try {
    $stmt->execute([$habitat, $avis, $amelioration]);

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
