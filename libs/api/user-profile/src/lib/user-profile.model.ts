import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserProfileObjectType {
  @Field()
  id!: string;

  @Field()
  createdAt!: Date;

  @Field({ nullable: true })
  bannerUrl!: string | null;

  @Field({ nullable: true })
  profileUrl!: string | null;

  @Field()
  pseudo!: string;

  @Field({ nullable: true })
  punchline!: string | null;

  @Field({ nullable: true })
  userName!: string | null;

  @Field()
  userId!: string;
}
