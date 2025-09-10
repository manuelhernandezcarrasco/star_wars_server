import { MovieService } from '@movie/service';
import { CreateMovieDTO, UpdateMovieDTO } from '@models/movie/dtos';
import { mockMovie, movieRepositoryMock } from '../dummies';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    service = new MovieService(movieRepositoryMock);
  });

  it('should create a movie', async () => {
    const movie: CreateMovieDTO = {
      title: 'A New Hope',
      openingCrawl: '...',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      releaseDate: new Date('1977-05-25'),
      metadata: '',
    };

    const result = await service.createMovie(movie);

    expect(result).toEqual(mockMovie);
  });

  it('should delete a movie', async () => {
    const result = await service.deleteMovie('movie-123');

    expect(result).toEqual(mockMovie);
  });

  it('should update a movie', async () => {
    const newMovie: UpdateMovieDTO = {
      title: 'Updated Title',
    };

    const result = await service.updateMovie('movie-123', newMovie);

    expect(result.title).toEqual(newMovie.title);
  });

  it('should get a movie by id', async () => {
    const result = await service.getMovieById('movie-123');

    expect(result).toEqual(mockMovie);
  });
});
