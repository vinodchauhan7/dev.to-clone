export declare type ArrayElements<TArray extends any[]> = TArray extends Array<infer TElement> ? TElement : never;
export declare type UnionFromClasses<TClassesArray extends any[]> = InstanceType<ArrayElements<TClassesArray>>;
