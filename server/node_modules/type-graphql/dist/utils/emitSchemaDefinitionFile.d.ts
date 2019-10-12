import { GraphQLSchema } from "graphql";
import { Options as PrintSchemaOptions } from "graphql/utilities/schemaPrinter";
export declare const defaultPrintSchemaOptions: PrintSchemaOptions;
export declare function emitSchemaDefinitionFileSync(schemaFilePath: string, schema: GraphQLSchema, options?: PrintSchemaOptions): void;
export declare function emitSchemaDefinitionFile(schemaFilePath: string, schema: GraphQLSchema, options?: PrintSchemaOptions): Promise<void>;
