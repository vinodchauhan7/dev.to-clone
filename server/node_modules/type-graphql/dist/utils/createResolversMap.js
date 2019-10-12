"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
function createResolversMap(schema) {
    const typeMap = schema.getTypeMap();
    return Object.keys(typeMap)
        .filter(typeName => !typeName.includes("__"))
        .reduce((resolversMap, typeName) => {
        const type = typeMap[typeName];
        if (type instanceof graphql_1.GraphQLObjectType) {
            resolversMap[typeName] = Object.assign({}, (type.isTypeOf && {
                __isTypeOf: type.isTypeOf,
            }), generateFieldsResolvers(type.getFields()));
        }
        if (type instanceof graphql_1.GraphQLInterfaceType) {
            resolversMap[typeName] = Object.assign({ __resolveType: generateTypeResolver(type, schema) }, generateFieldsResolvers(type.getFields()));
        }
        if (type instanceof graphql_1.GraphQLScalarType) {
            resolversMap[typeName] = type;
        }
        if (type instanceof graphql_1.GraphQLEnumType) {
            const enumValues = type.getValues();
            resolversMap[typeName] = enumValues.reduce((enumMap, { name, value }) => {
                enumMap[name] = value;
                return enumMap;
            }, {});
        }
        if (type instanceof graphql_1.GraphQLUnionType) {
            resolversMap[typeName] = {
                __resolveType: generateTypeResolver(type, schema),
            };
        }
        return resolversMap;
    }, {});
}
exports.createResolversMap = createResolversMap;
function generateTypeResolver(abstractType, schema) {
    if (abstractType.resolveType) {
        return (source, context, info) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const detectedType = yield abstractType.resolveType(source, context, info);
            if (detectedType instanceof graphql_1.GraphQLObjectType) {
                return detectedType.name;
            }
            return detectedType;
        });
    }
    const possibleObjectTypes = schema.getPossibleTypes(abstractType);
    return (source, context, info) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (const objectType of possibleObjectTypes) {
            if (objectType.isTypeOf && (yield objectType.isTypeOf(source, context, info))) {
                return objectType.name;
            }
        }
        return null;
    });
}
function generateFieldsResolvers(fields) {
    return Object.keys(fields).reduce((fieldsMap, fieldName) => {
        const field = fields[fieldName];
        if (field.subscribe) {
            fieldsMap[fieldName] = {
                subscribe: field.subscribe,
                resolve: field.resolve,
            };
        }
        else if (field.resolve) {
            fieldsMap[fieldName] = field.resolve;
        }
        return fieldsMap;
    }, {});
}
