"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingSubscriptionTopicsError extends Error {
    constructor(target, methodName) {
        super(`${target}#${methodName} subscription has no provided topics!`);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.MissingSubscriptionTopicsError = MissingSubscriptionTopicsError;
