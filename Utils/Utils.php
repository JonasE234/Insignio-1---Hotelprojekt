<?php

namespace Utils;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\DriverManager;
use Doctrine\DBAL\Query\QueryBuilder;

class Utils
{
    public static function getConnection(): Connection
    {
        $config = Config::getInstance();
        return DriverManager::getConnection($config->config['db_data']);;
    }

    public static function createQuery(): QueryBuilder
    {
        $con = self::getConnection();
        return $con->createQueryBuilder();
    }
}
