import { ReturnTypeFunc, TypeOptions, ValidateOptions } from "../decorators/types";
import { CommonArgMetadata } from "../metadata/definitions";
export interface ParamInfo {
    prototype: Object;
    propertyKey: string | symbol;
    parameterIndex: number;
    returnTypeFunc?: ReturnTypeFunc;
    options?: TypeOptions & ValidateOptions;
}
export declare function getParamInfo({ prototype, propertyKey, parameterIndex, returnTypeFunc, options, }: ParamInfo): CommonArgMetadata;
