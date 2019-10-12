import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { Resolver, buildSchema, Query } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return "Hello World";
  }
}

const server = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Dev.to server started on localhost:4000/graphql");
  });
};

server();
