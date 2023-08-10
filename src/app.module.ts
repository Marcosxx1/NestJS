import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { EventsModule } from './events/events.module';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [
    //Carrega as variaveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig], //Carrega as configuraçães do orm.
      envFilePath: '.env', //podemos definir o caminho do .env
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    AuthModule,
    EventsModule,
    SchoolModule,
  ],
  controllers: [AppController],
  providers: [AppService], //tudo que é @Injectable é um provider
})
export class AppModule {}
