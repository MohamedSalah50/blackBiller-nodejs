import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_USER),
  String(process.env.DB_PASS),
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: Number(process.env.DB_PORT) || 5432,
    logging: false,
  }
);

export default sequelize;