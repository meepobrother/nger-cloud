import {
    Rule,
    SchematicContext,
    Tree,
    apply,
    chain,
    mergeWith,
    schematic,
    template,
    url,
} from '@angular-devkit/schematics';
import Schema from './schema';
export default function (options: Schema): Rule {
    return chain([
        (_tree: Tree, context: SchematicContext) => {
            context.logger.info('My Full Schematic: ' + JSON.stringify(options));
        },
        schematic('magnus', { name: 'magnus' }),
        mergeWith(apply(url('./files'), [
            template({
                author: options.author,
                name: options.name,
            }),
        ])),
    ]);
}
