"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const auth_resolvers_1 = require("./api/auth-resolvers");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const boostrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(helmet_1.default());
    app.get('/refresh_token', (_, res) => {
        res.send({
            data: "Hello World!"
        });
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                auth_resolvers_1.AuthResolvers
            ]
        })
    });
    apolloServer.applyMiddleware({ app });
    app.listen('8080', () => {
        console.log('Server is listening on port 8080');
    });
});
boostrap();
//# sourceMappingURL=index.js.map