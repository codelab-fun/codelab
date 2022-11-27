/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ENTER } from '@angular/cdk/keycodes';
import { NgModule } from '@angular/core';
import { ErrorStateMatcher, MatCommonModule } from '@angular/material/core';
import { MatLegacyChip, MatLegacyChipAvatar, MatLegacyChipRemove, MatLegacyChipTrailingIcon, } from './chip';
import { MAT_LEGACY_CHIPS_DEFAULT_OPTIONS, } from './chip-default-options';
import { MatLegacyChipInput } from './chip-input';
import { MatLegacyChipList } from './chip-list';
import * as i0 from "@angular/core";
const CHIP_DECLARATIONS = [
    MatLegacyChipList,
    MatLegacyChip,
    MatLegacyChipInput,
    MatLegacyChipRemove,
    MatLegacyChipAvatar,
    MatLegacyChipTrailingIcon,
];
/**
 * @deprecated Use `MatChipsModule` from `@angular/material/chips` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyChipsModule {
}
MatLegacyChipsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyChipsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyChipsModule, declarations: [MatLegacyChipList,
        MatLegacyChip,
        MatLegacyChipInput,
        MatLegacyChipRemove,
        MatLegacyChipAvatar,
        MatLegacyChipTrailingIcon], imports: [MatCommonModule], exports: [MatLegacyChipList,
        MatLegacyChip,
        MatLegacyChipInput,
        MatLegacyChipRemove,
        MatLegacyChipAvatar,
        MatLegacyChipTrailingIcon] });
MatLegacyChipsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyChipsModule, providers: [
        ErrorStateMatcher,
        {
            provide: MAT_LEGACY_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER],
            },
        },
    ], imports: [MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyChipsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule],
                    exports: CHIP_DECLARATIONS,
                    declarations: CHIP_DECLARATIONS,
                    providers: [
                        ErrorStateMatcher,
                        {
                            provide: MAT_LEGACY_CHIPS_DEFAULT_OPTIONS,
                            useValue: {
                                separatorKeyCodes: [ENTER],
                            },
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1jaGlwcy9jaGlwcy1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFDTCxhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLG1CQUFtQixFQUNuQix5QkFBeUIsR0FDMUIsTUFBTSxRQUFRLENBQUM7QUFDaEIsT0FBTyxFQUNMLGdDQUFnQyxHQUVqQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxhQUFhLENBQUM7O0FBRTlDLE1BQU0saUJBQWlCLEdBQUc7SUFDeEIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQix5QkFBeUI7Q0FDMUIsQ0FBQztBQUVGOzs7R0FHRztBQWVILE1BQU0sT0FBTyxvQkFBb0I7O3NIQUFwQixvQkFBb0I7dUhBQXBCLG9CQUFvQixpQkExQi9CLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2Isa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIseUJBQXlCLGFBUWYsZUFBZSxhQWJ6QixpQkFBaUI7UUFDakIsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLHlCQUF5Qjt1SEFxQmQsb0JBQW9CLGFBVnBCO1FBQ1QsaUJBQWlCO1FBQ2pCO1lBQ0UsT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxRQUFRLEVBQUU7Z0JBQ1IsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUM7YUFDSztTQUNsQztLQUNGLFlBWFMsZUFBZTtnR0FhZCxvQkFBb0I7a0JBZGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixZQUFZLEVBQUUsaUJBQWlCO29CQUMvQixTQUFTLEVBQUU7d0JBQ1QsaUJBQWlCO3dCQUNqQjs0QkFDRSxPQUFPLEVBQUUsZ0NBQWdDOzRCQUN6QyxRQUFRLEVBQUU7Z0NBQ1IsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkJBQ0s7eUJBQ2xDO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RU5URVJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RXJyb3JTdGF0ZU1hdGNoZXIsIE1hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1xuICBNYXRMZWdhY3lDaGlwLFxuICBNYXRMZWdhY3lDaGlwQXZhdGFyLFxuICBNYXRMZWdhY3lDaGlwUmVtb3ZlLFxuICBNYXRMZWdhY3lDaGlwVHJhaWxpbmdJY29uLFxufSBmcm9tICcuL2NoaXAnO1xuaW1wb3J0IHtcbiAgTUFUX0xFR0FDWV9DSElQU19ERUZBVUxUX09QVElPTlMsXG4gIE1hdExlZ2FjeUNoaXBzRGVmYXVsdE9wdGlvbnMsXG59IGZyb20gJy4vY2hpcC1kZWZhdWx0LW9wdGlvbnMnO1xuaW1wb3J0IHtNYXRMZWdhY3lDaGlwSW5wdXR9IGZyb20gJy4vY2hpcC1pbnB1dCc7XG5pbXBvcnQge01hdExlZ2FjeUNoaXBMaXN0fSBmcm9tICcuL2NoaXAtbGlzdCc7XG5cbmNvbnN0IENISVBfREVDTEFSQVRJT05TID0gW1xuICBNYXRMZWdhY3lDaGlwTGlzdCxcbiAgTWF0TGVnYWN5Q2hpcCxcbiAgTWF0TGVnYWN5Q2hpcElucHV0LFxuICBNYXRMZWdhY3lDaGlwUmVtb3ZlLFxuICBNYXRMZWdhY3lDaGlwQXZhdGFyLFxuICBNYXRMZWdhY3lDaGlwVHJhaWxpbmdJY29uLFxuXTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdENoaXBzTW9kdWxlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9jaGlwc2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogQ0hJUF9ERUNMQVJBVElPTlMsXG4gIGRlY2xhcmF0aW9uczogQ0hJUF9ERUNMQVJBVElPTlMsXG4gIHByb3ZpZGVyczogW1xuICAgIEVycm9yU3RhdGVNYXRjaGVyLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1BVF9MRUdBQ1lfQ0hJUFNfREVGQVVMVF9PUFRJT05TLFxuICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgc2VwYXJhdG9yS2V5Q29kZXM6IFtFTlRFUl0sXG4gICAgICB9IGFzIE1hdExlZ2FjeUNoaXBzRGVmYXVsdE9wdGlvbnMsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Q2hpcHNNb2R1bGUge31cbiJdfQ==