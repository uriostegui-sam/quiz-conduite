<?php

namespace App\Tests\Command;

use App\Command\ImportQuestionsCommand;
use App\Entity\Card;
use App\Entity\Question;
use App\Service\Factory\QuestionFactory;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ImportQuestionsCommandTest extends TestCase
{
    public function testImportCreatesCardsAndQuestions()
    {
        // Arrange: Fake Excel data
        $fakeRows = [
            [1, 'VI', 'Question 1', 'Answer 1', 'QSER', 'Question 2', 'Answer 2', '1er S', 'Question 3', 'Answer 3'],
            [2, 'VE', 'Q1', 'A1', 'QSER', 'Q2', 'A2', '1er S', 'Q3', 'A3'],
        ];

        // Set up a fake command with mocked dependencies
        $mockEntityManager = $this->createMock(EntityManagerInterface::class);
        $questionFactory = new QuestionFactory();

        $persistedCards = [];

        $mockEntityManager->expects($this->any())
            ->method('persist')
            ->willReturnCallback(function ($card) use (&$persistedCards) {
                $persistedCards[] = $card;
            });

        $mockEntityManager->expects($this->once())
            ->method('flush');

        // Create a command instance with the mocked dependencies
        $command = new class($mockEntityManager, $questionFactory, $fakeRows) extends ImportQuestionsCommand {
            private array $rowsOverride;
            private EntityManagerInterface $em;
            private QuestionFactory $questionFactory;

            public function __construct($em, $questionFactory, array $rowsOverride)
            {
                $this->rowsOverride = $rowsOverride;
                $this->em = $em;
                $this->questionFactory = $questionFactory;
                parent::__construct($em, $questionFactory);
            }

            protected function getRows(): array
            {
                return $this->rowsOverride;
            }

            protected function execute(InputInterface $input, OutputInterface $output): int
            {
                $rows = $this->getRows();

                foreach ($rows as $row) {
                    $cardNumber = (int) $row[0];
                    $card = new Card();
                    $card->setNumber($cardNumber);

                    $this->questionFactory->createAndAddToCard($card, $row[1] ?? '', $row[2] ?? '', $row[3] ?? '');
                    $this->questionFactory->createAndAddToCard($card, $row[4] ?? '', $row[5] ?? '', $row[6] ?? '');
                    $this->questionFactory->createAndAddToCard($card, $row[7] ?? '', $row[8] ?? '', $row[9] ?? '');

                    $this->em->persist($card);
                }

                $this->em->flush();
                return self::SUCCESS;
            }
        };

        // Run the command
        $input = new ArrayInput([]);
        $output = new BufferedOutput();
        $command->run($input, $output);

        // Check cards and questions
        $this->assertCount(2, $persistedCards);

        foreach ($persistedCards as $card) {
            $this->assertInstanceOf(Card::class, $card);
            $this->assertCount(3, $card->getQuestions());

            foreach ($card->getQuestions() as $question) {
                $this->assertInstanceOf(Question::class, $question);
                $this->assertNotEmpty($question->getTheme());
                $this->assertNotEmpty($question->getText());
                $this->assertNotEmpty($question->getAnswer());
            }
        }
    }
}
