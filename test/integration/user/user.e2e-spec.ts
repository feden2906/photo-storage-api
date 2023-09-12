import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../src/app.module';

describe('Users API (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should get my user data', async () => {
    return await request(app.getHttpServer()).get('/users/me').expect(401);
  });

  // it('should get users', async () => {
  //   const userData = {
  //     username: 'testuser',
  //     email: 'testuser@example.com',
  //     password: 'testpass',
  //   };
  //
  //   // Create a user with subscriptions
  //   const createdUser = await userService.createUser(userData);
  //   const subscription1 = await subscriptionsService.createSubscription({
  //     userId: createdUser.id,
  //     name: 'Subscription 1',
  //   });
  //   const subscription2 = await subscriptionsService.createSubscription({
  //     userId: createdUser.id,
  //     name: 'Subscription 2',
  //   });
  //
  //   expect(createdUser).toBeDefined();
  //   expect(createdUser.username).toBe(userData.username);
  //   expect(createdUser.email).toBe(userData.email);
  //   expect(createdUser.subscriptions).toHaveLength(2);
  //   expect(createdUser.subscriptions).toContainEqual(subscription1);
  //   expect(createdUser.subscriptions).toContainEqual(subscription2);
  // });
});
