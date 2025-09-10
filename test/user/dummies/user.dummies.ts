import { User } from '@models/user/entities';

export const mockUser: User = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'test',
  auth0Id: 'auth0|123',

  createdAt: new Date(),
  updatedAt: new Date(),
};
