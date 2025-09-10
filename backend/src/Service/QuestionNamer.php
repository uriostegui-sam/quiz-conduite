<?php

namespace App\Service;

use App\Entity\Question;
use Vich\UploaderBundle\Mapping\PropertyMapping;
use Vich\UploaderBundle\Naming\NamerInterface;

class QuestionNamer implements NamerInterface
{
    public function name($object, PropertyMapping $mapping): string
    {
        if (!$object instanceof Question){
            throw new \InvalidArgumentException("Object must be instance of Question");
        }

        /** @var UploadedFile $file */
        $file = $object->getMediaFile();
        $extension = $file->guessExtension() ?: $file->getClientOriginalExtension();

        $slug = preg_replace('/[^a-z0-9]+/i', '-', strtolower($object->getText()));
        $slug = trim($slug, '-');

        return $slug . '.' . $extension;
    }
}