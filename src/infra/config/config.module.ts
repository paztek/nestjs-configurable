import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedisModule } from '../redis/redis.module';
import { ApiConfigService } from './domain/config.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigItemEntity } from './repos/typeorm/config-item.entity';
import { TypeormApiConfigRepository } from './repos/typeorm/typeorm.config.repository';
import { API_CONFIG_REPOSITORY_TOKEN } from './domain/config.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        RedisModule,
        DatabaseModule,
        TypeOrmModule.forFeature([ConfigItemEntity]),
    ],
    providers: [
        ApiConfigService,
        {
            provide: API_CONFIG_REPOSITORY_TOKEN,
            useClass: TypeormApiConfigRepository,
        },
    ],
    exports: [ApiConfigService],
})
export class ApiConfigModule {}
