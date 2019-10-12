import { ReturnTypeFunc, AdvancedOptions, MethodAndPropDecorator } from "./types";
export declare function Field(): MethodAndPropDecorator;
export declare function Field(options: AdvancedOptions): MethodAndPropDecorator;
export declare function Field(returnTypeFunction?: ReturnTypeFunc, options?: AdvancedOptions): MethodAndPropDecorator;
