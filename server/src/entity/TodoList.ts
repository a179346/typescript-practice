import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TodoList {

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
