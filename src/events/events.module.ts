import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.crontroller';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
})
// eslint-disable-next-line prettier/prettier
export class EventsModule { }
