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
$username = $_POST['username'];
$password = $_POST['password'];
if (is_numeric($id) == false) {
    echo json_encode([
        'success' => false,
        'error' => 'L\'id doit être une valeur numérique'
    ]);
    return;
}
if ($username != '' && preg_match('/[a-z0-9\.\-_]+@[a-z0-9\.\-\_]+\.[a-z]+/', $username) == false) {
    echo json_encode([
        "success" => false,
        "error" => "Le nom d'utilisateur n'est pas valide"
    ]);
    return;
}

// Hash the password

// mise à jour de l'utilisateur ds bd
//$sql = "UPDATE `utilisateur` SET `firstname` = :firstname, `lastname` = :lastname, `username` = :username, `password` = :password WHERE `id` = :id";

$properties = ["nom", "prenom", "username", "password", "role"];

$sql = "UPDATE `utilisateur` SET";
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
        if ($key == "password") {
            $pwd = password_hash($value, PASSWORD_BCRYPT);
            $stmt->bindParam(":$key", $pwd);
        } else {
            $stmt->bindParam(":$key", $_POST[$key]);
        }
    }
}

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "L'utilisateur a été mis à jour avec succès"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "Une erreur s'est produite lors de la mise à jour de l'utilisateur"
    ]);
}
