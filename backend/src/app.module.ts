import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const config = ConfigModule.forRoot({
  isGlobal: true,
});

const typeOrm = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mariadb',
    host: configService.get('MYSQL_HOST'),
    port: +configService.get<number>('MYSQL_PORT'),
    username: configService.get('MYSQL_USER'),
    password: configService.get('MYSQL_PASSWORD'),
    database: configService.get('MYSQL_DB'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
  }),
  inject: [ConfigService],
});

@Module({
  imports: [typeOrm, config],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
