import { Movie } from '@models/movie/entities';
import { IBaseRepository } from '@shared/repository';

export abstract class IMovieRepository extends IBaseRepository<Movie> {
  abstract bulkUpsert(moviesData: any[]): Promise<void>;
}
