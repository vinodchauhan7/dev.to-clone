"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.GraphQLISODateTime = new graphql_1.GraphQLScalarType({
    name: "DateTime",
    description: "The javascript `Date` as string. Type represents date and time as the ISO Date string.",
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return null;
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});
