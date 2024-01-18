// src/app.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { EntityService } from './entities/entity.service';
import { TenantId } from './ecorators/tenant.decorator';

@Controller()
export class AppController {
  constructor(private readonly entityService: EntityService) {}

  @Get('/entities')
  async getEntities(@TenantId() tenantId: string) {
    const entities = await this.entityService.find(tenantId);
    return { tenantId, entities };
  }
}
