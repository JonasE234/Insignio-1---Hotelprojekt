<?php
use Utils\Utils;

class Authentication
{
    private $queryBuilder;
    const DURATION = 600; #10 minutes

    public function __construct()
    {
        $this->queryBuilder = Utils::createQuery();
    }

    protected function getToken(): array
    {
        return $this->createToken();
    }
    
    /**
     * @param  string $username
     * @return array
     */
    public function retrieveUser(string $username): array | bool
    {
        $query = $this->queryBuilder;
        $query->select('id, user_hash')
            ->from('users', 'u')
            ->where('u.username = :user_username')
            ->setParameter('user_username', $username)
            ->setMaxResults(1);
        return $query->fetchAssociative();
    }
    
    /**
     * @param  string $username
     * @param  string $password
     * @return array
     */
    public function verifyLoginData(string $username, string $password): array
    {
        $user = $this->retrieveUser($username);
        if (empty($user)) {
            throw new Exception('Incorrect user name or password. Please try again.');
        }

        if (password_verify($password, $user['user_hash']) ) {
            return  $this->getToken();
        } else {
            throw new Exception('Incorrect user name or password. Please try again.');
        }
    }
    
    /**
     * @param  string $username
     * @param  string $password
     * @return void
     */
    public function registerUser(string $username, string $password): void
    {
        $user = $this->retrieveUser($username);
        if (!empty($user)) {
            throw new \Exception();
        }

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $query = $this->queryBuilder;
        $query->insert('users')
            ->values();
    }
    
    /**
     * @return array
     */
    protected function createToken(): array
    {
        $token = md5(uniqid('', true)); //32 characters
        $timestamp = time() + self::DURATION;

        return [
            'token' => $token,
            'expirationTime' => time() + 3600,
            'time' => $timestamp,
            't' => gmdate('Y-m-d h:i:s', time())
        ];
    }
}
