import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? 'postgresql://fishopt:fishopt_secret@localhost:5432/fishopt' });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('🌱 Seeding database...');

  // Company: Дальрыбпоставка
  const company = await prisma.company.upsert({
    where: { slug: 'dalrybopostavka' },
    update: {},
    create: {
      slug: 'dalrybopostavka',
      name: 'Дальрыбпоставка',
      inn: '2543023144',
      region: 'Приморский край',
      city: 'Владивосток',
      activityTypes: ['wholesale', 'logistics'],
      categories: ['Горбуша', 'Кета', 'Минтай', 'Краб', 'Кальмар'],
      phone: '+7 (423) 222-33-44',
      email: 'info@dalrybo.ru',
      website: 'https://dalrybo.ru',
      description: 'Оптовые поставки рыбы и морепродуктов с Дальнего Востока по всей России. Работаем с 2005 года. Прямые контракты с рыбодобывающими предприятиями Приморского края и Сахалинской области.',
      isVerified: true,
    },
  });

  // Admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@dalrybo.ru' },
    update: {},
    create: {
      email: 'admin@dalrybo.ru',
      passwordHash,
      role: 'ADMIN',
      companyId: company.id,
    },
  });

  // Price list
  const priceList = await prisma.priceList.upsert({
    where: { id: 'seed-pricelist-1' },
    update: {},
    create: {
      id: 'seed-pricelist-1',
      companyId: company.id,
      items: {
        create: [
          { name: 'Горбуша б/г мороженая, 1с', category: 'Горбуша', processingType: 'Мороженая', price: 145, minOrder: 5000, inStock: true },
          { name: 'Кета потрошёная мороженая, 1с', category: 'Кета', processingType: 'Мороженая', price: 210, minOrder: 3000, inStock: true },
          { name: 'Минтай б/г мороженый', category: 'Минтай', processingType: 'Мороженая', price: 89, minOrder: 10000, inStock: true },
          { name: 'Краб камчатский варёно-мороженый', category: 'Краб', processingType: 'Варёно-мороженая', price: 2800, minOrder: 100, inStock: true },
          { name: 'Кальмар тихоокеанский мороженый', category: 'Кальмар', processingType: 'Мороженая', price: 165, minOrder: 2000, inStock: false },
        ],
      },
    },
  });

  // Ads
  await prisma.ad.upsert({
    where: { id: 'seed-ad-1' },
    update: {},
    create: {
      id: 'seed-ad-1',
      companyId: company.id,
      type: 'sell',
      title: 'Горбуша б/г мороженая 1с, 20 тонн, Приморье',
      description: 'Реализуем горбушу б/г мороженую 1 сорта. Производство Приморский край. Документы в наличии.',
      category: 'Горбуша',
      region: 'Приморский край',
      price: 145,
      quantity: 20000,
      contactName: 'Сергей',
      phone: '+7 (423) 222-33-44',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // News
  const news = [
    {
      id: 'seed-news-1',
      slug: 'losos-sezon-2026-prognoz',
      title: 'Прогноз лососёвой путины 2026: рекордный улов на Дальнем Востоке',
      excerpt: 'Росрыболовство прогнозирует улов лосося в объёме 600 тыс. тонн в 2026 году — на 15% выше прошлогоднего показателя.',
      content: 'Федеральное агентство по рыболовству опубликовало прогноз на лососёвую путину 2026 года...',
      category: 'Рынок',
      author: 'Редакция Fishopt',
      readTime: 4,
    },
    {
      id: 'seed-news-2',
      slug: 'ikra-tseny-rost-2026',
      title: 'Цены на красную икру выросли на 20% с начала года',
      excerpt: 'Оптовые цены на лососёвую икру достигли 5 200 рублей за кг в марте 2026 года.',
      content: 'Аналитики рыбного рынка фиксируют устойчивый рост цен на красную икру...',
      category: 'Цены',
      author: 'Редакция Fishopt',
      readTime: 3,
    },
  ];

  for (const article of news) {
    await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }

  console.log('✅ Seed complete');
  console.log(`   Company: ${company.name} (${company.slug})`);
  console.log(`   Login: admin@dalrybo.ru / admin123`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
