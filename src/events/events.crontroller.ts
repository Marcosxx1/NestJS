import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendee } from './attendee.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,
    private readonly eventsService: EventsService,
  ) {
    console.log();
  }

  @Get()
  async findAll() {
    this.logger.log(`Hit the findAll endpoint`);

    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events`);

    if (events.length === 0) {
      throw new NotFoundException();
    }
    return events;
  }

  @Get('practice2')
  async practice() {
    return await this.repository
      .createQueryBuilder('e')
      .orderBy('e.id', 'DESC')
      .select(['e.id', 'e.name'])
      .getMany();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const events = await this.eventsService.getEvent(id);

    if (!events) {
      throw new NotFoundException();
    }
    return events;
  }

  @Post()
  async create(@Body(ValidationPipe) body: CreateEventDto) {
    console.log(body);
    return await this.repository.save(body);
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() body: UpdateEventDto) {
    const events = await this.repository.findOne({ where: { id } });
    if (!events) {
      throw new NotFoundException();
    }
    return await this.repository.save({ ...events, ...body });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id) {
    const events = this.repository.delete(id);
    if (!events) {
      throw new NotFoundException();
    }
    return events;
  }
}
