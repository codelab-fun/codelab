/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, state, style, transition, trigger, } from '@angular/animations';
/**
 * Animations used by MatTooltip.
 * @docs-private
 */
export const matTooltipAnimations = {
    /** Animation that transitions a tooltip in and out. */
    tooltipState: trigger('state', [
        // TODO(crisbeto): these values are based on MDC's CSS.
        // We should be able to use their styles directly once we land #19432.
        state('initial, void, hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
        state('visible', style({ transform: 'scale(1)' })),
        transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
        transition('* => hidden', animate('75ms cubic-bezier(0.4, 0, 1, 1)')),
    ]),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3Rvb2x0aXAvdG9vbHRpcC1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFDTCxPQUFPLEVBRVAsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFFN0I7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBRTdCO0lBQ0YsdURBQXVEO0lBQ3ZELFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQzdCLHVEQUF1RDtRQUN2RCxzRUFBc0U7UUFDdEUsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7UUFDNUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztRQUNoRCxVQUFVLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3ZFLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDdEUsQ0FBQztDQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuLyoqXG4gKiBBbmltYXRpb25zIHVzZWQgYnkgTWF0VG9vbHRpcC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1hdFRvb2x0aXBBbmltYXRpb25zOiB7XG4gIHJlYWRvbmx5IHRvb2x0aXBTdGF0ZTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgLyoqIEFuaW1hdGlvbiB0aGF0IHRyYW5zaXRpb25zIGEgdG9vbHRpcCBpbiBhbmQgb3V0LiAqL1xuICB0b29sdGlwU3RhdGU6IHRyaWdnZXIoJ3N0YXRlJywgW1xuICAgIC8vIFRPRE8oY3Jpc2JldG8pOiB0aGVzZSB2YWx1ZXMgYXJlIGJhc2VkIG9uIE1EQydzIENTUy5cbiAgICAvLyBXZSBzaG91bGQgYmUgYWJsZSB0byB1c2UgdGhlaXIgc3R5bGVzIGRpcmVjdGx5IG9uY2Ugd2UgbGFuZCAjMTk0MzIuXG4gICAgc3RhdGUoJ2luaXRpYWwsIHZvaWQsIGhpZGRlbicsIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZSgwLjgpJ30pKSxcbiAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgxKSd9KSksXG4gICAgdHJhbnNpdGlvbignKiA9PiB2aXNpYmxlJywgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknKSksXG4gICAgdHJhbnNpdGlvbignKiA9PiBoaWRkZW4nLCBhbmltYXRlKCc3NW1zIGN1YmljLWJlemllcigwLjQsIDAsIDEsIDEpJykpLFxuICBdKSxcbn07XG4iXX0=