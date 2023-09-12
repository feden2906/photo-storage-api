import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Response } from 'supertest';

export class AuthContext {
  private accessToken: string | null = null;
  constructor(private readonly server: INestApplication) {}

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  private user = {
    firstName: 'Maksym',
    lastName: 'Fedenko',
    email: 'feden@gmail.com',
    password: 'qweQWE123',
  };

  public async signUp(): Promise<Response> {
    const resp = await request(this.server)
      .post(`/auth/sign-up`)
      .send(this.user);
    this.setAccessToken(resp.body.token.accessToken);
    return resp;
  }

  public async signIn(): Promise<Response> {
    const resp = await request(this.server)
      .post(`/auth/sign-in`)
      .send(this.user);
    this.setAccessToken(resp.body.token.accessToken);
    return resp;
  }
}
