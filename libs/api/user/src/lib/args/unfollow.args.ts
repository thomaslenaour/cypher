import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UnfollowArgs {
  @Field({ nullable: false })
  unfollowed!: string;

  @Field({ nullable: false })
  unfollowing!: string;
}
