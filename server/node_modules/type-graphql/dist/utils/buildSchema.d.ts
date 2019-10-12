import { GraphQLSchema } from "graphql";
import { Options as PrintSchemaOptions } from "graphql/utilities/schemaPrinter";
import { SchemaGeneratorOptions } from "../schema/schema-generator";
interface EmitSchemaFileOptions extends PrintSchemaOptions {
    path?: string;
}
export interface BuildSchemaOptions extends SchemaGeneratorOptions {
    /** Array of resolvers classes or glob paths to resolver files */
    resolvers: Array<Function | string>;
    /**
     * Path to the file to where emit the schema
     * or config object with print schema options
     * or `true` for the default `./schema.gql` one
     */
    emitSchemaFile?: string | boolean | EmitSchemaFileOptions;
}
export declare function buildSchema(options: BuildSchemaOptions): Promise<GraphQLSchema>;
export declare function buildSchemaSync(options: BuildSchemaOptions): GraphQLSchema;
export {};
