import 'reflect-metadata';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import RouteTodo from './routes/todo';

import {
  PORT,
  NODE_ENV,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
  DB_SERVER,
  DB_USERNAME,
} from './config';

createConnection({
  type: 'postgres',
  host: DB_SERVER,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['dist/entities/**/*.js'],
  logging: ['error'],
  synchronize: true,
  ssl: { rejectUnauthorized: false },
  uuidExtension: 'uuid-ossp',
  entityPrefix: 'tbl_',
  cache: { duration: 3000 },
  logger: 'file',
  maxQueryExecutionTime: 3000,
});

const app = express();
app.use(express.json());

app.use((_, _res, next) => {
  next();
}, cors({ maxAge: 84600 }));
app.use(express.json());
app.use(helmet());
app.all(
  '/*',
  (req: express.Request, res: express.Response, next: NextFunction) =>
    req.method === 'OPTIONS' ? res.status(200).end() : next()
);

NODE_ENV === 'develop'
  ? app.use((_, _res, next) => {
      next();
    }, morgan('dev'))
  : app.use((_, _res, next) => {
      next();
    }, morgan('tiny'));

//TODO Routes

app.use('/api/v1/', RouteTodo);

app.get('/', function (_: Request, res: Response) {
  res.status(200).send(`<h1>Start ${NODE_ENV} server 🚀</h1>`);
});

app.get('*', function (_: Request, res: Response) {
  // at bottom
  res.status(404).send('Page not found');
});

app.listen(PORT || 3001, () =>
  console.log('Start server on port 3001 🚀', NODE_ENV)
);
// })
// .catch((error) => console.log('TypeORM connection error: ', error));
