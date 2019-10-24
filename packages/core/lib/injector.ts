import { Type } from "./type";

export abstract class Injector {
    parent: Injector | undefined;
    get<T>(type: Type<T>): T {
        if (this.parent)
            return this.parent.get(type);
    }
}
