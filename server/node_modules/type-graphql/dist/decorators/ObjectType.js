"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
const decorators_1 = require("../helpers/decorators");
function ObjectType(nameOrOptions, maybeOptions) {
    const { name, options } = decorators_1.getNameDecoratorParams(nameOrOptions, maybeOptions);
    const interfaceClasses = options.implements && [].concat(options.implements);
    return target => {
        getMetadataStorage_1.getMetadataStorage().collectObjectMetadata({
            name: name || target.name,
            target,
            description: options.description,
            interfaceClasses,
            isAbstract: options.isAbstract,
        });
    };
}
exports.ObjectType = ObjectType;
