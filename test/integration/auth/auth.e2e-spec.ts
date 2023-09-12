import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../../src/app.module';
import { AuthContext } from './auth.context';

describe('Auth API (Integration)', () => {
  let app: INestApplication;
  let auth: AuthContext;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    auth = new AuthContext(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get my auth data', async () => {
    const result = await auth.signUp();
    expect(result.status).toBe(201);
  });

  it('should get my auth data', async () => {
    const result = await auth.signIn();
    expect(result.status).toBe(201);
  });

  // it('should get auths', async () => {
  //   const authData = {
  //     authname: 'testauth',
  //     email: 'testauth@example.com',
  //     password: 'testpass',
  //   };
  //
  //   // Create a auth with subscriptions
  //   const createdAuth = await authService.createAuth(authData);
  //   const subscription1 = await subscriptionsService.createSubscription({
  //     authId: createdAuth.id,
  //     name: 'Subscription 1',
  //   });
  //   const subscription2 = await subscriptionsService.createSubscription({
  //     authId: createdAuth.id,
  //     name: 'Subscription 2',
  //   });
  //
  //   expect(createdAuth).toBeDefined();
  //   expect(createdAuth.authname).toBe(authData.authname);
  //   expect(createdAuth.email).toBe(authData.email);
  //   expect(createdAuth.subscriptions).toHaveLength(2);
  //   expect(createdAuth.subscriptions).toContainEqual(subscription1);
  //   expect(createdAuth.subscriptions).toContainEqual(subscription2);
  // });
});
