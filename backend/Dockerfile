FROM php:8.3-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpq-dev \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_pgsql

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy application code
COPY . .

# Ensure a dummy .env file exists in the container
RUN touch .env

# Set composer to allow superuser
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install dependencies without any scripts
RUN composer install --no-dev --optimize-autoloader --no-interaction --ignore-platform-req=ext-gd

# PHP built-in server
CMD ["php", "-S", "0.0.0.0:8080", "-t", "public/"]