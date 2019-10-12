"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types_1 = require("../helpers/types");
const validate_arg_1 = require("./validate-arg");
const auth_middleware_1 = require("../helpers/auth-middleware");
function getParams(params, resolverData, globalValidate, pubSub) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return Promise.all(params
            .sort((a, b) => a.index - b.index)
            .map((paramInfo) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            switch (paramInfo.kind) {
                case "args":
                    return yield validate_arg_1.validateArg(types_1.convertToType(paramInfo.getType(), resolverData.args), globalValidate, paramInfo.validate);
                case "arg":
                    return yield validate_arg_1.validateArg(types_1.convertToType(paramInfo.getType(), resolverData.args[paramInfo.name]), globalValidate, paramInfo.validate);
                case "context":
                    if (paramInfo.propertyName) {
                        return resolverData.context[paramInfo.propertyName];
                    }
                    return resolverData.context;
                case "root":
                    const rootValue = paramInfo.propertyName
                        ? resolverData.root[paramInfo.propertyName]
                        : resolverData.root;
                    if (!paramInfo.getType) {
                        return rootValue;
                    }
                    return types_1.convertToType(paramInfo.getType(), rootValue);
                case "info":
                    return resolverData.info;
                case "pubSub":
                    if (paramInfo.triggerKey) {
                        return (payload) => pubSub.publish(paramInfo.triggerKey, payload);
                    }
                    return pubSub;
                case "custom":
                    return yield paramInfo.resolver(resolverData);
            }
        })));
    });
}
exports.getParams = getParams;
function applyAuthChecker(middlewares, authMode, authChecker, roles) {
    if (authChecker && roles) {
        middlewares.unshift(auth_middleware_1.AuthMiddleware(authChecker, authMode, roles));
    }
}
exports.applyAuthChecker = applyAuthChecker;
function applyMiddlewares(container, resolverData, middlewares, resolverHandlerFunction) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let middlewaresIndex = -1;
        function dispatchHandler(currentIndex) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (currentIndex <= middlewaresIndex) {
                    throw new Error("next() called multiple times");
                }
                middlewaresIndex = currentIndex;
                let handlerFn;
                if (currentIndex === middlewares.length) {
                    handlerFn = resolverHandlerFunction;
                }
                else {
                    const currentMiddleware = middlewares[currentIndex];
                    // arrow function or class
                    if (currentMiddleware.prototype !== undefined) {
                        const middlewareClassInstance = container.getInstance(currentMiddleware, resolverData);
                        handlerFn = middlewareClassInstance.use.bind(middlewareClassInstance);
                    }
                    else {
                        handlerFn = currentMiddleware;
                    }
                }
                let nextResult;
                const result = yield handlerFn(resolverData, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    nextResult = yield dispatchHandler(currentIndex + 1);
                    return nextResult;
                }));
                return result !== undefined ? result : nextResult;
            });
        }
        return dispatchHandler(0);
    });
}
exports.applyMiddlewares = applyMiddlewares;
