import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // -- Option A: Open to any origin (quick fix) --
  // app.enableCors();

  // -- Option B: Restrict to specific origin + methods (safer) --
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Your React dev server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,           // If you need cookies/auth
  };
  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
