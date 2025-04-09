import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { BookService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() dto) {
    return this.bookService.create(dto);
  }

  @Get()
  findAll(@Query() q) {
    return this.bookService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto) {
    return this.bookService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
