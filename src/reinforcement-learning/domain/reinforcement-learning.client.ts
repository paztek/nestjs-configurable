import { HttpService } from '@nestjs/common';
import * as _ from 'lodash';

export type ReinforcementLearningResource = string;

interface ReinforcementLearningRequest {
    resources: ReinforcementLearningResource[];
}

interface ReinforcementLearningResponse {
    resources: ReinforcementLearningResource[];
}

export abstract class ReinforcementLearningClient {
    protected constructor(
        private readonly httpService: HttpService,
        private readonly baseUri: string,
    ) {}

    async sort(
        resources: ReinforcementLearningResource[],
    ): Promise<ReinforcementLearningResource[]> {
        return _.shuffle(resources);
    }
}
