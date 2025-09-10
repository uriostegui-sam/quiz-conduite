<?php

namespace App\Service;

use App\Entity\Question;
use Symfony\Component\String\Slugger\SluggerInterface;
use Vich\UploaderBundle\Mapping\PropertyMapping;
use Vich\UploaderBundle\Naming\NamerInterface;

class QuestionNamer implements NamerInterface
{
    public function __construct(
        private readonly SluggerInterface $slugger
    )
    {}

    public function name($object, PropertyMapping $mapping): string
    {
        if (!$object instanceof Question){
            throw new \InvalidArgumentException("Object must be instance of Question");
        }

        /** @var UploadedFile $file */
        $file = $object->getMediaFile();
        $extension = $file->guessExtension() ?: $file->getClientOriginalExtension();

        $slug = (string) $this->slugger->slug($object->getText())->lower();
        $slug .= '-' . uniqid();

        return $slug . '.' . $extension;
    }
}