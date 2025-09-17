<?php
header('Content-Type: text/plain');

echo "file_exists(/app/.env): " . (file_exists('/app/.env') ? 'YES' : 'NO') . PHP_EOL;
echo "GETENV APP_ENV: " . getenv('APP_ENV') . PHP_EOL;
echo "GETENV APP_RUNTIME_DONTLOADENV: " . getenv('APP_RUNTIME_DONTLOADENV') . PHP_EOL;
echo "ENV VARS (partial):" . PHP_EOL;
foreach (['APP_ENV','APP_RUNTIME_DONTLOADENV','APP_SECRET','DATABASE_URL'] as $k) {
    echo $k . ' => ' . (getenv($k) ?? '(null)') . PHP_EOL;
}
