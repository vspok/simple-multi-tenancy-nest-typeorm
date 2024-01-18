// src/middleware/tenant.middleware.ts
import { BadRequestException, ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id']; // Assuma que o cabeçalho é 'x-tenant-id'
    req['tenantId'] = tenantId; // Defina o tenantId no escopo da solicitação
    if(!tenantId) {
      throw new ForbiddenException('TenantId not found');
    }
    next();
  }
}
