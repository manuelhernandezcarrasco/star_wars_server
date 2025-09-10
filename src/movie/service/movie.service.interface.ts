import { CreateMovieDTO, GetMovieResponseDTO, UpdateMovieDTO } from '@models/movie/dtos';
import { Movie } from '@models/movie/entities';

export abstract class IMovieService {
  abstract getMovieById(id: string): Promise<Movie>;
  abstract deleteMovie(id: string): Promise<Movie>;
  abstract updateMovie(id: string, data: UpdateMovieDTO): Promise<Movie>;
  abstract getAllMovies(): Promise<GetMovieResponseDTO[]>;
  abstract createMovie(movie: CreateMovieDTO): Promise<Movie>;
  abstract countMovies(): Promise<number>;
  abstract synchronizeMoviesData(): Promise<void>;
}
