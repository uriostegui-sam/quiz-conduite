<?php

use App\Kernel;
use Symfony\Component\Dotenv\Dotenv;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};

// Load .env only if it exists (for local/dev). In Render prod, skip
$envFile = dirname(__DIR__).'/.env';
if (file_exists($envFile)) {
    (new Dotenv())->bootEnv($envFile);
}