import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Signal,
  CopiedPosition,
  UserExpirationPreference,
  ExpirationNotification,
} from './entities';
import {
  SignalExpirationService,
  ExpirationHandlerService,
  ExpirationNotificationService,
  EXPIRATION_QUEUE,
} from './services';
import { ProcessExpirationsJob } from './jobs';
import { SignalAutoCloseController } from './signal-autoclose.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Signal,
      CopiedPosition,
      UserExpirationPreference,
      ExpirationNotification,
    ]),
    BullModule.registerQueueAsync({
      name: EXPIRATION_QUEUE,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redis.host') ?? 'localhost',
          port: configService.get<number>('redis.port') ?? 6379,
          password: configService.get<string>('redis.password'),
          db: configService.get<number>('redis.db') ?? 0,
        },
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
          removeOnComplete: 100,
          removeOnFail: 50,
        },
      }),
    }),
  ],
  controllers: [SignalAutoCloseController],
  providers: [
    SignalExpirationService,
    ExpirationHandlerService,
    ExpirationNotificationService,
    ProcessExpirationsJob,
  ],
  exports: [
    SignalExpirationService,
    ExpirationHandlerService,
    ExpirationNotificationService,
  ],
})
export class SignalsModule {}
