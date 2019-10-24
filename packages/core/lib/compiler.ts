import { Type } from "./type";
export abstract class ModuleFactory<T>{
    instance: T;
}
export abstract class Compiler {
    abstract compileModuleSync<T>(): ModuleFactory<T>;
    abstract compileModuleAsync<T>(): Promise<ModuleFactory<T>>;
    abstract clearCache(): void;
    abstract clearCacheFor<T = any>(type: Type<T>): void;
    abstract getModuleId<T = any>(moduleType: Type<T>): string | undefined;
}
