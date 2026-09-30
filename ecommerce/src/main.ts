import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.port ?? 3005
  await app.listen(port,()=> {
    console.log(`server is running on port ${port}`);
    
  });
}
bootstrap();
