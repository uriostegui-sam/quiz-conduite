<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use App\Controller\CardsRandomController;
use App\Repository\CardRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model\Operation;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CardRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            uriTemplate: '/cards/random',
            controller: CardsRandomController::class,
            deserialize: false,
            openapi: new Operation(
                summary: 'Get random cards',
                description: 'Fetches a specified number of random cards.',
                parameters: [
                    ['name' => 'count', 'in' => 'query', 'required' => false, 'schema' => ['type' => 'integer', 'default' => 1]]
                ]
            )
        )
    ]
)]
#[GetCollection()]
#[Get()]
#[Post()]
#[Patch()]
#[Delete()]
class Card
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['card:read'])]
    #[Assert\Positive]
    private ?int $number = null;

    #[ORM\OneToMany(mappedBy: 'card', targetEntity: Question::class, cascade: ['persist', 'remove'])]
    #[Groups(['card:read'])]
    private Collection $questions;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(int $number): static
    {
        $this->number = $number;

        return $this;
    }

    /**
     * @return Collection<int, Question>
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): static
    {
        if (!$this->questions->contains($question)) {
            $this->questions->add($question);
            $question->setCard($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): static
    {
        if ($this->questions->removeElement($question)) {
            if ($question->getCard() === $this) {
                $question->setCard(null);
            }
        }

        return $this;
    }
}
