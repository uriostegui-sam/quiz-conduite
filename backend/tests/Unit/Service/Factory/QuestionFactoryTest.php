<?php

namespace App\Tests\Service\Factory;

use App\Entity\Card;
use App\Entity\Question;
use App\Service\Factory\QuestionFactory;
use PHPUnit\Framework\TestCase;

class QuestionFactoryTest extends TestCase
{
    public function testReturnsNullWhenThemeOrTextIsEmpty(): void
    {
        $factory = new QuestionFactory();
        $card = new Card();

        $result1 = $factory->createAndAddToCard($card, '', 'Some question', 'Some answer');
        $result2 = $factory->createAndAddToCard($card, 'Theme', '', 'Some answer');

        $this->assertNull($result1);
        $this->assertNull($result2);
    }

    public function testCreatesQuestionAndAddsToCard(): void
    {
        $factory = new QuestionFactory();
        $card = new Card();

        $question = $factory->createAndAddToCard($card, 'Safety', 'What is a safe distance?', '2 seconds');

        $this->assertInstanceOf(Question::class, $question);
        $this->assertSame('Safety', $question->getTheme());
        $this->assertSame('What is a safe distance?', $question->getText());
        $this->assertSame('2 seconds', $question->getAnswer());
        $this->assertSame($card, $question->getCard());

        // Make sure the question was added to the card
        $this->assertCount(1, $card->getQuestions());
        $this->assertSame($question, $card->getQuestions()->first());
    }
}
