import { Movie } from '@models/movie/entities';
import { BaseRepository } from '@shared/repository';
import { IMovieRepository } from '@movie/repository';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@shared/service';

@Injectable()
export class MovieRepository extends BaseRepository<Movie> implements IMovieRepository {
  constructor(db: DatabaseService) {
    super(db, 'movie');
  }

  async bulkUpsert(moviesData: any[]): Promise<void> {
    const upsertItems = moviesData.map((movieData: any) => {
      const props: any = movieData.properties;

      const metadata: string = JSON.stringify({
        starships: props.starships,
        vehicles: props.vehicles,
        planets: props.planets,
        characters: props.characters,
        species: props.species,
      });

      return {
        where: { id: movieData._id },
        update: {
          title: props.title,
          openingCrawl: props.opening_crawl,
          director: props.director,
          producer: props.producer,
          releaseDate: new Date(props.release_date),
          metadata,
        },
        create: {
          id: movieData._id,
          title: props.title,
          openingCrawl: props.opening_crawl,
          director: props.director,
          producer: props.producer,
          releaseDate: new Date(props.release_date),
          metadata,
        },
      };
    });

    await this.upsertMany(upsertItems);
  }
}
