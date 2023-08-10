import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
    });
  }
  async validate(payload: any) {
    return await this.userRepository.findOne({ where: { id: payload.sub } });

    /* 
    Em algumas versões do TypeORM podemos passar somente a ID, em outras precisamos passar o objeto inteiro, o código abaixo vai dar erro
    console.log(payload);
    return await this.userRepository.findOne(payload.sub);

    { username: 'marcos', sub: 1, iat: 1691685942, exp: 1691689542 }
    [Nest] 11972  - 10/08/2023, 12:59:35   ERROR [ExceptionsHandler] You must provide selection conditions in order to find a single row. */
  }
}
