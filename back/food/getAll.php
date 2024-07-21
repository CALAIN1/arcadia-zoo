<?php

require '../../includes/api.php';


$sql = 'SELECT rapport.*, animal.name as animal, CONCAT(utilisateur.nom, \' \', utilisateur.prenom) as utilisateur FROM rapport
    INNER JOIN animal ON animal.id = rapport.animal
    INNER JOIN utilisateur ON utilisateur.id = rapport.utilisateur
    GROUP BY rapport.animal ORDER BY rapport.date DESC';
$stmt = $conn->prepare($sql);
$stmt->execute();
$foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

$foodCount = sizeof($foods);
for ($i = 0; $i < $foodCount; $i++) {
    $dt = new DateTime($foods[$i]['date']);
    $foods[$i]['date'] = $dt->format('d/m/Y H:i');
}

echo json_encode([
    'success' => true,
    'data' => $foods
]);
