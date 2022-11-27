/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { MAT_MENU_CONTENT, _MatMenuContentBase } from '@angular/material/menu';
import * as i0 from "@angular/core";
/**
 * Menu content that will be rendered lazily once the menu is opened.
 * @deprecated Use `MatMenuContent` from `@angular/material/menu` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyMenuContent extends _MatMenuContentBase {
}
MatLegacyMenuContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyMenuContent, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyMenuContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyMenuContent, selector: "ng-template[matMenuContent]", providers: [{ provide: MAT_MENU_CONTENT, useExisting: MatLegacyMenuContent }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyMenuContent, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[matMenuContent]',
                    providers: [{ provide: MAT_MENU_CONTENT, useExisting: MatLegacyMenuContent }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1jb250ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1tZW51L21lbnUtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDOztBQUU3RTs7OztHQUlHO0FBS0gsTUFBTSxPQUFPLG9CQUFxQixTQUFRLG1CQUFtQjs7c0hBQWhELG9CQUFvQjswR0FBcEIsb0JBQW9CLHNEQUZwQixDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBQyxDQUFDO2dHQUVoRSxvQkFBb0I7a0JBSmhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxzQkFBc0IsRUFBQyxDQUFDO2lCQUM1RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01BVF9NRU5VX0NPTlRFTlQsIF9NYXRNZW51Q29udGVudEJhc2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuXG4vKipcbiAqIE1lbnUgY29udGVudCB0aGF0IHdpbGwgYmUgcmVuZGVyZWQgbGF6aWx5IG9uY2UgdGhlIG1lbnUgaXMgb3BlbmVkLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRNZW51Q29udGVudGAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVttYXRNZW51Q29udGVudF0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX01FTlVfQ09OVEVOVCwgdXNlRXhpc3Rpbmc6IE1hdExlZ2FjeU1lbnVDb250ZW50fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeU1lbnVDb250ZW50IGV4dGVuZHMgX01hdE1lbnVDb250ZW50QmFzZSB7fVxuIl19