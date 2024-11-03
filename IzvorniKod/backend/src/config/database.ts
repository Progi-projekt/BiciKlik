import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'biciklik',
  dialect: 'postgres',
  username: 'biciklik_app',      // Replace with your PostgreSQL username
  password: '3ziifeuafVIctby',      // Replace with your PostgreSQL password
  host: 'localhost',
  models: [__dirname + '/models'], // Path to your models
});

export default sequelize;
