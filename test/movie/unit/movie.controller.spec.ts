import { IMovieService, MovieService } from '@movie/service';
import { CreateMovieDTO, UpdateMovieDTO } from '@models/movie/dtos';
import { mockMovie, movieRepositoryMock } from '../dummies';
import { MovieController } from '@movie/controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('MovieService', () => {
  let controller: MovieController;
  let service: IMovieService;

  beforeEach(async () => {
    service = new MovieService(movieRepositoryMock);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [{ provide: IMovieService, useValue: service }],
    }).compile();

    controller = module.get<MovieController>(MovieController);
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

    const result = await controller.createMovie(movie);

    expect(result).toEqual(mockMovie);
  });

  it('should delete a movie', async () => {
    const result = await controller.deleteMovie('movie-123');

    expect(result).toBeUndefined();
  });

  it('should update a movie', async () => {
    const newMovie: UpdateMovieDTO = {
      title: 'Updated Title',
    };

    const result = await controller.updateMovie('movie-123', newMovie);

    expect(result.title).toEqual(newMovie.title);
  });

  it('should get a movie by id', async () => {
    const result = await controller.getMovieById('movie-123');

    expect(result).toEqual(mockMovie);
  });
});
