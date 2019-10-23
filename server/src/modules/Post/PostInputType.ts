import { InputType, Field } from "type-graphql";
import { Length, Min } from "class-validator";

@InputType()
export class PostInput {
  @Field()
  @Length(10, 100, { message: "Title must be between 10-100." })
  title: string;

  @Field()
  description: string;

  @Field(() => [String])
  tags: string[];

  @Field()
  creationDate: string;

  @Field()
  @Min(0)
  views: number;

  @Field()
  isPublished: boolean;
}
