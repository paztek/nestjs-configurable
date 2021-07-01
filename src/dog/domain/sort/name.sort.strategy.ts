import { DogSortStrategy } from './sort.strategy';
import { Dog } from '../dog.model';

export class DogNameSortStrategy implements DogSortStrategy {
    sort(dogs: Dog[]): Dog[] {
        return dogs.sort((c1, c2) => (c1.name < c2.name ? -1 : 1));
    }
}
