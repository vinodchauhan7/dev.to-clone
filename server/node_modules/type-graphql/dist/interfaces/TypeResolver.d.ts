import { GraphQLResolveInfo } from "graphql";
import { ClassType } from "./ClassType";
import { MaybePromise, Maybe } from "./Maybe";
export declare type TypeResolver<TSource, TContext> = (value: TSource, context: TContext, info: GraphQLResolveInfo) => MaybePromise<Maybe<string | ClassType>>;
