import { Sequelize } from 'sequelize';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pg = require('pg');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set');
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  dialectOptions:
      process.env.NODE_ENV === 'production'
        ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
        : {}
});