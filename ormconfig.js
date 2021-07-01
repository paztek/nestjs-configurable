const options = {
    type: 'postgres',
    url: process.env.DATABASE_URI,
    synchronize: process.env.NODE_ENV === 'test',
    entities: [
        process.env.NODE_ENV === 'test'
            ? 'src/**/*entity.ts'
            : 'dist/**/*entity.js',
    ],
    migrations: ['dist/infra/database/migrations/**/*.js'],
    subscribers: ['dist/infra/database/subscribers/**/*.js'],
    cli: {
        migrationsDir: 'src/infra/database/migrations',
        subscribersDir: 'src/infra/database/subscribers',
    },
};

module.exports = options;
