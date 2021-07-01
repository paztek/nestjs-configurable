import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import catConfig from 'src/cat/cat.config';
import { ReinforcementLearningClient } from '../../../../reinforcement-learning/domain/reinforcement-learning.client';

@Injectable()
export class CatReinforcementLearningClient extends ReinforcementLearningClient {
    constructor(
        httpService: HttpService,
        @Inject(catConfig.KEY) config: ConfigType<typeof catConfig>,
    ) {
        super(httpService, config.sort.options.uri);
    }
}
