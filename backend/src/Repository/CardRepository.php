<?php

namespace App\Repository;

use App\Entity\Card;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Card>
 */
class CardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Card::class);
    }

    public function findRandomCards(int $count): array
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = 'SELECT id FROM card ORDER BY RANDOM() LIMIT :count';
        $stmt = $conn->prepare($sql);
        $stmt->bindValue('count', $count, \PDO::PARAM_INT);
        $rows = $stmt->executeQuery()->fetchAllAssociative();
        $ids = array_column($rows, 'id');

        if (!$ids) {
            return [];
        }

        return $this->createQueryBuilder('c')
            ->leftJoin('c.questions', 'q')
            ->addSelect('q')
            ->andWhere('c.id IN (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }

    //    /**
    //     * @return Card[] Returns an array of Card objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Card
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
