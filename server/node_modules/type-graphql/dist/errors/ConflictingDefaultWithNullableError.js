"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConflictingDefaultWithNullableError extends Error {
    constructor(typeOwnerName, defaultValue, nullable) {
        super(`Wrong nullable option set for ${typeOwnerName}. ` +
            `You cannot combine default value '${defaultValue}' with nullable '${nullable}'.`);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ConflictingDefaultWithNullableError = ConflictingDefaultWithNullableError;
