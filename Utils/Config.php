<?php

namespace Utils;

class Config
{
    public array $config;
    private static array $instances;

    public function __construct()
    {
        require_once('../config.php');

        if (empty($config)) {
            throw new \Exception('Config file is empty');
        }

        $this->config = $config;
    }

    public static function getInstance(): Config
    {
        $instance = static::class;
        if (!isset(self::$instances[$instance])) {
            self::$instances[$instance] = new static();
        }

        return self::$instances[$instance];
    }
}