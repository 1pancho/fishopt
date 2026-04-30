import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyQueryDto, UpdateCompanyDto } from './companies.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: CompanyQueryDto) {
    const { q, region, activity, category, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (region) where.region = region;
    if (activity) where.activityTypes = { has: activity };
    if (category) where.categories = { has: category };
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.company.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { priceLists: { include: { items: true } } },
      }),
      this.prisma.company.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findBySlug(slug: string) {
    const company = await this.prisma.company.findUnique({
      where: { slug },
      include: {
        priceLists: { include: { items: true }, orderBy: { updatedAt: 'desc' }, take: 1 },
        ads: { where: { expiresAt: { gte: new Date() } }, orderBy: { publishedAt: 'desc' } },
      },
    });
    if (!company) throw new NotFoundException('Компания не найдена');
    return company;
  }

  async update(companyId: string, userId: string, dto: UpdateCompanyDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user?.companyId !== companyId && user?.role !== 'ADMIN') {
      throw new ForbiddenException();
    }
    return this.prisma.company.update({ where: { id: companyId }, data: dto });
  }
}
