import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { UconnectServiceConstant } from "./constants/uconnectConstant";
import * as basicAuth from "express-basic-auth";
import config from "./swagger/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix("/apis");
  const document = SwaggerModule.createDocument(app, config);

  app.use(
    ["/swagger"],
    basicAuth({
      challenge: true,
      users: {
        admin: "        ",
      },
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      filter: true,
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          scheme: "bearer",
          in: "header",
        },
      },
      security: [{ bearerAuth: [] }],
    },
    customCss:
      ".swagger-ui .topbar { background-color: #7f0101db } img[alt='Swagger UI'] {display: none;}",
  });

  await app.listen(UconnectServiceConstant.PORT);
}
bootstrap();
