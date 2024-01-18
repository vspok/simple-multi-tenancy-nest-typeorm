// src/app.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './tenants/tenant.entity';
import { TenantsModule } from './tenants/tenants.module';
import { AppController } from './app.controller';
import { TenantMiddleware } from './middleware/tenant.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'krft123',
      database: 'main_tenancy',
      entities: [TenantEntity],
      synchronize: true,
    }),
    TenantsModule,
    
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*'); // Aplica o middleware a todas as rotas
  }
}
