"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const utils_1 = require("./utils");
class MetadataStorage {
    constructor() {
        this.queries = [];
        this.mutations = [];
        this.subscriptions = [];
        this.fieldResolvers = [];
        this.objectTypes = [];
        this.inputTypes = [];
        this.argumentTypes = [];
        this.interfaceTypes = [];
        this.authorizedFields = [];
        this.enums = [];
        this.unions = [];
        this.middlewares = [];
        this.resolverClasses = [];
        this.fields = [];
        this.params = [];
        utils_1.ensureReflectMetadataExists();
    }
    collectQueryHandlerMetadata(definition) {
        this.queries.push(definition);
    }
    collectMutationHandlerMetadata(definition) {
        this.mutations.push(definition);
    }
    collectSubscriptionHandlerMetadata(definition) {
        this.subscriptions.push(definition);
    }
    collectFieldResolverMetadata(definition) {
        this.fieldResolvers.push(definition);
    }
    collectObjectMetadata(definition) {
        this.objectTypes.push(definition);
    }
    collectInputMetadata(definition) {
        this.inputTypes.push(definition);
    }
    collectArgsMetadata(definition) {
        this.argumentTypes.push(definition);
    }
    collectInterfaceMetadata(definition) {
        this.interfaceTypes.push(definition);
    }
    collectAuthorizedFieldMetadata(definition) {
        this.authorizedFields.push(definition);
    }
    collectEnumMetadata(definition) {
        this.enums.push(definition);
    }
    collectUnionMetadata(definition) {
        const unionSymbol = Symbol(definition.name);
        this.unions.push(Object.assign({}, definition, { symbol: unionSymbol }));
        return unionSymbol;
    }
    collectMiddlewareMetadata(definition) {
        this.middlewares.push(definition);
    }
    collectResolverClassMetadata(definition) {
        this.resolverClasses.push(definition);
    }
    collectClassFieldMetadata(definition) {
        this.fields.push(definition);
    }
    collectHandlerParamMetadata(definition) {
        this.params.push(definition);
    }
    build() {
        // TODO: disable next build attempts
        this.buildClassMetadata(this.objectTypes);
        this.buildClassMetadata(this.inputTypes);
        this.buildClassMetadata(this.argumentTypes);
        this.buildClassMetadata(this.interfaceTypes);
        this.buildFieldResolverMetadata(this.fieldResolvers);
        this.buildResolversMetadata(this.queries);
        this.buildResolversMetadata(this.mutations);
        this.buildResolversMetadata(this.subscriptions);
        this.buildExtendedResolversMetadata();
    }
    clear() {
        this.queries = [];
        this.mutations = [];
        this.subscriptions = [];
        this.fieldResolvers = [];
        this.objectTypes = [];
        this.inputTypes = [];
        this.argumentTypes = [];
        this.interfaceTypes = [];
        this.authorizedFields = [];
        this.enums = [];
        this.unions = [];
        this.middlewares = [];
        this.resolverClasses = [];
        this.fields = [];
        this.params = [];
    }
    buildClassMetadata(definitions) {
        definitions.forEach(def => {
            const fields = this.fields.filter(field => field.target === def.target);
            fields.forEach(field => {
                field.roles = this.findFieldRoles(field.target, field.name);
                field.params = this.params.filter(param => param.target === field.target && field.name === param.methodName);
                field.middlewares = utils_1.mapMiddlewareMetadataToArray(this.middlewares.filter(middleware => middleware.target === field.target && middleware.fieldName === field.name));
            });
            def.fields = fields;
        });
    }
    buildResolversMetadata(definitions) {
        definitions.forEach(def => {
            const resolverClassMetadata = this.resolverClasses.find(resolver => resolver.target === def.target);
            def.resolverClassMetadata = resolverClassMetadata;
            def.params = this.params.filter(param => param.target === def.target && def.methodName === param.methodName);
            def.roles = this.findFieldRoles(def.target, def.methodName);
            def.middlewares = utils_1.mapMiddlewareMetadataToArray(this.middlewares.filter(middleware => middleware.target === def.target && def.methodName === middleware.fieldName));
        });
    }
    buildFieldResolverMetadata(definitions) {
        this.buildResolversMetadata(definitions);
        definitions.forEach(def => {
            def.roles = this.findFieldRoles(def.target, def.methodName);
            def.getObjectType =
                def.kind === "external"
                    ? this.resolverClasses.find(resolver => resolver.target === def.target).getObjectType
                    : () => def.target;
            if (def.kind === "external") {
                const objectTypeCls = this.resolverClasses.find(resolver => resolver.target === def.target)
                    .getObjectType();
                const objectType = this.objectTypes.find(objTypeDef => objTypeDef.target === objectTypeCls);
                const objectTypeField = objectType.fields.find(fieldDef => fieldDef.name === def.methodName);
                if (!objectTypeField) {
                    if (!def.getType || !def.typeOptions) {
                        throw new errors_1.NoExplicitTypeError(def.target.name, def.methodName);
                    }
                    const fieldMetadata = {
                        name: def.methodName,
                        schemaName: def.schemaName,
                        getType: def.getType,
                        target: objectTypeCls,
                        typeOptions: def.typeOptions,
                        deprecationReason: def.deprecationReason,
                        description: def.description,
                        complexity: def.complexity,
                        roles: def.roles,
                        middlewares: def.middlewares,
                        params: def.params,
                    };
                    this.collectClassFieldMetadata(fieldMetadata);
                    objectType.fields.push(fieldMetadata);
                }
                else {
                    objectTypeField.complexity = def.complexity;
                    if (objectTypeField.params.length === 0) {
                        objectTypeField.params = def.params;
                    }
                    if (def.roles) {
                        objectTypeField.roles = def.roles;
                    }
                    else if (objectTypeField.roles) {
                        def.roles = objectTypeField.roles;
                    }
                }
            }
        });
    }
    buildExtendedResolversMetadata() {
        this.resolverClasses.forEach(def => {
            const target = def.target;
            let superResolver = Object.getPrototypeOf(target);
            // copy and modify metadata of resolver from parent resolver class
            while (superResolver.prototype) {
                const superResolverMetadata = this.resolverClasses.find(it => it.target === superResolver);
                if (superResolverMetadata) {
                    this.queries.unshift(...utils_1.mapSuperResolverHandlers(this.queries, superResolver, def));
                    this.mutations.unshift(...utils_1.mapSuperResolverHandlers(this.mutations, superResolver, def));
                    this.subscriptions.unshift(...utils_1.mapSuperResolverHandlers(this.subscriptions, superResolver, def));
                    this.fieldResolvers.unshift(...utils_1.mapSuperFieldResolverHandlers(this.fieldResolvers, superResolver, def));
                }
                superResolver = Object.getPrototypeOf(superResolver);
            }
        });
    }
    findFieldRoles(target, fieldName) {
        const authorizedField = this.authorizedFields.find(authField => authField.target === target && authField.fieldName === fieldName);
        if (!authorizedField) {
            return;
        }
        return authorizedField.roles;
    }
}
exports.MetadataStorage = MetadataStorage;
