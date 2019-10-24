import { Module } from "@nestjs/common";
import { Webpack } from "@nger-cloud/webpack.domain";
import { WebpackImpl } from './webpack';
@Module({
    providers: [{
        provide: Webpack,
        useClass: WebpackImpl
    }]
})
export class BasicModule { }
