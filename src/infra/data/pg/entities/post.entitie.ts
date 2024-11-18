import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;

  @Column()
  body: string;

  @Column()
  @Index()
  owner: string;
}
