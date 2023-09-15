import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class StartStopPublishingInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  roomId!: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  identity!: string;
}
