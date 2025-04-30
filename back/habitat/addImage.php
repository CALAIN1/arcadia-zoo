<?php

require '../../includes/api.php';

if (!isset($_FILES['file']) || sizeof($_FILES['file']) == 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Vous devez upload un fichier'
    ]);
    return;
}

if (!isset($_POST['habitat']) || !is_numeric($_POST['habitat'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Vous devez fournir un ID d\'habitat valide'
    ]);
    return;
}

$habitatCheckStmt = $conn->prepare('SELECT * FROM habitat WHERE `id` = :habitat');
$habitatCheckStmt->bindParam(':habitat', $_POST['habitat']);
$habitatCheckStmt->execute();
if ($habitatCheckStmt->rowCount() == 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Cet habitat n existe pas'
    ]);
    return;
}
//génere un nom aléatoire
$filename = '';
for ($i = 0; $i < 50; $i++) {
    $filename .= chr(random_int(97, 122));
}
//on conserve la même extension de fichier
$filename .= str_replace('image/', '.', $_FILES['file']['type']);
$destinationPath = __DIR__ . '/../../front/files/habitats/' . $filename;

if (move_uploaded_file($_FILES['file']['tmp_name'], $destinationPath)) {
    $sql = "INSERT INTO image_habitat (habitat, url) VALUES (?,?)";

    $stmt = $conn->prepare($sql);
    if ($stmt->execute([$_POST['habitat'], '/habitats/' . $filename])) {
        echo json_encode([
            'success' => true,
            'data' => ['url' => '/habitats/' . $filename]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Erreur lors de l\'attribution de l\'image à l\'habitat'
        ]);
        unlink($destinationPath);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Erreur lors du déplacement de l\'image'
    ]);
}
