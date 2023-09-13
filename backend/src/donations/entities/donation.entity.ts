import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ObjectType()
export class Donation {

  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @IsNotEmpty()
  count: number;

  @Field()
  @IsNotEmpty()
  displayName: string

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field({ nullable: true })
  mobile?: string

  @Field({ nullable: true })
  team?: string

  @Field({ nullable: true })
  message?: string

  @Field({ nullable: true })
  createdAt?: Date

}
