<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

class ApiHandler
{
    const TOKEN_INDEX = 'rest_token';
    const CLASS_INDEX = 0;
    const METHOD_INDEX = 1;
    const ENDPOINT_FOLDER = '/endpoints/';

    const ERRORS = [
        '403' => 'HTTP/1.1 403 Forbidden',
        '400' => 'HTTP/1.1 400 Bad Request',
        'no_class' => 'HTTP/1.1 400 Bad Request. Could not resolve $s',
        'no_method' => "HTTP/1.1 404 Not Found. Could not find any method '%s' in class '%s'"
    ];

    public function main()
    {
        $token = '1234';
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/', $uri);
        $headers = getallheaders();

        //prepare args
        $data = $this->getArgs($uri);

        if (empty($data['token']) || $data['token'] !== $token) {
            $this->exitWithError('403');
        } else if (empty($data['class']) || empty($data['method'])) {
            $this->exitWithError('400');
        }

        $className = $data['class'];
        $classFile = $className . '.php';
        $classPath = self::ENDPOINT_FOLDER . $classFile;

        if (!file_exists(__DIR__ . $classPath)) {
            $this->exitWithError('no_class', [$classPath]);
        }

        require_once __DIR__ . $classPath;
        $endpoint = new $className();
        $method = $data['method'];

        if (!method_exists($endpoint, $method)) {
            $this->exitWithError('no_method', [$method, $className]);
        }

        try {
            // finally call the api endpoint
            $response = $endpoint->$method(...$data['args']);
        } catch (Throwable $t) {
            echo $t->getMessage();
            throw $t;
        }

        // add debug info to response
        if ($data['debug'] === true) {
            $response = [
                'received_args' => $data,
                'class' => $className,
                'class_path' => $classPath,
                'method' => $method,
                '$_GET' => $_GET,
                '$_POST' => $_POST,
                'response' => $response,
            ];
        }

        header("Access-Control-Allow-Origin: *");
        echo json_encode($response);
    }

    /**
     * POST expects args through body
     *
     * Class and method are expected as follows:
     * like /rest/api.php/ClassName/methodName
     *
     * @param array $uri
     * @return array
     */
    protected function getArgs(array $uri): array
    {
        $debug = false;
        $args = [];
        $argsStart = false;
        $fileName = basename($_SERVER["SCRIPT_FILENAME"]);
        $body = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];

        foreach ($uri as $key => $value) {
            if ($argsStart === false && $value !== $fileName) {
                continue;
            } else if ($argsStart === false && $value === $fileName) {
                $argsStart = true;
                continue;
            } else if ($argsStart === true && $value === 'DEBUG') {
                $debug = true;
                continue;
            }

            $args[] = $value;
        }

        return [
            'class' => $args[self::CLASS_INDEX],
            'method' => $args[self::METHOD_INDEX],
            'args' => $body['args'] ?? [],
            'token' => $body[self::TOKEN_INDEX],
            'debug' => $debug
        ];
    }

    /**
     * Evaluates an error
     * @param string $label
     * @param array $args
     * @return string
     */
    protected function getErrorLabel(string $label, array $args = []): string
    {
        $msg = self::ERRORS[$label];

        if (!empty($args)) {
            $msg = sprintf($msg, $args);
        }

        return $msg;
    }

    /**
     * Exit
     * @param string $errorKey
     * @param array $args
     * @return never
     */
    protected function exitWithError(string $errorKey, array $args = []): never
    {
        $msg = $this->getErrorLabel($errorKey, $args);
        header($msg);
        exit($msg);
    }
}

require_once('../vendor/autoload.php');
$api = new ApiHandler();
$api->main();