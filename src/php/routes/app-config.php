<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

require_once __DIR__ . '/../modules/app-config/app-config.controller.php';

$controller = new AppConfigController();

// Define a simple routing mechanism
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($requestMethod) {
    case 'GET':
        if (isset($_GET['keys'])) {
            $keys = $_GET['keys'];
            $configs = $controller->getConfigs($keys);

            if ($configs) {
                $response = [];
                foreach ($configs as $config) {
                    $response[] = ['key' => $config->getKey(), 'value' => $config->getValue()];
                }
                echo json_encode($response);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'No configs found']);
            }
        } elseif (isset($_GET['key'])) {
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
            echo json_encode(['error' => 'Missing config key(s)']);
        }
        break;

    case 'POST':
        if ($requestUri === '/config') {
            $data = json_decode(file_get_contents("php://input"), true);

            if (isset($data['key']) && isset($data['value'])) {
                $config = new AppConfigModel($data['key'], $data['value']);
                $controller->createConfig($config);

                echo json_encode(['key' => $config->getKey(), 'value' => $config->getValue()]);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Missing key or value']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid request']);
        }
        break;

    default:
        http_response_code(405); // Method not allowed
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
