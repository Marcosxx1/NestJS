import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.crontroller';
import { Event } from './event.entity';
import { Attendee } from './attendee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [EventsController],
})
// eslint-disable-next-line prettier/prettier
export class EventsModule { }
