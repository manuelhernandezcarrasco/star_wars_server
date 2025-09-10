import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app.module';
import { IMovieService } from '@movie/service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const movieService = app.get<IMovieService>(IMovieService);

  try {
    if (await movieService.countMovies() !== 0) return;

    console.log('Seeding movies...');

    await movieService.synchronizeMoviesData();

    console.log('Movies seeded successfully');

  } catch (error) {
    console.error('Error seeding movies:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
