import { Module } from "@nestjs/common";
import { BasicModule } from "@nger-cloud/webpack.basic";

@Module({
    imports: [
        BasicModule
    ]
})
export class DomainModule { }
export { Webpack } from './webpack';
