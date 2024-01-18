// src/entities/entity.service.ts
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TenantDataSourceService } from 'src/tenants/tenant-data-source.service';
import { UserEntity } from 'src/user/user.entity';
import { EntityManager, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class EntityService {
  constructor(
    private tenantDataSourceService: TenantDataSourceService
  ) {

  }

  async find(tenantId: string): Promise<any[]> {
    // @InjectEntityManager() private readonly entityManager: EntityManager
    // UserEntity.useDataSource(await this.tenantDataSourceService.getDataSource(tenantId));
    let user = await this.getRepo(UserEntity, tenantId);
    return user.find();
  } 

  async getRepo<TEntity>(entityRepository: EntityTarget<TEntity>, tenantId: string): Promise<Repository<TEntity>> {
    const repo: Repository<TEntity> = (await this.tenantDataSourceService.getDataSource(tenantId)).getRepository(entityRepository);
    return repo;
  }
}
