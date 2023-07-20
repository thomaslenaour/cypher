import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ToggleMyselfFromQueueInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  roomId!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  identity!: string;
}
