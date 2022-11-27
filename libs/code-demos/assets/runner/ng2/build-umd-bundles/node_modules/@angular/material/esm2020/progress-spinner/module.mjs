/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatProgressSpinner, MatSpinner } from './progress-spinner';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class MatProgressSpinnerModule {
}
MatProgressSpinnerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatProgressSpinnerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatProgressSpinnerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatProgressSpinnerModule, declarations: [MatProgressSpinner, MatSpinner], imports: [CommonModule], exports: [MatProgressSpinner, MatSpinner, MatCommonModule] });
MatProgressSpinnerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatProgressSpinnerModule, imports: [CommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatProgressSpinnerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [MatProgressSpinner, MatSpinner, MatCommonModule],
                    declarations: [MatProgressSpinner, MatSpinner],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXIvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBTzdDLE1BQU0sT0FBTyx3QkFBd0I7OzBIQUF4Qix3QkFBd0I7MkhBQXhCLHdCQUF3QixpQkFGcEIsa0JBQWtCLEVBQUUsVUFBVSxhQUZuQyxZQUFZLGFBQ1osa0JBQWtCLEVBQUUsVUFBVSxFQUFFLGVBQWU7MkhBRzlDLHdCQUF3QixZQUp6QixZQUFZLEVBQ29CLGVBQWU7Z0dBRzlDLHdCQUF3QjtrQkFMcEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUM7b0JBQzFELFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQztpQkFDL0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdFByb2dyZXNzU3Bpbm5lciwgTWF0U3Bpbm5lcn0gZnJvbSAnLi9wcm9ncmVzcy1zcGlubmVyJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdFByb2dyZXNzU3Bpbm5lciwgTWF0U3Bpbm5lciwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0UHJvZ3Jlc3NTcGlubmVyLCBNYXRTcGlubmVyXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlIHt9XG4iXX0=