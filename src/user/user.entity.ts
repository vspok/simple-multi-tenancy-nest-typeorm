// src/tenants/tenant.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_nome: string;
  @Column()
  email: string;
}
