import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('events')
export class EventsController {
  @Get()
  findAll() { }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} event`;
  }

  @Post()
  create() { }

  @Patch()
  update() { }

  @Delete(':id')
  delete(@Param('id') id) { }
}
