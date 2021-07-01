import { Injectable } from '@nestjs/common';

import { CatSortStrategy } from '../sort.strategy';
import { Cat } from '../../cat.model';
import { CatReinforcementLearningClient } from './reinforcement-learning.client';

@Injectable()
export class CatReinforcementLearningSortStrategy implements CatSortStrategy {
    constructor(private readonly client: CatReinforcementLearningClient) {}

    async sort(cats: Cat[]): Promise<Cat[]> {
        let ids = cats.map((cat) => cat.id);

        // Ask the RL to sort
        ids = await this.client.sort(ids);

        return ids.map((id) => cats.find((c) => c.id === id));
    }
}
