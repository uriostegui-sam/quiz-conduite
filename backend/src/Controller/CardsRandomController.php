<?php

namespace App\Controller;

use App\Repository\CardRepository;
use App\Repository\QuestionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class CardsRandomController extends AbstractController
{
    public function __invoke(Request $request, CardRepository $cardRepo, QuestionRepository $questionRepo): JsonResponse
    {
        $count = max(1, (int)$request->query->get('count', 1));
        $cards = $cardRepo->findRandomCards($count);

        $payload = [];
        foreach ($cards as $card) {
            $questions = [];
            foreach ($card->getQuestions() as $question) {
                $incorrect = $questionRepo->getIncorrectAnswersForQuestion($question->getId(), $question->getTheme(), 3);
                $options = array_merge($incorrect, [$question->getAnswer()]);
                
                shuffle($options);
                
                $questions[] = [
                    'id' => $question->getId(),
                    'question' => $question->getText(),
                    'correct_answer' => $question->getAnswer(),
                    'incorrect_answers' => $incorrect,
                    'all_answers' => $options,
                    'mediaUrl' => $question->getMediaUrl(),
                ];
            }
            $payload[] = [
                'cardNumber' => $card->getNumber(),
                'questions' => $questions,
            ];
        }
        return $this->json($payload);
    }
}