import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Autochek Vehicle Valuation and Financing API')
    .setDescription(
      'API for vehicle data ingestion, valuation, and loan processing',
    )
    .setVersion('1.0')
    .addTag('vehicles')
    .addTag('loans')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
