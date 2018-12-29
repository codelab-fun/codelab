import { chain, externalSchematic, Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';

function importSlidesModule(modulePath: string): Rule {
  return (host: Tree, context: SchematicContext) => {

    // @angular-presentation/slides
    const sourceFile = ts.createSourceFile(
      modulePath,
      host.read(modulePath).toString('utf-8'), 
      ts.ScriptTarget.Latest, 
      true
    );



    const changes = addImportToModule(sourceFile, modulePath, "SlidesModule", '@angular-presentation/slides');
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
    importSlidesModule
  ]);
}
