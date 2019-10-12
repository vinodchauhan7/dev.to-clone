"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoExplicitTypeError extends Error {
    constructor(typeName, propertyKey, parameterIndex) {
        let errorMessage = `You need to provide explicit type for ${typeName}#${propertyKey} `;
        if (parameterIndex !== undefined) {
            errorMessage += `parameter #${parameterIndex} `;
        }
        errorMessage += "!";
        super(errorMessage);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NoExplicitTypeError = NoExplicitTypeError;
