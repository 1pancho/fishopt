#!/bin/bash
# Скрипт первоначальной настройки VPS (Ubuntu 22.04)
# Запускать один раз от root

set -e

echo "=== Fishopt VPS Setup ==="

# ── Node.js 20 ────────────────────────────────────────────────────────────────
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# ── PM2 ───────────────────────────────────────────────────────────────────────
npm install -g pm2
pm2 startup systemd -u www-data --hp /var/www

# ── Docker (для PostgreSQL) ───────────────────────────────────────────────────
curl -fsSL https://get.docker.com | bash
systemctl enable docker

# ── Nginx ─────────────────────────────────────────────────────────────────────
apt-get install -y nginx certbot python3-certbot-nginx

# ── Директории ────────────────────────────────────────────────────────────────
mkdir -p /var/www/fishopt
mkdir -p /var/log/fishopt
chown -R www-data:www-data /var/www/fishopt /var/log/fishopt

# ── Клонирование репозитория ──────────────────────────────────────────────────
# Замените YOUR_GITHUB_REPO на ваш
# git clone https://github.com/YOUR_ORG/fishopt.git /var/www/fishopt

echo ""
echo "=== Следующие шаги ==="
echo "1. git clone <repo> /var/www/fishopt"
echo "2. cd /var/www/fishopt && cp deploy/.env.production backend/.env"
echo "3. Отредактируйте backend/.env (DATABASE_URL, JWT_SECRET)"
echo "4. docker compose up -d  # PostgreSQL"
echo "5. cd backend && npx prisma migrate deploy"
echo "6. cd backend && node --experimental-vm-modules node_modules/.bin/ts-node --transpileOnly prisma/seed.ts"
echo "7. cp deploy/nginx.conf /etc/nginx/sites-available/fishopt.pro"
echo "8. ln -s /etc/nginx/sites-available/fishopt.pro /etc/nginx/sites-enabled/"
echo "9. certbot --nginx -d fishopt.pro -d www.fishopt.pro -d api.fishopt.pro"
echo "10. pm2 start ecosystem.config.js"
echo "11. pm2 save"
