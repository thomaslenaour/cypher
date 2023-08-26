import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FollowArgs {
  @Field({ nullable: false })
  followed!: string;

  @Field({ nullable: false })
  following!: string;
}
