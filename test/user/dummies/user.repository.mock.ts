import { IUserRepository } from '@user/repository';
import { mockUser } from './user.dummies';
import { User } from '@models/user/entities';

export const userRepositoryMock: IUserRepository = {
  findByEmail: jest.fn().mockReturnValue(mockUser),
  create: jest.fn().mockReturnValue(mockUser),

  findByAuth0Id: function (auth0Id: string): Promise<User | null> {
    throw new Error('Function not implemented.');
  },
  update: function (id: string, data: any): Promise<User> {
    throw new Error('Function not implemented.');
  },
  updateMany: function (where: any, data: any): Promise<User[]> {
    throw new Error('Function not implemented.');
  },
  findAll: function (): Promise<User[]> {
    throw new Error('Function not implemented.');
  },
  findById: function (id: string): Promise<User> {
    throw new Error('Function not implemented.');
  },
  findOne: function (where: any, query?: any): Promise<User> {
    throw new Error('Function not implemented.');
  },
  findMany: function (where: any, query?: any): Promise<User[]> {
    throw new Error('Function not implemented.');
  },
  deleteById: function (id: string): Promise<User> {
    throw new Error('Function not implemented.');
  },
  deleteOne: function (where: any): Promise<User> {
    throw new Error('Function not implemented.');
  },
  deleteMany: function (where: any): Promise<User[]> {
    throw new Error('Function not implemented.');
  },
  count: function (where?: any): Promise<number> {
    throw new Error('Function not implemented.');
  },
  upsertMany: function (items: { where: any; update: any; create: any }[]): Promise<void> {
    throw new Error('Function not implemented.');
  },
  transaction: function (operations: any[]): Promise<any> {
    throw new Error('Function not implemented.');
  },
};
