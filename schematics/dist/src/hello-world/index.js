"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function helloWorld(options) {
    return (tree, _context) => {
        tree.create("hello-world.html", `<h1>Hello ${options.name} 👋</h1>`);
        return tree;
    };
}
exports.helloWorld = helloWorld;
