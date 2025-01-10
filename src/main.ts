// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import express from 'express';

// const server = express();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
//   app.enableCors({
//     origin: [
//       'http://localhost:3000',
//       'https://handi-eco.vn',
//       'https://api.handi-eco.vn',
//     ],
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   });
//   await app.init();
// }
// bootstrap();

// export default server;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://handi-eco.vn',
      'https://api.handi-eco.vn',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
