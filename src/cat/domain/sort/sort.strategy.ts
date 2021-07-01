import { Cat } from '../cat.model';

export interface CatSortStrategy {
    sort(cats: Cat[]): Promise<Cat[]>;
}
