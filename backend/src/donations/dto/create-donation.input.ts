import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateDonationInput {

    @Field(() => Int)
    @IsNotEmpty()
    @IsNumber()
    count: number;

    @Field()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(16)
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
