import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    //añadido para que no se envíen campos que no estén en el DTO
    //se instala con npm i class-validator class-transformer
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173',  // URL de tu frontend
    methods: 'GET,POST,PUT,PATCH,DELETE',  // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization',  // Encabezados permitidos
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
