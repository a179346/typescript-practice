import 'reflect-metadata';
import { config } from './system/config';
import { logging } from './utils/logging';
import { app } from './app';
import { TypeOrmConnection } from './utils/typeorm-connection';
import { Lib } from './lib/common';


const NAMESPACE = 'Index';
start();

async function start () {
  try {
    Lib.retry(async () => {
      logging.info(NAMESPACE, 'connecting to db ...');
      await TypeOrmConnection.init();
    }, 3, 3000);

    app.listen(config.server.PORT, () => {
      logging.info(NAMESPACE, `server listening on ${config.server.PORT}`);
    });
  } catch (error) {
    logging.error(NAMESPACE, (error as Error).message, error);
  }
}
