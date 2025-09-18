# Stage 1: Builder (install deps & prepare prod cache)
FROM php:8.3-fpm AS builder

ARG DEBIAN_FRONTEND=noninteractive
WORKDIR /app

# Install system deps needed for PHP extensions
RUN apt-get update && apt-get install -y \
    libpq-dev libicu-dev zlib1g-dev g++ \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    libzip-dev unzip zip git \
 && docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install -j$(nproc) gd zip pdo pdo_pgsql intl \
 && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# Copy composer files + install vendors
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy rest of code
COPY . .

# Permissions
RUN mkdir -p var/cache var/log \
 && chown -R www-data:www-data var

# Stage 2: Runtime
FROM php:8.3-fpm
ARG DEBIAN_FRONTEND=noninteractive
WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpq-dev libicu-dev zlib1g-dev g++ \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    libzip-dev unzip zip git nginx supervisor \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd zip pdo pdo_pgsql intl \
    && rm -rf /var/lib/apt/lists/*

# Remove default Nginx config
RUN rm -rf /etc/nginx/conf.d/* /etc/nginx/sites-enabled/* /etc/nginx/sites-available/*

# Copy built app + vendor from builder
COPY --from=builder /app /app

# Copy configs
COPY ./nginx/default.conf /etc/nginx/conf.d/app.conf
COPY ./nginx/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

# Configure PHP-FPM pool
RUN { \
  echo '[www]'; \
  echo 'listen = 127.0.0.1:9000'; \
  echo 'clear_env = no'; \
  echo 'env[APP_ENV] = prod'; \
  echo 'env[APP_RUNTIME_DONTLOADENV] = 1'; \
} > /usr/local/etc/php-fpm.d/zzz-render.conf

ENV APP_RUNTIME_DONTLOADENV=1

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
