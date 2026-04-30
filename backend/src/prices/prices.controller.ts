import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PricesService } from './prices.service';
import { CreatePriceItemDto, PriceQueryDto } from './prices.dto';

@Controller('prices')
export class PricesController {
  constructor(private pricesService: PricesService) {}

  @Get()
  findAll(@Query() query: PriceQueryDto) {
    return this.pricesService.findAll(query);
  }

  @Get('company/:slug')
  getByCompany(@Param('slug') slug: string) {
    return this.pricesService.getByCompanySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('my')
  upsertMyItems(@Body() items: CreatePriceItemDto[], @Request() req: any) {
    return this.pricesService.upsertItems(req.user.id, items);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('items/:id')
  deleteItem(@Param('id') id: string, @Request() req: any) {
    return this.pricesService.deleteItem(id, req.user.id);
  }
}
