"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const schema_generator_1 = require("../schema/schema-generator");
const loadResolversFromGlob_1 = require("../helpers/loadResolversFromGlob");
const emitSchemaDefinitionFile_1 = require("./emitSchemaDefinitionFile");
function buildSchema(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        loadResolvers(options);
        const schema = yield schema_generator_1.SchemaGenerator.generateFromMetadata(options);
        if (options.emitSchemaFile) {
            const { schemaFileName, printSchemaOptions } = getEmitSchemaDefinitionFileOptions(options);
            yield emitSchemaDefinitionFile_1.emitSchemaDefinitionFile(schemaFileName, schema, printSchemaOptions);
        }
        return schema;
    });
}
exports.buildSchema = buildSchema;
function buildSchemaSync(options) {
    loadResolvers(options);
    const schema = schema_generator_1.SchemaGenerator.generateFromMetadataSync(options);
    if (options.emitSchemaFile) {
        const { schemaFileName, printSchemaOptions } = getEmitSchemaDefinitionFileOptions(options);
        emitSchemaDefinitionFile_1.emitSchemaDefinitionFileSync(schemaFileName, schema, printSchemaOptions);
    }
    return schema;
}
exports.buildSchemaSync = buildSchemaSync;
function loadResolvers(options) {
    if (options.resolvers.length === 0) {
        throw new Error("Empty `resolvers` array property found in `buildSchema` options!");
    }
    options.resolvers.forEach(resolver => {
        if (typeof resolver === "string") {
            loadResolversFromGlob_1.loadResolversFromGlob(resolver);
        }
    });
}
function getEmitSchemaDefinitionFileOptions(buildSchemaOptions) {
    const defaultSchemaFilePath = path.resolve(process.cwd(), "schema.gql");
    return {
        schemaFileName: typeof buildSchemaOptions.emitSchemaFile === "string"
            ? buildSchemaOptions.emitSchemaFile
            : typeof buildSchemaOptions.emitSchemaFile === "object"
                ? buildSchemaOptions.emitSchemaFile.path || defaultSchemaFilePath
                : defaultSchemaFilePath,
        printSchemaOptions: typeof buildSchemaOptions.emitSchemaFile === "object"
            ? buildSchemaOptions.emitSchemaFile
            : emitSchemaDefinitionFile_1.defaultPrintSchemaOptions,
    };
}
