/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { A11yModule } from '@angular/cdk/a11y';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatLegacyInkBar } from './ink-bar';
import { MatLegacyTab } from './tab';
import { MatLegacyTabBody, MatLegacyTabBodyPortal } from './tab-body';
import { MatLegacyTabGroup } from './tab-group';
import { MatLegacyTabHeader } from './tab-header';
import { MatLegacyTabLink, MatLegacyTabNav, MatLegacyTabNavPanel } from './tab-nav-bar/tab-nav-bar';
import { MatLegacyTabLabel } from './tab-label';
import { MatLegacyTabContent } from './tab-content';
import { MatLegacyTabLabelWrapper } from './tab-label-wrapper';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatTabsModule` from `@angular/material/tabs` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabsModule {
}
MatLegacyTabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyTabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabsModule, declarations: [MatLegacyTabGroup,
        MatLegacyTabLabel,
        MatLegacyTab,
        MatLegacyInkBar,
        MatLegacyTabLabelWrapper,
        MatLegacyTabNav,
        MatLegacyTabNavPanel,
        MatLegacyTabLink,
        MatLegacyTabBody,
        MatLegacyTabBodyPortal,
        MatLegacyTabHeader,
        MatLegacyTabContent], imports: [CommonModule,
        MatCommonModule,
        PortalModule,
        MatRippleModule,
        ObserversModule,
        A11yModule], exports: [MatCommonModule,
        MatLegacyTabGroup,
        MatLegacyTabLabel,
        MatLegacyTab,
        MatLegacyTabNav,
        MatLegacyTabNavPanel,
        MatLegacyTabLink,
        MatLegacyTabContent] });
MatLegacyTabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabsModule, imports: [CommonModule,
        MatCommonModule,
        PortalModule,
        MatRippleModule,
        ObserversModule,
        A11yModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        MatCommonModule,
                        PortalModule,
                        MatRippleModule,
                        ObserversModule,
                        A11yModule,
                    ],
                    // Don't export all components because some are only to be used internally.
                    exports: [
                        MatCommonModule,
                        MatLegacyTabGroup,
                        MatLegacyTabLabel,
                        MatLegacyTab,
                        MatLegacyTabNav,
                        MatLegacyTabNavPanel,
                        MatLegacyTabLink,
                        MatLegacyTabContent,
                    ],
                    declarations: [
                        MatLegacyTabGroup,
                        MatLegacyTabLabel,
                        MatLegacyTab,
                        MatLegacyInkBar,
                        MatLegacyTabLabelWrapper,
                        MatLegacyTabNav,
                        MatLegacyTabNavPanel,
                        MatLegacyTabLink,
                        MatLegacyTabBody,
                        MatLegacyTabBodyPortal,
                        MatLegacyTabHeader,
                        MatLegacyTabContent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXRhYnMvdGFicy1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDbkMsT0FBTyxFQUFDLGdCQUFnQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUM5QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDaEQsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xHLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUM5QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBRTdEOzs7R0FHRztBQW9DSCxNQUFNLE9BQU8sbUJBQW1COztxSEFBbkIsbUJBQW1CO3NIQUFuQixtQkFBbUIsaUJBZDVCLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsWUFBWTtRQUNaLGVBQWU7UUFDZix3QkFBd0I7UUFDeEIsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIsbUJBQW1CLGFBOUJuQixZQUFZO1FBQ1osZUFBZTtRQUNmLFlBQVk7UUFDWixlQUFlO1FBQ2YsZUFBZTtRQUNmLFVBQVUsYUFJVixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQixZQUFZO1FBQ1osZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsbUJBQW1CO3NIQWlCVixtQkFBbUIsWUFqQzVCLFlBQVk7UUFDWixlQUFlO1FBQ2YsWUFBWTtRQUNaLGVBQWU7UUFDZixlQUFlO1FBQ2YsVUFBVSxFQUlWLGVBQWU7Z0dBd0JOLG1CQUFtQjtrQkFuQy9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixVQUFVO3FCQUNYO29CQUNELDJFQUEyRTtvQkFDM0UsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1osZUFBZTt3QkFDZix3QkFBd0I7d0JBQ3hCLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUNwQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsc0JBQXNCO3dCQUN0QixrQkFBa0I7d0JBQ2xCLG1CQUFtQjtxQkFDcEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBMTF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge09ic2VydmVyc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQge1BvcnRhbE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdExlZ2FjeUlua0Jhcn0gZnJvbSAnLi9pbmstYmFyJztcbmltcG9ydCB7TWF0TGVnYWN5VGFifSBmcm9tICcuL3RhYic7XG5pbXBvcnQge01hdExlZ2FjeVRhYkJvZHksIE1hdExlZ2FjeVRhYkJvZHlQb3J0YWx9IGZyb20gJy4vdGFiLWJvZHknO1xuaW1wb3J0IHtNYXRMZWdhY3lUYWJHcm91cH0gZnJvbSAnLi90YWItZ3JvdXAnO1xuaW1wb3J0IHtNYXRMZWdhY3lUYWJIZWFkZXJ9IGZyb20gJy4vdGFiLWhlYWRlcic7XG5pbXBvcnQge01hdExlZ2FjeVRhYkxpbmssIE1hdExlZ2FjeVRhYk5hdiwgTWF0TGVnYWN5VGFiTmF2UGFuZWx9IGZyb20gJy4vdGFiLW5hdi1iYXIvdGFiLW5hdi1iYXInO1xuaW1wb3J0IHtNYXRMZWdhY3lUYWJMYWJlbH0gZnJvbSAnLi90YWItbGFiZWwnO1xuaW1wb3J0IHtNYXRMZWdhY3lUYWJDb250ZW50fSBmcm9tICcuL3RhYi1jb250ZW50JztcbmltcG9ydCB7TWF0TGVnYWN5VGFiTGFiZWxXcmFwcGVyfSBmcm9tICcuL3RhYi1sYWJlbC13cmFwcGVyJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFRhYnNNb2R1bGVgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3RhYnNgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBPYnNlcnZlcnNNb2R1bGUsXG4gICAgQTExeU1vZHVsZSxcbiAgXSxcbiAgLy8gRG9uJ3QgZXhwb3J0IGFsbCBjb21wb25lbnRzIGJlY2F1c2Ugc29tZSBhcmUgb25seSB0byBiZSB1c2VkIGludGVybmFsbHkuXG4gIGV4cG9ydHM6IFtcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgTWF0TGVnYWN5VGFiR3JvdXAsXG4gICAgTWF0TGVnYWN5VGFiTGFiZWwsXG4gICAgTWF0TGVnYWN5VGFiLFxuICAgIE1hdExlZ2FjeVRhYk5hdixcbiAgICBNYXRMZWdhY3lUYWJOYXZQYW5lbCxcbiAgICBNYXRMZWdhY3lUYWJMaW5rLFxuICAgIE1hdExlZ2FjeVRhYkNvbnRlbnQsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdExlZ2FjeVRhYkdyb3VwLFxuICAgIE1hdExlZ2FjeVRhYkxhYmVsLFxuICAgIE1hdExlZ2FjeVRhYixcbiAgICBNYXRMZWdhY3lJbmtCYXIsXG4gICAgTWF0TGVnYWN5VGFiTGFiZWxXcmFwcGVyLFxuICAgIE1hdExlZ2FjeVRhYk5hdixcbiAgICBNYXRMZWdhY3lUYWJOYXZQYW5lbCxcbiAgICBNYXRMZWdhY3lUYWJMaW5rLFxuICAgIE1hdExlZ2FjeVRhYkJvZHksXG4gICAgTWF0TGVnYWN5VGFiQm9keVBvcnRhbCxcbiAgICBNYXRMZWdhY3lUYWJIZWFkZXIsXG4gICAgTWF0TGVnYWN5VGFiQ29udGVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5VGFic01vZHVsZSB7fVxuIl19