"use strict";
/*
This "shim" can be used on the frontend to prevent from errors on undefined decorators,
when you are sharing same classes across backend and frontend.
To use this shim, simply set up your Webpack configuration
to use this file instead of a normal TypeGraphQL module.

plugins: [
    // ...here are any other existing plugins that you already have
    new webpack.NormalModuleReplacementPlugin(/type-graphql$/, resource => {
        resource.request = resource.request.replace(/type-graphql/, "type-graphql/dist/browser-shim");
    }),
]
*/
Object.defineProperty(exports, "__esModule", { value: true });
const dummyFn = () => void 0;
const dummyDecorator = () => dummyFn;
exports.Arg = dummyDecorator;
exports.Args = dummyDecorator;
exports.ArgsType = dummyDecorator;
exports.Authorized = dummyDecorator;
exports.Ctx = dummyDecorator;
exports.registerEnumType = dummyFn;
exports.Field = dummyDecorator;
exports.FieldResolver = dummyDecorator;
exports.Info = dummyDecorator;
exports.InputType = dummyDecorator;
exports.InterfaceType = dummyDecorator;
exports.Mutation = dummyDecorator;
exports.ObjectType = dummyDecorator;
exports.PubSub = dummyDecorator;
exports.Query = dummyDecorator;
exports.Resolver = dummyDecorator;
exports.Root = dummyDecorator;
exports.Subscription = dummyDecorator;
exports.createUnionType = dummyFn;
exports.UseMiddleware = dummyDecorator;
