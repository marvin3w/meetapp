import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    // Expected termination
    // process.once('SIGINT', () => this.server.stop());
    // process.once('SIGTERM', () => this.server.stop());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
