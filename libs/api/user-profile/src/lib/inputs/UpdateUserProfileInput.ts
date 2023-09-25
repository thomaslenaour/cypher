import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  NotContains,
} from 'class-validator';

@InputType()
export class UpdateUserProfileInput {
  @IsNotEmpty()
  @Length(3, 30)
  @NotContains(' ')
  @Field(() => String)
  pseudo!: string;

  @IsOptional()
  @Length(3, 30)
  @Field(() => String, { nullable: true })
  name?: string | null;

  @IsOptional()
  @Length(0, 250)
  @Field(() => String, { nullable: true })
  punchline?: string | null;

  @IsOptional()
  @IsUrl()
  @Field(() => String, { nullable: true })
  profileUrl?: string | null;

  @IsOptional()
  @IsUrl()
  @Field(() => String, { nullable: true })
  bannerUrl?: string | null;
}
