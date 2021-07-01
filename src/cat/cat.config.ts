import { registerAs } from '@nestjs/config';
import { CatConfigSortStrategy } from './domain/config';

export default registerAs('cat', () => ({
    sort: {
        strategy:
            (process.env.CAT_SORT_STRATEGY as CatConfigSortStrategy) ||
            CatConfigSortStrategy.Cuteness,
        options: {
            uri:
                process.env.CAT_SORT_REINFORCEMENT_LEARNING_URI ||
                'http://rl-service:5000',
        },
    },
}));
