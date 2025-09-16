<?php

use App\Kernel;
use Symfony\Component\Dotenv\Dotenv;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};

// If .env file exists, load it (local/dev). In production, rely on Render env vars
if (file_exists(dirname(__DIR__).'/.env')) {
    (new Dotenv())->bootEnv(dirname(__DIR__).'/.env');
}