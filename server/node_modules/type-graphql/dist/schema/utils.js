"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function getFieldMetadataFromInputType(type) {
    const fieldInfo = type.getFields();
    const typeFields = Object.keys(fieldInfo).reduce((fieldsMap, fieldName) => {
        const superField = fieldInfo[fieldName];
        fieldsMap[fieldName] = {
            type: superField.type,
            description: superField.description,
            defaultValue: superField.defaultValue,
        };
        return fieldsMap;
    }, {});
    return typeFields;
}
exports.getFieldMetadataFromInputType = getFieldMetadataFromInputType;
function getFieldMetadataFromObjectType(type) {
    const fieldInfo = type.getFields();
    const typeFields = Object.keys(fieldInfo).reduce((fieldsMap, fieldName) => {
        const superField = fieldInfo[fieldName];
        fieldsMap[fieldName] = {
            type: superField.type,
            args: superField.args.reduce((argMap, _a) => {
                var { name } = _a, arg = tslib_1.__rest(_a, ["name"]);
                argMap[name] = arg;
                return argMap;
            }, {}),
            resolve: superField.resolve,
            description: superField.description,
            deprecationReason: superField.deprecationReason,
        };
        return fieldsMap;
    }, {});
    return typeFields;
}
exports.getFieldMetadataFromObjectType = getFieldMetadataFromObjectType;
