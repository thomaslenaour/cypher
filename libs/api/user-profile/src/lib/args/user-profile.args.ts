import { ArgsType, Field } from '@nestjs/graphql';
import { UserProfileUniqueFields } from '../types';

@ArgsType()
export class UserProfileArgs {
  @Field({ nullable: false })
  key!: UserProfileUniqueFields;

  @Field({ nullable: false })
  value!: string;
}
