import { Arguments } from '../models/interface';
import { SchematicCommand } from '../models/schematic-command';
import { Schema as NewCommandSchema } from './new';
import { } from '@angular/cli'
export class NewCommand extends SchematicCommand<NewCommandSchema> {
    public readonly allowMissingWorkspace = true;
    schematicName = 'ng-new';
    async initialize(options: NewCommandSchema & Arguments) {
        this.collectionName = options.collection || await this.getDefaultSchematicCollection();
        return super.initialize(options);
    }
    public async run(options: NewCommandSchema & Arguments) {
        // Register the version of the CLI in the registry.
        const packageJson = require('../package.json');
        const version = packageJson.version;
        this._workflow.registry.addSmartDefaultProvider('ng-cli-version', () => version);
        return this.runSchematic({
            collectionName: this.collectionName,
            schematicName: this.schematicName,
            schematicOptions: options['--'] || [],
            debug: !!options.debug,
            dryRun: !!options.dryRun,
            force: !!options.force,
        });
    }
}
