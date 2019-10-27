#!/usr/bin/env node
import { NestFactory } from '@nestjs/core';
import { ApiModule } from '@nger-cloud/webpack.api';
export async function bootstrap() {
    console.log(`app before created`)
    const app = await NestFactory.create(ApiModule)
    await app.init();
    console.log(`app after created`)
}
bootstrap().then(res => {
    console.log(res)
}).catch(e => {
    console.log(e.message)
});

