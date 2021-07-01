import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import catConfig from './cat.config';
import { CatsController } from './controllers/cats.controller';
import { CatService } from './domain/cat.service';
import { ApiConfigModule } from '../infra/config/config.module';
import { CatSortStrategyFactory } from './domain/sort/sort.strategy.factory';
import { CatNameSortStrategy } from './domain/sort/name/name.sort.strategy';
import { CatCutenessSortStrategy } from './domain/sort/cuteness/cuteness.sort.strategy';
import { CatReinforcementLearningSortStrategy } from './domain/sort/reinforcement-learning/reinforcement-learning.sort.strategy';
import { CatReinforcementLearningClient } from './domain/sort/reinforcement-learning/reinforcement-learning.client';

@Module({
    imports: [ConfigModule.forFeature(catConfig), HttpModule, ApiConfigModule],
    controllers: [CatsController],
    providers: [
        CatService,

        // Sort strategies
        CatSortStrategyFactory,
        CatNameSortStrategy,
        CatCutenessSortStrategy,
        CatReinforcementLearningSortStrategy,
        CatReinforcementLearningClient,
    ],
})
export class CatModule {}
