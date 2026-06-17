import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as XLSX from 'xlsx';

const CATEGORY_KEYWORDS: Array<{ keywords: string[]; category: string }> = [
  { keywords: ['горбуша'], category: 'Горбуша' },
  { keywords: ['лосось', 'кета', 'нерка', 'чавыча', 'кижуч', 'сёмга', 'семга', 'форель', 'сима'], category: 'Лосось' },
  { keywords: ['треска', 'пикша', 'навага', 'сайда'], category: 'Треска' },
  { keywords: ['краб', 'стригун', 'опилио'], category: 'Краб' },
  { keywords: ['креветка', 'креветки'], category: 'Креветка' },
  { keywords: ['минтай'], category: 'Минтай' },
  { keywords: ['икра'], category: 'Икра' },
  { keywords: ['кальмар'], category: 'Кальмар' },
  { keywords: ['сельдь', 'сельди'], category: 'Сельдь' },
  { keywords: ['осётр', 'осетр', 'стерлядь', 'белуга', 'севрюга'], category: 'Осётр' },
  { keywords: ['тунец'], category: 'Тунец' },
  { keywords: ['муксун'], category: 'Муксун' },
];

function detectCategory(name: string): string {
  const lower = name.toLowerCase();
  for (const { keywords, category } of CATEGORY_KEYWORDS) {
    if (keywords.some((kw) => lower.includes(kw))) return category;
  }
  return 'Прочее';
}

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async saveLogo(userId: string, logoUrl: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.companyId) throw new ForbiddenException('Нет привязанной компании');

    const company = await this.prisma.company.update({
      where: { id: user.companyId },
      data: { logoUrl },
    });

    return { logoUrl: company.logoUrl };
  }

  async importPrices(userId: string, filePath: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.companyId) throw new ForbiddenException('Нет привязанной компании');

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const rows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

    if (!rows.length) throw new BadRequestException('Файл пустой или неверный формат');

    // Map columns flexibly — support Russian and English headers
    const items = rows
      .map((row) => {
        const name =
          row['Наименование'] || row['Название'] || row['name'] || row['Name'] || '';
        const priceRaw =
          row['Цена'] || row['Цена, руб/кг'] || row['price'] || row['Price'] || 0;
        const categoryRaw =
          row['Категория'] || row['Вид'] || row['category'] || row['Category'] || '';
        const category = categoryRaw ? String(categoryRaw).trim() : detectCategory(String(name));
        const processingType =
          row['Обработка'] || row['processingType'] || row['Тип обработки'] || 'Мороженая';
        const minOrder =
          row['Мин. партия'] || row['Минимальный заказ'] || row['minOrder'] || null;
        const inStockRaw =
          row['Наличие'] || row['В наличии'] || row['inStock'] || 'да';
        const inStock =
          typeof inStockRaw === 'boolean'
            ? inStockRaw
            : String(inStockRaw).toLowerCase() !== 'нет' && String(inStockRaw) !== '0';

        const price = Number(String(priceRaw).replace(/[^\d.]/g, ''));
        if (!name || !price || isNaN(price)) return null;

        return {
          name: String(name).trim(),
          category: String(category).trim() || detectCategory(String(name)),
          processingType: String(processingType).trim() || 'Мороженая',
          price,
          minOrder: minOrder ? Number(minOrder) : null,
          inStock,
          currency: 'RUB',
          unit: 'kg',
        };
      })
      .filter(Boolean) as any[];

    if (!items.length) {
      throw new BadRequestException(
        'Не найдено строк с корректными данными. Убедитесь что есть колонки "Наименование" и "Цена"',
      );
    }

    // Upsert price list
    let priceList = await this.prisma.priceList.findFirst({
      where: { companyId: user.companyId },
    });
    if (!priceList) {
      priceList = await this.prisma.priceList.create({
        data: { companyId: user.companyId },
      });
    }

    await this.prisma.priceItem.deleteMany({ where: { priceListId: priceList.id } });
    await this.prisma.priceItem.createMany({
      data: items.map((item) => ({ ...item, priceListId: priceList.id })),
    });

    return {
      imported: items.length,
      message: `Импортировано ${items.length} позиций`,
    };
  }
}
