import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';

@InputType()
export class UpdateUserProfileInput {
  @IsOptional()
  @Length(3, 30)
  @Field(() => String)
  userName!: string | null;

  @IsOptional()
  @Length(0, 250)
  @Field(() => String)
  punchline!: string | null;
}
