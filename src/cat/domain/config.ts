export enum CatConfigSortStrategy {
    Name = 'name',
    Cuteness = 'cuteness',
    ReinforcementLearning = 'reinforcement_learning',
}

export interface CatConfig {
    sort: {
        strategy: CatConfigSortStrategy;
    };
}
