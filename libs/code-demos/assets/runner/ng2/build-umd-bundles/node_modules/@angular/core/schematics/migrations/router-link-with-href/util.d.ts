/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/core/schematics/migrations/router-link-with-href/util" />
import ts from 'typescript';
export declare const routerLink = "RouterLink";
export declare const routerLinkWithHref = "RouterLinkWithHref";
export declare const routerModule = "@angular/router";
export interface RewriteEntity {
    startPos: number;
    width: number;
    replacement: string;
}
export declare type RewriteFn = (startPos: number, width: number, text: string) => void;
export declare function migrateFile(sourceFile: ts.SourceFile, typeChecker: ts.TypeChecker, rewrite: RewriteFn): void;
