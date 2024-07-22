<?php
require '../../includes/api.php';

//Fetch liste des habitats

$sql = "SELECT etat_habitat.*, habitat.name AS habitat FROM `etat_habitat` INNER JOIN habitat ON habitat.id = etat_habitat.habitat";
$stmt = $conn->prepare($sql);
$stmt->execute();
$etat_habitats = $stmt->fetchAll(PDO::FETCH_ASSOC);

$etat_size = sizeof($etat_habitats);
for ($i = 0; $i < $etat_size; $i++) {
    $dt = new DateTime($etat_habitats[$i]["date"]);
    $etat_habitats[$i]['date'] = $dt->format('d/m/Y H:i');


    //$etat_habitats[$i]['date'] = str_replace(':', 'h', $dt->format('d/m/Y H:i'));
}

echo json_encode([
    "success" => true,
    "data" => $etat_habitats
]);
