import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'rootpassword',
  database: 'mydatabase',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../infra/data/pg/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../infra/data/pg/migrations/*.{js,ts}'],
});

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
