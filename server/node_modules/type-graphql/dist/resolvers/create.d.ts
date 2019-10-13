import { GraphQLFieldResolver } from "graphql";
import { FieldResolverMetadata, FieldMetadata, BaseResolverMetadata } from "../metadata/definitions";
export declare function createHandlerResolver(resolverMetadata: BaseResolverMetadata): GraphQLFieldResolver<any, any, any>;
export declare function createAdvancedFieldResolver(fieldResolverMetadata: FieldResolverMetadata): GraphQLFieldResolver<any, any, any>;
export declare function createSimpleFieldResolver(fieldMetadata: FieldMetadata): GraphQLFieldResolver<any, any, any>;
