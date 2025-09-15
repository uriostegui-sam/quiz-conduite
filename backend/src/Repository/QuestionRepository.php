<?php

namespace App\Repository;

use App\Entity\Question;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Question>
 */
class QuestionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Question::class);
    }

    public function findRandomQuestionsByTheme(int $count, string $theme): array
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = 'SELECT id FROM question WHERE theme = :theme ORDER BY RANDOM() LIMIT :count';
        $stmt = $conn->prepare($sql);
        $stmt->bindValue('theme', $theme);
        $stmt->bindValue('count', $count, \PDO::PARAM_INT);
        $rows = $stmt->executeQuery()->fetchAllAssociative();
        $ids = array_column($rows, 'id');

        if (!$ids) {
            return [];
        }

        return $this->createQueryBuilder('q')
            ->andWhere('q.id IN (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->getResult();
    }


    public function getIncorrectAnswersForQuestion(int $questionId, string $theme, int $limit = 3): array
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = 'SELECT answer, media_url FROM question WHERE theme = :theme AND id != :id ORDER BY RANDOM() LIMIT :limit';
        $stmt = $conn->prepare($sql);
        $stmt->bindValue('theme', $theme);
        $stmt->bindValue('id', $questionId);
        $stmt->bindValue('limit', $limit, \PDO::PARAM_INT);
        $rows = $stmt->executeQuery()->fetchAllAssociative();
        $allAnswers = array();

        foreach ($rows as $row) {
            $newRow = $row['answer'] !== "x" ? $row['answer'] : $row['media_url'];
            $row = array_push($allAnswers, $newRow);
        }

        return $allAnswers;
    }


    //    /**
    //     * @return Question[] Returns an array of Question objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('q')
    //            ->andWhere('q.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('q.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Question
    //    {
    //        return $this->createQueryBuilder('q')
    //            ->andWhere('q.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
