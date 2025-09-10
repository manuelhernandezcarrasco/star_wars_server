import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IMovieScheduleServiceInterface } from './movie.schedule.service.interface';
import { IMovieService } from './movie.service.interface';

@Injectable()
export class MovieScheduleService implements IMovieScheduleServiceInterface {
  constructor(@Inject(IMovieService) private readonly movieService: IMovieService) {}

  @Cron('0 0 * * *')
  async handleMovieUpdates() {
    try {
      console.log('Running daily movie update task...');

      await this.movieService.synchronizeMoviesData();

      console.log('Movie update task completed successfully.');
    } catch (error) {
      console.error('Error occurred while updating movies:', error);
    }
  }
}
