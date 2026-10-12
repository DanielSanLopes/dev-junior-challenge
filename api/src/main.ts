import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.PROD=='1'?process.env.CORS_ORIGIN:process.env.LOCAL_CORS_ORIGIN,
    methods:['GET', 'POST']
  })

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
