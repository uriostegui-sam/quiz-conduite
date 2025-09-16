# Stage 1: Builder
FROM php:8.3-fpm AS builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpq-dev \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy only composer files first
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copy app source
COPY . .

# Set permissions for cache/logs
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var

# Clear Symfony cache for prod
RUN php bin/console cache:clear --env=prod

# Stage 2: Production image
FROM php:8.3-fpm

WORKDIR /app

# Install Nginx and Supervisor
RUN apt-get update && apt-get install -y \
    nginx supervisor \
    && rm -rf /var/lib/apt/lists/*

# Copy built app
COPY --from=builder /app /app

# Copy Nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Supervisor config to run both services
RUN mkdir -p /etc/supervisor/conf.d
COPY ./nginx/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose Render port
EXPOSE 8080

# Run Supervisor (which manages PHP-FPM and Nginx)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
