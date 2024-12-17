<?php

use Doctrine\DBAL\Query\QueryBuilder;
use Utils\Utils;
use Utils\Config;

/**
 * Example
 */
class Rooms
{
    public function getAllRooms(): array
    {
        $q = $this->getBaseQuery();
        $res = $q->executeQuery()->fetchAllAssociative();
        return $this->prepareData($res);
    }

    public function getRoomData(int $roomId): array
    {
        $q = $this->getBaseQuery();
        $q->where($q->expr()->eq('r.id', $q->createPositionalParameter($roomId)));
        $res = $q->executeQuery()->fetchAllAssociative();

        $res = $this->prepareData($res);
        return $res[0];
    }

    protected function getBaseQuery(): QueryBuilder
    {
        $q = Utils::createQuery();
        $q->select('r.*, p.price')
            ->from('rooms', 'r')
            ->leftJoin('r', 'price_class', 'p', 'r.price_class_id = p.id')
            ->where(
                $q->expr()->eq('r.deleted', 0)
            );

        return $q;
    }

    protected function prepareData($data): array
    {
        foreach ($data as &$record) {
            // prepare features
            $record['features'] = json_decode($record['features'] ?? '');
        }

        return $data;
    }

}