import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../src/app.module';
import { UserService } from '../../../src/modules/user/services/user.service';

describe('Users API (Integration)', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<UserService>(UserService);
  });

  afterAll(async () => {
    await app.close();
  });
  it('should get my user data', () => {
    return request(app.getHttpServer()).get('/users/me').expect(401);
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
