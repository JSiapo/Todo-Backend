import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';

export enum TodoState {
  create,
  complete,
}

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ default: '' })
  @IsNotEmpty({ message: "Field shuldn't empty" })
  todo!: string;

  @Column({ default: TodoState.create })
  state!: TodoState;

  @Column()
  @CreateDateColumn()
  created!: Date;

  @Column()
  @UpdateDateColumn()
  update!: Date;
}
