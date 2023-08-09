import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Attendee } from './attendee.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;

  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    eager: true,
  })
  attendees: Attendee[];
  attendeeCount?: number;
  attendeeRejected?: number;
  attendeeMaybe?: number;
}
