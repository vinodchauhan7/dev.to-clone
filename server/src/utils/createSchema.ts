import { buildSchema } from "type-graphql";
import { RegisterResolver } from "../modules/User/Register/Register.resolver";
import { LoginResolver } from "../modules/User/Login/Login.resolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [RegisterResolver, LoginResolver]
  });
