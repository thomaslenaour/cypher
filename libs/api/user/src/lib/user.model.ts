import { UserProfileObjectType } from '@cypher/api/user-profile';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserObjectType {
  @Field()
  id!: string;

  @Field({ nullable: true })
  name!: string | null;

  @Field({ nullable: true })
  email!: string | null;

  @Field({ nullable: true })
  emailVerified!: Date | null;

  @Field({ nullable: true })
  image!: string | null;

  @Field({ nullable: true })
  profile?: UserProfileObjectType | null;

  @Field(() => [UserObjectType], { nullable: true })
  followedBy?: UserObjectType[];

  @Field(() => [UserObjectType], { nullable: true })
  following?: UserObjectType[];
}

// accounts      Account[]
// sessions      Session[]
