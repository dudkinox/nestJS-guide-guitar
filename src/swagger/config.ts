import { DocumentBuilder } from "@nestjs/swagger";

const config = new DocumentBuilder()
  .setTitle("Uconnect service")
  .setDescription("API manage Uconnect")
  .setVersion("1.1")
  .addBearerAuth()
  .build();
export default config;
