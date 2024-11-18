module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'postgres',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'rootpassword',
  database: process.env.DATABASE_NAME || 'mydatabase',
  synchronize: false,
  logging: true,
  entities: ['dist/infra/data/pg/entities/**/*.js'],
  migrations: ['dist/infra/data/pg/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/infra/data/pg/migrations',
  },
};
