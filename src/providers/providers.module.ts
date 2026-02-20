import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  RevenueShareTier,
  ProviderRevenuePayout,
  ProviderTierAssignment,
} from './revenue-share/entities/revenue-share-tier.entity';

import { RevenueShareService } from './revenue-share/revenue-share.service';
import { TierManagerService } from './revenue-share/tier-manager.service';
import { ProvidersController } from './providers.controller';

import { ProviderStats } from '../signals/entities/provider-stats.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RevenueShareTier,
      ProviderRevenuePayout,
      ProviderTierAssignment,
      ProviderStats,
      User,
    ]),
  ],
  controllers: [ProvidersController],
  providers: [RevenueShareService, TierManagerService],
  exports: [RevenueShareService, TierManagerService],
})
export class ProvidersModule {}
