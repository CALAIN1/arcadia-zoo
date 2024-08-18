<?php

include "../../vendor/autoload.php";

use MongoDB\Driver\ServerApi;

$uri = 'mongodb+srv://carolelillumine:PqqTDromxdFZNJrf@arcadiazoo.ww58wd3.mongodb.net/';

// Set the version of the Stable API on the client
$apiVersion = new ServerApi(ServerApi::V1);
// Create a new client and connect to the server
$client = new MongoDB\Client($uri, [], ['serverApi' => $apiVersion]);

try {
    // Send a ping to confirm a successful connection
    $mongo = $client->selectDatabase('arcadia_zoo');
} catch (Exception $e) {
    printf($e->getMessage());
}
