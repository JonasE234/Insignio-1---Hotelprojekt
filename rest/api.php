<?php

class ApiHandler
{
    const TOKEN_INDEX = 'rest_token';
    const CLASS_INDEX = 4;
    const METHOD_INDEX = 5;
    const ENDPOINT_FOLDER = '/endpoints/';

    const ERRORS = [
        '403' => 'HTTP/1.1 403 Forbidden',
        '400' => 'HTTP/1.1 400 Bad Request',
        'no_class' => 'HTTP/1.1 400 Bad Request. Could not resolve $s',
        'no_method' => "HTTP/1.1 404 Not Found. Could not find any method '%s' in class '%s'"
    ];

    public function main()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/', $uri);
        $headers = getallheaders();

        if (empty($headers[self::TOKEN_INDEX])) {
            $this->exitWithError('403');
        } else if (empty($uri[self::CLASS_INDEX]) || empty($uri[self::METHOD_INDEX])) {
            $this->exitWithError('400');
        }

        $className = $uri[self::CLASS_INDEX];
        $classFile = $className . '.php';
        $classPath = self::ENDPOINT_FOLDER . $classFile;

        if (!file_exists(__DIR__ . $classPath)) {
            $this->exitWithError('no_class', [$classPath]);
        }

        require_once __DIR__ . $classPath;
        $endpoint = new $className();
        $method = $uri[self::METHOD_INDEX];

        if (!method_exists($endpoint, $method)) {
            $this->exitWithError('no_method', [$method, $className]);
        }

        //prepare args
        $args = $this->getArgs($uri, self::METHOD_INDEX);

        try {
            // finally call the api endpoint
            $response = $endpoint->$method(...$args['args']);
        } catch (Throwable $t) {
            echo $t->getMessage();
            throw $t;
        }

        // add debug info to response
        if ($args['debug'] === true) {

            $response = [
                'received_args' => $args,
                'class' => $className,
                'class_path' => $classPath,
                'method' => $method,
                '$_GET' => $_GET,
                '$_POST' => $_POST,
                'response' => $response,
            ];
        }

        echo json_encode($response);
    }

    /**
     * POST expects args through $_POST (application/x-www-form-urlencoded or multipart/form-data)
     * GET uses another method:
     *
     * Further args can be parsed through the url request as well,
     * like /rest/api.php/ClassName/methodName/arg1/arg2
     * These args have priority inside the args array (lower index)
     *
     * @param array $uri
     * @param int $argsStartKey
     * @return array
     */
    protected function getArgs(array $uri, int $argsStartKey): array
    {
        $debug = false;
        $args = [];
        // we want these args at the end.
        $additionalArgs = $_POST ?? [];

        foreach ($uri as $key => $value) {
            if ($key <= $argsStartKey) {
                continue;
            } else if ($value === 'DEBUG') {
                $debug = true;
                continue;
            }

            $args[] = $value;
        }

        if (!empty($additionalArgs)) {
            //add additional args.
            array_push($args, $additionalArgs);
        }

        return ['args' => $args, 'debug' => $debug];
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
require_once ('../vendor/autoload.php');
$api = new ApiHandler();
$api->main();