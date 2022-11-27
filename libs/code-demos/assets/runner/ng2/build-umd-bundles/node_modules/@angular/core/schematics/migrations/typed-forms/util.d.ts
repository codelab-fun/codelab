/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/core/schematics/migrations/typed-forms/util" />
import ts from 'typescript';
export declare const classes: Set<string>;
export declare const formControl = "FormControl";
export declare const untypedPrefix = "Untyped";
export declare const forms = "@angular/forms";
export interface MigratableNode {
    node: ts.Node;
    importName: string;
}
export declare type rewriteFn = (startPos: number, origLength: number, text: string) => void;
export declare function migrateFile(sourceFile: ts.SourceFile, typeChecker: ts.TypeChecker, rewrite: rewriteFn): void;
