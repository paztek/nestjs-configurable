import { NestFactory } from '@nestjs/core';
import 'source-map-support/register';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const port = parseInt(process.env.PORT, 10);
    await app.listen(port);
}
bootstrap();
