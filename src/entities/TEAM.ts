import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@ObjectType()
@Entity()
export class Team extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updated_at = new Date();

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  owner!: string;

  @Field(() => Number)
  @Column()
  user_id!: number;
}
