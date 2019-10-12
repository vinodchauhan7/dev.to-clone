"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CannotDetermineTypeError extends Error {
    constructor(typeName, propertyKey, parameterIndex) {
        let errorMessage = `Cannot determine type for ${typeName}#${propertyKey} `;
        if (parameterIndex !== undefined) {
            errorMessage += `parameter #${parameterIndex} `;
        }
        errorMessage += "!";
        super(errorMessage);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.CannotDetermineTypeError = CannotDetermineTypeError;
