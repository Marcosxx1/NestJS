/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.strategy';
import { Profile } from './profile.entity';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [],
  providers: [LocalStrategy],
})
export class AuthModule { }
