"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ArgumentValidationError_1 = require("../errors/ArgumentValidationError");
function validateArg(arg, globalValidate, argValidate) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const validate = argValidate !== undefined ? argValidate : globalValidate;
        if (validate === false || arg == null || typeof arg !== "object") {
            return arg;
        }
        const validatorOptions = Object.assign({}, typeof globalValidate === "object" ? globalValidate : {}, typeof argValidate === "object" ? argValidate : {});
        if (validatorOptions.skipMissingProperties !== false) {
            validatorOptions.skipMissingProperties = true;
        }
        const { validateOrReject } = yield Promise.resolve().then(() => require("class-validator"));
        try {
            yield validateOrReject(arg, validatorOptions);
            return arg;
        }
        catch (err) {
            throw new ArgumentValidationError_1.ArgumentValidationError(err);
        }
    });
}
exports.validateArg = validateArg;
