import { BaseEntity } from '@models/base';

export abstract class IBaseRepository<T extends BaseEntity> {
  abstract create(data: any): Promise<T>;
  abstract update(id: T['id'], data: any): Promise<T>;
  abstract updateMany(where: any, data: any): Promise<T[]>;
  abstract findAll(): Promise<T[]>;
  abstract findById(id: T['id']): Promise<T>;
  abstract findOne(where: any, query?: any): Promise<T>;
  abstract findMany(where: any, query?: any): Promise<T[]>;
  abstract deleteById(id: T['id']): Promise<T>;
  abstract deleteOne(where: any): Promise<T>;
  abstract deleteMany(where: any): Promise<T[]>;
  abstract count(where?: any): Promise<number>;
  abstract upsertMany(items: { where: any; update: any; create: any }[]): Promise<void>;
  abstract transaction(operations: any[]): Promise<any>;
}
