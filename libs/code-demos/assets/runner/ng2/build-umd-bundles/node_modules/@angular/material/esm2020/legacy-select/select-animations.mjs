/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, animateChild, query, state, style, transition, trigger, } from '@angular/animations';
/**
 * The following are all the animations for the mat-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material mat-select animation.
 * @docs-private
 * @deprecated Use `matSelectAnimations` from `@angular/material/select` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const matLegacySelectAnimations = {
    /**
     * This animation ensures the select's overlay panel animation (transformPanel) is called when
     * closing the select.
     * This is needed due to https://github.com/angular/angular/issues/23302
     */
    transformPanelWrap: trigger('transformPanelWrap', [
        transition('* => void', query('@transformPanel', [animateChild()], { optional: true })),
    ]),
    /**
     * This animation transforms the select's overlay panel on and off the page.
     *
     * When the panel is attached to the DOM, it expands its width by the amount of padding, scales it
     * up to 100% on the Y axis, fades in its border, and translates slightly up and to the
     * side to ensure the option text correctly overlaps the trigger text.
     *
     * When the panel is removed from the DOM, it simply fades out linearly.
     */
    transformPanel: trigger('transformPanel', [
        state('void', style({
            transform: 'scaleY(0.8)',
            minWidth: '100%',
            opacity: 0,
        })),
        state('showing', style({
            opacity: 1,
            minWidth: 'calc(100% + 32px)',
            transform: 'scaleY(1)',
        })),
        state('showing-multiple', style({
            opacity: 1,
            minWidth: 'calc(100% + 64px)',
            transform: 'scaleY(1)',
        })),
        transition('void => *', animate('120ms cubic-bezier(0, 0, 0.2, 1)')),
        transition('* => void', animate('100ms 25ms linear', style({ opacity: 0 }))),
    ]),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXNlbGVjdC9zZWxlY3QtYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsT0FBTyxFQUNQLFlBQVksRUFFWixLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFFN0I7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FHbEM7SUFDRjs7OztPQUlHO0lBQ0gsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixFQUFFO1FBQ2hELFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQ3RGLENBQUM7SUFFRjs7Ozs7Ozs7T0FRRztJQUNILGNBQWMsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7UUFDeEMsS0FBSyxDQUNILE1BQU0sRUFDTixLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsYUFBYTtZQUN4QixRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUUsQ0FBQztTQUNYLENBQUMsQ0FDSDtRQUNELEtBQUssQ0FDSCxTQUFTLEVBQ1QsS0FBSyxDQUFDO1lBQ0osT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRSxXQUFXO1NBQ3ZCLENBQUMsQ0FDSDtRQUNELEtBQUssQ0FDSCxrQkFBa0IsRUFDbEIsS0FBSyxDQUFDO1lBQ0osT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRSxXQUFXO1NBQ3ZCLENBQUMsQ0FDSDtRQUNELFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDcEUsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztLQUMzRSxDQUFDO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBhbmltYXRlLFxuICBhbmltYXRlQ2hpbGQsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAgcXVlcnksXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbi8qKlxuICogVGhlIGZvbGxvd2luZyBhcmUgYWxsIHRoZSBhbmltYXRpb25zIGZvciB0aGUgbWF0LXNlbGVjdCBjb21wb25lbnQsIHdpdGggZWFjaFxuICogY29uc3QgY29udGFpbmluZyB0aGUgbWV0YWRhdGEgZm9yIG9uZSBhbmltYXRpb24uXG4gKlxuICogVGhlIHZhbHVlcyBiZWxvdyBtYXRjaCB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIEFuZ3VsYXJKUyBNYXRlcmlhbCBtYXQtc2VsZWN0IGFuaW1hdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqIEBkZXByZWNhdGVkIFVzZSBgbWF0U2VsZWN0QW5pbWF0aW9uc2AgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0YCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbmV4cG9ydCBjb25zdCBtYXRMZWdhY3lTZWxlY3RBbmltYXRpb25zOiB7XG4gIHJlYWRvbmx5IHRyYW5zZm9ybVBhbmVsV3JhcDogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xuICByZWFkb25seSB0cmFuc2Zvcm1QYW5lbDogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgLyoqXG4gICAqIFRoaXMgYW5pbWF0aW9uIGVuc3VyZXMgdGhlIHNlbGVjdCdzIG92ZXJsYXkgcGFuZWwgYW5pbWF0aW9uICh0cmFuc2Zvcm1QYW5lbCkgaXMgY2FsbGVkIHdoZW5cbiAgICogY2xvc2luZyB0aGUgc2VsZWN0LlxuICAgKiBUaGlzIGlzIG5lZWRlZCBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjMzMDJcbiAgICovXG4gIHRyYW5zZm9ybVBhbmVsV3JhcDogdHJpZ2dlcigndHJhbnNmb3JtUGFuZWxXcmFwJywgW1xuICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIHF1ZXJ5KCdAdHJhbnNmb3JtUGFuZWwnLCBbYW5pbWF0ZUNoaWxkKCldLCB7b3B0aW9uYWw6IHRydWV9KSksXG4gIF0pLFxuXG4gIC8qKlxuICAgKiBUaGlzIGFuaW1hdGlvbiB0cmFuc2Zvcm1zIHRoZSBzZWxlY3QncyBvdmVybGF5IHBhbmVsIG9uIGFuZCBvZmYgdGhlIHBhZ2UuXG4gICAqXG4gICAqIFdoZW4gdGhlIHBhbmVsIGlzIGF0dGFjaGVkIHRvIHRoZSBET00sIGl0IGV4cGFuZHMgaXRzIHdpZHRoIGJ5IHRoZSBhbW91bnQgb2YgcGFkZGluZywgc2NhbGVzIGl0XG4gICAqIHVwIHRvIDEwMCUgb24gdGhlIFkgYXhpcywgZmFkZXMgaW4gaXRzIGJvcmRlciwgYW5kIHRyYW5zbGF0ZXMgc2xpZ2h0bHkgdXAgYW5kIHRvIHRoZVxuICAgKiBzaWRlIHRvIGVuc3VyZSB0aGUgb3B0aW9uIHRleHQgY29ycmVjdGx5IG92ZXJsYXBzIHRoZSB0cmlnZ2VyIHRleHQuXG4gICAqXG4gICAqIFdoZW4gdGhlIHBhbmVsIGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NLCBpdCBzaW1wbHkgZmFkZXMgb3V0IGxpbmVhcmx5LlxuICAgKi9cbiAgdHJhbnNmb3JtUGFuZWw6IHRyaWdnZXIoJ3RyYW5zZm9ybVBhbmVsJywgW1xuICAgIHN0YXRlKFxuICAgICAgJ3ZvaWQnLFxuICAgICAgc3R5bGUoe1xuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KScsXG4gICAgICAgIG1pbldpZHRoOiAnMTAwJScsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB9KSxcbiAgICApLFxuICAgIHN0YXRlKFxuICAgICAgJ3Nob3dpbmcnLFxuICAgICAgc3R5bGUoe1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBtaW5XaWR0aDogJ2NhbGMoMTAwJSArIDMycHgpJywgLy8gMzJweCA9IDIgKiAxNnB4IHBhZGRpbmdcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGVZKDEpJyxcbiAgICAgIH0pLFxuICAgICksXG4gICAgc3RhdGUoXG4gICAgICAnc2hvd2luZy1tdWx0aXBsZScsXG4gICAgICBzdHlsZSh7XG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIG1pbldpZHRoOiAnY2FsYygxMDAlICsgNjRweCknLCAvLyA2NHB4ID0gNDhweCBwYWRkaW5nIG9uIHRoZSBsZWZ0ICsgMTZweCBwYWRkaW5nIG9uIHRoZSByaWdodFxuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZVkoMSknLFxuICAgICAgfSksXG4gICAgKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBhbmltYXRlKCcxMjBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScpKSxcbiAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBhbmltYXRlKCcxMDBtcyAyNW1zIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAwfSkpKSxcbiAgXSksXG59O1xuIl19