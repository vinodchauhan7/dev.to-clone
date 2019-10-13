"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WrongNullableListOptionError extends Error {
    constructor(typeOwnerName, nullable) {
        super(`Wrong nullable option set for ${typeOwnerName}. ` +
            `You cannot combine non-list type with nullable '${nullable}'.`);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.WrongNullableListOptionError = WrongNullableListOptionError;
