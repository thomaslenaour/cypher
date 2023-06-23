import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomObjectType {
  @Field(() => String)
  test!: string;
}
