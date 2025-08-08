<?php

namespace App\Service\Factory;

use App\Entity\Card;
use App\Entity\Question;

class QuestionFactory
{
    public function createAndAddToCard(Card $card, string $theme, string $questionText, string $answer): ?Question
    {
        if (empty($theme) || empty($questionText)) {
            return null;
        }

        $question = new Question();
        $question->setTheme($theme);
        $question->setText($questionText);
        $question->setAnswer($answer);

        $question->setCard($card);
        $card->addQuestion($question);

        return $question;
    }
}
