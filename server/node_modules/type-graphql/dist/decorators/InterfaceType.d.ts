import { DescriptionOptions, AbstractClassOptions, ResolveTypeOptions } from "./types";
export declare type InterfaceOptions = DescriptionOptions & AbstractClassOptions & ResolveTypeOptions;
export declare function InterfaceType(): ClassDecorator;
export declare function InterfaceType(options: InterfaceOptions): ClassDecorator;
export declare function InterfaceType(name: string, options?: InterfaceOptions): ClassDecorator;
