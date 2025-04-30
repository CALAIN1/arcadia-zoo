<?php

require '../../includes/api.php';

$pageByRoles = [
    'admin' => [
        ["name" => "Gestion des comptes", "url" => '/admin/accounts'],
        ["name" => "Gestion des Animaux", "url" => '/admin/animal'],
        ["name" => "Gestion des Habitats", "url" => '/admin/zone'],
        ["name" => "Comptes rendus Animaux", "url" => '/véto/rapport'],
        ["name" => "Etat des habitats", "url" => '/véto/etat'],
        ["name" => "Avis", "url" => '/employé/avis'],
        ["name" => "Alimentation", "url" => '/employé/food']
    ],
    'Employé' => [
        ["name" => "Avis", "url" => '/employé/avis'],
        ["name" => "Alimentation", "url" => '/employé/food']
    ],
    'Vétérinaire' => [
        ["name" => "Comptes rendus Animaux", "url" => '/véto/rapport'],
        ["name" => "Etat des habitats", "url" => '/véto/etat']
    ]
];

$sql = "SELECT * FROM `role` WHERE id = :role";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':role', $_SESSION['user_role']);
$stmt->execute();
$role = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($pageByRoles[$role['label']]);
