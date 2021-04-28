import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ITodoItem } from '../interface/ITodoList';

@Entity()
export class TodoList implements ITodoItem {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
      length: 128,
      nullable: false
    })
    title!: string;

    @Column({
      length: 512,
      nullable: false
    })
    message!: string;

    @Column({
      default: false,
      nullable: false
    })
    checked!: boolean;

}
