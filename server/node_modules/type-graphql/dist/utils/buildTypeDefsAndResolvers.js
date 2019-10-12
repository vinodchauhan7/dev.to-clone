"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const buildSchema_1 = require("./buildSchema");
const createResolversMap_1 = require("./createResolversMap");
function buildTypeDefsAndResolvers(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const schema = yield buildSchema_1.buildSchema(options);
        const typeDefs = graphql_1.printSchema(schema);
        const resolvers = createResolversMap_1.createResolversMap(schema);
        return { typeDefs, resolvers };
    });
}
exports.buildTypeDefsAndResolvers = buildTypeDefsAndResolvers;
