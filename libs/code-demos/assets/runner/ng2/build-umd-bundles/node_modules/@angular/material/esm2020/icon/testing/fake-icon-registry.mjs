/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { of as observableOf } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * A null icon registry that must be imported to allow disabling of custom
 * icons.
 */
export class FakeMatIconRegistry {
    addSvgIcon() {
        return this;
    }
    addSvgIconLiteral() {
        return this;
    }
    addSvgIconInNamespace() {
        return this;
    }
    addSvgIconLiteralInNamespace() {
        return this;
    }
    addSvgIconSet() {
        return this;
    }
    addSvgIconSetLiteral() {
        return this;
    }
    addSvgIconSetInNamespace() {
        return this;
    }
    addSvgIconSetLiteralInNamespace() {
        return this;
    }
    registerFontClassAlias() {
        return this;
    }
    classNameForFontAlias(alias) {
        return alias;
    }
    getDefaultFontSetClass() {
        return ['material-icons'];
    }
    getSvgIconFromUrl() {
        return observableOf(this._generateEmptySvg());
    }
    getNamedSvgIcon() {
        return observableOf(this._generateEmptySvg());
    }
    setDefaultFontSetClass() {
        return this;
    }
    addSvgIconResolver() {
        return this;
    }
    ngOnDestroy() { }
    _generateEmptySvg() {
        const emptySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        emptySvg.classList.add('fake-testing-svg');
        // Emulate real icon characteristics from `MatIconRegistry` so size remains consistent in tests.
        emptySvg.setAttribute('fit', '');
        emptySvg.setAttribute('height', '100%');
        emptySvg.setAttribute('width', '100%');
        emptySvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        emptySvg.setAttribute('focusable', 'false');
        return emptySvg;
    }
}
FakeMatIconRegistry.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: FakeMatIconRegistry, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FakeMatIconRegistry.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: FakeMatIconRegistry });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: FakeMatIconRegistry, decorators: [{
            type: Injectable
        }] });
/** Import this module in tests to install the null icon registry. */
export class MatIconTestingModule {
}
MatIconTestingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatIconTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatIconTestingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatIconTestingModule });
MatIconTestingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatIconTestingModule, providers: [{ provide: MatIconRegistry, useClass: FakeMatIconRegistry }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatIconTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [{ provide: MatIconRegistry, useClass: FakeMatIconRegistry }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZS1pY29uLXJlZ2lzdHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2ljb24vdGVzdGluZy9mYWtlLWljb24tcmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBYSxFQUFFLElBQUksWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQU1wRDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxxQkFBcUI7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsNEJBQTRCO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsd0JBQXdCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELCtCQUErQjtRQUM3QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQscUJBQXFCLENBQUMsS0FBYTtRQUNqQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVcsS0FBSSxDQUFDO0lBRVIsaUJBQWlCO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0UsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMzQyxnR0FBZ0c7UUFDaEcsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkMsUUFBUSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM5RCxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOztxSEF6RVUsbUJBQW1CO3lIQUFuQixtQkFBbUI7Z0dBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVTs7QUE2RVgscUVBQXFFO0FBSXJFLE1BQU0sT0FBTyxvQkFBb0I7O3NIQUFwQixvQkFBb0I7dUhBQXBCLG9CQUFvQjt1SEFBcEIsb0JBQW9CLGFBRnBCLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQyxDQUFDO2dHQUUzRCxvQkFBb0I7a0JBSGhDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQyxDQUFDO2lCQUN2RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIE5nTW9kdWxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRJY29uUmVnaXN0cnl9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2Z9IGZyb20gJ3J4anMnO1xuXG50eXBlIFB1YmxpY0FwaTxUPiA9IHtcbiAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyAoLi4ueDogYW55W10pID0+IFQgPyAoLi4ueDogYW55W10pID0+IFB1YmxpY0FwaTxUPiA6IFRbS107XG59O1xuXG4vKipcbiAqIEEgbnVsbCBpY29uIHJlZ2lzdHJ5IHRoYXQgbXVzdCBiZSBpbXBvcnRlZCB0byBhbGxvdyBkaXNhYmxpbmcgb2YgY3VzdG9tXG4gKiBpY29ucy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZha2VNYXRJY29uUmVnaXN0cnkgaW1wbGVtZW50cyBQdWJsaWNBcGk8TWF0SWNvblJlZ2lzdHJ5PiwgT25EZXN0cm95IHtcbiAgYWRkU3ZnSWNvbigpOiB0aGlzIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFN2Z0ljb25MaXRlcmFsKCk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkU3ZnSWNvbkluTmFtZXNwYWNlKCk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkU3ZnSWNvbkxpdGVyYWxJbk5hbWVzcGFjZSgpOiB0aGlzIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFN2Z0ljb25TZXQoKTogdGhpcyB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRTdmdJY29uU2V0TGl0ZXJhbCgpOiB0aGlzIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFN2Z0ljb25TZXRJbk5hbWVzcGFjZSgpOiB0aGlzIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZFN2Z0ljb25TZXRMaXRlcmFsSW5OYW1lc3BhY2UoKTogdGhpcyB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZWdpc3RlckZvbnRDbGFzc0FsaWFzKCk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xhc3NOYW1lRm9yRm9udEFsaWFzKGFsaWFzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBhbGlhcztcbiAgfVxuXG4gIGdldERlZmF1bHRGb250U2V0Q2xhc3MoKSB7XG4gICAgcmV0dXJuIFsnbWF0ZXJpYWwtaWNvbnMnXTtcbiAgfVxuXG4gIGdldFN2Z0ljb25Gcm9tVXJsKCk6IE9ic2VydmFibGU8U1ZHRWxlbWVudD4ge1xuICAgIHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5fZ2VuZXJhdGVFbXB0eVN2ZygpKTtcbiAgfVxuXG4gIGdldE5hbWVkU3ZnSWNvbigpOiBPYnNlcnZhYmxlPFNWR0VsZW1lbnQ+IHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKHRoaXMuX2dlbmVyYXRlRW1wdHlTdmcoKSk7XG4gIH1cblxuICBzZXREZWZhdWx0Rm9udFNldENsYXNzKCk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkU3ZnSWNvblJlc29sdmVyKCk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7fVxuXG4gIHByaXZhdGUgX2dlbmVyYXRlRW1wdHlTdmcoKTogU1ZHRWxlbWVudCB7XG4gICAgY29uc3QgZW1wdHlTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xuICAgIGVtcHR5U3ZnLmNsYXNzTGlzdC5hZGQoJ2Zha2UtdGVzdGluZy1zdmcnKTtcbiAgICAvLyBFbXVsYXRlIHJlYWwgaWNvbiBjaGFyYWN0ZXJpc3RpY3MgZnJvbSBgTWF0SWNvblJlZ2lzdHJ5YCBzbyBzaXplIHJlbWFpbnMgY29uc2lzdGVudCBpbiB0ZXN0cy5cbiAgICBlbXB0eVN2Zy5zZXRBdHRyaWJ1dGUoJ2ZpdCcsICcnKTtcbiAgICBlbXB0eVN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XG4gICAgZW1wdHlTdmcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgZW1wdHlTdmcuc2V0QXR0cmlidXRlKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaWRZTWlkIG1lZXQnKTtcbiAgICBlbXB0eVN2Zy5zZXRBdHRyaWJ1dGUoJ2ZvY3VzYWJsZScsICdmYWxzZScpO1xuICAgIHJldHVybiBlbXB0eVN2ZztcbiAgfVxufVxuXG4vKiogSW1wb3J0IHRoaXMgbW9kdWxlIGluIHRlc3RzIHRvIGluc3RhbGwgdGhlIG51bGwgaWNvbiByZWdpc3RyeS4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNYXRJY29uUmVnaXN0cnksIHVzZUNsYXNzOiBGYWtlTWF0SWNvblJlZ2lzdHJ5fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEljb25UZXN0aW5nTW9kdWxlIHt9XG4iXX0=