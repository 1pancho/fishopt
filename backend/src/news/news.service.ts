import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string, q?: string) {
    const where: any = {};
    if (category) where.category = category;
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { excerpt: { contains: q, mode: 'insensitive' } },
      ];
    }
    return this.prisma.newsArticle.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true, slug: true, title: true, excerpt: true,
        category: true, imageUrl: true, author: true,
        readTime: true, publishedAt: true,
      },
    });
  }

  async findBySlug(slug: string) {
    const article = await this.prisma.newsArticle.findUnique({ where: { slug } });
    if (!article) throw new NotFoundException('Статья не найдена');
    return article;
  }
}
