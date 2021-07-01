import { DogSortStrategy } from './sort.strategy';
import { Dog } from '../dog.model';

export class DogBarkingVolumeSortStrategy implements DogSortStrategy {
    sort(dogs: Dog[]): Dog[] {
        return dogs.sort((c1, c2) =>
            c1.barkingVolume > c2.barkingVolume ? -1 : 1,
        );
    }
}
