<?php

use Utils\Utils;
use Utils\Config;

/**
 * Example
 */
class ClassName
{
    function methodName($arg1 = 1, $arg2 = 2){
        $config = Config::getInstance();

        $t = Utils::createQuery();
        $t->select('*')
            ->from('rooms');
        $res = $t->executeQuery();
        return $res->fetchAllAssociative();
    }
}