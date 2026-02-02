import { InputType, Field } from 'type-graphql';
@InputType()
export class UsernamePasswordInput {
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
