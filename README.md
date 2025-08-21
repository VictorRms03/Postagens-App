# Postagens App

## Pré-Requisitos
- Node 18+
- npm
- PHP 8.2+
- Composer
- MySQL 8
- Docker

## Subir Banco de Dados (Docker)

- Primeiramente inicie o Docker Desktop

```bash
docker compose up -d
```

## Como rodar o backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan serve --host=127.0.0.1 --port=8000
```

## Como rodar o frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Usuário de teste
Email=teste@gmail.com
Senha=123456
