/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { Profile } from './profile.entity';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User]),
  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.AUTH_SECRET,
      signOptions: {
        expiresIn: '60m'
      }
    })
  })],
  controllers: [AuthController, UserController],
  providers: [LocalStrategy, JwtStrategy, AuthService],//tudo que é @Injectable é um provider
})
export class AuthModule { }
