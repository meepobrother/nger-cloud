import { Module } from "@nestjs/common";
import { Webpack } from "@nger-cloud/webpack.core";
import { WebpackImpl } from './webpack';
@Module({
    providers: [{
        provide: Webpack,
        useClass: WebpackImpl
    }],
    exports: [
        Webpack
    ]
})
export class BasicModule { }
