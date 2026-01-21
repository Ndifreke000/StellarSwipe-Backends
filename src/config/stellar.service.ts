import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StellarConfigService {
  constructor(private configService: ConfigService) {}

  get network(): string {
<<<<<<< HEAD
    return this.configService.get('stellar.network');
  }

  get horizonUrl(): string {
    return this.configService.get('stellar.horizonUrl');
  }

  get sorobanRpcUrl(): string {
    return this.configService.get('stellar.sorobanRpcUrl');
  }

  get networkPassphrase(): string {
    return this.configService.get('stellar.networkPassphrase');
  }

  get apiTimeout(): number {
    return this.configService.get('stellar.apiTimeout');
  }

  get maxRetries(): number {
    return this.configService.get('stellar.maxRetries');
=======
    return this.configService.get<string>('stellar.network') ?? 'testnet';
  }

  get horizonUrl(): string {
    return (
      this.configService.get<string>('stellar.horizonUrl') ??
      'https://horizon-testnet.stellar.org'
    );
  }

  get sorobanRpcUrl(): string {
    return (
      this.configService.get<string>('stellar.sorobanRpcUrl') ??
      'https://soroban-testnet.stellar.org:443'
    );
  }

  get networkPassphrase(): string {
    return (
      this.configService.get<string>('stellar.networkPassphrase') ??
      'Test SDF Network ; September 2015'
    );
  }

  get apiTimeout(): number {
    return this.configService.get<number>('stellar.apiTimeout') ?? 30000;
  }

  get maxRetries(): number {
    return this.configService.get<number>('stellar.maxRetries') ?? 3;
>>>>>>> upstream/main
  }

  isTestnet(): boolean {
    return this.network === 'testnet';
  }

  isMainnet(): boolean {
    return this.network === 'mainnet';
  }
}
