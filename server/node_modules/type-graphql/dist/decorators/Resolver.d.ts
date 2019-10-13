import { ClassTypeResolver, ResolverClassOptions } from "./types";
import { ClassType } from "../interfaces";
export declare function Resolver(): ClassDecorator;
export declare function Resolver(options: ResolverClassOptions): ClassDecorator;
export declare function Resolver(typeFunc: ClassTypeResolver, options?: ResolverClassOptions): ClassDecorator;
export declare function Resolver(objectType: ClassType, options?: ResolverClassOptions): ClassDecorator;
