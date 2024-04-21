
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Environments } from './Environments';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(Environments.POSTGRES_HOST),
        port: configService.get(Environments.POSTGRES_PORT),
        username: configService.get(Environments.POSTGRES_USER),
        password: configService.get(Environments.POSTGRES_PASSWORD),
        database: configService.get(Environments.POSTGRES_DATABASE),
        entities: [User],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
