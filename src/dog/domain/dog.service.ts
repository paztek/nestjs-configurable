import {
    Inject,
    Injectable,
    Logger,
    OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import dogConfig from '../dog.config';
import { Dog, DogSortParam } from './dog.model';
import { DogSortStrategy } from './sort/sort.strategy';
import { DogNameSortStrategy } from './sort/name.sort.strategy';
import { ApiConfigService } from '../../infra/config/domain/config.service';
import { DogBarkingVolumeSortStrategy } from './sort/barking-volume.sort.strategy';

const DOGS: Dog[] = [
    {
        name: 'Milou',
        barkingVolume: 0,
    },
    {
        name: 'Rintintin',
        barkingVolume: 5,
    },
    {
        name: 'Cerberus',
        barkingVolume: 1000,
    },
];

@Injectable()
export class DogService implements OnApplicationBootstrap {
    private readonly logger = new Logger(DogService.name);
    private sortStrategy: DogSortStrategy;

    constructor(
        @Inject(dogConfig.KEY)
        private readonly config: ConfigType<typeof dogConfig>,
        private readonly configService: ApiConfigService,
    ) {}

    async onApplicationBootstrap() {
        const param$ = await this.configService.getString$(
            dogConfig.KEY,
            'sortStrategy',
        );
        param$.subscribe((param) => {
            this.logger.log('Sort strategy changed');
            this.sortStrategy = this.getStrategy(param as DogSortParam);
        });
    }

    async getDogs(): Promise<Dog[]> {
        return this.sortStrategy.sort(DOGS);
    }

    async updateDogConfig(
        dto: ConfigType<typeof dogConfig>,
    ): Promise<ConfigType<typeof dogConfig>> {
        await this.configService.setString(
            dogConfig.KEY,
            'sortStrategy',
            dto.sortStrategy,
        );
        return { sortStrategy: dto.sortStrategy };
    }

    private getStrategy(param: DogSortParam): DogSortStrategy {
        return param === DogSortParam.Name
            ? new DogNameSortStrategy()
            : new DogBarkingVolumeSortStrategy();
    }
}
