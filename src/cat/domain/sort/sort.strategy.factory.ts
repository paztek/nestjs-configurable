import { Injectable } from '@nestjs/common';
import { CatNameSortStrategy } from './name/name.sort.strategy';
import { CatCutenessSortStrategy } from './cuteness/cuteness.sort.strategy';
import { CatReinforcementLearningSortStrategy } from './reinforcement-learning/reinforcement-learning.sort.strategy';
import { CatConfigSortStrategy } from '../config';
import { CatSortStrategy } from './sort.strategy';

@Injectable()
export class CatSortStrategyFactory {
    constructor(
        private readonly nameStrategy: CatNameSortStrategy,
        private readonly cutenessStrategy: CatCutenessSortStrategy,
        private readonly rlStrategy: CatReinforcementLearningSortStrategy,
    ) {}

    createStrategy(strategy: CatConfigSortStrategy): CatSortStrategy {
        switch (strategy) {
            case CatConfigSortStrategy.ReinforcementLearning:
                return this.rlStrategy;
            case CatConfigSortStrategy.Name:
                return this.nameStrategy;
            default:
                return this.cutenessStrategy;
        }
    }
}
