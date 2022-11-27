/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, state, style, transition, trigger, query, animateChild, group, } from '@angular/animations';
/**
 * Default parameters for the animation for backwards compatibility.
 * @docs-private
 */
export const _defaultParams = {
    params: { enterAnimationDuration: '150ms', exitAnimationDuration: '75ms' },
};
/**
 * Animations used by MatDialog.
 * @docs-private
 */
export const matDialogAnimations = {
    /** Animation that is applied on the dialog container by default. */
    dialogContainer: trigger('dialogContainer', [
        // Note: The `enter` animation transitions to `transform: none`, because for some reason
        // specifying the transform explicitly, causes IE both to blur the dialog content and
        // decimate the animation performance. Leaving it as `none` solves both issues.
        state('void, exit', style({ opacity: 0, transform: 'scale(0.7)' })),
        state('enter', style({ transform: 'none' })),
        transition('* => enter', group([
            animate('{{enterAnimationDuration}} cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'none', opacity: 1 })),
            query('@*', animateChild(), { optional: true }),
        ]), _defaultParams),
        transition('* => void, * => exit', group([
            animate('{{exitAnimationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0 })),
            query('@*', animateChild(), { optional: true }),
        ]), _defaultParams),
    ]),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZGlhbG9nL2RpYWxvZy1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUVQLEtBQUssRUFDTCxZQUFZLEVBQ1osS0FBSyxHQUNOLE1BQU0scUJBQXFCLENBQUM7QUFFN0I7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHO0lBQzVCLE1BQU0sRUFBRSxFQUFDLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLEVBQUM7Q0FDekUsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUU1QjtJQUNGLG9FQUFvRTtJQUNwRSxlQUFlLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixFQUFFO1FBQzFDLHdGQUF3RjtRQUN4RixxRkFBcUY7UUFDckYsK0VBQStFO1FBQy9FLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztRQUNqRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQzFDLFVBQVUsQ0FDUixZQUFZLEVBQ1osS0FBSyxDQUFDO1lBQ0osT0FBTyxDQUNMLHVEQUF1RCxFQUN2RCxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUN2QztZQUNELEtBQUssQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7U0FDOUMsQ0FBQyxFQUNGLGNBQWMsQ0FDZjtRQUNELFVBQVUsQ0FDUixzQkFBc0IsRUFDdEIsS0FBSyxDQUFDO1lBQ0osT0FBTyxDQUFDLDBEQUEwRCxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ3hGLEtBQUssQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7U0FDOUMsQ0FBQyxFQUNGLGNBQWMsQ0FDZjtLQUNGLENBQUM7Q0FDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1xuICBhbmltYXRlLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXIsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAgcXVlcnksXG4gIGFuaW1hdGVDaGlsZCxcbiAgZ3JvdXAsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG4vKipcbiAqIERlZmF1bHQgcGFyYW1ldGVycyBmb3IgdGhlIGFuaW1hdGlvbiBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBfZGVmYXVsdFBhcmFtcyA9IHtcbiAgcGFyYW1zOiB7ZW50ZXJBbmltYXRpb25EdXJhdGlvbjogJzE1MG1zJywgZXhpdEFuaW1hdGlvbkR1cmF0aW9uOiAnNzVtcyd9LFxufTtcblxuLyoqXG4gKiBBbmltYXRpb25zIHVzZWQgYnkgTWF0RGlhbG9nLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgbWF0RGlhbG9nQW5pbWF0aW9uczoge1xuICByZWFkb25seSBkaWFsb2dDb250YWluZXI6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbn0gPSB7XG4gIC8qKiBBbmltYXRpb24gdGhhdCBpcyBhcHBsaWVkIG9uIHRoZSBkaWFsb2cgY29udGFpbmVyIGJ5IGRlZmF1bHQuICovXG4gIGRpYWxvZ0NvbnRhaW5lcjogdHJpZ2dlcignZGlhbG9nQ29udGFpbmVyJywgW1xuICAgIC8vIE5vdGU6IFRoZSBgZW50ZXJgIGFuaW1hdGlvbiB0cmFuc2l0aW9ucyB0byBgdHJhbnNmb3JtOiBub25lYCwgYmVjYXVzZSBmb3Igc29tZSByZWFzb25cbiAgICAvLyBzcGVjaWZ5aW5nIHRoZSB0cmFuc2Zvcm0gZXhwbGljaXRseSwgY2F1c2VzIElFIGJvdGggdG8gYmx1ciB0aGUgZGlhbG9nIGNvbnRlbnQgYW5kXG4gICAgLy8gZGVjaW1hdGUgdGhlIGFuaW1hdGlvbiBwZXJmb3JtYW5jZS4gTGVhdmluZyBpdCBhcyBgbm9uZWAgc29sdmVzIGJvdGggaXNzdWVzLlxuICAgIHN0YXRlKCd2b2lkLCBleGl0Jywgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlKDAuNyknfSkpLFxuICAgIHN0YXRlKCdlbnRlcicsIHN0eWxlKHt0cmFuc2Zvcm06ICdub25lJ30pKSxcbiAgICB0cmFuc2l0aW9uKFxuICAgICAgJyogPT4gZW50ZXInLFxuICAgICAgZ3JvdXAoW1xuICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICd7e2VudGVyQW5pbWF0aW9uRHVyYXRpb259fSBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScsXG4gICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ25vbmUnLCBvcGFjaXR5OiAxfSksXG4gICAgICAgICksXG4gICAgICAgIHF1ZXJ5KCdAKicsIGFuaW1hdGVDaGlsZCgpLCB7b3B0aW9uYWw6IHRydWV9KSxcbiAgICAgIF0pLFxuICAgICAgX2RlZmF1bHRQYXJhbXMsXG4gICAgKSxcbiAgICB0cmFuc2l0aW9uKFxuICAgICAgJyogPT4gdm9pZCwgKiA9PiBleGl0JyxcbiAgICAgIGdyb3VwKFtcbiAgICAgICAgYW5pbWF0ZSgne3tleGl0QW5pbWF0aW9uRHVyYXRpb259fSBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSknLCBzdHlsZSh7b3BhY2l0eTogMH0pKSxcbiAgICAgICAgcXVlcnkoJ0AqJywgYW5pbWF0ZUNoaWxkKCksIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgXSksXG4gICAgICBfZGVmYXVsdFBhcmFtcyxcbiAgICApLFxuICBdKSxcbn07XG4iXX0=