/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/core/schematics/migrations/relative-link-resolution/util" />
import ts from 'typescript';
export interface RewriteEntity {
    startPos: number;
    width: number;
    replacement: string;
}
export interface MigratableNode {
    objectLiteral: ts.ObjectLiteralExpression;
    property: ts.ObjectLiteralElementLike;
}
export declare type RewriteFn = (startPos: number, origLength: number, text: string) => void;
export declare function migrateFile(sourceFile: ts.SourceFile, rewriteFn: RewriteFn): void;
