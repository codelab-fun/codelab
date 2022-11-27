/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatRadioButton, MatRadioGroup } from './radio';
import * as i0 from "@angular/core";
export class MatRadioModule {
}
MatRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatRadioModule, declarations: [MatRadioGroup, MatRadioButton], imports: [MatCommonModule, CommonModule, MatRippleModule], exports: [MatCommonModule, MatRadioGroup, MatRadioButton] });
MatRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatRadioModule, imports: [MatCommonModule, CommonModule, MatRippleModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatCommonModule, MatRadioGroup, MatRadioButton],
                    declarations: [MatRadioGroup, MatRadioButton],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JhZGlvL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxjQUFjLEVBQUUsYUFBYSxFQUFDLE1BQU0sU0FBUyxDQUFDOztBQU90RCxNQUFNLE9BQU8sY0FBYzs7Z0hBQWQsY0FBYztpSEFBZCxjQUFjLGlCQUZWLGFBQWEsRUFBRSxjQUFjLGFBRmxDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxhQUM5QyxlQUFlLEVBQUUsYUFBYSxFQUFFLGNBQWM7aUhBRzdDLGNBQWMsWUFKZixlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFDOUMsZUFBZTtnR0FHZCxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBQztvQkFDekQsWUFBWSxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztpQkFDOUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRSYWRpb0J1dHRvbiwgTWF0UmFkaW9Hcm91cH0gZnJvbSAnLi9yYWRpbyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdENvbW1vbk1vZHVsZSwgTWF0UmFkaW9Hcm91cCwgTWF0UmFkaW9CdXR0b25dLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRSYWRpb0dyb3VwLCBNYXRSYWRpb0J1dHRvbl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFJhZGlvTW9kdWxlIHt9XG4iXX0=