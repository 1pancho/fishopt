import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PriceQueryDto, CreatePriceItemDto } from './prices.dto';

@Injectable()
export class PricesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: PriceQueryDto) {
    const { category, processingType, q, inStock, minPrice, maxPrice } = query;

    const itemWhere: any = {};
    if (category) itemWhere.category = { contains: category, mode: 'insensitive' };
    if (processingType) itemWhere.processingType = { contains: processingType, mode: 'insensitive' };
    if (inStock !== undefined) itemWhere.inStock = inStock;
    if (minPrice !== undefined || maxPrice !== undefined) {
      itemWhere.price = {};
      if (minPrice !== undefined) itemWhere.price.gte = minPrice;
      if (maxPrice !== undefined) itemWhere.price.lte = maxPrice;
    }
    if (q) itemWhere.name = { contains: q, mode: 'insensitive' };

    const priceLists = await this.prisma.priceList.findMany({
      where: { items: { some: itemWhere } },
      include: {
        company: { select: { slug: true, name: true, region: true } },
        items: { where: itemWhere, orderBy: { price: 'asc' } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Flatten to items with company info
    const items = priceLists.flatMap((pl) =>
      pl.items.map((item) => ({
        ...item,
        companySlug: pl.company.slug,
        companyName: pl.company.name,
        region: pl.company.region,
        updatedAt: pl.updatedAt,
      })),
    );

    return items;
  }

  async getByCompanySlug(slug: string) {
    const company = await this.prisma.company.findUnique({ where: { slug } });
    if (!company) throw new NotFoundException('Компания не найдена');

    return this.prisma.priceList.findFirst({
      where: { companyId: company.id },
      include: { items: { orderBy: { category: 'asc' } } },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async upsertItems(userId: string, items: CreatePriceItemDto[]) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.companyId) throw new ForbiddenException('Нет привязанной компании');

    let priceList = await this.prisma.priceList.findFirst({
      where: { companyId: user.companyId },
    });

    if (!priceList) {
      priceList = await this.prisma.priceList.create({
        data: { companyId: user.companyId },
      });
    }

    // Replace all items
    await this.prisma.priceItem.deleteMany({ where: { priceListId: priceList.id } });
    await this.prisma.priceItem.createMany({
      data: items.map((item) => ({ ...item, priceListId: priceList.id })),
    });

    return this.prisma.priceList.findUnique({
      where: { id: priceList.id },
      include: { items: true },
    });
  }

  async deleteItem(itemId: string, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const item = await this.prisma.priceItem.findUnique({
      where: { id: itemId },
      include: { priceList: true },
    });
    if (!item) throw new NotFoundException();
    if (item.priceList.companyId !== user?.companyId && user?.role !== 'ADMIN') {
      throw new ForbiddenException();
    }
    return this.prisma.priceItem.delete({ where: { id: itemId } });
  }
}
