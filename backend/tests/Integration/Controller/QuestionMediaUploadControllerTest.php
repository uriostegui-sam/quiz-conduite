<?php

namespace App\Tests\Integration\Controller;

use App\Entity\Card;
use App\Entity\Question;
use App\Service\Factory\QuestionFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class QuestionMediaUploadControllerTest extends WebTestCase
{
    private EntityManagerInterface $em;
    private $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->em = static::getContainer()->get(EntityManagerInterface::class);
    }

    public function testUploadMediaToQuestion(): void
    {
        $card = new Card();
        $card->setNumber(1);

        $factory = new QuestionFactory();
        $question = $factory->createAndAddToCard($card, 'QSER', 'Quel est l\'intérêt de la position nuit ?', 'Ne pas être ébloui par les feux du véhicule suiveur.');

        $this->em->persist($card);     
        $this->em->persist($question); 
        $this->em->flush();

        $questionId = $question->getId();

        $filePath = __DIR__ . '/fixtures/test-image.jpg';
        copy(__DIR__ . '/../../fixtures/test.jpg', $filePath);
        $uploadedFile = new UploadedFile(
            $filePath,
            'test-image.jpg',
            'image/jpeg',
            null,
            true
        );

        $this->client->request(
            'POST',
            "/api/questions/{$questionId}/media",
            [],
            ['mediaFile' => $uploadedFile]
        );

        // Assert the response status and content
        $this->assertResponseIsSuccessful();
        $response = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertSame('media updated', $response['status']);

        // Check if the media URL is set in the question entity
        $this->em->clear();
        $updatedQuestion = $this->em->getRepository(Question::class)->find($questionId);
        $this->assertNotNull($updatedQuestion->getMediaUrl(), 'Media URL should be set in DB');
    }
}
