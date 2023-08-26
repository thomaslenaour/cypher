import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserProfileArgs {
  @Field({ nullable: false })
  key!: string;

  @Field({ nullable: false })
  value!: string;
}
