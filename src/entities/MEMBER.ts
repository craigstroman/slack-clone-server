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
export class Member extends BaseEntity {
  @Field(() => String)
  @CreateDateColumn()
  created_at = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updated_at = new Date();

  @Field(() => String)
  @Column()
  owner!: string;
}
