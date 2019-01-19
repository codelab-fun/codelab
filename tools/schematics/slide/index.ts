import {
  chain,
  externalSchematic,
  Rule,
  Tree,
  SchematicContext,
  url
} from '@angular-devkit/schematics';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';
import * as fs from 'fs';
import { join } from 'path';
import { InsertChange } from '@schematics/angular/utility/change';

function overrideHtml(schema: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const path: string = host.actions.find(a =>
      a.path.endsWith('.component.html')
    ).path;
    const html = fs
      .readFileSync(join(__dirname, './files/template.component.html'), 'utf-8')
      .toString();
    host.overwrite(path, html);
  };
}

function updateSlidesModule(schema: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const modulePath: string = host.actions.find(a =>
      a.path.endsWith('.module.ts')
    ).path;
    // @codelab/slides
    const sourceFile = ts.createSourceFile(
      modulePath,
      host.read(modulePath).toString('utf-8'),
      ts.ScriptTarget.Latest,
      true
    );

    const code = fs
      .readFileSync(join(__dirname, './files/code.bs'), 'utf-8')
      .toString();

    const changes = addImportToModule(
      sourceFile,
      modulePath,
      'SlidesModule',
      '@codelab/slides'
    );

    const recorder = host.beginUpdate(modulePath);
    changes.forEach((change: InsertChange) => {
      recorder.insertLeft(change.pos, change.toAdd);
    });

    const classDeclaration = sourceFile.statements.find(s =>
      ts.isClassDeclaration(s)
    );
    recorder.insertLeft(classDeclaration.pos, code);
    host.commitUpdate(recorder);
  };
}

export default function(schema: any): Rule {
  console.log('schema', schema);
  return chain([
    externalSchematic('@schematics/angular', 'module', {
      name: schema.name,
      project: schema.project
    }),
    externalSchematic('@schematics/angular', 'component', {
      name: schema.name,
      project: schema.project
    }),
    updateSlidesModule(schema),
    overrideHtml(schema)
  ]);
}
