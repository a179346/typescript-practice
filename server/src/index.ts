import 'reflect-metadata';
import { config } from './system/config';
import { logging } from './utils/logging';
import { app } from './app';
import { TypeOrmConnection } from './utils/typeorm-connection';


const NAMESPACE = 'Index';
start();

async function start () {
  try {
    await TypeOrmConnection.init();

    app.listen(config.server.PORT, () => {
      logging.info(NAMESPACE, `server listening on ${config.server.PORT}`);
    });
  } catch (error) {
    logging.error(NAMESPACE, (error as Error).message, error);
  }
}
