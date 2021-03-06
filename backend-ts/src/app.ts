import express from 'express';

class App {
    public express: express.Application;

    public constructor () {
      this.express = express();
      this.middlewares();
      this.routes();
    }

    private middlewares (): void {
      this.express.use(express.json());
    }

    private routes (): void {
      this.express.get('/', (request, response) => {
        return response.send('Eita');
      });
    }
}

export default new App().express;
