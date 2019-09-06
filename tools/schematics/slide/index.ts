import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import * as fs from 'fs';
import { join } from 'path';
import { InsertChange } from '@schematics/angular/utility/change';
import { classify } from '@angular-devkit/core/src/utils/strings';

function overrideHtml(): Rule {
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

interface SlideSchema {
  name: string;
  project: string;
}

function updateSlidesModule(schema: SlideSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const modulePath: string = host.actions.find(a =>
      a.path.endsWith('.module.ts')
    ).path;

    const sourceFile = ts.createSourceFile(
      modulePath,
      host.read(modulePath).toString('utf-8'),
      ts.ScriptTarget.Latest,
      true
    );

    let code = fs
      .readFileSync(join(__dirname, './files/code.bs'), 'utf-8')
      .toString();

    const componentName = classify(schema.name.split('/').pop()) + 'Component';

    code = code.replace('EmptyComponent', componentName);

    const moduleImportChanges = addImportToModule(
      sourceFile,
      modulePath,
      'SlidesModule',
      '@codelab/slides'
    );

    const routingImportChanges = addImportToModule(
      sourceFile,
      modulePath,
      'routes',
      null
    );

    const changes = [...moduleImportChanges, ...routingImportChanges];

    const recorder = host.beginUpdate(modulePath);
    changes.forEach((change: InsertChange) => {
      recorder.insertLeft(change.pos, change.toAdd);
    });

    const classDeclaration = [...sourceFile.statements].find(s =>
      ts.isClassDeclaration(s)
    );
    recorder.insertLeft(classDeclaration.pos, code);

    [...sourceFile.statements].find(s => ts.isIdentifier(s));

    host.commitUpdate(recorder);
  };
}

export default function(schema: SlideSchema): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'module', {
      name: schema.name,
      project: schema.project
    }),
    updateSlidesModule(schema),
    externalSchematic('@schematics/angular', 'component', {
      name: schema.name,
      project: schema.project
    }),
    overrideHtml()
  ]);
}
