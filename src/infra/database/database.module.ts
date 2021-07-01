import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return {
                    ...getConnectionOptions(),
                    logging: true,
                    logger: new Logger('Postgres'),
                };
            },
        }),
    ],
})
export class DatabaseModule {}
