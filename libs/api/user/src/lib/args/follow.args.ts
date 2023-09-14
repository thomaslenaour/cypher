import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FollowArgs {
  @Field({ nullable: false })
  followed!: string;

  @Field({ nullable: false })
  following!: string;
}
