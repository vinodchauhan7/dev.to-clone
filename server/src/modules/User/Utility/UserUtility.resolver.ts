import { Resolver, Mutation, Arg, Int } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../../entity/User";

@Resolver()
export class UserUtilityResolver {
  @Mutation(() => Boolean)
  async revokeRefreshToken(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }
}
