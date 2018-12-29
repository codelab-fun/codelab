import { chain, externalSchematic, Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';
import { InsertChange } from '@schematics/angular/utility/change';

function importSlidesModule(schema: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const modulePath: string = host.actions.find(a => a.path.endsWith('.module.ts')).path;
    // @angular-presentation/slides
    const sourceFile = ts.createSourceFile(
      modulePath,
      host.read(modulePath).toString('utf-8'), 
      ts.ScriptTarget.Latest, 
      true
    );



    const changes = addImportToModule(sourceFile, modulePath, "SlidesModule", '@angular-presentation/slides');

    const recorder = host.beginUpdate(modulePath);
    changes.forEach((change: InsertChange) => {
      recorder.insertLeft(change.pos, change.toAdd);
    });
    host.commitUpdate(recorder);
  }
}

export default function (schema: any): Rule {
  console.log("schema", schema);
  return chain([
    externalSchematic('@schematics/angular', 'module', {
      name: schema.name,
      project: schema.project
    }),
    externalSchematic('@schematics/angular', 'component', {
      name: schema.name,
      project: schema.project
    }),
    importSlidesModule(schema)
  ]);
}
