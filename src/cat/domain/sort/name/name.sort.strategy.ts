import { Injectable } from '@nestjs/common';

import { CatSortStrategy } from '../sort.strategy';
import { Cat } from '../../cat.model';

@Injectable()
export class CatNameSortStrategy implements CatSortStrategy {
    async sort(cats: Cat[]): Promise<Cat[]> {
        return cats.sort((c1, c2) => (c1.name < c2.name ? -1 : 1));
    }
}
