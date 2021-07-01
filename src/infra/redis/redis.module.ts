import { Module } from '@nestjs/common';
import { RedisModule as BaseRedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigType } from '@nestjs/config';
import redisConfig from './redis.config';

@Module({
    imports: [
        BaseRedisModule.forRootAsync({
            imports: [ConfigModule.forFeature(redisConfig)],
            useFactory: (config: ConfigType<typeof redisConfig>) => {
                return { url: config.uri };
            },
            inject: [redisConfig.KEY],
        }),
    ],
    exports: [BaseRedisModule],
})
export class RedisModule {}
