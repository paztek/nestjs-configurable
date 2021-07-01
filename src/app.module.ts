import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';

@Module({
    imports: [ConfigModule.forRoot(), CatModule, DogModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
