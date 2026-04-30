import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdsService } from './ads.service';
import { AdsQueryDto, CreateAdDto } from './ads.dto';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Get()
  findAll(@Query() query: AdsQueryDto) {
    return this.adsService.findAll(query);
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  myAds(@Request() req: any) {
    return this.adsService.myAds(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateAdDto, @Request() req: any) {
    return this.adsService.create(req.user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: any) {
    return this.adsService.delete(id, req.user.id);
  }
}
