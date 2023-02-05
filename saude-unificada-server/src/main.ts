import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Saúde Unificada')
    .setDescription(
      'Esse sistema foi criado pelos alunos Pedro Martins e Sá e Pedro Henrique Souza flores, alunos de ciência da computação da Universidade Federal do Paraná.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.enableCors();
  await app.listen(appConfig.get('port'));
}

bootstrap();