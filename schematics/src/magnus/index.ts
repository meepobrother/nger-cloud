import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import Schema from './schema';
export function createMagnus(options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        tree.create(`${options.name}.ts`, ``);
        return tree;
    };
}
