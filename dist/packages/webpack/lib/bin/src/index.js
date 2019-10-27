#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const webpack_api_1 = require("@nger-cloud/webpack.api");
async function bootstrap() {
    console.log(`app before created`);
    const app = await core_1.NestFactory.create(webpack_api_1.ApiModule);
    await app.init();
    console.log(`app after created`);
}
exports.bootstrap = bootstrap;
bootstrap().then(res => {
    console.log(res);
}).catch(e => {
    console.log(e.message);
});
