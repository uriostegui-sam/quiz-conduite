<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\QuestionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: QuestionRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['theme' => 'exact'])]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $theme = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $text = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $answer = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[ApiProperty(writable: false)]
    private ?string $mediaUrl = null;

    #[Vich\UploadableField(mapping: 'question_images', fileNameProperty: 'mediaUrl')]
    #[Assert\Image]
    private ?File $mediaFile = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'questions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Card $card = null;

    // #[ORM\ManyToOne(targetEntity: QuestionMedia::class)]
    // #[ORM\JoinColumn(nullable: true)]
    // public ?QuestionMedia $image = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTheme(): ?string
    {
        return $this->theme;
    }

    public function setTheme(string $theme): static
    {
        $this->theme = $theme;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): static
    {
        $this->answer = $answer;

        return $this;
    }

    public function setMediaFile(?File $file = null): void
    {
        $this->mediaFile = $file;

        if ($file !== null) {
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getMediaFile(): ?File
    {
        return $this->mediaFile;
    }

    public function getMediaUrl(): ?string
    {
        return $this->mediaUrl;
    }

    public function setMediaUrl(?string $mediaUrl): static
    {
        $this->mediaUrl = $mediaUrl;
        return $this;
    }

    public function getCard(): ?Card
    {
        return $this->card;
    }

    public function setCard(?Card $card): static
    {
        $this->card = $card;

        return $this;
    }
}
