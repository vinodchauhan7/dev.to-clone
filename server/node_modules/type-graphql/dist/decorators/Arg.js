"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
const params_1 = require("../helpers/params");
const decorators_1 = require("../helpers/decorators");
function Arg(name, returnTypeFuncOrOptions, maybeOptions) {
    return (prototype, propertyKey, parameterIndex) => {
        const { options, returnTypeFunc } = decorators_1.getTypeDecoratorParams(returnTypeFuncOrOptions, maybeOptions);
        getMetadataStorage_1.getMetadataStorage().collectHandlerParamMetadata(Object.assign({ kind: "arg", name, description: options.description }, params_1.getParamInfo({ prototype, propertyKey, parameterIndex, returnTypeFunc, options })));
    };
}
exports.Arg = Arg;
