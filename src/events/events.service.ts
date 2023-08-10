/* eslint-disable prettier/prettier */
import { DeleteResult, Repository } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { AttendeeAnswerEnum } from './attendee.entity';
import { ListEvents, WhenEventFilter } from './input/list.events';
import { CreateEventDto } from './input/create-event.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) { }

  private getEventsBaseQuery() {
    return this.eventsRepository
      .createQueryBuilder('e')
      .orderBy('e.id', 'DESC');
  }

  public getEventsWithAttendeeCountQuery() {
    return this.getEventsBaseQuery()
      .loadRelationCountAndMap(
        'e.attendeeCount', 'e.attendees',
      )
      .loadRelationCountAndMap('e.attendeeAccepted', 'e.attendees', 'attendee',
        (qb) => qb.where('attendee.answer = :answer',
          { answer: AttendeeAnswerEnum.Accepted }))
      .loadRelationCountAndMap('e.attendeeMaybe', 'e.attendees', 'attendee',
        (qb) => qb.where('attendee.answer = :answer',
          { answer: AttendeeAnswerEnum.Accepted }))

      .loadRelationCountAndMap('e.attendeeReject', 'e.attendees', 'attendee',
        (qb) => qb.where('attendee.answer = :answer',
          { answer: AttendeeAnswerEnum.Accepted }))
      ;

  }

  public async getEventsWithAttendeeCountFiltered(filter?: ListEvents) {
    let query = this.getEventsWithAttendeeCountQuery();

    if (!filter) {
      return query.getMany();
    }

    if (filter.when) {
      if (filter.when == WhenEventFilter.Today) {
        query = query.andWhere('e.when >= CURRENT_DATE AND e.when <=CURRENT_DATE + INTERVAL 1 DAY', { today: new Date() });

      }
    }
  }


  public async getEvent(id: number): Promise<Event | undefined> {
    const query = this.getEventsWithAttendeeCountQuery()
      .andWhere('e.id = :id', { id });

    this.logger.debug(query.getSql());

    return await query.getOne();
  }

  public async createEvent(input: CreateEventDto, user: User): Promise<Event> {
    return await this.eventsRepository.save({
      ...input,
      organizer: user,
      when: new Date(input.when),
    });

  }

  public async deleteEvent(id: number): Promise<DeleteResult> {
    return await this.eventsRepository
      .createQueryBuilder()
      .delete()
      .from(Event)
      .where('id = :id', { id })
      .execute()
  }

}
