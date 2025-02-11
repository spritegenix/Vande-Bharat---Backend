import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { AuthModule } from '../src/auth.module';
import { Transport } from '@nestjs/microservices';

describe('Auth Microservice (e2e)', () => {
  let app: INestMicroservice;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 3001 },
    });

    await app.listen();
    await app.init(); // ✅ FIX: Initialize the microservice
  });

  afterAll(async () => {
    await app.close();
  });

  it('should start the microservice', async () => {
    expect(app).toBeDefined();
  });
});
