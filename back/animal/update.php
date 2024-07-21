<?php
require '../../includes/api.php';

// Check si tous les champs present
if (!isset($_POST['id'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Tous les champs sont requis"
    ]);
    return;
}

// corriger et valider champs
$id = $_POST['id'];
if (is_numeric($id) == false) {
    echo json_encode([
        'success' => false,
        'error' => 'L\'id doit être une valeur numérique'
    ]);
    return;
}


// mise à jour de l'animal ds bd


$properties = ["name", "espece", "race", "habitat"];

$sql = "UPDATE `animal` SET";
$isFirst = true;
foreach ($_POST as $key => $value) {
    if (trim($value) != '' && array_search($key, $properties) !== false) {
        if ($isFirst) {
            $isFirst = false;
        } else {
            $sql .= ',';
        }

        $sql .= " `$key` = :$key";
    }
}

$sql .= ' WHERE `id` = :id';

$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $_POST['id']);

foreach ($_POST as $key => $value) {
    if (trim($value) != '' && array_search($key, $properties) !== false) {
        $stmt->bindParam(":$key", $_POST[$key]);
    }
}

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "L'animal a été mis à jour avec succès"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Une erreur s'est produite lors de la mise à jour de l'animal"
    ]);
}
