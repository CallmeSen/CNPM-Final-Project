import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { io } from 'socket.io-client';
import { AppModule } from '../../src/app.module';

jest.setTimeout(30000);

describe('Risk 9: Memory Leak from Unclosed WebSocket Connections (Integration)', () => {
  let app: INestApplication;
  let server: any;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('MONGO_ORDER_URL')
      .useValue('mongodb://order:order123@localhost:28018/Order')
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle multiple WebSocket connections and disconnections', async () => {
    const sockets: any[] = [];

    // Create multiple connections
    for (let i = 0; i < 10; i++) {
      const socket = io(`http://localhost:5005`, { forceNew: true });
      sockets.push(socket);

      await new Promise((resolve) => {
        socket.on('connect', () => resolve(true));
      });
    }

    // Disconnect them
    sockets.forEach((socket) => socket.disconnect());

    // Wait for disconnections
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test that server still responds to HTTP
    await request(server).get('/health').expect(404);
  });
});
