import { BaseEntity } from '@models/base';
import { InvalidModelError } from '@shared/errors';
import { IBaseRepository } from '@shared/repository';
import { DatabaseService, Models } from '@shared/service';

export class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  constructor(
    private readonly db: DatabaseService,
    private readonly model: string,
  ) {
    if (!Models.includes(model)) throw new InvalidModelError(`Model ${model} already exists`);
  }
  async create(data: any): Promise<T> {
    return this.db[this.model].create({ data });
  }

  async update(id: T['id'], data: any): Promise<T> {
    return this.db[this.model].update({ where: { id }, data });
  }

  async updateMany(where: any, data: any): Promise<T[]> {
    return this.db[this.model].update({ where, data });
  }

  async findAll(): Promise<T[]> {
    return this.db[this.model].findMany();
  }

  async findById(id: T['id']): Promise<T> {
    return this.db[this.model].findUnique({ where: { id } });
  }

  async findOne(where: any, query?: any): Promise<T> {
    return this.db[this.model].findFirst({ where, ...query });
  }

  async findMany(where: any, query?: any): Promise<T[]> {
    return this.db[this.model].findMany({ where, ...query });
  }

  async deleteById(id: T['id']): Promise<T> {
    return this.db[this.model].delete({ where: { id } });
  }

  async deleteOne(where: any): Promise<T> {
    return this.db[this.model].delete({ where });
  }

  async deleteMany(where: any): Promise<T[]> {
    return this.db[this.model].deleteMany({ where });
  }

  async count(where?: any): Promise<number> {
    return this.db[this.model].count({ where });
  }

  async upsertMany(items: { where: any; update: any; create: any }[]): Promise<void> {
    const operations = items.map((item) => {
      return this.db[this.model].upsert({
        where: item.where,
        update: item.update,
        create: item.create,
      });
    });

    await this.transaction(operations);
  }

  async transaction(operations: any[]): Promise<any> {
    return this.db.$transaction(operations);
  }
}
