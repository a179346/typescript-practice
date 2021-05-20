import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { BaseInterfaceService } from '../interface/BaseInterface';

export type ObjectType<T> = { new (): T };

export abstract class BaseDao<T, inputT> implements BaseInterfaceService<T, inputT> {
  private readonly type: ObjectType<T>
  constructor (type: ObjectType<T>) {
    this.type = type;
  }

  get repository (): Repository<T> {
    return TypeOrmConnection.connection.getRepository(this.type);
  }

  public async get (id:number) {
    return (await this.repository.findOne(id) || null);
  }

  public async list () {
    return await this.repository.find();
  }

  public async insert (inputItem: inputT) {
    const item = new this.type();
    return await this.repository.save({
      ...item,
      ...inputItem
    });
  }

  public async remove (id: number) {
    const item = await this.repository.findOne(id);
    if (item) {
      await this.repository.remove(item);
    }
    return item ? { ...item, id } : null;
  }

  public async update (id: number, inputItem: inputT) {
    const item = await this.repository.findOne(id);
    if (!item)
      return null;
    const saveVal = {
      ...item,
      ...inputItem
    };
    return await this.repository.save(saveVal);
  }
}