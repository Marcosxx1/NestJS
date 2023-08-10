import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

/* provider:[LocalStrategy] 
Um provider no NestJS é uma classe anotada com @Injectable(). 
Com isso, ela pode ser injetada via construtor em quem referencia-las1. Geralmente,
 é usada para criar services, repository, helpers, etc.

*/
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    /* Quando usamos o Inject e InjectRepository DEVEMOS colocar a classe no @Module dessa forma

       imports: [TypeOrmModule.forFeature([Profile, User])],
       Assim a classe fica disponível para injeção de dependencia
       ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
     */ @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    //Quando usamos 'extends' em uma classe que tem seu próprio construtor
    //precisamos usar o super()
    super();
  }

  public async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`User ${username} not found`);
      throw new UnauthorizedException();
    }

    if (password !== user.password) {
      this.logger.debug(`Invalid password for user ${username}`);
      console.log(user);
      throw new UnauthorizedException();
    }
    return user;
  }
}
