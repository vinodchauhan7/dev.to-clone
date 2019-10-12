"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isThrowing(fn) {
    try {
        fn();
        return false;
    }
    catch (_a) {
        return true;
    }
}
exports.isThrowing = isThrowing;
