<?php

namespace App\Controller;

use App\Entity\Question;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class QuestionMediaUploadController
{
    public function __construct(private EntityManagerInterface $em) {}

    public function __invoke(Request $request, int $id): JsonResponse
    {
        $question = $this->em->getRepository(Question::class)->find($id);

        if (!$question) {
            throw new NotFoundHttpException('Question not found.');
        }

        $file = $request->files->get('mediaFile');

        if ($file) {
            $question->setMediaFile($file);
            $this->em->persist($question);
            $this->em->flush();

            return new JsonResponse(['status' => 'media updated']);
        }

        return new JsonResponse(['error' => 'No file uploaded'], 400);
    }
}
