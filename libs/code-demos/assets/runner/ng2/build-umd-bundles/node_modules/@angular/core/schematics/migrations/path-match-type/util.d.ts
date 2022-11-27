/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/core/schematics/migrations/path-match-type/util" />
import ts from 'typescript';
import { ImportManager } from '../../utils/import_manager';
export declare function findExpressionsToMigrate(sourceFile: ts.SourceFile, importManager: ImportManager): Map<ts.VariableDeclaration, ts.VariableDeclaration>;
