/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '../ripple/index';
import { MatPseudoCheckboxModule } from '../selection/index';
import { MatCommonModule } from '../common-behaviors/common-module';
import { MatOption } from './option';
import { MatOptgroup } from './optgroup';
import * as i0 from "@angular/core";
export class MatOptionModule {
}
MatOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatOptionModule, declarations: [MatOption, MatOptgroup], imports: [MatRippleModule, CommonModule, MatCommonModule, MatPseudoCheckboxModule], exports: [MatOption, MatOptgroup] });
MatOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatOptionModule, imports: [MatRippleModule, CommonModule, MatCommonModule, MatPseudoCheckboxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatRippleModule, CommonModule, MatCommonModule, MatPseudoCheckboxModule],
                    exports: [MatOption, MatOptgroup],
                    declarations: [MatOption, MatOptgroup],
                }]
        }] });
export * from './option';
export * from './optgroup';
export * from './option-parent';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY29yZS9vcHRpb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzNELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxZQUFZLENBQUM7O0FBT3ZDLE1BQU0sT0FBTyxlQUFlOztpSEFBZixlQUFlO2tIQUFmLGVBQWUsaUJBRlgsU0FBUyxFQUFFLFdBQVcsYUFGM0IsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsdUJBQXVCLGFBQ3ZFLFNBQVMsRUFBRSxXQUFXO2tIQUdyQixlQUFlLFlBSmhCLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLHVCQUF1QjtnR0FJdEUsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQztvQkFDbEYsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztvQkFDakMsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztpQkFDdkM7O0FBR0QsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxZQUFZLENBQUM7QUFDM0IsY0FBYyxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNYXRSaXBwbGVNb2R1bGV9IGZyb20gJy4uL3JpcHBsZS9pbmRleCc7XG5pbXBvcnQge01hdFBzZXVkb0NoZWNrYm94TW9kdWxlfSBmcm9tICcuLi9zZWxlY3Rpb24vaW5kZXgnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJy4uL2NvbW1vbi1iZWhhdmlvcnMvY29tbW9uLW1vZHVsZSc7XG5pbXBvcnQge01hdE9wdGlvbn0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHtNYXRPcHRncm91cH0gZnJvbSAnLi9vcHRncm91cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRSaXBwbGVNb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlLCBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRPcHRpb24sIE1hdE9wdGdyb3VwXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0T3B0aW9uLCBNYXRPcHRncm91cF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE9wdGlvbk1vZHVsZSB7fVxuXG5leHBvcnQgKiBmcm9tICcuL29wdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL29wdGdyb3VwJztcbmV4cG9ydCAqIGZyb20gJy4vb3B0aW9uLXBhcmVudCc7XG4iXX0=