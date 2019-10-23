import {
  Resolver,
  Mutation,
  UseMiddleware,
  Arg,
  Ctx,
  Query
} from "type-graphql";
import { Post } from "../../entity/Post";
import { isAuth } from "../middlewares/isAuth";
import { PostInput } from "./PostInputType";
import { MyContext } from "../../utils/MyContext";
import { User } from "../../entity/User";

@Resolver()
export class PostResolver {
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async post(
    @Arg("data") postInput: PostInput,
    @Ctx() { payload }: MyContext
  ): Promise<Post> {
    const userId = payload!.userId;
    const obj = { ...postInput, userId: userId };
    console.log(obj);
    const post = await Post.create(obj).save();
    const userData = await User.findOne(payload!.userId);
    post.user = userData!;
    await post.save();
    return post;
  }

  @Query(() => [Post])
  @UseMiddleware(isAuth)
  async getAllPostById(@Arg("userId") userId: number): Promise<Post[]> {
    const post = await Post.find({
      where: { user: { id: userId } },
      relations: ["user"]
    });
    console.log(JSON.stringify(post, null, 2));
    return post;
  }

  @Query(() => Post)
  @UseMiddleware(isAuth)
  async getPostById(@Arg("postId") postId: number): Promise<Post | undefined> {
    const post = await Post.findOne(postId, { relations: ["user"] });
    console.log(JSON.stringify(post, null, 2));
    return post;
  }

  @Query(() => [Post])
  async getAllPost(): Promise<Post[]> {
    const post = await Post.find({ relations: ["user"] });
    console.log(JSON.stringify(post, null, 2));
    return post;
  }
}
