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

  // ── Additional companies ──────────────────────────────────────────────────
  const additionalCompanies = [
    {
      slug: 'murman-fish',
      name: 'Мурман-Фиш',
      inn: '5190123456',
      region: 'Мурманская область',
      city: 'Мурманск',
      activityTypes: ['wholesale', 'processing'],
      categories: ['Треска', 'Палтус', 'Пикша', 'Сельдь'],
      phone: '+7 (8152) 45-67-89',
      email: 'sales@murmanfish.ru',
      description: 'Треска, пикша, палтус — свежемороженая рыба Баренцева моря. Собственный рыболовный флот. Доставка рефрижераторами по всей России.',
      isVerified: true,
      priceItems: [
        { name: 'Треска атлантическая б/г мороженая', category: 'Треска', processingType: 'Мороженая', price: 198, minOrder: 3000, inStock: true },
        { name: 'Пикша мороженая, 1с', category: 'Пикша', processingType: 'Мороженая', price: 175, minOrder: 2000, inStock: true },
        { name: 'Палтус чёрный мороженый', category: 'Палтус', processingType: 'Мороженая', price: 450, minOrder: 500, inStock: true },
        { name: 'Сельдь атлантическая с/с', category: 'Сельдь', processingType: 'Солёная', price: 120, minOrder: 5000, inStock: true },
        { name: 'Треска солёная, тушка', category: 'Треска', processingType: 'Солёная', price: 230, minOrder: 1000, inStock: false },
      ],
    },
    {
      slug: 'sakhalin-seafood',
      name: 'Сахалин Сифуд',
      inn: '6501234567',
      region: 'Сахалинская область',
      city: 'Южно-Сахалинск',
      activityTypes: ['wholesale', 'aquaculture'],
      categories: ['Краб', 'Икра', 'Гребешок', 'Горбуша'],
      phone: '+7 (4242) 33-22-11',
      email: 'info@sakhalinseafood.ru',
      description: 'Морепродукты высшего качества с Сахалина: краб, морской гребешок, икра. Прямые поставки с добывающих предприятий. Экспорт и внутренний рынок.',
      isVerified: true,
      priceItems: [
        { name: 'Краб камчатский с/м, сегменты', category: 'Краб', processingType: 'Варёно-мороженая', price: 3200, minOrder: 100, inStock: true },
        { name: 'Краб синий мороженый, целый', category: 'Краб', processingType: 'Мороженая', price: 1800, minOrder: 200, inStock: true },
        { name: 'Икра горбуши зернистая, 1кг', category: 'Икра', processingType: 'Солёная', price: 4800, minOrder: 50, inStock: true },
        { name: 'Гребешок морской мороженый', category: 'Гребешок', processingType: 'Мороженая', price: 890, minOrder: 300, inStock: true },
        { name: 'Горбуша мороженая, 1с', category: 'Горбуша', processingType: 'Мороженая', price: 138, minOrder: 5000, inStock: false },
      ],
    },
    {
      slug: 'kamchatka-premium',
      name: 'Камчатка Премиум',
      inn: '4100234567',
      region: 'Камчатский край',
      city: 'Петропавловск-Камчатский',
      activityTypes: ['fishing', 'wholesale'],
      categories: ['Лосось', 'Нерка', 'Кижуч', 'Икра'],
      phone: '+7 (4152) 55-44-33',
      email: 'premium@kamchatka-fish.ru',
      description: 'Нерка, кижуч, чавыча камчатского происхождения. Сертифицированная продукция MSC. Охлаждённая и мороженая рыба. Прямые контракты от 1 тонны.',
      isVerified: true,
      priceItems: [
        { name: 'Нерка потрошёная мороженая, 1с', category: 'Нерка', processingType: 'Мороженая', price: 420, minOrder: 1000, inStock: true },
        { name: 'Кижуч мороженый, 1с', category: 'Кижуч', processingType: 'Мороженая', price: 380, minOrder: 500, inStock: true },
        { name: 'Чавыча мороженая, 1с', category: 'Чавыча', processingType: 'Мороженая', price: 650, minOrder: 300, inStock: true },
        { name: 'Икра нерки зернистая', category: 'Икра', processingType: 'Солёная', price: 5500, minOrder: 20, inStock: true },
        { name: 'Лосось (горбуша/кета) ПСГ', category: 'Лосось', processingType: 'Мороженая', price: 160, minOrder: 3000, inStock: false },
      ],
    },
    {
      slug: 'arctic-fish-spb',
      name: 'Арктик Фиш',
      inn: '7800345678',
      region: 'Санкт-Петербург',
      city: 'Санкт-Петербург',
      activityTypes: ['wholesale'],
      categories: ['Лосось', 'Форель', 'Сёмга', 'Палтус'],
      phone: '+7 (812) 333-44-55',
      email: 'order@arcticfish.spb.ru',
      description: 'Сёмга атлантическая, форель радужная, палтус. Норвежские и российские поставщики. Доставка в Москву и регионы. Охлаждённая рыба в наличии.',
      isVerified: true,
      priceItems: [
        { name: 'Сёмга атлантическая охл., 4-6кг', category: 'Сёмга', processingType: 'Охлаждённая', price: 780, minOrder: 200, inStock: true },
        { name: 'Форель радужная охл., 2-4кг', category: 'Форель', processingType: 'Охлаждённая', price: 520, minOrder: 200, inStock: true },
        { name: 'Сёмга мороженая, филе', category: 'Сёмга', processingType: 'Мороженая', price: 950, minOrder: 100, inStock: true },
        { name: 'Палтус белокорый мороженый', category: 'Палтус', processingType: 'Мороженая', price: 580, minOrder: 200, inStock: true },
        { name: 'Форель мороженая, тушка', category: 'Форель', processingType: 'Мороженая', price: 460, minOrder: 500, inStock: true },
      ],
    },
    {
      slug: 'ikra-premium-vlad',
      name: 'Икра Премиум',
      inn: '2543045678',
      region: 'Приморский край',
      city: 'Владивосток',
      activityTypes: ['processing', 'wholesale'],
      categories: ['Икра', 'Горбуша', 'Кета'],
      phone: '+7 (423) 333-55-77',
      email: 'ikra@premium-vlad.ru',
      description: 'Красная и чёрная икра оптом. Икра лосося, форели, осетровых. Собственное производство, стандарты ХАССП. Работаем с HoReCa и сетями.',
      isVerified: true,
      priceItems: [
        { name: 'Икра горбуши зернистая, бочковая', category: 'Икра', processingType: 'Солёная', price: 4500, minOrder: 100, inStock: true },
        { name: 'Икра кеты зернистая, 1с', category: 'Икра', processingType: 'Солёная', price: 5200, minOrder: 50, inStock: true },
        { name: 'Икра форели зернистая', category: 'Икра', processingType: 'Солёная', price: 3800, minOrder: 100, inStock: true },
        { name: 'Горбуша мороженая б/г, 1с', category: 'Горбуша', processingType: 'Мороженая', price: 142, minOrder: 5000, inStock: true },
        { name: 'Кета мороженая п/п', category: 'Кета', processingType: 'Мороженая', price: 195, minOrder: 2000, inStock: false },
      ],
    },
  ];

  for (const co of additionalCompanies) {
    const { priceItems, ...companyData } = co;
    const created = await prisma.company.upsert({
      where: { slug: co.slug },
      update: {},
      create: companyData,
    });

    const plId = `seed-pl-${co.slug}`;
    const existing = await prisma.priceList.findUnique({ where: { id: plId } });
    if (!existing) {
      await prisma.priceList.create({
        data: {
          id: plId,
          companyId: created.id,
          items: { create: priceItems },
        },
      });
    }
  }

  // ── Additional ads ─────────────────────────────────────────────────────────
  const additionalAds = [
    {
      id: 'seed-ad-2',
      slug: 'murman-fish',
      type: 'sell' as const,
      title: 'Треска атлантическая б/г мороженая, 50 тонн, Мурманск',
      description: 'Реализуем тресковую рыбу собственного вылова. Документы, ВСД. Самовывоз или доставка.',
      category: 'Треска',
      region: 'Мурманская область',
      price: 198,
      quantity: 50000,
    },
    {
      id: 'seed-ad-3',
      slug: 'sakhalin-seafood',
      type: 'sell' as const,
      title: 'Краб камчатский варёно-мороженый, сегменты, партия 2т',
      description: 'Краб камчатский с/м высшего сорта. Сертификаты MSC. Упаковка 10-12 кг.',
      category: 'Краб',
      region: 'Сахалинская область',
      price: 3200,
      quantity: 2000,
    },
    {
      id: 'seed-ad-4',
      slug: 'dalrybopostavka',
      type: 'buy' as const,
      title: 'Куплю минтай мороженый, от 20 тонн, Дальний Восток',
      description: 'Закупаем минтай б/г мороженый 1с на постоянной основе. Оплата по факту, самовывоз.',
      category: 'Минтай',
      region: 'Приморский край',
      price: 88,
      quantity: 20000,
    },
    {
      id: 'seed-ad-5',
      slug: 'kamchatka-premium',
      type: 'sell' as const,
      title: 'Нерка мороженая 1с, Камчатка, 5 тонн',
      description: 'Нерка потрошёная мороженая камчатского происхождения. Сертификат MSC. Партия от 1 тонны.',
      category: 'Нерка',
      region: 'Камчатский край',
      price: 420,
      quantity: 5000,
    },
  ];

  for (const ad of additionalAds) {
    const { slug, ...adData } = ad;
    const adCompany = await prisma.company.findUnique({ where: { slug } });
    if (!adCompany) continue;
    await prisma.ad.upsert({
      where: { id: ad.id },
      update: {},
      create: {
        ...adData,
        companyId: adCompany.id,
        contactName: 'Менеджер',
        phone: adCompany.phone ?? '',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

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
