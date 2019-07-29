import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 186, nullable: false })
  title: string;
  @Column({ nullable: false })
  isDone: boolean;
}
