<?php
header('Content-Type: application/json');

// Inclure la connexion à la base de données
require '../../includes/api.php';

// Vérifier si l'ID de l'image a bien été reçu
if (!isset($_POST['image_id']) || empty($_POST['image_id'])) {
    echo json_encode(['success' => false, 'message' => 'ID d\'image manquant.']);
    exit;
}

$image_id = intval($_POST['image_id']);

// Récupérer l'URL de l'image pour la supprimer du serveur
$query = $conn->prepare("SELECT `url` FROM image_habitat WHERE id = ?");
$query->execute([$image_id]);
$image = $query->fetch(PDO::FETCH_ASSOC);

if (!$image) {
    echo json_encode(['success' => false, 'message' => 'Image non trouvée.']);
    exit;
}

$imagePath = __DIR__ . '/../../front/files' . $image['url'];
if (file_exists($imagePath)) {
    unlink($imagePath);
}

$deleteQuery = $conn->prepare("DELETE FROM image_habitat WHERE id = ?");
$success = $deleteQuery->execute([$image_id]);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Image supprimée avec succès.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la suppression.']);
}
