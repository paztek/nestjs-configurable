import { registerAs } from '@nestjs/config';
import { DogSortParam } from './domain/dog.model';

export default registerAs('dog', () => ({
    sortStrategy:
        process.env.DOG_SORT_STRATEGY === 'name'
            ? DogSortParam.Name
            : DogSortParam.BarkingVolume,
}));
