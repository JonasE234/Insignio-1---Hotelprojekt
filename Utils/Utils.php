<?php

namespace Utils;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\DriverManager;
use Doctrine\DBAL\Query\QueryBuilder;

class Utils
{
    static function getConnection(): Connection
    {
        $config = Config::getInstance();

        $conn = DriverManager::getConnection($config->config['db_data']);
        return $conn;
    }

    static function createQuery(): QueryBuilder
    {
        $con = self::getConnection();
        return $con->createQueryBuilder();
    }
}
