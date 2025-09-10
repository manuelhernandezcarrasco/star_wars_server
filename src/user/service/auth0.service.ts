import { LogInDTO, LogInResponseDTO, SignUpDTO } from '@models/user/dtos';
import { Injectable } from '@nestjs/common';
import { BadRequestError } from '@shared/errors';
import { IAuthService } from '@user/service';
import axios from 'axios';

@Injectable()
export class Auth0Service implements IAuthService {
  constructor() {}

  async loginUser(user: LogInDTO): Promise<LogInResponseDTO> {
    try {
      const response = await axios.post(`${process.env.AUTH_0_ISSUER}oauth/token`, {
        client_id: process.env.AUTH_0_LOGIN_CLIENT_ID,
        client_secret: process.env.AUTH_0_LOGIN_CLIENT_SECRET,
        username: user.email,
        password: user.password,
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email',
        audience: process.env.AUTH_0_AUDIENCE,
      });
      if (response.status !== 200) throw new BadRequestError('Failed to login user in Auth0');

      return { accessToken: response.data.access_token, idToken: response.data.id_token };
    } catch (error) {
      console.error('Error creating user in Auth0:', error);
      throw new BadRequestError('Invalid credentials');
    }
  }

  async signUpUser(user: SignUpDTO): Promise<string> {
    const managementToken = await this.getAuth0ManagementToken();

    try {
      const response = await axios.post(
        `${process.env.AUTH_0_ISSUER}api/v2/users`,
        {
          email: user.email,
          name: user.name,
          password: user.password,
          email_verified: true,
          connection: 'Username-Password-Authentication',
        },
        {
          headers: {
            Authorization: `Bearer ${managementToken}`,
          },
        },
      );
      return response.data.user_id;
    } catch (error) {
      console.error('Error creating user in Auth0:', error);
      throw new Error('Failed to create user in Auth0');
    }
  }

  private async getAuth0ManagementToken(): Promise<string> {
    try {
      const { data: tokenResponse } = await axios.post(`${process.env.AUTH_0_ISSUER}oauth/token`, {
        client_id: process.env.AUTH_0_CLIENT_ID,
        client_secret: process.env.AUTH_0_CLIENT_SECRET,
        audience: `${process.env.AUTH_0_ISSUER}api/v2/`,
        grant_type: 'client_credentials',
      });

      return tokenResponse.access_token;
    } catch (error) {
      console.error('Error fetching Auth0 management token:', error);
      throw new Error('Failed to retrieve Auth0 management token');
    }
  }
}
