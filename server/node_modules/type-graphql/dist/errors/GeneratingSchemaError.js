"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneratingSchemaError extends Error {
    constructor(details) {
        super("Generating schema error");
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.GeneratingSchemaError = GeneratingSchemaError;
