import 'reflect-metadata';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { PORT, NODE_ENV } from './config';
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
