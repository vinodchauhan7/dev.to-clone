import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { createSchema } from "./utils/createSchema";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./utils/createTokens";

const server = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });

  const app = Express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
  app.use(cookieParser());

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.devId;
    if (!token) {
      console.log("token is not valid " + token);
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = await verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }
    console.log("payload :: " + payload.userId);
    //token is valid and we can send him access token now.abnf
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      console.log("User not found");
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    //Referesh Token
    res.cookie("devId", createRefreshToken(user), {
      httpOnly: true
    });

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Dev.to server started on localhost:4000/graphql");
  });
};

server();
