import { Movie } from '@models/movie/entities';
import { IMovieRepository } from '@movie/repository';
import { mockMovie } from './movie.dummies';

export const movieRepositoryMock: IMovieRepository = {
  bulkUpsert: function (moviesData: any[]): Promise<void> {
    throw new Error('Function not implemented.');
  },
  create: jest.fn().mockReturnValue(mockMovie),
  update: jest.fn().mockResolvedValue({ ...mockMovie, title: 'Updated Title' }),
  updateMany: function (where: any, data: any): Promise<Movie[]> {
    throw new Error('Function not implemented.');
  },
  findAll: function (): Promise<Movie[]> {
    throw new Error('Function not implemented.');
  },
  findById: jest.fn().mockReturnValue(mockMovie),
  findOne: jest.fn().mockReturnValue(mockMovie),
  findMany: function (where: any, query?: any): Promise<Movie[]> {
    throw new Error('Function not implemented.');
  },
  deleteById: jest.fn().mockReturnValue(mockMovie),
  deleteOne: jest.fn().mockReturnValue(mockMovie),
  deleteMany: function (where: any): Promise<Movie[]> {
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
