import { MovieModule } from '@movie/movie.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule, MovieModule],
})
export class AppModule {}
