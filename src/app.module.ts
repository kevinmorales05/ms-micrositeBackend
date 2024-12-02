import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DynamicUrlModule } from './dynamic-url/dynamic-url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    CardsModule,
    DynamicUrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
