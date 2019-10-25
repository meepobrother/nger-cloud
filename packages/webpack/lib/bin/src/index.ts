#!/usr/bin/env node
import { NestFactory } from '@nestjs/core';
import { ApiModule } from '@nger-cloud/webpack.api';
export async function bootstrap() {
    console.log(`app before created`)
    return NestFactory.create(ApiModule)
        .then(app => {
            console.log(`create`)
            return app.init();
        }).catch(e => {
            console.log(e.message)
            throw e;
        });
}
bootstrap().then(res => {
    console.log(res)
}).catch(e => {
    console.log(e.message)
});
