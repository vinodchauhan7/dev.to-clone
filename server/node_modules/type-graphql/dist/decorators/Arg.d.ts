import { ReturnTypeFunc, DecoratorTypeOptions, DescriptionOptions, ValidateOptions } from "./types";
export declare type Options = DecoratorTypeOptions & DescriptionOptions & ValidateOptions;
export declare function Arg(name: string, options?: Options): ParameterDecorator;
export declare function Arg(name: string, returnTypeFunc: ReturnTypeFunc, options?: Options): ParameterDecorator;
