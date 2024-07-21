<?php

require '../../includes/api.php';

if (!isset($_FILES['file']) || sizeof($_FILES['file']) == 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Vous devez upload un fichier'
    ]);
    return;
}

if (!isset($_POST['animal']) || !is_numeric($_POST['animal'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Vous devez fournir un ID d\'animal valide'
    ]);
    return;
}

$animalCheckStmt = $conn->prepare('SELECT * FROM animal WHERE `id` = :animal');
$animalCheckStmt->bindParam(':animal', $_POST['animal']);
$animalCheckStmt->execute();
if ($animalCheckStmt->rowCount() == 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Cet animal n existe pas'
    ]);
    return;
}

$filename = '';
for ($i = 0; $i < 50; $i++) {
    $filename .= ord(random_int(97, 122));
}
$filename .= str_replace('image/', '.', $_FILES['file']['type']);
$destinationPath = __DIR__ . '/../../front/files/animals/' . $filename;

if (move_uploaded_file($_FILES['file']['tmp_name'], $destinationPath)) {
    $sql = 'INSERT INTO image (`url`) VALUES(?)';
    $stmt = $conn->prepare($sql);

    if ($stmt->execute(['/animals/' . $filename]) == false) {
        echo json_encode([
            'success' => false,
            'error' => 'Erreur à la création de l\'image'
        ]);
        return;
    }

    $sql = 'INSERT INTO image_animal (`image`, `animal`) VALUES (last_insert_id(), ?)';
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([$_POST['animal']])) {
        echo json_encode([
            'success' => true,
            'data' => ['url' => '/animals/' . $filename]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Erreur lors de l\'attribution de l\'image à l\'animal'
        ]);
        unlink($destinationPath);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Erreur lors du déplacement de l\'image'
    ]);
}
