"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnionResolveTypeError extends Error {
    constructor(unionMetadata) {
        super(`Cannot resolve type for union ${unionMetadata.name}! ` +
            `You need to return instance of object type class, not a plain object!`);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.UnionResolveTypeError = UnionResolveTypeError;
