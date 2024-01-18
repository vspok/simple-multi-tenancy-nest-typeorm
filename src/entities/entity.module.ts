// // src/entities/entities.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from 'src/user/user.entity';
// import { EntityService } from './entity.service';

// @Module({
//   imports: [TypeOrmModule.forFeature([UserEntity])],
//   providers: [EntityService],
//   exports: [EntityService], // Certifique-se de exportar o serviço se necessário
// })
// export class EntitiesModule {}
