/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, state, style, transition, trigger, } from '@angular/animations';
export const DEFAULT_HORIZONTAL_ANIMATION_DURATION = '500ms';
export const DEFAULT_VERTICAL_ANIMATION_DURATION = '225ms';
/**
 * Animations used by the Material steppers.
 * @docs-private
 */
export const matStepperAnimations = {
    /** Animation that transitions the step along the X axis in a horizontal stepper. */
    horizontalStepTransition: trigger('horizontalStepTransition', [
        state('previous', style({ transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden' })),
        // Transition to `inherit`, rather than `visible`,
        // because visibility on a child element the one from the parent,
        // making this element focusable inside of a `hidden` element.
        state('current', style({ transform: 'none', visibility: 'inherit' })),
        state('next', style({ transform: 'translate3d(100%, 0, 0)', visibility: 'hidden' })),
        transition('* => *', animate('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)'), {
            params: { 'animationDuration': DEFAULT_HORIZONTAL_ANIMATION_DURATION },
        }),
    ]),
    /** Animation that transitions the step along the Y axis in a vertical stepper. */
    verticalStepTransition: trigger('verticalStepTransition', [
        state('previous', style({ height: '0px', visibility: 'hidden' })),
        state('next', style({ height: '0px', visibility: 'hidden' })),
        // Transition to `inherit`, rather than `visible`,
        // because visibility on a child element the one from the parent,
        // making this element focusable inside of a `hidden` element.
        state('current', style({ height: '*', visibility: 'inherit' })),
        transition('* <=> current', animate('{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)'), {
            params: { 'animationDuration': DEFAULT_VERTICAL_ANIMATION_DURATION },
        }),
    ]),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci1hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3N0ZXBwZXIvc3RlcHBlci1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUVSLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsTUFBTSxDQUFDLE1BQU0scUNBQXFDLEdBQUcsT0FBTyxDQUFDO0FBQzdELE1BQU0sQ0FBQyxNQUFNLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQztBQUUzRDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FHN0I7SUFDRixvRkFBb0Y7SUFDcEYsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixFQUFFO1FBQzVELEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLDBCQUEwQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZGLGtEQUFrRDtRQUNsRCxpRUFBaUU7UUFDakUsOERBQThEO1FBQzlELEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUNuRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUNsRixVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxzREFBc0QsQ0FBQyxFQUFFO1lBQ3BGLE1BQU0sRUFBRSxFQUFDLG1CQUFtQixFQUFFLHFDQUFxQyxFQUFDO1NBQ3JFLENBQUM7S0FDSCxDQUFDO0lBRUYsa0ZBQWtGO0lBQ2xGLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRTtRQUN4RCxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDL0QsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBQzNELGtEQUFrRDtRQUNsRCxpRUFBaUU7UUFDakUsOERBQThEO1FBQzlELEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUM3RCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxzREFBc0QsQ0FBQyxFQUFFO1lBQzNGLE1BQU0sRUFBRSxFQUFDLG1CQUFtQixFQUFFLG1DQUFtQyxFQUFDO1NBQ25FLENBQUM7S0FDSCxDQUFDO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9IT1JJWk9OVEFMX0FOSU1BVElPTl9EVVJBVElPTiA9ICc1MDBtcyc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9WRVJUSUNBTF9BTklNQVRJT05fRFVSQVRJT04gPSAnMjI1bXMnO1xuXG4vKipcbiAqIEFuaW1hdGlvbnMgdXNlZCBieSB0aGUgTWF0ZXJpYWwgc3RlcHBlcnMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtYXRTdGVwcGVyQW5pbWF0aW9uczoge1xuICByZWFkb25seSBob3Jpem9udGFsU3RlcFRyYW5zaXRpb246IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbiAgcmVhZG9ubHkgdmVydGljYWxTdGVwVHJhbnNpdGlvbjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgLyoqIEFuaW1hdGlvbiB0aGF0IHRyYW5zaXRpb25zIHRoZSBzdGVwIGFsb25nIHRoZSBYIGF4aXMgaW4gYSBob3Jpem9udGFsIHN0ZXBwZXIuICovXG4gIGhvcml6b250YWxTdGVwVHJhbnNpdGlvbjogdHJpZ2dlcignaG9yaXpvbnRhbFN0ZXBUcmFuc2l0aW9uJywgW1xuICAgIHN0YXRlKCdwcmV2aW91cycsIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtMTAwJSwgMCwgMCknLCB2aXNpYmlsaXR5OiAnaGlkZGVuJ30pKSxcbiAgICAvLyBUcmFuc2l0aW9uIHRvIGBpbmhlcml0YCwgcmF0aGVyIHRoYW4gYHZpc2libGVgLFxuICAgIC8vIGJlY2F1c2UgdmlzaWJpbGl0eSBvbiBhIGNoaWxkIGVsZW1lbnQgdGhlIG9uZSBmcm9tIHRoZSBwYXJlbnQsXG4gICAgLy8gbWFraW5nIHRoaXMgZWxlbWVudCBmb2N1c2FibGUgaW5zaWRlIG9mIGEgYGhpZGRlbmAgZWxlbWVudC5cbiAgICBzdGF0ZSgnY3VycmVudCcsIHN0eWxlKHt0cmFuc2Zvcm06ICdub25lJywgdmlzaWJpbGl0eTogJ2luaGVyaXQnfSkpLFxuICAgIHN0YXRlKCduZXh0Jywgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMCUsIDAsIDApJywgdmlzaWJpbGl0eTogJ2hpZGRlbid9KSksXG4gICAgdHJhbnNpdGlvbignKiA9PiAqJywgYW5pbWF0ZSgne3thbmltYXRpb25EdXJhdGlvbn19IGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKScpLCB7XG4gICAgICBwYXJhbXM6IHsnYW5pbWF0aW9uRHVyYXRpb24nOiBERUZBVUxUX0hPUklaT05UQUxfQU5JTUFUSU9OX0RVUkFUSU9OfSxcbiAgICB9KSxcbiAgXSksXG5cbiAgLyoqIEFuaW1hdGlvbiB0aGF0IHRyYW5zaXRpb25zIHRoZSBzdGVwIGFsb25nIHRoZSBZIGF4aXMgaW4gYSB2ZXJ0aWNhbCBzdGVwcGVyLiAqL1xuICB2ZXJ0aWNhbFN0ZXBUcmFuc2l0aW9uOiB0cmlnZ2VyKCd2ZXJ0aWNhbFN0ZXBUcmFuc2l0aW9uJywgW1xuICAgIHN0YXRlKCdwcmV2aW91cycsIHN0eWxlKHtoZWlnaHQ6ICcwcHgnLCB2aXNpYmlsaXR5OiAnaGlkZGVuJ30pKSxcbiAgICBzdGF0ZSgnbmV4dCcsIHN0eWxlKHtoZWlnaHQ6ICcwcHgnLCB2aXNpYmlsaXR5OiAnaGlkZGVuJ30pKSxcbiAgICAvLyBUcmFuc2l0aW9uIHRvIGBpbmhlcml0YCwgcmF0aGVyIHRoYW4gYHZpc2libGVgLFxuICAgIC8vIGJlY2F1c2UgdmlzaWJpbGl0eSBvbiBhIGNoaWxkIGVsZW1lbnQgdGhlIG9uZSBmcm9tIHRoZSBwYXJlbnQsXG4gICAgLy8gbWFraW5nIHRoaXMgZWxlbWVudCBmb2N1c2FibGUgaW5zaWRlIG9mIGEgYGhpZGRlbmAgZWxlbWVudC5cbiAgICBzdGF0ZSgnY3VycmVudCcsIHN0eWxlKHtoZWlnaHQ6ICcqJywgdmlzaWJpbGl0eTogJ2luaGVyaXQnfSkpLFxuICAgIHRyYW5zaXRpb24oJyogPD0+IGN1cnJlbnQnLCBhbmltYXRlKCd7e2FuaW1hdGlvbkR1cmF0aW9ufX0gY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpJyksIHtcbiAgICAgIHBhcmFtczogeydhbmltYXRpb25EdXJhdGlvbic6IERFRkFVTFRfVkVSVElDQUxfQU5JTUFUSU9OX0RVUkFUSU9OfSxcbiAgICB9KSxcbiAgXSksXG59O1xuIl19