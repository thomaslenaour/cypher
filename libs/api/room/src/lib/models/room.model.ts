import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomObjectType {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  participantsNumber?: number;
}
