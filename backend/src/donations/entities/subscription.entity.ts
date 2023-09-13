import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Result } from "./result.entity";

@ObjectType()
export class SubscriptionTotal {

    @Field({ nullable: true })
    totalUpdated: Result

    @Field(() => Int)
    total: number
}