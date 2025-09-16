# Stage 1: build PHP app
FROM php:8.3-fpm AS build

# Install dependencies
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpq-dev \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_pgsql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

ENV COMPOSER_ALLOW_SUPERUSER=1

# Install PHP dependencies without dev packages
RUN composer install --no-dev --optimize-autoloader --no-interaction --ignore-platform-req=ext-gd

# Pre-warm Symfony cache for prod
RUN php bin/console cache:clear --env=prod
RUN php bin/console cache:warmup --env=prod

# Stage 2: runtime
FROM php:8.3-fpm

WORKDIR /app

# Copy built app from build stage
COPY --from=build /app /app

# Ensure .env exists (Render provides env vars)
RUN touch .env

# Expose PHP-FPM socket
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
