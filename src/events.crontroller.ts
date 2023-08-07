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
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  private events: Event[] = [];

  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    const event = this.events.find((event) => event.id === +id);
    return event;
  }

  @Post()
  create(@Body() body: CreateEventDto) {
    const newEvent = {
      ...body,
      when: new Date(body.when),
      id: this.events.length + 1,
      name: body.name.toUpperCase(),
      description: body.description.toUpperCase(),
    };
    this.events.push(newEvent);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() body: UpdateEventDto) {
    const index = this.events.indexOf(
      this.events.find((event) => event.id === +id),
    );

    this.events[index] = {
      ...this.events[index],
      ...body,
      when: body.when ? new Date(body.when) : this.events[index].when,
    };
    return this.events[index];
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id) {
    this.events.findIndex((event) => event.id === +id);
    this.events.splice(id - 1, 1);
  }
}
