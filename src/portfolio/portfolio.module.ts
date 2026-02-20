import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';

import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { AllocationAnalyzerService } from './services/allocation-analyzer.service';
import { RebalancingService } from './services/rebalancing.service';
import { CheckRebalancingJob, REBALANCING_QUEUE } from './jobs/check-rebalancing.job';

import { Trade } from '../trades/entities/trade.entity';
import { User } from '../users/entities/user.entity';
import { PriceService } from '../shared/price.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trade, User]),
    CacheModule.register(),
    // Register the rebalancing queue so the job processor has access to it
    BullModule.registerQueue({
      name: REBALANCING_QUEUE,
    }),
  ],
  controllers: [PortfolioController],
  providers: [
    // Existing
    PortfolioService,
    PriceService,
    // New rebalancing providers
    AllocationAnalyzerService,
    RebalancingService,
    CheckRebalancingJob,
  ],
  exports: [RebalancingService, AllocationAnalyzerService],
})
export class PortfolioModule {}
