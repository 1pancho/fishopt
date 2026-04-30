# Fishopt Backend API

NestJS + PostgreSQL + Prisma 7

## Запуск

```bash
# 1. Поднять PostgreSQL
cd ..
docker compose up -d

# 2. Настроить .env (уже создан с дефолтными значениями)
# DATABASE_URL, JWT_SECRET

# 3. Применить миграции
npx prisma migrate deploy

# 4. Загрузить тестовые данные
DATABASE_URL=... node --experimental-vm-modules node_modules/.bin/ts-node --transpileOnly prisma/seed.ts

# 5. Запустить в dev режиме
npm run start:dev

# 6. Или сборка + prod
npm run build && npm run start:prod
```

## API эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| POST | /api/auth/register | Регистрация компании |
| POST | /api/auth/login | Вход |
| GET | /api/auth/me | Текущий пользователь (JWT) |
| GET | /api/companies | Список компаний (фильтры: q, region, activity, category) |
| GET | /api/companies/:slug | Профиль компании |
| PATCH | /api/companies/:id | Обновить компанию (JWT) |
| GET | /api/prices | Все прайс-листы (фильтры: category, processingType, q, inStock) |
| GET | /api/prices/company/:slug | Прайс конкретной компании |
| POST | /api/prices/my | Сохранить позиции прайса (JWT) |
| DELETE | /api/prices/items/:id | Удалить позицию (JWT) |
| GET | /api/ads | Объявления (фильтры: type, category, region, q) |
| GET | /api/ads/my | Мои объявления (JWT) |
| POST | /api/ads | Создать объявление (JWT) |
| DELETE | /api/ads/:id | Удалить объявление (JWT) |
| GET | /api/news | Новости (фильтры: category, q) |
| GET | /api/news/:slug | Статья |

## Тестовый аккаунт

- Email: `admin@dalrybo.ru`
- Password: `admin123`
