import { InputType, Field } from "type-graphql";
import { Length, IsEmail, MinLength } from "class-validator";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist";

@InputType()
export class RegisterInputType {
  @Field()
  @Length(5, 50)
  name: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already exist" })
  email: string;

  @Field()
  @MinLength(3)
  password: string;

  @Field()
  joinedDate: string;
}
