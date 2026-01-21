import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CopiedPosition } from './copied-position.entity';

export enum SignalStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export enum SignalType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum SignalOutcome {
  PENDING = 'PENDING',
  TARGET_HIT = 'TARGET_HIT',
  STOP_LOSS_HIT = 'STOP_LOSS_HIT',
  EXPIRED = 'EXPIRED',
  MANUALLY_CLOSED = 'MANUALLY_CLOSED',
  CANCELLED = 'CANCELLED',
}

@Entity('signals')
export class Signal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'provider_id' })
  providerId!: string;

  @Column({ name: 'base_asset' })
  baseAsset!: string;

  @Column({ name: 'counter_asset' })
  counterAsset!: string;

  @Column({ type: 'enum', enum: SignalType })
  type!: SignalType;

  @Column({ type: 'enum', enum: SignalStatus, default: SignalStatus.ACTIVE })
  status!: SignalStatus;

  @Column({ type: 'enum', enum: SignalOutcome, default: SignalOutcome.PENDING })
  outcome!: SignalOutcome;

  @Column({ name: 'entry_price', type: 'decimal', precision: 18, scale: 8 })
  entryPrice!: string;

  @Column({ name: 'target_price', type: 'decimal', precision: 18, scale: 8 })
  targetPrice!: string;

  @Column({
    name: 'stop_loss_price',
    type: 'decimal',
    precision: 18,
    scale: 8,
    nullable: true,
  })
  stopLossPrice!: string | null;

  @Column({
    name: 'current_price',
    type: 'decimal',
    precision: 18,
    scale: 8,
    nullable: true,
  })
  currentPrice!: string | null;

  @Column({
    name: 'close_price',
    type: 'decimal',
    precision: 18,
    scale: 8,
    nullable: true,
  })
  closePrice!: string | null;

  @Column({ name: 'copiers_count', type: 'int', default: 0 })
  copiersCount!: number;

  @Column({
    name: 'total_copied_volume',
    type: 'decimal',
    precision: 18,
    scale: 8,
    default: '0',
  })
  totalCopiedVolume!: string;

  @Column({ name: 'expires_at', type: 'timestamp with time zone' })
  expiresAt!: Date;

  @Column({
    name: 'grace_period_ends_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  gracePeriodEndsAt!: Date | null;

  @Column({
    name: 'closed_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  closedAt!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata!: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  @OneToMany(() => CopiedPosition, (position) => position.signal)
  copiedPositions!: CopiedPosition[];
}
