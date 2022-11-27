/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatLineModule, MatPseudoCheckboxModule, MatRippleModule, } from '@angular/material/core';
import { MatLegacyList, MatLegacyNavList, MatLegacyListAvatarCssMatStyler, MatLegacyListIconCssMatStyler, MatLegacyListItem, MatLegacyListSubheaderCssMatStyler, } from './list';
import { MatLegacyListOption, MatLegacySelectionList } from './selection-list';
import { MatDividerModule } from '@angular/material/divider';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatListModule` from `@angular/material/list` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyListModule {
}
MatLegacyListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyListModule, declarations: [MatLegacyList,
        MatLegacyNavList,
        MatLegacyListItem,
        MatLegacyListAvatarCssMatStyler,
        MatLegacyListIconCssMatStyler,
        MatLegacyListSubheaderCssMatStyler,
        MatLegacySelectionList,
        MatLegacyListOption], imports: [MatLineModule, MatRippleModule, MatCommonModule, MatPseudoCheckboxModule, CommonModule], exports: [MatLegacyList,
        MatLegacyNavList,
        MatLegacyListItem,
        MatLegacyListAvatarCssMatStyler,
        MatLineModule,
        MatCommonModule,
        MatLegacyListIconCssMatStyler,
        MatLegacyListSubheaderCssMatStyler,
        MatPseudoCheckboxModule,
        MatLegacySelectionList,
        MatLegacyListOption,
        MatDividerModule] });
MatLegacyListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyListModule, imports: [MatLineModule, MatRippleModule, MatCommonModule, MatPseudoCheckboxModule, CommonModule, MatLineModule,
        MatCommonModule,
        MatPseudoCheckboxModule,
        MatDividerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatLineModule, MatRippleModule, MatCommonModule, MatPseudoCheckboxModule, CommonModule],
                    exports: [
                        MatLegacyList,
                        MatLegacyNavList,
                        MatLegacyListItem,
                        MatLegacyListAvatarCssMatStyler,
                        MatLineModule,
                        MatCommonModule,
                        MatLegacyListIconCssMatStyler,
                        MatLegacyListSubheaderCssMatStyler,
                        MatPseudoCheckboxModule,
                        MatLegacySelectionList,
                        MatLegacyListOption,
                        MatDividerModule,
                    ],
                    declarations: [
                        MatLegacyList,
                        MatLegacyNavList,
                        MatLegacyListItem,
                        MatLegacyListAvatarCssMatStyler,
                        MatLegacyListIconCssMatStyler,
                        MatLegacyListSubheaderCssMatStyler,
                        MatLegacySelectionList,
                        MatLegacyListOption,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LWxpc3QvbGlzdC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLGVBQWUsR0FDaEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsYUFBYSxFQUNiLGdCQUFnQixFQUNoQiwrQkFBK0IsRUFDL0IsNkJBQTZCLEVBQzdCLGlCQUFpQixFQUNqQixrQ0FBa0MsR0FDbkMsTUFBTSxRQUFRLENBQUM7QUFDaEIsT0FBTyxFQUFDLG1CQUFtQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDN0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBRTNEOzs7R0FHRztBQTRCSCxNQUFNLE9BQU8sbUJBQW1COztxSEFBbkIsbUJBQW1CO3NIQUFuQixtQkFBbUIsaUJBVjVCLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLCtCQUErQjtRQUMvQiw2QkFBNkI7UUFDN0Isa0NBQWtDO1FBQ2xDLHNCQUFzQjtRQUN0QixtQkFBbUIsYUF2QlgsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsWUFBWSxhQUU5RixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQiwrQkFBK0I7UUFDL0IsYUFBYTtRQUNiLGVBQWU7UUFDZiw2QkFBNkI7UUFDN0Isa0NBQWtDO1FBQ2xDLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLGdCQUFnQjtzSEFhUCxtQkFBbUIsWUExQnBCLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFNOUYsYUFBYTtRQUNiLGVBQWU7UUFHZix1QkFBdUI7UUFHdkIsZ0JBQWdCO2dHQWFQLG1CQUFtQjtrQkEzQi9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsWUFBWSxDQUFDO29CQUNqRyxPQUFPLEVBQUU7d0JBQ1AsYUFBYTt3QkFDYixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsK0JBQStCO3dCQUMvQixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsNkJBQTZCO3dCQUM3QixrQ0FBa0M7d0JBQ2xDLHVCQUF1Qjt3QkFDdkIsc0JBQXNCO3dCQUN0QixtQkFBbUI7d0JBQ25CLGdCQUFnQjtxQkFDakI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLCtCQUErQjt3QkFDL0IsNkJBQTZCO3dCQUM3QixrQ0FBa0M7d0JBQ2xDLHNCQUFzQjt3QkFDdEIsbUJBQW1CO3FCQUNwQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTWF0Q29tbW9uTW9kdWxlLFxuICBNYXRMaW5lTW9kdWxlLFxuICBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgTWF0UmlwcGxlTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7XG4gIE1hdExlZ2FjeUxpc3QsXG4gIE1hdExlZ2FjeU5hdkxpc3QsXG4gIE1hdExlZ2FjeUxpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gIE1hdExlZ2FjeUxpc3RJY29uQ3NzTWF0U3R5bGVyLFxuICBNYXRMZWdhY3lMaXN0SXRlbSxcbiAgTWF0TGVnYWN5TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbn0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7TWF0TGVnYWN5TGlzdE9wdGlvbiwgTWF0TGVnYWN5U2VsZWN0aW9uTGlzdH0gZnJvbSAnLi9zZWxlY3Rpb24tbGlzdCc7XG5pbXBvcnQge01hdERpdmlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpdmlkZXInO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0TGlzdE1vZHVsZWAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0TGluZU1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlLCBNYXRDb21tb25Nb2R1bGUsIE1hdFBzZXVkb0NoZWNrYm94TW9kdWxlLCBDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0TGVnYWN5TGlzdCxcbiAgICBNYXRMZWdhY3lOYXZMaXN0LFxuICAgIE1hdExlZ2FjeUxpc3RJdGVtLFxuICAgIE1hdExlZ2FjeUxpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gICAgTWF0TGluZU1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgTWF0TGVnYWN5TGlzdEljb25Dc3NNYXRTdHlsZXIsXG4gICAgTWF0TGVnYWN5TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbiAgICBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSxcbiAgICBNYXRMZWdhY3lTZWxlY3Rpb25MaXN0LFxuICAgIE1hdExlZ2FjeUxpc3RPcHRpb24sXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0TGVnYWN5TGlzdCxcbiAgICBNYXRMZWdhY3lOYXZMaXN0LFxuICAgIE1hdExlZ2FjeUxpc3RJdGVtLFxuICAgIE1hdExlZ2FjeUxpc3RBdmF0YXJDc3NNYXRTdHlsZXIsXG4gICAgTWF0TGVnYWN5TGlzdEljb25Dc3NNYXRTdHlsZXIsXG4gICAgTWF0TGVnYWN5TGlzdFN1YmhlYWRlckNzc01hdFN0eWxlcixcbiAgICBNYXRMZWdhY3lTZWxlY3Rpb25MaXN0LFxuICAgIE1hdExlZ2FjeUxpc3RPcHRpb24sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUxpc3RNb2R1bGUge31cbiJdfQ==