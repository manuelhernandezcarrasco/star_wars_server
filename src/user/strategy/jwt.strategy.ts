import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { IUserRepository } from '@user/repository';
import { UnauthorizedException } from '@shared/errors';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH_0_ISSUER}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH_0_AUDIENCE,
      issuer: process.env.AUTH_0_ISSUER,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: unknown): Promise<unknown> {
    const auth0Id = (payload as any).sub;

    const user = await this.userRepository.findByAuth0Id(auth0Id);

    if (!user) {
      throw new UnauthorizedException('User not found in local database');
    }

    return { ...user };
  }
}
