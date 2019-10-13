import { buildSchema } from "type-graphql";
import { RegisterResolver } from "../modules/User/Register/Register.resolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [RegisterResolver]
  });
