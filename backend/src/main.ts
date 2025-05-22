import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'dist'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'frontend', 'dist'));

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://countries-fullstack.onrender.com']
        : ['http://localhost:5180'],
    credentials: true,
  });

  const port = process.env.PORT || 5001;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
