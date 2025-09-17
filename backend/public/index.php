<?php

use App\Kernel;

// Force Symfony not to load .env
putenv('APP_RUNTIME_DONTLOADENV=1');
$_SERVER['APP_RUNTIME_DONTLOADENV'] = '1';
$_ENV['APP_RUNTIME_DONTLOADENV'] = '1';

// also force APP_ENV
putenv('APP_ENV=prod');
$_SERVER['APP_ENV'] = 'prod';
$_ENV['APP_ENV'] = 'prod';

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
