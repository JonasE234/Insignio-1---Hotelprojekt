<?php

namespace Utils;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\DriverManager;

class Utils
{
    static function getConnection(): Connection
    {
        $config = Config::getInstance();

        $conn = DriverManager::getConnection($config->config['db_data']);
        return $conn;
    }

    static function createQuery()
    {
        $con = self::getConnection();
        return $con->createQueryBuilder();
    }
}
