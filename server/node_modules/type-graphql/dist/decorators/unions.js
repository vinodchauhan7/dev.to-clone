"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
function createUnionType({ name, description, types: classTypesOrClassTypesFn, resolveType, }) {
    const unionMetadataSymbol = getMetadataStorage_1.getMetadataStorage().collectUnionMetadata({
        name,
        description,
        getClassTypes: typeof classTypesOrClassTypesFn === "function"
            ? classTypesOrClassTypesFn
            : () => classTypesOrClassTypesFn,
        resolveType,
    });
    return unionMetadataSymbol;
}
exports.createUnionType = createUnionType;
