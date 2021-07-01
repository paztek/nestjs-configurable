import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { Observable } from 'rxjs';

import {
    API_CONFIG_REPOSITORY_TOKEN,
    ApiConfigRepository,
} from './config.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService implements OnModuleInit {
    private readonly logger = new Logger(ApiConfigService.name);

    private subscriber: Redis;
    private publisher: Redis;

    constructor(
        private readonly redis: RedisService,
        @Inject(API_CONFIG_REPOSITORY_TOKEN)
        private readonly repository: ApiConfigRepository,
        private readonly configService: ConfigService,
    ) {}

    async onModuleInit() {
        this.subscriber = await this.redis.getClient();
        this.publisher = this.subscriber.duplicate();
    }

    /**
     * Return an observable of a config value. It:
     * 1. emits the value from the DB as first value if it exists otherwise emits the value from the NestJS config (cf ENV variables)
     * 2. emits whenever the value is changed
     */
    async getString$(
        feature: string,
        path: string,
    ): Promise<Observable<string>> {
        const channel = this.getRedisChannel(feature, path);
        this.logger.log(`Subscribing to channel ${channel}...`);
        await this.subscriber.subscribe(channel);

        const initialDBValue = await this.repository.getString(feature, path);

        const configPathNestJS = `${feature}.${path}`;
        const initialNestJSValue =
            this.configService.get<string>(configPathNestJS);

        return new Observable<string>((observer) => {
            if (initialDBValue === null) {
                observer.next(initialNestJSValue);
            } else {
                observer.next(initialDBValue);
            }

            this.subscriber.on('message', (channel, message) => {
                observer.next(message);
            });
        });
    }

    /**
     * Sets a config value. It:
     * 1. Persists the value to the DB
     * 2. Publish the change
     */
    async setString(
        feature: string,
        path: string,
        value: string,
    ): Promise<void> {
        this.logger.log(
            `Setting config value: ${feature}.${path} = "${value}"...`,
        );

        // Persist value to the DB
        await this.repository.setString(feature, path, value);

        // Publish the change
        const channel = this.getRedisChannel(feature, path);
        this.logger.log(`Using channel ${channel}...`);
        await this.publisher.publish(channel, value);
    }

    private getRedisChannel(configKey: string, name: string): string {
        return `config-${configKey}.${name}`;
    }
}
