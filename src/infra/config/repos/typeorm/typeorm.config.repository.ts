import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ApiConfigRepository } from '../../domain/config.repository';
import { ConfigItemEntity, ConfigItemType } from './config-item.entity';

@Injectable()
export class TypeormApiConfigRepository implements ApiConfigRepository {
    constructor(
        @InjectRepository(ConfigItemEntity)
        private readonly repository: Repository<ConfigItemEntity>,
    ) {}

    async getString(feature: string, path: string): Promise<string | null> {
        const instance = await this.findInstance(feature, path);

        return instance ? instance.value : null;
    }

    async setString(
        feature: string,
        path: string,
        value: string,
    ): Promise<void> {
        let instance = await this.findInstance(feature, path);

        if (!instance) {
            instance = new ConfigItemEntity();
            instance.feature = feature;
            instance.path = path;
            instance.type = ConfigItemType.String;
        }

        instance.value = value;
        await this.repository.save(instance);
    }

    private findInstance(
        feature: string,
        path: string,
    ): Promise<ConfigItemEntity | null> {
        return this.repository.findOne({
            where: {
                feature,
                path,
            },
        });
    }
}
