import { ValidatorOptions } from "class-validator";
export declare function validateArg<T extends Object>(arg: T | undefined, globalValidate: boolean | ValidatorOptions, argValidate?: boolean | ValidatorOptions): Promise<T | undefined>;
