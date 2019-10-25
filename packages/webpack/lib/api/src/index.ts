import { Module, OnModuleInit } from "@nestjs/common";
import { DomainModule } from '@nger-cloud/webpack.domain';

@Module({
    imports: [
        DomainModule
    ]
})
export class ApiModule implements OnModuleInit {
    async onModuleInit() {
        console.log(`api module run`)
    }
}
