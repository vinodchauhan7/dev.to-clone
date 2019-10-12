import { GraphQLScalarType } from "graphql";
import { ValidatorOptions } from "class-validator";
import { ResolverFilterData, ClassType, ResolverTopicData, Complexity, TypeResolver } from "../interfaces";
export interface RecursiveArray<TValue> extends Array<RecursiveArray<TValue> | TValue> {
}
export declare type TypeValue = ClassType | GraphQLScalarType | Function | object | symbol;
export declare type ReturnTypeFuncValue = TypeValue | RecursiveArray<TypeValue>;
export declare type TypeValueThunk = (type?: void) => TypeValue;
export declare type ClassTypeResolver = (of?: void) => ClassType;
export declare type ReturnTypeFunc = (returns?: void) => ReturnTypeFuncValue;
export declare type SubscriptionFilterFunc = (resolverFilterData: ResolverFilterData<any, any, any>) => boolean | Promise<boolean>;
export declare type SubscriptionTopicFunc = (resolverTopicData: ResolverTopicData<any, any, any>) => string | string[];
export interface DecoratorTypeOptions {
    nullable?: boolean | NullableListOptions;
    defaultValue?: any;
}
export declare type NullableListOptions = "items" | "itemsAndList";
export interface TypeOptions extends DecoratorTypeOptions {
    array?: boolean;
    arrayDepth?: number;
}
export interface DescriptionOptions {
    description?: string;
}
/** @deprecated use `DeprecationOptions` instead */
export declare type DepreciationOptions = DeprecationOptions;
export interface DeprecationOptions {
    deprecationReason?: string;
}
export interface ValidateOptions {
    validate?: boolean | ValidatorOptions;
}
export interface ComplexityOptions {
    complexity?: Complexity;
}
export interface SchemaNameOptions {
    name?: string;
}
export interface AbstractClassOptions {
    isAbstract?: boolean;
}
export interface ResolveTypeOptions<TSource = any, TContext = any> {
    resolveType?: TypeResolver<TSource, TContext>;
}
export declare type BasicOptions = DecoratorTypeOptions & DescriptionOptions;
export declare type AdvancedOptions = BasicOptions & DeprecationOptions & SchemaNameOptions & ComplexityOptions;
export interface EnumConfig {
    name: string;
    description?: string;
}
export declare type MethodAndPropDecorator = PropertyDecorator & MethodDecorator;
export declare type ResolverClassOptions = AbstractClassOptions;
