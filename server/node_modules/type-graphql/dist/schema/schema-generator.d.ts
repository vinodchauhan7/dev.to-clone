import { GraphQLSchema } from "graphql";
import { BuildContextOptions } from "./build-context";
export interface SchemaGeneratorOptions extends BuildContextOptions {
    /**
     * Disable checking on build the correctness of a schema
     */
    skipCheck?: boolean;
}
export declare abstract class SchemaGenerator {
    private static objectTypesInfo;
    private static inputTypesInfo;
    private static interfaceTypesInfo;
    private static enumTypesInfo;
    private static unionTypesInfo;
    static generateFromMetadata(options: SchemaGeneratorOptions): Promise<GraphQLSchema>;
    static generateFromMetadataSync(options: SchemaGeneratorOptions): GraphQLSchema;
    private static checkForErrors;
    private static getDefaultValue;
    private static buildTypesInfo;
    private static buildRootQueryType;
    private static buildRootMutationType;
    private static buildRootSubscriptionType;
    private static buildOtherTypes;
    private static generateHandlerFields;
    private static generateSubscriptionsFields;
    private static generateHandlerArgs;
    private static mapArgFields;
    private static getGraphQLOutputType;
    private static getGraphQLInputType;
    private static getResolveTypeFunction;
}
