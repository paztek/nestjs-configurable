import {
    Inject,
    Injectable,
    Logger,
    OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import catConfig from '../cat.config';
import { Cat } from './cat.model';
import { CatSortStrategy } from './sort/sort.strategy';
import { ApiConfigService } from '../../infra/config/domain/config.service';
import { UpdateCatConfigDTO } from '../dtos/update-config.dto';
import { CatConfig, CatConfigSortStrategy } from './config';
import { CatSortStrategyFactory } from './sort/sort.strategy.factory';

const CATS: Cat[] = [
    {
        id: '28CA7FE4-BBE5-429B-A5A7-7BAF18659A53',
        name: 'Garfield',
        cuteness: 5,
    },
    {
        id: '544BBEB8-76A3-4F0E-B09F-69E508547EDC',
        name: 'Maru',
        cuteness: 10,
    },
    {
        id: '58100A16-A311-4E06-AA03-D30A7D7D68B5',
        name: 'Grumpy cat',
        cuteness: 0,
    },
];

@Injectable()
export class CatService implements OnApplicationBootstrap {
    private readonly logger = new Logger(CatService.name);
    private sortStrategy: CatSortStrategy;

    constructor(
        @Inject(catConfig.KEY)
        private readonly config: ConfigType<typeof catConfig>,
        private readonly configService: ApiConfigService,
        private readonly sortStrategyFactory: CatSortStrategyFactory,
    ) {}

    async onApplicationBootstrap() {
        const param$ = await this.configService.getString$(
            catConfig.KEY,
            'sort.strategy',
        );
        param$.subscribe((param) => {
            this.logger.log('Sort strategy changed');
            this.sortStrategy = this.sortStrategyFactory.createStrategy(
                param as CatConfigSortStrategy,
            );
        });
    }

    async getCats(): Promise<Cat[]> {
        return this.sortStrategy.sort(CATS);
    }

    async updateCatConfig(dto: UpdateCatConfigDTO): Promise<CatConfig> {
        // TODO Check that dto.sort.strategy can be converted to enum

        await this.configService.setString(
            catConfig.KEY,
            'sort.strategy',
            dto.sort.strategy,
        );

        return {
            sort: { strategy: dto.sort.strategy as CatConfigSortStrategy },
        };
    }
}
