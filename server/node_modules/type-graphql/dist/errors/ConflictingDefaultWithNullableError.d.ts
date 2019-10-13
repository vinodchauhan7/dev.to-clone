import { NullableListOptions } from "../decorators/types";
export declare class ConflictingDefaultWithNullableError extends Error {
    constructor(typeOwnerName: string, defaultValue: any, nullable: boolean | NullableListOptions);
}
