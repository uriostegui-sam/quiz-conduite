<?php

namespace App\Command;

use App\Entity\Card;
use App\Service\Factory\QuestionFactory;
use Doctrine\ORM\EntityManagerInterface;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:import-questions',
    description: 'Import driving test questions from an Excel file',
)]
class ImportQuestionsCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly QuestionFactory $questionFactory
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {

        $filePath = __DIR__ . '/../../import/questions.xlsx';

        if (!file_exists($filePath)) {
            $output->writeln('<error>Excel file not found at: ' . $filePath . '</error>');
            return Command::FAILURE;
        }

        $spreadsheet = IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        $total = count($rows);
        $output->writeln("<info>Processing $total rows...</info>");

       for ($i = 0; $i < count($rows); $i++) {
            $row = $rows[$i];

            if (!empty($row[0])) {
                $cardNumber = (int) $row[0];
                $card = new Card();
                $card->setNumber($cardNumber);

                // Question: VI or VE
                $theme1 = trim($row[1] ?? '');
                $question1 = trim($row[2] ?? '');
                $answer1 = trim($row[3] ?? '');
                $this->questionFactory->createAndAddToCard($card, $theme1, $question1, $answer1);

                // Question: QSER
                $row2 = $rows[$i + 1] ?? [];
                $theme2 = trim($row2[1] ?? '');
                $question2 = trim($row2[2] ?? '');
                $answer2 = trim($row2[3] ?? '');
                $this->questionFactory->createAndAddToCard($card, $theme2, $question2, $answer2);

                // Question: 1er S
                $row3 = $rows[$i + 2] ?? [];
                $theme3 = trim($row3[1] ?? '');
                $question3 = trim($row3[2] ?? '');
                $answer3 = trim($row3[3] ?? '');
                $this->questionFactory->createAndAddToCard($card, $theme3, $question3, $answer3);

                $this->entityManager->persist($card);
                $i += 2;
            }
        }

        $this->entityManager->flush();
        $output->writeln('Import complete. :)');

        return Command::SUCCESS;
    }
}
