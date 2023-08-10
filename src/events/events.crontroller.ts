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
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEventDto } from './input/create-event.dto';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendee } from './attendee.entity';
import { EventsService } from './events.service';
import { UpdateEventDto } from './input/update-event.dto';
import { ListEvents } from './input/list.events';
import { CurrentUser } from 'src/auth/current.user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';

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

  @Get(':id')
  async findOne(@Param('id') id) {
    const events = await this.eventsService.getEvent(id);

    if (!events) {
      throw new NotFoundException();
    }
    return events;
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  async create(
    @Body(ValidationPipe) body: CreateEventDto,
    @CurrentUser() user: User,
  ) {
    return await this.eventsService.createEvent(body, user);
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
    const events = this.eventsService.deleteEvent(id);
    if (!events) {
      throw new NotFoundException();
    }
    return events;
  }
}
