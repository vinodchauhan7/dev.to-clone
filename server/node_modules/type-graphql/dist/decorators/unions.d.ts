import { ClassType } from "../interfaces";
import { UnionFromClasses } from "../helpers/utils";
import { ResolveTypeOptions } from "./types";
export interface UnionTypeConfig<TClassTypes extends ClassType[]> extends ResolveTypeOptions<UnionFromClasses<TClassTypes>> {
    name: string;
    description?: string;
    /**
     * The direct array syntax is deprecated.
     * Use the function syntax `() => TClassTypes` instead.
     */
    types: TClassTypes | (() => TClassTypes);
}
export declare function createUnionType<T extends ClassType[]>(config: UnionTypeConfig<T>): UnionFromClasses<T>;
