"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_storage_1 = require("../metadata/metadata-storage");
function getMetadataStorage() {
    return (global.TypeGraphQLMetadataStorage || (global.TypeGraphQLMetadataStorage = new metadata_storage_1.MetadataStorage()));
}
exports.getMetadataStorage = getMetadataStorage;
