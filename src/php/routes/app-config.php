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
                    // Ensure proper UTF-8 encoding for both key and value
                    $response[] = [
                        'key' => mb_convert_encoding($config->getKey(), 'UTF-8', 'auto'),
                        'value' => mb_convert_encoding($config->getValue(), 'UTF-8', 'auto')
                    ];
                }
                
                // Encode the response to JSON
                $json = json_encode($response);

                // Check if json_encode() failed
                if ($json === false) {
                    // Return the JSON encoding error
                    http_response_code(500);
                    echo json_encode([
                        'error' => 'JSON encoding failed',
                        'message' => json_last_error_msg()
                    ]);
                } else {
                    // Return the JSON response
                    echo $json;
                }
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'No configs found']);
            }
        } elseif (isset($_GET['key'])) {
            $key = $_GET['key'];
            $config = $controller->getConfig($key);

            if ($config) {
                $response = [
                    'key' => mb_convert_encoding($config->getKey(), 'UTF-8', 'auto'),
                    'value' => mb_convert_encoding($config->getValue(), 'UTF-8', 'auto')
                ];
                
                // Encode the response to JSON
                $json = json_encode($response);

                // Check if json_encode() failed
                if ($json === false) {
                    // Return the JSON encoding error
                    http_response_code(500);
                    echo json_encode([
                        'error' => 'JSON encoding failed',
                        'message' => json_last_error_msg()
                    ]);
                } else {
                    // Return the JSON response
                    echo $json;
                }
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
                $config = new AppConfigModel(
                    mb_convert_encoding($data['key'], 'UTF-8', 'auto'),
                    mb_convert_encoding($data['value'], 'UTF-8', 'auto')
                );
                $controller->createConfig($config);

                $response = [
                    'key' => $config->getKey(),
                    'value' => $config->getValue()
                ];
                
                // Encode the response to JSON
                $json = json_encode($response);

                // Check if json_encode() failed
                if ($json === false) {
                    // Return the JSON encoding error
                    http_response_code(500);
                    echo json_encode([
                        'error' => 'JSON encoding failed',
                        'message' => json_last_error_msg()
                    ]);
                } else {
                    // Return the JSON response
                    echo $json;
                }
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
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
