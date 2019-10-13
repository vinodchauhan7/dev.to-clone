import { DescriptionOptions, AbstractClassOptions } from "./types";
export declare type ObjectOptions = DescriptionOptions & AbstractClassOptions & {
    implements?: Function | Function[];
};
export declare function ObjectType(): ClassDecorator;
export declare function ObjectType(options: ObjectOptions): ClassDecorator;
export declare function ObjectType(name: string, options?: ObjectOptions): ClassDecorator;
