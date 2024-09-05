<?php
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

require_once __DIR__ . '/../modules/app-config/app-config.controller.php';

$controller = new AppConfigController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['key'])) {
        $key = $_GET['key'];
        $config = $controller->getConfig($key);

        if ($config) {
            echo json_encode(['key' => $config->getKey(), 'value' => $config->getValue()]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Config not found']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing config key']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['key']) && isset($data['value'])) {
        $config = new AppConfigModel($data['key'], $data['value']);
        $controller->createConfig($config);

        echo json_encode(['key' => $config->getKey(), 'value' => $config->getValue()]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing key or value']);
    }
}
