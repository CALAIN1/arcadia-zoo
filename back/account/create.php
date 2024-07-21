<?php

require '../../includes/api.php';

if (!(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['role']) && isset($_POST['firstname']) && isset($_POST['lastname']))) {
    echo json_encode([
        "success" => false,
        "error" => "Les champs email, password et role sont obligatoires."
    ]);
    return;
}

$email = $_POST['email'];
$password = $_POST['password'];
$role = $_POST['role'];
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];

// Validate email format
if (!isValidEmail($email)) {
    echo json_encode([
        "success" => false,
        "error" => "L'adresse e-mail n'est pas valide."
    ]);
    return;
}

// Check if the role exists and is not null
$roleCheckStmt = $conn->prepare("SELECT * FROM `role` WHERE id = :role");
$roleCheckStmt->bindParam(':role', $role);
$roleCheckStmt->execute();
$roleData = $roleCheckStmt->fetch(PDO::FETCH_ASSOC);

if ($roleData == null) {
    echo json_encode([
        "success" => false,
        "error" => "Le rôle spécifié n'est pas valide."
    ]);
    return;
}

//Check if the email exists
$checkEmailStmt = $conn->prepare('SELECT * FROM utilisateur WHERE `username` = :username');
$checkEmailStmt->bindParam(':username', $email);
$checkEmailStmt->execute();
if ($checkEmailStmt->rowCount() > 0) {
    echo json_encode([
        'success' => false,
        'error' => 'Cette adresse email est déjà prise'
    ]);
    return;
}

// Hacher le mot de passe
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Préparer et exécuter la requête pour insérer un nouvel utilisateur
$stmt = $conn->prepare('INSERT INTO utilisateur (`username`, `password`, `role`, `nom`, `prenom`) VALUES (?, ?, ?, ?, ?)');
try {
    $stmt->execute([$email, $hashed_password, $role, $lastname, $firstname]);

    // Vérifier si l'insertion a réussi
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to create user.'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
