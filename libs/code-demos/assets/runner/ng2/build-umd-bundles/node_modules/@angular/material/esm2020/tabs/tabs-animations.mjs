/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, state, style, transition, trigger, } from '@angular/animations';
/**
 * Animations used by the Material tabs.
 * @docs-private
 */
export const matTabsAnimations = {
    /** Animation translates a tab along the X axis. */
    translateTab: trigger('translateTab', [
        // Transitions to `none` instead of 0, because some browsers might blur the content.
        state('center, void, left-origin-center, right-origin-center', style({ transform: 'none' })),
        // If the tab is either on the left or right, we additionally add a `min-height` of 1px
        // in order to ensure that the element has a height before its state changes. This is
        // necessary because Chrome does seem to skip the transition in RTL mode if the element does
        // not have a static height and is not rendered. See related issue: #9465
        state('left', style({
            transform: 'translate3d(-100%, 0, 0)',
            minHeight: '1px',
            // Normally this is redundant since we detach the content from the DOM, but if the user
            // opted into keeping the content in the DOM, we have to hide it so it isn't focusable.
            visibility: 'hidden',
        })),
        state('right', style({
            transform: 'translate3d(100%, 0, 0)',
            minHeight: '1px',
            visibility: 'hidden',
        })),
        transition('* => left, * => right, left => center, right => center', animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)')),
        transition('void => left-origin-center', [
            style({ transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)'),
        ]),
        transition('void => right-origin-center', [
            style({ transform: 'translate3d(100%, 0, 0)', visibility: 'hidden' }),
            animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)'),
        ]),
    ]),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3RhYnMvdGFicy1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUVSLE1BQU0scUJBQXFCLENBQUM7QUFFN0I7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBRTFCO0lBQ0YsbURBQW1EO0lBQ25ELFlBQVksRUFBRSxPQUFPLENBQUMsY0FBYyxFQUFFO1FBQ3BDLG9GQUFvRjtRQUNwRixLQUFLLENBQUMsdURBQXVELEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFFMUYsdUZBQXVGO1FBQ3ZGLHFGQUFxRjtRQUNyRiw0RkFBNEY7UUFDNUYseUVBQXlFO1FBQ3pFLEtBQUssQ0FDSCxNQUFNLEVBQ04sS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLDBCQUEwQjtZQUNyQyxTQUFTLEVBQUUsS0FBSztZQUVoQix1RkFBdUY7WUFDdkYsdUZBQXVGO1lBQ3ZGLFVBQVUsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FDSDtRQUNELEtBQUssQ0FDSCxPQUFPLEVBQ1AsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLHlCQUF5QjtZQUNwQyxTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsUUFBUTtTQUNyQixDQUFDLENBQ0g7UUFFRCxVQUFVLENBQ1Isd0RBQXdELEVBQ3hELE9BQU8sQ0FBQyxzREFBc0QsQ0FBQyxDQUNoRTtRQUNELFVBQVUsQ0FBQyw0QkFBNEIsRUFBRTtZQUN2QyxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxzREFBc0QsQ0FBQztTQUNoRSxDQUFDO1FBQ0YsVUFBVSxDQUFDLDZCQUE2QixFQUFFO1lBQ3hDLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDbkUsT0FBTyxDQUFDLHNEQUFzRCxDQUFDO1NBQ2hFLENBQUM7S0FDSCxDQUFDO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG4vKipcbiAqIEFuaW1hdGlvbnMgdXNlZCBieSB0aGUgTWF0ZXJpYWwgdGFicy5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1hdFRhYnNBbmltYXRpb25zOiB7XG4gIHJlYWRvbmx5IHRyYW5zbGF0ZVRhYjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgLyoqIEFuaW1hdGlvbiB0cmFuc2xhdGVzIGEgdGFiIGFsb25nIHRoZSBYIGF4aXMuICovXG4gIHRyYW5zbGF0ZVRhYjogdHJpZ2dlcigndHJhbnNsYXRlVGFiJywgW1xuICAgIC8vIFRyYW5zaXRpb25zIHRvIGBub25lYCBpbnN0ZWFkIG9mIDAsIGJlY2F1c2Ugc29tZSBicm93c2VycyBtaWdodCBibHVyIHRoZSBjb250ZW50LlxuICAgIHN0YXRlKCdjZW50ZXIsIHZvaWQsIGxlZnQtb3JpZ2luLWNlbnRlciwgcmlnaHQtb3JpZ2luLWNlbnRlcicsIHN0eWxlKHt0cmFuc2Zvcm06ICdub25lJ30pKSxcblxuICAgIC8vIElmIHRoZSB0YWIgaXMgZWl0aGVyIG9uIHRoZSBsZWZ0IG9yIHJpZ2h0LCB3ZSBhZGRpdGlvbmFsbHkgYWRkIGEgYG1pbi1oZWlnaHRgIG9mIDFweFxuICAgIC8vIGluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGhhcyBhIGhlaWdodCBiZWZvcmUgaXRzIHN0YXRlIGNoYW5nZXMuIFRoaXMgaXNcbiAgICAvLyBuZWNlc3NhcnkgYmVjYXVzZSBDaHJvbWUgZG9lcyBzZWVtIHRvIHNraXAgdGhlIHRyYW5zaXRpb24gaW4gUlRMIG1vZGUgaWYgdGhlIGVsZW1lbnQgZG9lc1xuICAgIC8vIG5vdCBoYXZlIGEgc3RhdGljIGhlaWdodCBhbmQgaXMgbm90IHJlbmRlcmVkLiBTZWUgcmVsYXRlZCBpc3N1ZTogIzk0NjVcbiAgICBzdGF0ZShcbiAgICAgICdsZWZ0JyxcbiAgICAgIHN0eWxlKHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApJyxcbiAgICAgICAgbWluSGVpZ2h0OiAnMXB4JyxcblxuICAgICAgICAvLyBOb3JtYWxseSB0aGlzIGlzIHJlZHVuZGFudCBzaW5jZSB3ZSBkZXRhY2ggdGhlIGNvbnRlbnQgZnJvbSB0aGUgRE9NLCBidXQgaWYgdGhlIHVzZXJcbiAgICAgICAgLy8gb3B0ZWQgaW50byBrZWVwaW5nIHRoZSBjb250ZW50IGluIHRoZSBET00sIHdlIGhhdmUgdG8gaGlkZSBpdCBzbyBpdCBpc24ndCBmb2N1c2FibGUuXG4gICAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgICAgfSksXG4gICAgKSxcbiAgICBzdGF0ZShcbiAgICAgICdyaWdodCcsXG4gICAgICBzdHlsZSh7XG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMCUsIDAsIDApJyxcbiAgICAgICAgbWluSGVpZ2h0OiAnMXB4JyxcbiAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICB9KSxcbiAgICApLFxuXG4gICAgdHJhbnNpdGlvbihcbiAgICAgICcqID0+IGxlZnQsICogPT4gcmlnaHQsIGxlZnQgPT4gY2VudGVyLCByaWdodCA9PiBjZW50ZXInLFxuICAgICAgYW5pbWF0ZSgne3thbmltYXRpb25EdXJhdGlvbn19IGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKScpLFxuICAgICksXG4gICAgdHJhbnNpdGlvbigndm9pZCA9PiBsZWZ0LW9yaWdpbi1jZW50ZXInLCBbXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwMCUsIDAsIDApJywgdmlzaWJpbGl0eTogJ2hpZGRlbid9KSxcbiAgICAgIGFuaW1hdGUoJ3t7YW5pbWF0aW9uRHVyYXRpb259fSBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSknKSxcbiAgICBdKSxcbiAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHJpZ2h0LW9yaWdpbi1jZW50ZXInLCBbXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwJSwgMCwgMCknLCB2aXNpYmlsaXR5OiAnaGlkZGVuJ30pLFxuICAgICAgYW5pbWF0ZSgne3thbmltYXRpb25EdXJhdGlvbn19IGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKScpLFxuICAgIF0pLFxuICBdKSxcbn07XG4iXX0=