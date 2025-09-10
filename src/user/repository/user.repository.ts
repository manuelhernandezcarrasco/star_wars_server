import { User } from '@models/user/entities';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared/repository';
import { IUserRepository } from '@user/repository';
import { DatabaseService } from '@shared/service';

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(db: DatabaseService) {
    super(db, 'user');
  }

  async findByAuth0Id(auth0Id: string): Promise<User | null> {
    return this.findOne({
      auth0Id,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({
      email,
    });
  }
}
