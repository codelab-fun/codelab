/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatAnchor, MatButton } from './button';
import { MatFabAnchor, MatFabButton, MatMiniFabAnchor, MatMiniFabButton } from './fab';
import { MatIconAnchor, MatIconButton } from './icon-button';
import * as i0 from "@angular/core";
export class MatButtonModule {
}
MatButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonModule, declarations: [MatAnchor,
        MatButton,
        MatIconAnchor,
        MatMiniFabAnchor,
        MatMiniFabButton,
        MatIconButton,
        MatFabAnchor,
        MatFabButton], imports: [MatCommonModule, MatRippleModule], exports: [MatAnchor,
        MatButton,
        MatIconAnchor,
        MatIconButton,
        MatMiniFabAnchor,
        MatMiniFabButton,
        MatFabAnchor,
        MatFabButton,
        MatCommonModule] });
MatButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonModule, imports: [MatCommonModule, MatRippleModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, MatRippleModule],
                    exports: [
                        MatAnchor,
                        MatButton,
                        MatIconAnchor,
                        MatIconButton,
                        MatMiniFabAnchor,
                        MatMiniFabButton,
                        MatFabAnchor,
                        MatFabButton,
                        MatCommonModule,
                    ],
                    declarations: [
                        MatAnchor,
                        MatButton,
                        MatIconAnchor,
                        MatMiniFabAnchor,
                        MatMiniFabButton,
                        MatIconButton,
                        MatFabAnchor,
                        MatFabButton,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2J1dHRvbi9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQTBCM0QsTUFBTSxPQUFPLGVBQWU7O2lIQUFmLGVBQWU7a0hBQWYsZUFBZSxpQkFWeEIsU0FBUztRQUNULFNBQVM7UUFDVCxhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsWUFBWTtRQUNaLFlBQVksYUFwQkosZUFBZSxFQUFFLGVBQWUsYUFFeEMsU0FBUztRQUNULFNBQVM7UUFDVCxhQUFhO1FBQ2IsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLFlBQVk7UUFDWixlQUFlO2tIQWFOLGVBQWUsWUF2QmhCLGVBQWUsRUFBRSxlQUFlLEVBVXhDLGVBQWU7Z0dBYU4sZUFBZTtrQkF4QjNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztvQkFDM0MsT0FBTyxFQUFFO3dCQUNQLFNBQVM7d0JBQ1QsU0FBUzt3QkFDVCxhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osU0FBUzt3QkFDVCxTQUFTO3dCQUNULGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixZQUFZO3FCQUNiO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdEFuY2hvciwgTWF0QnV0dG9ufSBmcm9tICcuL2J1dHRvbic7XG5pbXBvcnQge01hdEZhYkFuY2hvciwgTWF0RmFiQnV0dG9uLCBNYXRNaW5pRmFiQW5jaG9yLCBNYXRNaW5pRmFiQnV0dG9ufSBmcm9tICcuL2ZhYic7XG5pbXBvcnQge01hdEljb25BbmNob3IsIE1hdEljb25CdXR0b259IGZyb20gJy4vaWNvbi1idXR0b24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0QW5jaG9yLFxuICAgIE1hdEJ1dHRvbixcbiAgICBNYXRJY29uQW5jaG9yLFxuICAgIE1hdEljb25CdXR0b24sXG4gICAgTWF0TWluaUZhYkFuY2hvcixcbiAgICBNYXRNaW5pRmFiQnV0dG9uLFxuICAgIE1hdEZhYkFuY2hvcixcbiAgICBNYXRGYWJCdXR0b24sXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRBbmNob3IsXG4gICAgTWF0QnV0dG9uLFxuICAgIE1hdEljb25BbmNob3IsXG4gICAgTWF0TWluaUZhYkFuY2hvcixcbiAgICBNYXRNaW5pRmFiQnV0dG9uLFxuICAgIE1hdEljb25CdXR0b24sXG4gICAgTWF0RmFiQW5jaG9yLFxuICAgIE1hdEZhYkJ1dHRvbixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0QnV0dG9uTW9kdWxlIHt9XG4iXX0=