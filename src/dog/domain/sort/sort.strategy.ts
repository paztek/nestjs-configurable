import { Dog } from '../dog.model';

export interface DogSortStrategy {
    sort(dogs: Dog[]): Dog[];
}
