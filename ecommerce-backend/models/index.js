import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions:
      process.env.NODE_ENV === 'production'
          ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
          : {},
});