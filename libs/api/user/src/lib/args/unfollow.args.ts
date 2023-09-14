import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UnfollowArgs {
  @Field({ nullable: false })
  unfollowed!: string;

  @Field({ nullable: false })
  unfollowing!: string;
}
