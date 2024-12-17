<?php

use Doctrine\DBAL\DriverManager;
use Doctrine\DBAL\Query\QueryBuilder;
use Utils\Utils;

class Token
{
    private $q;
    const DURATION = 600; #10 minutes
    public function __construct()
    {
        $this->q = Utils::createQuery();
    }

    public function varifiy()
    {

    }

    public function getToken()
    {

    }


    public function createToken(): array
    {
        $token = md5(uniqid('', true)); //32 characters
        $timestamp = time() + self::DURATION;
        $expirationDate = gmdate('Y-m-d h:i:s', $timestamp);
        return [
            'token' => $token,
            'expirationDate' => $expirationDate,
            'time' => $timestamp,
            't' => gmdate('Y-m-d h:i:s', time())
        ];

    }

}
