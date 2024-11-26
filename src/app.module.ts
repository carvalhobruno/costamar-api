import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';
import { NeighborhoodModule } from './neighborhood/neighborhood.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'bruno',
      password: 'Postgres2022',
      database: 'costa',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PropertyModule,
    NeighborhoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
