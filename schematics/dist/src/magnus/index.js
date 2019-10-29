"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMagnus(options) {
    return (tree, _context) => {
        tree.create(`${options.name}.ts`, ``);
        return tree;
    };
}
exports.createMagnus = createMagnus;
