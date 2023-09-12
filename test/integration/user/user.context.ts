import * as request from 'supertest';
import { Response } from 'supertest';

export class UserContext {
  private token: string | null = null;
  constructor(private readonly server: Express.Application) {}

  public setToken(token: string) {
    this.token = token;
  }

  public async findManyAuctions() {
    return await request(this.server)
      .get(`/auction`)
      .set('authorization', `${this.token}`);
  }

  public async getOneAuctionById(id: string): Promise<Response> {
    return await request(this.server)
      .get(`/auction/` + id)
      .set('authorization', `${this.token}`);
  }

  public async getOneAuctionParticipantById(id: string): Promise<Response> {
    return await request(this.server)
      .get(`/auction-participant/` + id)
      .set('authorization', `${this.token}`);
  }
}
