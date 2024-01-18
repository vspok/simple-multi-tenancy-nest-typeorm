// src/tenants/tenants.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './tenant.entity';
import { TenantDataSourceService } from './tenant-data-source.service';
import { EntityService } from 'src/entities/entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  providers: [TenantDataSourceService,EntityService],
  exports: [TenantDataSourceService,EntityService], // Certifique-se de exportar o serviço se necessário
})
export class TenantsModule {}
