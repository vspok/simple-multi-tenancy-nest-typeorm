// src/tenants/tenant-data-source.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, ForbiddenException } from '@nestjs/common';
import { DataSource, DataSourceOptions, ConnectionOptions } from 'typeorm';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TenantDataSourceService implements TypeOrmOptionsFactory, OnModuleInit, OnModuleDestroy {
  private dataSources: Map<string, DataSource> = new Map();

  constructor(@InjectRepository(TenantEntity) private readonly tenantRepository: Repository<TenantEntity>) {}

  createTypeOrmOptions(tenantId: string): Promise<DataSourceOptions> {
    const entities = [UserEntity];
    const options: DataSourceOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'krft123',
      database: `tenant_database_${tenantId}`,
      entities,
      synchronize: true,
    };
    return Promise.resolve(options);
  }

  async onModuleInit() {
    const tenants = await this.tenantRepository.find();
    await Promise.all(tenants.map(async (tenant) => await this.initializeDataSource(tenant.id.toString())));
  }

  async onModuleDestroy() {
    await this.closeDataSources();
  }

  private async initializeDataSource(tenantId: string): Promise<void> {
    if (this.dataSources.has(tenantId)) {
      return;
    }

    const options = await this.createTypeOrmOptions(tenantId);
    const dataSource = new DataSource(options); // Cast para DataSourceOptions
    await dataSource.initialize().catch((err) => {
      console.error(err);
      throw new ForbiddenException('TenantId not found');
    });
    this.dataSources.set(tenantId, dataSource);
  }


  async getDataSource(tenantId: string): Promise<DataSource> {
    let db: DataSource = this.dataSources.get(tenantId);
    if(!db) {
        await this.initializeDataSource(tenantId);
        db = this.dataSources.get(tenantId);
        if(!db) {
            throw new Error('DataSource not found');
        }
    }
    return db;
  }
  private async closeDataSources(): Promise<void> {
    await Promise.all([...this.dataSources.values()].map(async (dataSource) => await dataSource.destroy()));
  }
}
