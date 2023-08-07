import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';

@Controller('events')
export class EventsController {
  @Get()
  findAll() {
    return [
      {
        id: 1,
        name: 'Event 1',
      },
      {
        id: 2,
        name: 'Event 2',
      },
    ];
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} event`;
  }

  @Post()
  create(@Body() body: CreateEventDto) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() body: UpdateEventDto) {
    return body;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id) { }
}
