"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const getMetadataStorage_1 = require("../metadata/getMetadataStorage");
const types_1 = require("../helpers/types");
const create_1 = require("../resolvers/create");
const build_context_1 = require("./build-context");
const errors_1 = require("../errors");
const utils_1 = require("./utils");
const graphql_version_1 = require("../utils/graphql-version");
class SchemaGenerator {
    static generateFromMetadata(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schema = this.generateFromMetadataSync(options);
            if (!options.skipCheck) {
                const { errors } = yield graphql_1.graphql(schema, graphql_1.getIntrospectionQuery());
                if (errors) {
                    throw new errors_1.GeneratingSchemaError(errors);
                }
            }
            return schema;
        });
    }
    static generateFromMetadataSync(options) {
        this.checkForErrors(options);
        build_context_1.BuildContext.create(options);
        getMetadataStorage_1.getMetadataStorage().build();
        this.buildTypesInfo();
        const schema = new graphql_1.GraphQLSchema({
            query: this.buildRootQueryType(),
            mutation: this.buildRootMutationType(),
            subscription: this.buildRootSubscriptionType(),
            types: this.buildOtherTypes(),
        });
        build_context_1.BuildContext.reset();
        return schema;
    }
    static checkForErrors(options) {
        graphql_version_1.ensureInstalledCorrectGraphQLPackage();
        if (getMetadataStorage_1.getMetadataStorage().authorizedFields.length !== 0 && options.authChecker === undefined) {
            throw new Error("You need to provide `authChecker` function for `@Authorized` decorator usage!");
        }
    }
    static getDefaultValue(typeInstance, typeOptions, fieldName, typeName) {
        const defaultValueFromInitializer = typeInstance[fieldName];
        if (typeOptions.defaultValue !== undefined &&
            defaultValueFromInitializer !== undefined &&
            typeOptions.defaultValue !== defaultValueFromInitializer) {
            throw new errors_1.ConflictingDefaultValuesError(typeName, fieldName, typeOptions.defaultValue, defaultValueFromInitializer);
        }
        return typeOptions.defaultValue !== undefined
            ? typeOptions.defaultValue
            : defaultValueFromInitializer;
    }
    static buildTypesInfo() {
        this.unionTypesInfo = getMetadataStorage_1.getMetadataStorage().unions.map(unionMetadata => {
            const unionClassTypes = unionMetadata.getClassTypes();
            return {
                unionSymbol: unionMetadata.symbol,
                type: new graphql_1.GraphQLUnionType({
                    name: unionMetadata.name,
                    description: unionMetadata.description,
                    types: () => unionClassTypes.map(objectType => this.objectTypesInfo.find(type => type.target === objectType).type),
                    resolveType: unionMetadata.resolveType
                        ? this.getResolveTypeFunction(unionMetadata.resolveType)
                        : instance => {
                            const instanceTarget = unionClassTypes.find(ClassType => instance instanceof ClassType);
                            if (!instanceTarget) {
                                throw new errors_1.UnionResolveTypeError(unionMetadata);
                            }
                            // TODO: refactor to map for quicker access
                            return this.objectTypesInfo.find(type => type.target === instanceTarget).type;
                        },
                }),
            };
        });
        this.enumTypesInfo = getMetadataStorage_1.getMetadataStorage().enums.map(enumMetadata => {
            const enumMap = types_1.getEnumValuesMap(enumMetadata.enumObj);
            return {
                enumObj: enumMetadata.enumObj,
                type: new graphql_1.GraphQLEnumType({
                    name: enumMetadata.name,
                    description: enumMetadata.description,
                    values: Object.keys(enumMap).reduce((enumConfig, enumKey) => {
                        enumConfig[enumKey] = {
                            value: enumMap[enumKey],
                        };
                        return enumConfig;
                    }, {}),
                }),
            };
        });
        this.interfaceTypesInfo = getMetadataStorage_1.getMetadataStorage().interfaceTypes.map(interfaceType => {
            const interfaceSuperClass = Object.getPrototypeOf(interfaceType.target);
            const hasExtended = interfaceSuperClass.prototype !== undefined;
            const getSuperClassType = () => {
                const superClassTypeInfo = this.interfaceTypesInfo.find(type => type.target === interfaceSuperClass);
                return superClassTypeInfo ? superClassTypeInfo.type : undefined;
            };
            const implementingObjectTypesTargets = getMetadataStorage_1.getMetadataStorage()
                .objectTypes.filter(objectType => objectType.interfaceClasses &&
                objectType.interfaceClasses.includes(interfaceType.target))
                .map(objectType => objectType.target);
            return {
                target: interfaceType.target,
                isAbstract: interfaceType.isAbstract || false,
                type: new graphql_1.GraphQLInterfaceType({
                    name: interfaceType.name,
                    description: interfaceType.description,
                    fields: () => {
                        let fields = interfaceType.fields.reduce((fieldsMap, field) => {
                            fieldsMap[field.schemaName] = {
                                description: field.description,
                                type: this.getGraphQLOutputType(field.name, field.getType(), field.typeOptions),
                            };
                            return fieldsMap;
                        }, {});
                        // support for extending interface classes - get field info from prototype
                        if (hasExtended) {
                            const superClass = getSuperClassType();
                            if (superClass) {
                                const superClassFields = utils_1.getFieldMetadataFromObjectType(superClass);
                                fields = Object.assign({}, superClassFields, fields);
                            }
                        }
                        return fields;
                    },
                    resolveType: interfaceType.resolveType
                        ? this.getResolveTypeFunction(interfaceType.resolveType)
                        : instance => {
                            const typeTarget = implementingObjectTypesTargets.find(typeCls => instance instanceof typeCls);
                            if (!typeTarget) {
                                throw new errors_1.InterfaceResolveTypeError(interfaceType);
                            }
                            return this.objectTypesInfo.find(type => type.target === typeTarget).type;
                        },
                }),
            };
        });
        this.objectTypesInfo = getMetadataStorage_1.getMetadataStorage().objectTypes.map(objectType => {
            const objectSuperClass = Object.getPrototypeOf(objectType.target);
            const hasExtended = objectSuperClass.prototype !== undefined;
            const getSuperClassType = () => {
                const superClassTypeInfo = this.objectTypesInfo.find(type => type.target === objectSuperClass);
                return superClassTypeInfo ? superClassTypeInfo.type : undefined;
            };
            const interfaceClasses = objectType.interfaceClasses || [];
            return {
                target: objectType.target,
                isAbstract: objectType.isAbstract || false,
                type: new graphql_1.GraphQLObjectType({
                    name: objectType.name,
                    description: objectType.description,
                    interfaces: () => {
                        let interfaces = interfaceClasses.map(interfaceClass => this.interfaceTypesInfo.find(info => info.target === interfaceClass).type);
                        // copy interfaces from super class
                        if (hasExtended) {
                            const superClass = getSuperClassType();
                            if (superClass) {
                                const superInterfaces = superClass.getInterfaces();
                                interfaces = Array.from(new Set(interfaces.concat(superInterfaces)));
                            }
                        }
                        return interfaces;
                    },
                    fields: () => {
                        let fields = objectType.fields.reduce((fieldsMap, field) => {
                            const fieldResolverMetadata = getMetadataStorage_1.getMetadataStorage().fieldResolvers.find(resolver => resolver.getObjectType() === objectType.target &&
                                resolver.methodName === field.name &&
                                (resolver.resolverClassMetadata === undefined ||
                                    resolver.resolverClassMetadata.isAbstract === false));
                            fieldsMap[field.schemaName] = {
                                type: this.getGraphQLOutputType(field.name, field.getType(), field.typeOptions),
                                complexity: field.complexity,
                                args: this.generateHandlerArgs(field.params),
                                resolve: fieldResolverMetadata
                                    ? create_1.createAdvancedFieldResolver(fieldResolverMetadata)
                                    : create_1.createSimpleFieldResolver(field),
                                description: field.description,
                                deprecationReason: field.deprecationReason,
                            };
                            return fieldsMap;
                        }, {});
                        // support for extending classes - get field info from prototype
                        if (hasExtended) {
                            const superClass = getSuperClassType();
                            if (superClass) {
                                const superClassFields = utils_1.getFieldMetadataFromObjectType(superClass);
                                fields = Object.assign({}, superClassFields, fields);
                            }
                        }
                        // support for implicitly implementing interfaces
                        // get fields from interfaces definitions
                        if (objectType.interfaceClasses) {
                            const interfacesFields = objectType.interfaceClasses.reduce((fieldsMap, interfaceClass) => {
                                const interfaceType = this.interfaceTypesInfo.find(type => type.target === interfaceClass).type;
                                return Object.assign(fieldsMap, utils_1.getFieldMetadataFromObjectType(interfaceType));
                            }, {});
                            fields = Object.assign({}, interfacesFields, fields);
                        }
                        return fields;
                    },
                }),
            };
        });
        this.inputTypesInfo = getMetadataStorage_1.getMetadataStorage().inputTypes.map(inputType => {
            const objectSuperClass = Object.getPrototypeOf(inputType.target);
            const getSuperClassType = () => {
                const superClassTypeInfo = this.inputTypesInfo.find(type => type.target === objectSuperClass);
                return superClassTypeInfo ? superClassTypeInfo.type : undefined;
            };
            const inputInstance = new inputType.target();
            return {
                target: inputType.target,
                isAbstract: inputType.isAbstract || false,
                type: new graphql_1.GraphQLInputObjectType({
                    name: inputType.name,
                    description: inputType.description,
                    fields: () => {
                        let fields = inputType.fields.reduce((fieldsMap, field) => {
                            field.typeOptions.defaultValue = this.getDefaultValue(inputInstance, field.typeOptions, field.name, inputType.name);
                            fieldsMap[field.schemaName] = {
                                description: field.description,
                                type: this.getGraphQLInputType(field.name, field.getType(), field.typeOptions),
                                defaultValue: field.typeOptions.defaultValue,
                            };
                            return fieldsMap;
                        }, {});
                        // support for extending classes - get field info from prototype
                        if (objectSuperClass.prototype !== undefined) {
                            const superClass = getSuperClassType();
                            if (superClass) {
                                const superClassFields = utils_1.getFieldMetadataFromInputType(superClass);
                                fields = Object.assign({}, superClassFields, fields);
                            }
                        }
                        return fields;
                    },
                }),
            };
        });
    }
    static buildRootQueryType() {
        return new graphql_1.GraphQLObjectType({
            name: "Query",
            fields: this.generateHandlerFields(getMetadataStorage_1.getMetadataStorage().queries),
        });
    }
    static buildRootMutationType() {
        if (getMetadataStorage_1.getMetadataStorage().mutations.length === 0) {
            return;
        }
        return new graphql_1.GraphQLObjectType({
            name: "Mutation",
            fields: this.generateHandlerFields(getMetadataStorage_1.getMetadataStorage().mutations),
        });
    }
    static buildRootSubscriptionType() {
        if (getMetadataStorage_1.getMetadataStorage().subscriptions.length === 0) {
            return;
        }
        return new graphql_1.GraphQLObjectType({
            name: "Subscription",
            fields: this.generateSubscriptionsFields(getMetadataStorage_1.getMetadataStorage().subscriptions),
        });
    }
    static buildOtherTypes() {
        // TODO: investigate the need of directly providing this types
        // maybe GraphQL can use only the types provided indirectly
        return [
            ...this.objectTypesInfo.filter(it => !it.isAbstract).map(it => it.type),
            ...this.interfaceTypesInfo.filter(it => !it.isAbstract).map(it => it.type),
            ...this.inputTypesInfo.filter(it => !it.isAbstract).map(it => it.type),
        ];
    }
    static generateHandlerFields(handlers) {
        return handlers.reduce((fields, handler) => {
            // omit emitting abstract resolver fields
            if (handler.resolverClassMetadata && handler.resolverClassMetadata.isAbstract) {
                return fields;
            }
            fields[handler.schemaName] = {
                type: this.getGraphQLOutputType(handler.methodName, handler.getReturnType(), handler.returnTypeOptions),
                args: this.generateHandlerArgs(handler.params),
                resolve: create_1.createHandlerResolver(handler),
                description: handler.description,
                deprecationReason: handler.deprecationReason,
                complexity: handler.complexity,
            };
            return fields;
        }, {});
    }
    static generateSubscriptionsFields(subscriptionsHandlers) {
        const { pubSub } = build_context_1.BuildContext;
        const basicFields = this.generateHandlerFields(subscriptionsHandlers);
        return subscriptionsHandlers.reduce((fields, handler) => {
            // omit emitting abstract resolver fields
            if (handler.resolverClassMetadata && handler.resolverClassMetadata.isAbstract) {
                return fields;
            }
            if (handler.subscribe) {
                fields[handler.schemaName].subscribe = handler.subscribe;
                return fields;
            }
            let pubSubIterator;
            if (typeof handler.topics === "function") {
                const getTopics = handler.topics;
                pubSubIterator = (payload, args, context, info) => {
                    const resolverTopicData = { payload, args, context, info };
                    const topics = getTopics(resolverTopicData);
                    if (Array.isArray(topics) && topics.length === 0) {
                        throw new errors_1.MissingSubscriptionTopicsError(handler.target, handler.methodName);
                    }
                    return pubSub.asyncIterator(topics);
                };
            }
            else {
                const topics = handler.topics;
                pubSubIterator = () => pubSub.asyncIterator(topics);
            }
            fields[handler.schemaName].subscribe = handler.filter
                ? graphql_subscriptions_1.withFilter(pubSubIterator, (payload, args, context, info) => {
                    const resolverFilterData = { payload, args, context, info };
                    return handler.filter(resolverFilterData);
                })
                : pubSubIterator;
            return fields;
        }, basicFields);
    }
    static generateHandlerArgs(params) {
        return params.reduce((args, param) => {
            if (param.kind === "arg") {
                args[param.name] = {
                    description: param.description,
                    type: this.getGraphQLInputType(param.name, param.getType(), param.typeOptions),
                    defaultValue: param.typeOptions.defaultValue,
                };
            }
            else if (param.kind === "args") {
                const argumentType = getMetadataStorage_1.getMetadataStorage().argumentTypes.find(it => it.target === param.getType());
                let superClass = Object.getPrototypeOf(argumentType.target);
                while (superClass.prototype !== undefined) {
                    const superArgumentType = getMetadataStorage_1.getMetadataStorage().argumentTypes.find(it => it.target === superClass);
                    if (superArgumentType) {
                        this.mapArgFields(superArgumentType, args);
                    }
                    superClass = Object.getPrototypeOf(superClass);
                }
                this.mapArgFields(argumentType, args);
            }
            return args;
        }, {});
    }
    static mapArgFields(argumentType, args = {}) {
        const argumentInstance = new argumentType.target();
        argumentType.fields.forEach(field => {
            field.typeOptions.defaultValue = this.getDefaultValue(argumentInstance, field.typeOptions, field.name, argumentType.name);
            args[field.schemaName] = {
                description: field.description,
                type: this.getGraphQLInputType(field.name, field.getType(), field.typeOptions),
                defaultValue: field.typeOptions.defaultValue,
            };
        });
    }
    static getGraphQLOutputType(typeOwnerName, type, typeOptions = {}) {
        let gqlType;
        gqlType = types_1.convertTypeIfScalar(type);
        if (!gqlType) {
            const objectType = this.objectTypesInfo.find(it => it.target === type);
            if (objectType) {
                gqlType = objectType.type;
            }
        }
        if (!gqlType) {
            const interfaceType = this.interfaceTypesInfo.find(it => it.target === type);
            if (interfaceType) {
                gqlType = interfaceType.type;
            }
        }
        if (!gqlType) {
            const enumType = this.enumTypesInfo.find(it => it.enumObj === type);
            if (enumType) {
                gqlType = enumType.type;
            }
        }
        if (!gqlType) {
            const unionType = this.unionTypesInfo.find(it => it.unionSymbol === type);
            if (unionType) {
                gqlType = unionType.type;
            }
        }
        if (!gqlType) {
            throw new Error(`Cannot determine GraphQL output type for ${typeOwnerName}`);
        }
        const { nullableByDefault } = build_context_1.BuildContext;
        return types_1.wrapWithTypeOptions(typeOwnerName, gqlType, typeOptions, nullableByDefault);
    }
    static getGraphQLInputType(typeOwnerName, type, typeOptions = {}) {
        let gqlType;
        gqlType = types_1.convertTypeIfScalar(type);
        if (!gqlType) {
            const inputType = this.inputTypesInfo.find(it => it.target === type);
            if (inputType) {
                gqlType = inputType.type;
            }
        }
        if (!gqlType) {
            const enumType = this.enumTypesInfo.find(it => it.enumObj === type);
            if (enumType) {
                gqlType = enumType.type;
            }
        }
        if (!gqlType) {
            throw new Error(`Cannot determine GraphQL input type for ${typeOwnerName}`);
        }
        const { nullableByDefault } = build_context_1.BuildContext;
        return types_1.wrapWithTypeOptions(typeOwnerName, gqlType, typeOptions, nullableByDefault);
    }
    static getResolveTypeFunction(resolveType) {
        return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resolvedType = yield resolveType(...args);
            if (typeof resolvedType === "string") {
                return resolvedType;
            }
            return this.objectTypesInfo.find(objectType => objectType.target === resolvedType).type;
        });
    }
}
SchemaGenerator.objectTypesInfo = [];
SchemaGenerator.inputTypesInfo = [];
SchemaGenerator.interfaceTypesInfo = [];
SchemaGenerator.enumTypesInfo = [];
SchemaGenerator.unionTypesInfo = [];
exports.SchemaGenerator = SchemaGenerator;
