# Stage 1: Builder (install deps & prepare prod cache)
FROM php:8.3-fpm AS builder

# avoid interactive prompts
ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# Install system deps needed for PHP extensions + unzip/git
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpq-dev \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Install Composer (copy from official composer image)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Allow composer as root (we're in Docker)
ENV COMPOSER_ALLOW_SUPERUSER=1

# Copy only composer files first for caching
COPY composer.json composer.lock ./

# Install PHP deps but DO NOT run composer scripts (avoid symfony-cmd)
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Now copy the rest of the code
COPY . .

# Set permissions for cache/logs
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var

# Stage 2: Runtime image
FROM php:8.3-fpm

WORKDIR /app

# Install minimal runtime packages if needed (we already built vendor)
RUN apt-get update && apt-get install -y \
    nginx supervisor \
    && rm -rf /var/lib/apt/lists/*

# Copy built app + vendor from builder
COPY --from=builder /app /app

# Copy nginx config and supervisor config if you use them
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose port Render / hosting expects
EXPOSE 8080

# Use supervisord to run both php-fpm and nginx
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
