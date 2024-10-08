<?php
require '../../includes/api.php';

//Fetch liste des animaux

$sql = "SELECT rapport.*, CONCAT(usr.prenom, \" \", usr.nom) AS utilisateur, an.name as animal
     FROM `rapport`
    INNER JOIN utilisateur AS usr ON usr.id = rapport.utilisateur
    INNER JOIN animal AS an ON an.id = rapport.animal;";
$stmt = $conn->prepare($sql);
$stmt->execute();
$reports = $stmt->fetchAll(PDO::FETCH_ASSOC);

$etat_size = sizeof($reports);
for ($i = 0; $i < $etat_size; $i++) {
    $dt = new DateTime($reports[$i]["date"]);
    $reports[$i]['date'] = $dt->format('d/m/Y H:i');
}

echo json_encode([
    "success" => true,
    "data" => $reports
]);
