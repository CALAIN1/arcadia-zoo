<?php

if (!isset($_GET['animal'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Missing values'
    ]);
    http_response_code(404);
    return;
}

require '../../includes/db.php';

$sql = 'SELECT * FROM rapport WHERE animal = ? ORDER BY `date` DESC LIMIT 1';
$stmt = $conn->prepare($sql);
$stmt->execute([$_GET['animal']]);

$reportData = $stmt->fetch(PDO::FETCH_ASSOC);

if ($reportData != null) {
    echo json_encode([
        'success' => true,
        'data' => $reportData
    ]);
} else {
    echo json_encode([
        'success' => true,
        'data' => [
            'date' => '-',
            'qty_food' => '-',
            'food' => '-',
            'etat' => 'Inconnu'
        ]
    ]);
}
