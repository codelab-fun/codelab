/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/core/schematics/migrations/path-match-type/transform" />
import ts from 'typescript';
import { UpdateRecorder } from './update_recorder';
export declare class PathMatchTypeTransform {
    private getUpdateRecorder;
    private printer;
    private importManager;
    constructor(getUpdateRecorder: (sf: ts.SourceFile) => UpdateRecorder);
    migrate(sourceFiles: ts.SourceFile[]): void;
    /** Records all changes that were made in the import manager. */
    recordChanges(): void;
}
