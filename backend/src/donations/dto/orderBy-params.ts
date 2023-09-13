import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class OrderByParams {

    @Field({ nullable: true })
    field: string

    @Field({ nullable: true })
    direction: string

}