import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "./../../../entity/User";
import { RegisterInputType } from "./RegisterInputType";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "hello11";
  }

  @Mutation(() => User)
  async register(
    @Arg("data")
    registerInput: RegisterInputType
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerInput.password, 13);
    registerInput.password = hashedPassword;
    const user = await User.create(registerInput).save();
    return user;
  }
}
