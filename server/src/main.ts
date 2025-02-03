import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // ✅ Corrected line

  // ✅ Enable CORS for the frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Replace * with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  console.log('🚀 Server starting...');
  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
