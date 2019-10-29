"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    return schematics_1.chain([
        (_tree, context) => {
            context.logger.info('My Full Schematic: ' + JSON.stringify(options));
        },
        schematics_1.schematic('magnus', { name: 'magnus' }),
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.template({
                author: options.author,
                name: options.name,
            }),
        ])),
    ]);
}
exports.default = default_1;
