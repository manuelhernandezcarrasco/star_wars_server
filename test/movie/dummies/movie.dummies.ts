import { Movie } from '@models/movie/entities';

export const mockMovie: Movie = {
  id: 'movie-123',
  title: 'A New Hope',
  openingCrawl: '...',
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  releaseDate: new Date('1977-05-25'),
  metadata: '',

  createdAt: new Date(),
  updatedAt: new Date(),
};
