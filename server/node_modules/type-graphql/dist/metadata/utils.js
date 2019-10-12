"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isThrowing_1 = require("../helpers/isThrowing");
const errors_1 = require("../errors");
function mapSuperResolverHandlers(definitions, superResolver, resolverMetadata) {
    const superMetadata = definitions.filter(subscription => subscription.target === superResolver);
    return superMetadata.map(metadata => (Object.assign({}, metadata, { target: resolverMetadata.target, resolverClassMetadata: resolverMetadata })));
}
exports.mapSuperResolverHandlers = mapSuperResolverHandlers;
function mapSuperFieldResolverHandlers(definitions, superResolver, resolverMetadata) {
    const superMetadata = mapSuperResolverHandlers(definitions, superResolver, resolverMetadata);
    return superMetadata.map(metadata => (Object.assign({}, metadata, { getObjectType: isThrowing_1.isThrowing(metadata.getObjectType)
            ? resolverMetadata.getObjectType
            : metadata.getObjectType })));
}
exports.mapSuperFieldResolverHandlers = mapSuperFieldResolverHandlers;
function mapMiddlewareMetadataToArray(metadata) {
    return metadata
        .map(m => m.middlewares)
        .reduce((middlewares, resultArray) => resultArray.concat(middlewares), []);
}
exports.mapMiddlewareMetadataToArray = mapMiddlewareMetadataToArray;
function ensureReflectMetadataExists() {
    if (typeof Reflect !== "object" ||
        typeof Reflect.decorate !== "function" ||
        typeof Reflect.metadata !== "function") {
        throw new errors_1.ReflectMetadataMissingError();
    }
}
exports.ensureReflectMetadataExists = ensureReflectMetadataExists;
