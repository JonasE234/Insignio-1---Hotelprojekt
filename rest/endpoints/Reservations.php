<?php

use Doctrine\DBAL\Query\QueryBuilder;
use Utils\Utils;
use Utils\Config;

/**
 * Example
 */
class Reservations
{
    public function bookRoom($roomId, string | int $userId, string $from, string $to)
    {
        $from = gmdate(Utils::getDateFormat(), strtotime(date($from)));
        $to = gmdate(Utils::getDateFormat(), strtotime(date($to)));
        $q = Utils::createQuery();
        $q->insert("reservations")
            ->values([
                'room_id' => ':roomId',
                'user_id' => ':userId',
                'reservation_start' => ':from',
                'reservation_end' => ':to',
            ])
            ->setParameters([
                'roomId' => $roomId,
                'userId' => $userId,
                'from' => $from,
                'to' => $to,
            ]);
        $q->executeQuery();

        return 200;
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