"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Injector {
    get(type) {
        if (this.parent)
            return this.parent.get(type);
    }
}
exports.Injector = Injector;
