import { NullableListOptions } from "../decorators/types";
export declare class WrongNullableListOptionError extends Error {
    constructor(typeOwnerName: string, nullable: boolean | NullableListOptions | undefined);
}
