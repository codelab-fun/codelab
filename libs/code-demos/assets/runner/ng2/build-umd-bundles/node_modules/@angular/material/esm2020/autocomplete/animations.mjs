/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, group, state, style, transition, trigger, } from '@angular/animations';
// Animation values come from
// https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu-surface/_mixins.scss
// TODO(mmalerba): Ideally find a way to import the values from MDC's code.
export const panelAnimation = trigger('panelAnimation', [
    state('void, hidden', style({
        opacity: 0,
        transform: 'scaleY(0.8)',
    })),
    transition(':enter, hidden => visible', [
        group([
            animate('0.03s linear', style({ opacity: 1 })),
            animate('0.12s cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scaleY(1)' })),
        ]),
    ]),
    transition(':leave, visible => hidden', [animate('0.075s linear', style({ opacity: 0 }))]),
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9hdXRvY29tcGxldGUvYW5pbWF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsT0FBTyxFQUVQLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUU3Qiw2QkFBNkI7QUFDN0Isb0hBQW9IO0FBQ3BILDJFQUEyRTtBQUMzRSxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQTZCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtJQUNoRixLQUFLLENBQ0gsY0FBYyxFQUNkLEtBQUssQ0FBQztRQUNKLE9BQU8sRUFBRSxDQUFDO1FBQ1YsU0FBUyxFQUFFLGFBQWE7S0FDekIsQ0FBQyxDQUNIO0lBQ0QsVUFBVSxDQUFDLDJCQUEyQixFQUFFO1FBQ3RDLEtBQUssQ0FBQztZQUNKLE9BQU8sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO1NBQzdFLENBQUM7S0FDSCxDQUFDO0lBQ0YsVUFBVSxDQUFDLDJCQUEyQixFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDekYsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAgZ3JvdXAsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbi8vIEFuaW1hdGlvbiB2YWx1ZXMgY29tZSBmcm9tXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9wYWNrYWdlcy9tZGMtbWVudS1zdXJmYWNlL19taXhpbnMuc2Nzc1xuLy8gVE9ETyhtbWFsZXJiYSk6IElkZWFsbHkgZmluZCBhIHdheSB0byBpbXBvcnQgdGhlIHZhbHVlcyBmcm9tIE1EQydzIGNvZGUuXG5leHBvcnQgY29uc3QgcGFuZWxBbmltYXRpb246IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSA9IHRyaWdnZXIoJ3BhbmVsQW5pbWF0aW9uJywgW1xuICBzdGF0ZShcbiAgICAndm9pZCwgaGlkZGVuJyxcbiAgICBzdHlsZSh7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgdHJhbnNmb3JtOiAnc2NhbGVZKDAuOCknLFxuICAgIH0pLFxuICApLFxuICB0cmFuc2l0aW9uKCc6ZW50ZXIsIGhpZGRlbiA9PiB2aXNpYmxlJywgW1xuICAgIGdyb3VwKFtcbiAgICAgIGFuaW1hdGUoJzAuMDNzIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAxfSkpLFxuICAgICAgYW5pbWF0ZSgnMC4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknLCBzdHlsZSh7dHJhbnNmb3JtOiAnc2NhbGVZKDEpJ30pKSxcbiAgICBdKSxcbiAgXSksXG4gIHRyYW5zaXRpb24oJzpsZWF2ZSwgdmlzaWJsZSA9PiBoaWRkZW4nLCBbYW5pbWF0ZSgnMC4wNzVzIGxpbmVhcicsIHN0eWxlKHtvcGFjaXR5OiAwfSkpXSksXG5dKTtcbiJdfQ==