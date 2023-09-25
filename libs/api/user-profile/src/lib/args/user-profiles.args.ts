import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserProfilesArgs {
  @Field({ nullable: false })
  key!: string;

  @Field(() => [String], { nullable: false })
  values!: string[];
}
