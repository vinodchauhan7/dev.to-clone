"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function registerEnumType(enumObj, enumConfig) {
    getMetadataStorage_1.getMetadataStorage().collectEnumMetadata({
        enumObj,
        name: enumConfig.name,
        description: enumConfig.description,
    });
}
exports.registerEnumType = registerEnumType;
