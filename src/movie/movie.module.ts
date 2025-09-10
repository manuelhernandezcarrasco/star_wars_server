import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SharedModule } from '@shared/shared.module';
import { IMovieScheduleServiceInterface, IMovieService, MovieScheduleService, MovieService } from '@movie/service';
import { MovieController } from '@movie/controller';
import { IMovieRepository, MovieRepository } from '@movie/repository';

const movieServiceProvider = {
  provide: IMovieService,
  useClass: MovieService,
};

const movieRepositoryProvider = {
  provide: IMovieRepository,
  useClass: MovieRepository,
};

const movieScheduleServiceProvider = {
  provide: IMovieScheduleServiceInterface,
  useClass: MovieScheduleService,
};

@Module({
  imports: [SharedModule, ScheduleModule.forRoot()],
  controllers: [MovieController],
  providers: [movieServiceProvider, movieRepositoryProvider, movieScheduleServiceProvider],
})
export class MovieModule {}
