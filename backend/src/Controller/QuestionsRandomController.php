<?php

namespace App\Controller;

use App\Repository\QuestionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class QuestionsRandomController extends AbstractController
{
    public function __invoke(Request $request, QuestionRepository $repo): JsonResponse
    {
        $count = max(1, (int)$request->query->get('count', 1));
        $theme = $request->query->get('theme');

        if (!$theme) {
            return $this->json(['error' => 'theme required'], 400);
        }

        $questions = $repo->findRandomQuestionsByTheme($count, $theme);

        $payload = [];
        foreach ($questions as $q) {
            $incorrect = $repo->getIncorrectAnswersForQuestion($q->getId(), $q->getTheme(), 3);
            $options = array_merge($incorrect, [$q->getAnswer() !== "x" ? $q->getAnswer() : $q->getMediaUrl()]);
            shuffle($options);
            $payload[] = [
                'id' => $q->getId(),
                'question' => $q->getText(),
                'correct_answer' => $q->getAnswer() !== "x" ? $q->getAnswer() : $q->getMediaUrl(),
                'incorrect_answers' => $incorrect,
                'all_answers' => $options,
                'mediaUrl' => $q->getMediaUrl(),
            ];
        }
        return $this->json($payload);
    }
}
