import { NestFactory } from '@nestjs/core';
import { RootModule } from '@di/root.module';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

(async (): Promise<void> => {
  const app = await NestFactory.create(RootModule);
  app.use(compression());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3000);
})();
