<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(400);
    return;
}

header('content-type: application/json');

//http://localhost/authentication/connect.php
//script de traitement de connexion//

session_start();
require '../../includes/db.php';


$username = $_POST['username'];
$password = $_POST['password'];
if (preg_match('/[a-z0-9\.\-_]+@[a-z0-9\.\-\_]+\.[a-z]+/', $username) == false) {
    echo json_encode([
        "success" => false,
        "error" => "email invalide"
    ]);
    return;
}

$sql = "SELECT * FROM utilisateur WHERE username = :username";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':username', $username);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['user_role'] = $user['role'];

        echo json_encode([
            "success" => true,
            "redirect" => getUrlByRole($user['role'])
        ]);
    } else {
        sleep(round(random_int(0, 1000) / 1000));
        echo json_encode([
            "success" => false,
            "error" => "compte invalide"
        ]);
    }
} else {
    sleep(round(random_int(0, 1000) / 1000));
    echo json_encode([
        "success" => false,
        "error" => "compte invalide"
    ]);
}


function getUrlByRole($role)
{
    require '../../includes/db.php';

    $sql = "SELECT * FROM `role` WHERE id = :role";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':role', $role);
    $stmt->execute();
    $role = $stmt->fetch(PDO::FETCH_ASSOC);

    switch ($role['label']) {
        case 'admin':
            $url = '/admin/accounts';
            break;
        case 'Vétérinaire':
            $url = '/véto/rapport';
            break;
        case 'Employé':
            $url = '/employé/food';
            break;
    }

    return $url;
}
