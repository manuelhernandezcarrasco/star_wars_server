import { User } from '@models/user/entities';
import { IBaseRepository } from '@shared/repository';

export abstract class IUserRepository extends IBaseRepository<User> {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByAuth0Id(auth0Id: string): Promise<User | null>;
}
