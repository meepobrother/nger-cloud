#!/usr/bin/env node
import { NestFactory } from '@nestjs/core';
import { ApiModule } from '@nger-cloud/webpack.api';
export async function bootstrap() {
    const app = await NestFactory.create(ApiModule);
    app.init();
}
bootstrap();
