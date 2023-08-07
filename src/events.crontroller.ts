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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {
    console.log();
  }

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.repository.findOne({ where: { id } });
  }

  @Post()
  async create(@Body() body: CreateEventDto) {
    return await this.repository.save(body);
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() body: UpdateEventDto) {
    const event = await this.repository.findOne({ where: { id } });
    return await this.repository.save({ ...event, ...body });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id) {
    await this.repository.delete(id);
  }
}
