<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(400);
    return;
}

//header('content-type: application/json');
session_start();
if (!isset($_SESSION["username"])) {
    echo json_encode([
        "success" => false,
        "error" => "Vous devez être connecté"
    ]);
    return;
}
require 'db.php';

// Function to validate email using regex
function isValidEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

$sql = "SELECT * FROM `role` WHERE id = :role";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':role', $_SESSION["user_role"]);
$stmt->execute();
$role = $stmt->fetch(PDO::FETCH_ASSOC);
if ($role["label"] != "admin") {
    echo json_encode([
        "success" => false,
        "error" => "Permission refusée. Vous devez être administrateur."
    ]);
    return;
}
