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
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  uuid!: number;

  @Field(() => String)
  @CreateDateColumn()
  created_at = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updated_at = new Date();

  @Field(() => String)
  @Column()
  first_name!: string;

  @Field(() => String)
  @Column()
  last_name!: string;

  @Field(() => String)
  @Column()
  phone_number!: string;

  @Field(() => String)
  @Column()
  username!: string;

  @Field(() => String)
  @Column()
  email!: string;

  @Field()
  @Column()
  password!: string;
}
