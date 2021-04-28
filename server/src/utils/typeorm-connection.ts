import { createConnection, Connection } from 'typeorm';

class TypeormConnection {
  private my_connection!: Connection;

  public async init () {
    this.my_connection = await createConnection();
  }

  public get connection () {
    return this.my_connection;
  }
}

export const TypeOrmConnection = (new TypeormConnection());