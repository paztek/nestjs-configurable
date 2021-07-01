import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dogConfig from './dog.config';
import { DogsController } from './controllers/dogs.controller';
import { DogService } from './domain/dog.service';
import { ApiConfigModule } from '../infra/config/config.module';

@Module({
    imports: [ConfigModule.forFeature(dogConfig), ApiConfigModule],
    controllers: [DogsController],
    providers: [DogService],
})
export class DogModule {}
