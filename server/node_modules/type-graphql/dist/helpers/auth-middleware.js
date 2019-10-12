"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../errors");
function AuthMiddleware(authChecker, authMode, roles) {
    return (action, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const accessGranted = yield authChecker(action, roles);
        if (!accessGranted) {
            if (authMode === "null") {
                return null;
            }
            else if (authMode === "error") {
                throw roles.length === 0 ? new errors_1.UnauthorizedError() : new errors_1.ForbiddenError();
            }
        }
        return next();
    });
}
exports.AuthMiddleware = AuthMiddleware;
