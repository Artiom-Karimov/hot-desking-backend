import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SWAGGER_BEARER_NAME = 'userAuth';

export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Hot Desking Backend')
    .setDescription('This app is awesome')
    .setVersion('0.0.9')
    .addBearerAuth(undefined, SWAGGER_BEARER_NAME)
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
};
