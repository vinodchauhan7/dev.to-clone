import { Resolver, Mutation, Arg, Int, Query, Ctx } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../../entity/User";
import { MyContext } from "../../../utils/MyContext";

@Resolver()
export class UserUtilityResolver {
  @Mutation(() => Boolean)
  async revokeRefreshToken(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Query(() => String)
  async hello() {
    return "Hello1!!!";
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { res }: MyContext) {
    res.cookie("devId", "", {
      httpOnly: true
    });
    return true;
  }
}
