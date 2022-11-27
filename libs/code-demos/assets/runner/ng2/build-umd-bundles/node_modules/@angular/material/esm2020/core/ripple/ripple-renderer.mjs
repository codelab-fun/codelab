import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { isFakeMousedownFromScreenReader, isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { coerceElement } from '@angular/cdk/coercion';
import { RippleRef } from './ripple-ref';
// TODO: import these values from `@material/ripple` eventually.
/**
 * Default ripple animation configuration for ripples without an explicit
 * animation config specified.
 */
export const defaultRippleAnimationConfig = {
    enterDuration: 225,
    exitDuration: 150,
};
/**
 * Timeout for ignoring mouse events. Mouse events will be temporary ignored after touch
 * events to avoid synthetic mouse events.
 */
const ignoreMouseEventsTimeout = 800;
/** Options that apply to all the event listeners that are bound by the ripple renderer. */
const passiveEventOptions = normalizePassiveListenerOptions({ passive: true });
/** Events that signal that the pointer is down. */
const pointerDownEvents = ['mousedown', 'touchstart'];
/** Events that signal that the pointer is up. */
const pointerUpEvents = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
export class RippleRenderer {
    constructor(_target, _ngZone, elementOrElementRef, platform) {
        this._target = _target;
        this._ngZone = _ngZone;
        /** Whether the pointer is currently down or not. */
        this._isPointerDown = false;
        /**
         * Map of currently active ripple references.
         * The ripple reference is mapped to its element event listeners.
         * The reason why `| null` is used is that event listeners are added only
         * when the condition is truthy (see the `_startFadeOutTransition` method).
         */
        this._activeRipples = new Map();
        /** Whether pointer-up event listeners have been registered. */
        this._pointerUpEventsRegistered = false;
        // Only do anything if we're on the browser.
        if (platform.isBrowser) {
            this._containerElement = coerceElement(elementOrElementRef);
        }
    }
    /**
     * Fades in a ripple at the given coordinates.
     * @param x Coordinate within the element, along the X axis at which to start the ripple.
     * @param y Coordinate within the element, along the Y axis at which to start the ripple.
     * @param config Extra ripple options.
     */
    fadeInRipple(x, y, config = {}) {
        const containerRect = (this._containerRect =
            this._containerRect || this._containerElement.getBoundingClientRect());
        const animationConfig = { ...defaultRippleAnimationConfig, ...config.animation };
        if (config.centered) {
            x = containerRect.left + containerRect.width / 2;
            y = containerRect.top + containerRect.height / 2;
        }
        const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
        const offsetX = x - containerRect.left;
        const offsetY = y - containerRect.top;
        const enterDuration = animationConfig.enterDuration;
        const ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = `${offsetX - radius}px`;
        ripple.style.top = `${offsetY - radius}px`;
        ripple.style.height = `${radius * 2}px`;
        ripple.style.width = `${radius * 2}px`;
        // If a custom color has been specified, set it as inline style. If no color is
        // set, the default color will be applied through the ripple theme styles.
        if (config.color != null) {
            ripple.style.backgroundColor = config.color;
        }
        ripple.style.transitionDuration = `${enterDuration}ms`;
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical to ensure that the `scale` animates properly.
        // We enforce a style recalculation by calling `getComputedStyle` and *accessing* a property.
        // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
        const computedStyles = window.getComputedStyle(ripple);
        const userTransitionProperty = computedStyles.transitionProperty;
        const userTransitionDuration = computedStyles.transitionDuration;
        // Note: We detect whether animation is forcibly disabled through CSS by the use of
        // `transition: none`. This is technically unexpected since animations are controlled
        // through the animation config, but this exists for backwards compatibility. This logic does
        // not need to be super accurate since it covers some edge cases which can be easily avoided by users.
        const animationForciblyDisabledThroughCss = userTransitionProperty === 'none' ||
            // Note: The canonical unit for serialized CSS `<time>` properties is seconds. Additionally
            // some browsers expand the duration for every property (in our case `opacity` and `transform`).
            userTransitionDuration === '0s' ||
            userTransitionDuration === '0s, 0s';
        // Exposed reference to the ripple that will be returned.
        const rippleRef = new RippleRef(this, ripple, config, animationForciblyDisabledThroughCss);
        // Start the enter animation by setting the transform/scale to 100%. The animation will
        // execute as part of this statement because we forced a style recalculation before.
        // Note: We use a 3d transform here in order to avoid an issue in Safari where
        // the ripples aren't clipped when inside the shadow DOM (see #24028).
        ripple.style.transform = 'scale3d(1, 1, 1)';
        rippleRef.state = 0 /* RippleState.FADING_IN */;
        if (!config.persistent) {
            this._mostRecentTransientRipple = rippleRef;
        }
        let eventListeners = null;
        // Do not register the `transition` event listener if fade-in and fade-out duration
        // are set to zero. The events won't fire anyway and we can save resources here.
        if (!animationForciblyDisabledThroughCss && (enterDuration || animationConfig.exitDuration)) {
            this._ngZone.runOutsideAngular(() => {
                const onTransitionEnd = () => this._finishRippleTransition(rippleRef);
                const onTransitionCancel = () => this._destroyRipple(rippleRef);
                ripple.addEventListener('transitionend', onTransitionEnd);
                // If the transition is cancelled (e.g. due to DOM removal), we destroy the ripple
                // directly as otherwise we would keep it part of the ripple container forever.
                // https://www.w3.org/TR/css-transitions-1/#:~:text=no%20longer%20in%20the%20document.
                ripple.addEventListener('transitioncancel', onTransitionCancel);
                eventListeners = { onTransitionEnd, onTransitionCancel };
            });
        }
        // Add the ripple reference to the list of all active ripples.
        this._activeRipples.set(rippleRef, eventListeners);
        // In case there is no fade-in transition duration, we need to manually call the transition
        // end listener because `transitionend` doesn't fire if there is no transition.
        if (animationForciblyDisabledThroughCss || !enterDuration) {
            this._finishRippleTransition(rippleRef);
        }
        return rippleRef;
    }
    /** Fades out a ripple reference. */
    fadeOutRipple(rippleRef) {
        // For ripples already fading out or hidden, this should be a noop.
        if (rippleRef.state === 2 /* RippleState.FADING_OUT */ || rippleRef.state === 3 /* RippleState.HIDDEN */) {
            return;
        }
        const rippleEl = rippleRef.element;
        const animationConfig = { ...defaultRippleAnimationConfig, ...rippleRef.config.animation };
        // This starts the fade-out transition and will fire the transition end listener that
        // removes the ripple element from the DOM.
        rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
        rippleEl.style.opacity = '0';
        rippleRef.state = 2 /* RippleState.FADING_OUT */;
        // In case there is no fade-out transition duration, we need to manually call the
        // transition end listener because `transitionend` doesn't fire if there is no transition.
        if (rippleRef._animationForciblyDisabledThroughCss || !animationConfig.exitDuration) {
            this._finishRippleTransition(rippleRef);
        }
    }
    /** Fades out all currently active ripples. */
    fadeOutAll() {
        this._getActiveRipples().forEach(ripple => ripple.fadeOut());
    }
    /** Fades out all currently active non-persistent ripples. */
    fadeOutAllNonPersistent() {
        this._getActiveRipples().forEach(ripple => {
            if (!ripple.config.persistent) {
                ripple.fadeOut();
            }
        });
    }
    /** Sets up the trigger event listeners */
    setupTriggerEvents(elementOrElementRef) {
        const element = coerceElement(elementOrElementRef);
        if (!element || element === this._triggerElement) {
            return;
        }
        // Remove all previously registered event listeners from the trigger element.
        this._removeTriggerEvents();
        this._triggerElement = element;
        this._registerEvents(pointerDownEvents);
    }
    /**
     * Handles all registered events.
     * @docs-private
     */
    handleEvent(event) {
        if (event.type === 'mousedown') {
            this._onMousedown(event);
        }
        else if (event.type === 'touchstart') {
            this._onTouchStart(event);
        }
        else {
            this._onPointerUp();
        }
        // If pointer-up events haven't been registered yet, do so now.
        // We do this on-demand in order to reduce the total number of event listeners
        // registered by the ripples, which speeds up the rendering time for large UIs.
        if (!this._pointerUpEventsRegistered) {
            this._registerEvents(pointerUpEvents);
            this._pointerUpEventsRegistered = true;
        }
    }
    /** Method that will be called if the fade-in or fade-in transition completed. */
    _finishRippleTransition(rippleRef) {
        if (rippleRef.state === 0 /* RippleState.FADING_IN */) {
            this._startFadeOutTransition(rippleRef);
        }
        else if (rippleRef.state === 2 /* RippleState.FADING_OUT */) {
            this._destroyRipple(rippleRef);
        }
    }
    /**
     * Starts the fade-out transition of the given ripple if it's not persistent and the pointer
     * is not held down anymore.
     */
    _startFadeOutTransition(rippleRef) {
        const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;
        const { persistent } = rippleRef.config;
        rippleRef.state = 1 /* RippleState.VISIBLE */;
        // When the timer runs out while the user has kept their pointer down, we want to
        // keep only the persistent ripples and the latest transient ripple. We do this,
        // because we don't want stacked transient ripples to appear after their enter
        // animation has finished.
        if (!persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) {
            rippleRef.fadeOut();
        }
    }
    /** Destroys the given ripple by removing it from the DOM and updating its state. */
    _destroyRipple(rippleRef) {
        const eventListeners = this._activeRipples.get(rippleRef) ?? null;
        this._activeRipples.delete(rippleRef);
        // Clear out the cached bounding rect if we have no more ripples.
        if (!this._activeRipples.size) {
            this._containerRect = null;
        }
        // If the current ref is the most recent transient ripple, unset it
        // avoid memory leaks.
        if (rippleRef === this._mostRecentTransientRipple) {
            this._mostRecentTransientRipple = null;
        }
        rippleRef.state = 3 /* RippleState.HIDDEN */;
        if (eventListeners !== null) {
            rippleRef.element.removeEventListener('transitionend', eventListeners.onTransitionEnd);
            rippleRef.element.removeEventListener('transitioncancel', eventListeners.onTransitionCancel);
        }
        rippleRef.element.remove();
    }
    /** Function being called whenever the trigger is being pressed using mouse. */
    _onMousedown(event) {
        // Screen readers will fire fake mouse events for space/enter. Skip launching a
        // ripple in this case for consistency with the non-screen-reader experience.
        const isFakeMousedown = isFakeMousedownFromScreenReader(event);
        const isSyntheticEvent = this._lastTouchStartEvent &&
            Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;
        if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
            this._isPointerDown = true;
            this.fadeInRipple(event.clientX, event.clientY, this._target.rippleConfig);
        }
    }
    /** Function being called whenever the trigger is being pressed using touch. */
    _onTouchStart(event) {
        if (!this._target.rippleDisabled && !isFakeTouchstartFromScreenReader(event)) {
            // Some browsers fire mouse events after a `touchstart` event. Those synthetic mouse
            // events will launch a second ripple if we don't ignore mouse events for a specific
            // time after a touchstart event.
            this._lastTouchStartEvent = Date.now();
            this._isPointerDown = true;
            // Use `changedTouches` so we skip any touches where the user put
            // their finger down, but used another finger to tap the element again.
            const touches = event.changedTouches;
            for (let i = 0; i < touches.length; i++) {
                this.fadeInRipple(touches[i].clientX, touches[i].clientY, this._target.rippleConfig);
            }
        }
    }
    /** Function being called whenever the trigger is being released. */
    _onPointerUp() {
        if (!this._isPointerDown) {
            return;
        }
        this._isPointerDown = false;
        // Fade-out all ripples that are visible and not persistent.
        this._getActiveRipples().forEach(ripple => {
            // By default, only ripples that are completely visible will fade out on pointer release.
            // If the `terminateOnPointerUp` option is set, ripples that still fade in will also fade out.
            const isVisible = ripple.state === 1 /* RippleState.VISIBLE */ ||
                (ripple.config.terminateOnPointerUp && ripple.state === 0 /* RippleState.FADING_IN */);
            if (!ripple.config.persistent && isVisible) {
                ripple.fadeOut();
            }
        });
    }
    /** Registers event listeners for a given list of events. */
    _registerEvents(eventTypes) {
        this._ngZone.runOutsideAngular(() => {
            eventTypes.forEach(type => {
                this._triggerElement.addEventListener(type, this, passiveEventOptions);
            });
        });
    }
    _getActiveRipples() {
        return Array.from(this._activeRipples.keys());
    }
    /** Removes previously registered event listeners from the trigger element. */
    _removeTriggerEvents() {
        if (this._triggerElement) {
            pointerDownEvents.forEach(type => {
                this._triggerElement.removeEventListener(type, this, passiveEventOptions);
            });
            if (this._pointerUpEventsRegistered) {
                pointerUpEvents.forEach(type => {
                    this._triggerElement.removeEventListener(type, this, passiveEventOptions);
                });
            }
        }
    }
}
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 */
function distanceToFurthestCorner(x, y, rect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2NvcmUvcmlwcGxlL3JpcHBsZS1yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQVcsK0JBQStCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRixPQUFPLEVBQUMsK0JBQStCLEVBQUUsZ0NBQWdDLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFNBQVMsRUFBNEIsTUFBTSxjQUFjLENBQUM7QUFvQmxFLGdFQUFnRTtBQUNoRTs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRztJQUMxQyxhQUFhLEVBQUUsR0FBRztJQUNsQixZQUFZLEVBQUUsR0FBRztDQUNsQixDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUM7QUFFckMsMkZBQTJGO0FBQzNGLE1BQU0sbUJBQW1CLEdBQUcsK0JBQStCLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUU3RSxtREFBbUQ7QUFDbkQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUV0RCxpREFBaUQ7QUFDakQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUU3RTs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQWlDekIsWUFDVSxPQUFxQixFQUNyQixPQUFlLEVBQ3ZCLG1CQUEwRCxFQUMxRCxRQUFrQjtRQUhWLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFDckIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQTVCekIsb0RBQW9EO1FBQzVDLG1CQUFj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LElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNsRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0VsZW1lbnRSZWYsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsYXRmb3JtLCBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtpc0Zha2VNb3VzZWRvd25Gcm9tU2NyZWVuUmVhZGVyLCBpc0Zha2VUb3VjaHN0YXJ0RnJvbVNjcmVlblJlYWRlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtjb2VyY2VFbGVtZW50fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtSaXBwbGVSZWYsIFJpcHBsZVN0YXRlLCBSaXBwbGVDb25maWd9IGZyb20gJy4vcmlwcGxlLXJlZic7XG5cbi8qKlxuICogSW50ZXJmYWNlIHRoYXQgZGVzY3JpYmVzIHRoZSB0YXJnZXQgZm9yIGxhdW5jaGluZyByaXBwbGVzLlxuICogSXQgZGVmaW5lcyB0aGUgcmlwcGxlIGNvbmZpZ3VyYXRpb24gYW5kIGRpc2FibGVkIHN0YXRlIGZvciBpbnRlcmFjdGlvbiByaXBwbGVzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJpcHBsZVRhcmdldCB7XG4gIC8qKiBDb25maWd1cmF0aW9uIGZvciByaXBwbGVzIHRoYXQgYXJlIGxhdW5jaGVkIG9uIHBvaW50ZXIgZG93bi4gKi9cbiAgcmlwcGxlQ29uZmlnOiBSaXBwbGVDb25maWc7XG4gIC8qKiBXaGV0aGVyIHJpcHBsZXMgb24gcG9pbnRlciBkb3duIHNob3VsZCBiZSBkaXNhYmxlZC4gKi9cbiAgcmlwcGxlRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbi8qKiBJbnRlcmZhY2VzIHRoZSBkZWZpbmVzIHJpcHBsZSBlbGVtZW50IHRyYW5zaXRpb24gZXZlbnQgbGlzdGVuZXJzLiAqL1xuaW50ZXJmYWNlIFJpcHBsZUV2ZW50TGlzdGVuZXJzIHtcbiAgb25UcmFuc2l0aW9uRW5kOiBFdmVudExpc3RlbmVyO1xuICBvblRyYW5zaXRpb25DYW5jZWw6IEV2ZW50TGlzdGVuZXI7XG59XG5cbi8vIFRPRE86IGltcG9ydCB0aGVzZSB2YWx1ZXMgZnJvbSBgQG1hdGVyaWFsL3JpcHBsZWAgZXZlbnR1YWxseS5cbi8qKlxuICogRGVmYXVsdCByaXBwbGUgYW5pbWF0aW9uIGNvbmZpZ3VyYXRpb24gZm9yIHJpcHBsZXMgd2l0aG91dCBhbiBleHBsaWNpdFxuICogYW5pbWF0aW9uIGNvbmZpZyBzcGVjaWZpZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0UmlwcGxlQW5pbWF0aW9uQ29uZmlnID0ge1xuICBlbnRlckR1cmF0aW9uOiAyMjUsXG4gIGV4aXREdXJhdGlvbjogMTUwLFxufTtcblxuLyoqXG4gKiBUaW1lb3V0IGZvciBpZ25vcmluZyBtb3VzZSBldmVudHMuIE1vdXNlIGV2ZW50cyB3aWxsIGJlIHRlbXBvcmFyeSBpZ25vcmVkIGFmdGVyIHRvdWNoXG4gKiBldmVudHMgdG8gYXZvaWQgc3ludGhldGljIG1vdXNlIGV2ZW50cy5cbiAqL1xuY29uc3QgaWdub3JlTW91c2VFdmVudHNUaW1lb3V0ID0gODAwO1xuXG4vKiogT3B0aW9ucyB0aGF0IGFwcGx5IHRvIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIHRoYXQgYXJlIGJvdW5kIGJ5IHRoZSByaXBwbGUgcmVuZGVyZXIuICovXG5jb25zdCBwYXNzaXZlRXZlbnRPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogdHJ1ZX0pO1xuXG4vKiogRXZlbnRzIHRoYXQgc2lnbmFsIHRoYXQgdGhlIHBvaW50ZXIgaXMgZG93bi4gKi9cbmNvbnN0IHBvaW50ZXJEb3duRXZlbnRzID0gWydtb3VzZWRvd24nLCAndG91Y2hzdGFydCddO1xuXG4vKiogRXZlbnRzIHRoYXQgc2lnbmFsIHRoYXQgdGhlIHBvaW50ZXIgaXMgdXAuICovXG5jb25zdCBwb2ludGVyVXBFdmVudHMgPSBbJ21vdXNldXAnLCAnbW91c2VsZWF2ZScsICd0b3VjaGVuZCcsICd0b3VjaGNhbmNlbCddO1xuXG4vKipcbiAqIEhlbHBlciBzZXJ2aWNlIHRoYXQgcGVyZm9ybXMgRE9NIG1hbmlwdWxhdGlvbnMuIE5vdCBpbnRlbmRlZCB0byBiZSB1c2VkIG91dHNpZGUgdGhpcyBtb2R1bGUuXG4gKiBUaGUgY29uc3RydWN0b3IgdGFrZXMgYSByZWZlcmVuY2UgdG8gdGhlIHJpcHBsZSBkaXJlY3RpdmUncyBob3N0IGVsZW1lbnQgYW5kIGEgbWFwIG9mIERPTVxuICogZXZlbnQgaGFuZGxlcnMgdG8gYmUgaW5zdGFsbGVkIG9uIHRoZSBlbGVtZW50IHRoYXQgdHJpZ2dlcnMgcmlwcGxlIGFuaW1hdGlvbnMuXG4gKiBUaGlzIHdpbGwgZXZlbnR1YWxseSBiZWNvbWUgYSBjdXN0b20gcmVuZGVyZXIgb25jZSBBbmd1bGFyIHN1cHBvcnQgZXhpc3RzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgUmlwcGxlUmVuZGVyZXIgaW1wbGVtZW50cyBFdmVudExpc3RlbmVyT2JqZWN0IHtcbiAgLyoqIEVsZW1lbnQgd2hlcmUgdGhlIHJpcHBsZXMgYXJlIGJlaW5nIGFkZGVkIHRvLiAqL1xuICBwcml2YXRlIF9jb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAvKiogRWxlbWVudCB3aGljaCB0cmlnZ2VycyB0aGUgcmlwcGxlIGVsZW1lbnRzIG9uIG1vdXNlIGV2ZW50cy4gKi9cbiAgcHJpdmF0ZSBfdHJpZ2dlckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgcG9pbnRlciBpcyBjdXJyZW50bHkgZG93biBvciBub3QuICovXG4gIHByaXZhdGUgX2lzUG9pbnRlckRvd24gPSBmYWxzZTtcblxuICAvKipcbiAgICogTWFwIG9mIGN1cnJlbnRseSBhY3RpdmUgcmlwcGxlIHJlZmVyZW5jZXMuXG4gICAqIFRoZSByaXBwbGUgcmVmZXJlbmNlIGlzIG1hcHBlZCB0byBpdHMgZWxlbWVudCBldmVudCBsaXN0ZW5lcnMuXG4gICAqIFRoZSByZWFzb24gd2h5IGB8IG51bGxgIGlzIHVzZWQgaXMgdGhhdCBldmVudCBsaXN0ZW5lcnMgYXJlIGFkZGVkIG9ubHlcbiAgICogd2hlbiB0aGUgY29uZGl0aW9uIGlzIHRydXRoeSAoc2VlIHRoZSBgX3N0YXJ0RmFkZU91dFRyYW5zaXRpb25gIG1ldGhvZCkuXG4gICAqL1xuICBwcml2YXRlIF9hY3RpdmVSaXBwbGVzID0gbmV3IE1hcDxSaXBwbGVSZWYsIFJpcHBsZUV2ZW50TGlzdGVuZXJzIHwgbnVsbD4oKTtcblxuICAvKiogTGF0ZXN0IG5vbi1wZXJzaXN0ZW50IHJpcHBsZSB0aGF0IHdhcyB0cmlnZ2VyZWQuICovXG4gIHByaXZhdGUgX21vc3RSZWNlbnRUcmFuc2llbnRSaXBwbGU6IFJpcHBsZVJlZiB8IG51bGw7XG5cbiAgLyoqIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHdoZW4gdGhlIGxhc3QgdG91Y2hzdGFydCBldmVudCBoYXBwZW5lZC4gKi9cbiAgcHJpdmF0ZSBfbGFzdFRvdWNoU3RhcnRFdmVudDogbnVtYmVyO1xuXG4gIC8qKiBXaGV0aGVyIHBvaW50ZXItdXAgZXZlbnQgbGlzdGVuZXJzIGhhdmUgYmVlbiByZWdpc3RlcmVkLiAqL1xuICBwcml2YXRlIF9wb2ludGVyVXBFdmVudHNSZWdpc3RlcmVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIENhY2hlZCBkaW1lbnNpb25zIG9mIHRoZSByaXBwbGUgY29udGFpbmVyLiBTZXQgd2hlbiB0aGUgZmlyc3RcbiAgICogcmlwcGxlIGlzIHNob3duIGFuZCBjbGVhcmVkIG9uY2Ugbm8gbW9yZSByaXBwbGVzIGFyZSB2aXNpYmxlLlxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGFpbmVyUmVjdDogQ2xpZW50UmVjdCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdGFyZ2V0OiBSaXBwbGVUYXJnZXQsXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgZWxlbWVudE9yRWxlbWVudFJlZjogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICkge1xuICAgIC8vIE9ubHkgZG8gYW55dGhpbmcgaWYgd2UncmUgb24gdGhlIGJyb3dzZXIuXG4gICAgaWYgKHBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5fY29udGFpbmVyRWxlbWVudCA9IGNvZXJjZUVsZW1lbnQoZWxlbWVudE9yRWxlbWVudFJlZik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZhZGVzIGluIGEgcmlwcGxlIGF0IHRoZSBnaXZlbiBjb29yZGluYXRlcy5cbiAgICogQHBhcmFtIHggQ29vcmRpbmF0ZSB3aXRoaW4gdGhlIGVsZW1lbnQsIGFsb25nIHRoZSBYIGF4aXMgYXQgd2hpY2ggdG8gc3RhcnQgdGhlIHJpcHBsZS5cbiAgICogQHBhcmFtIHkgQ29vcmRpbmF0ZSB3aXRoaW4gdGhlIGVsZW1lbnQsIGFsb25nIHRoZSBZIGF4aXMgYXQgd2hpY2ggdG8gc3RhcnQgdGhlIHJpcHBsZS5cbiAgICogQHBhcmFtIGNvbmZpZyBFeHRyYSByaXBwbGUgb3B0aW9ucy5cbiAgICovXG4gIGZhZGVJblJpcHBsZSh4OiBudW1iZXIsIHk6IG51bWJlciwgY29uZmlnOiBSaXBwbGVDb25maWcgPSB7fSk6IFJpcHBsZVJlZiB7XG4gICAgY29uc3QgY29udGFpbmVyUmVjdCA9ICh0aGlzLl9jb250YWluZXJSZWN0ID1cbiAgICAgIHRoaXMuX2NvbnRhaW5lclJlY3QgfHwgdGhpcy5fY29udGFpbmVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG4gICAgY29uc3QgYW5pbWF0aW9uQ29uZmlnID0gey4uLmRlZmF1bHRSaXBwbGVBbmltYXRpb25Db25maWcsIC4uLmNvbmZpZy5hbmltYXRpb259O1xuXG4gICAgaWYgKGNvbmZpZy5jZW50ZXJlZCkge1xuICAgICAgeCA9IGNvbnRhaW5lclJlY3QubGVmdCArIGNvbnRhaW5lclJlY3Qud2lkdGggLyAyO1xuICAgICAgeSA9IGNvbnRhaW5lclJlY3QudG9wICsgY29udGFpbmVyUmVjdC5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGNvbnN0IHJhZGl1cyA9IGNvbmZpZy5yYWRpdXMgfHwgZGlzdGFuY2VUb0Z1cnRoZXN0Q29ybmVyKHgsIHksIGNvbnRhaW5lclJlY3QpO1xuICAgIGNvbnN0IG9mZnNldFggPSB4IC0gY29udGFpbmVyUmVjdC5sZWZ0O1xuICAgIGNvbnN0IG9mZnNldFkgPSB5IC0gY29udGFpbmVyUmVjdC50b3A7XG4gICAgY29uc3QgZW50ZXJEdXJhdGlvbiA9IGFuaW1hdGlvbkNvbmZpZy5lbnRlckR1cmF0aW9uO1xuXG4gICAgY29uc3QgcmlwcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcmlwcGxlLmNsYXNzTGlzdC5hZGQoJ21hdC1yaXBwbGUtZWxlbWVudCcpO1xuXG4gICAgcmlwcGxlLnN0eWxlLmxlZnQgPSBgJHtvZmZzZXRYIC0gcmFkaXVzfXB4YDtcbiAgICByaXBwbGUuc3R5bGUudG9wID0gYCR7b2Zmc2V0WSAtIHJhZGl1c31weGA7XG4gICAgcmlwcGxlLnN0eWxlLmhlaWdodCA9IGAke3JhZGl1cyAqIDJ9cHhgO1xuICAgIHJpcHBsZS5zdHlsZS53aWR0aCA9IGAke3JhZGl1cyAqIDJ9cHhgO1xuXG4gICAgLy8gSWYgYSBjdXN0b20gY29sb3IgaGFzIGJlZW4gc3BlY2lmaWVkLCBzZXQgaXQgYXMgaW5saW5lIHN0eWxlLiBJZiBubyBjb2xvciBpc1xuICAgIC8vIHNldCwgdGhlIGRlZmF1bHQgY29sb3Igd2lsbCBiZSBhcHBsaWVkIHRocm91Z2ggdGhlIHJpcHBsZSB0aGVtZSBzdHlsZXMuXG4gICAgaWYgKGNvbmZpZy5jb2xvciAhPSBudWxsKSB7XG4gICAgICByaXBwbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29uZmlnLmNvbG9yO1xuICAgIH1cblxuICAgIHJpcHBsZS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtlbnRlckR1cmF0aW9ufW1zYDtcblxuICAgIHRoaXMuX2NvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQocmlwcGxlKTtcblxuICAgIC8vIEJ5IGRlZmF1bHQgdGhlIGJyb3dzZXIgZG9lcyBub3QgcmVjYWxjdWxhdGUgdGhlIHN0eWxlcyBvZiBkeW5hbWljYWxseSBjcmVhdGVkXG4gICAgLy8gcmlwcGxlIGVsZW1lbnRzLiBUaGlzIGlzIGNyaXRpY2FsIHRvIGVuc3VyZSB0aGF0IHRoZSBgc2NhbGVgIGFuaW1hdGVzIHByb3Blcmx5LlxuICAgIC8vIFdlIGVuZm9yY2UgYSBzdHlsZSByZWNhbGN1bGF0aW9uIGJ5IGNhbGxpbmcgYGdldENvbXB1dGVkU3R5bGVgIGFuZCAqYWNjZXNzaW5nKiBhIHByb3BlcnR5LlxuICAgIC8vIFNlZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzVkNTJmYjA4MWIzNTcwYzgxZTNhXG4gICAgY29uc3QgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyaXBwbGUpO1xuICAgIGNvbnN0IHVzZXJUcmFuc2l0aW9uUHJvcGVydHkgPSBjb21wdXRlZFN0eWxlcy50cmFuc2l0aW9uUHJvcGVydHk7XG4gICAgY29uc3QgdXNlclRyYW5zaXRpb25EdXJhdGlvbiA9IGNvbXB1dGVkU3R5bGVzLnRyYW5zaXRpb25EdXJhdGlvbjtcblxuICAgIC8vIE5vdGU6IFdlIGRldGVjdCB3aGV0aGVyIGFuaW1hdGlvbiBpcyBmb3JjaWJseSBkaXNhYmxlZCB0aHJvdWdoIENTUyBieSB0aGUgdXNlIG9mXG4gICAgLy8gYHRyYW5zaXRpb246IG5vbmVgLiBUaGlzIGlzIHRlY2huaWNhbGx5IHVuZXhwZWN0ZWQgc2luY2UgYW5pbWF0aW9ucyBhcmUgY29udHJvbGxlZFxuICAgIC8vIHRocm91Z2ggdGhlIGFuaW1hdGlvbiBjb25maWcsIGJ1dCB0aGlzIGV4aXN0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIFRoaXMgbG9naWMgZG9lc1xuICAgIC8vIG5vdCBuZWVkIHRvIGJlIHN1cGVyIGFjY3VyYXRlIHNpbmNlIGl0IGNvdmVycyBzb21lIGVkZ2UgY2FzZXMgd2hpY2ggY2FuIGJlIGVhc2lseSBhdm9pZGVkIGJ5IHVzZXJzLlxuICAgIGNvbnN0IGFuaW1hdGlvbkZvcmNpYmx5RGlzYWJsZWRUaHJvdWdoQ3NzID1cbiAgICAgIHVzZXJUcmFuc2l0aW9uUHJvcGVydHkgPT09ICdub25lJyB8fFxuICAgICAgLy8gTm90ZTogVGhlIGNhbm9uaWNhbCB1bml0IGZvciBzZXJpYWxpemVkIENTUyBgPHRpbWU+YCBwcm9wZXJ0aWVzIGlzIHNlY29uZHMuIEFkZGl0aW9uYWxseVxuICAgICAgLy8gc29tZSBicm93c2VycyBleHBhbmQgdGhlIGR1cmF0aW9uIGZvciBldmVyeSBwcm9wZXJ0eSAoaW4gb3VyIGNhc2UgYG9wYWNpdHlgIGFuZCBgdHJhbnNmb3JtYCkuXG4gICAgICB1c2VyVHJhbnNpdGlvbkR1cmF0aW9uID09PSAnMHMnIHx8XG4gICAgICB1c2VyVHJhbnNpdGlvbkR1cmF0aW9uID09PSAnMHMsIDBzJztcblxuICAgIC8vIEV4cG9zZWQgcmVmZXJlbmNlIHRvIHRoZSByaXBwbGUgdGhhdCB3aWxsIGJlIHJldHVybmVkLlxuICAgIGNvbnN0IHJpcHBsZVJlZiA9IG5ldyBSaXBwbGVSZWYodGhpcywgcmlwcGxlLCBjb25maWcsIGFuaW1hdGlvbkZvcmNpYmx5RGlzYWJsZWRUaHJvdWdoQ3NzKTtcblxuICAgIC8vIFN0YXJ0IHRoZSBlbnRlciBhbmltYXRpb24gYnkgc2V0dGluZyB0aGUgdHJhbnNmb3JtL3NjYWxlIHRvIDEwMCUuIFRoZSBhbmltYXRpb24gd2lsbFxuICAgIC8vIGV4ZWN1dGUgYXMgcGFydCBvZiB0aGlzIHN0YXRlbWVudCBiZWNhdXNlIHdlIGZvcmNlZCBhIHN0eWxlIHJlY2FsY3VsYXRpb24gYmVmb3JlLlxuICAgIC8vIE5vdGU6IFdlIHVzZSBhIDNkIHRyYW5zZm9ybSBoZXJlIGluIG9yZGVyIHRvIGF2b2lkIGFuIGlzc3VlIGluIFNhZmFyaSB3aGVyZVxuICAgIC8vIHRoZSByaXBwbGVzIGFyZW4ndCBjbGlwcGVkIHdoZW4gaW5zaWRlIHRoZSBzaGFkb3cgRE9NIChzZWUgIzI0MDI4KS5cbiAgICByaXBwbGUuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMSwgMSwgMSknO1xuXG4gICAgcmlwcGxlUmVmLnN0YXRlID0gUmlwcGxlU3RhdGUuRkFESU5HX0lOO1xuXG4gICAgaWYgKCFjb25maWcucGVyc2lzdGVudCkge1xuICAgICAgdGhpcy5fbW9zdFJlY2VudFRyYW5zaWVudFJpcHBsZSA9IHJpcHBsZVJlZjtcbiAgICB9XG5cbiAgICBsZXQgZXZlbnRMaXN0ZW5lcnM6IFJpcHBsZUV2ZW50TGlzdGVuZXJzIHwgbnVsbCA9IG51bGw7XG5cbiAgICAvLyBEbyBub3QgcmVnaXN0ZXIgdGhlIGB0cmFuc2l0aW9uYCBldmVudCBsaXN0ZW5lciBpZiBmYWRlLWluIGFuZCBmYWRlLW91dCBkdXJhdGlvblxuICAgIC8vIGFyZSBzZXQgdG8gemVyby4gVGhlIGV2ZW50cyB3b24ndCBmaXJlIGFueXdheSBhbmQgd2UgY2FuIHNhdmUgcmVzb3VyY2VzIGhlcmUuXG4gICAgaWYgKCFhbmltYXRpb25Gb3JjaWJseURpc2FibGVkVGhyb3VnaENzcyAmJiAoZW50ZXJEdXJhdGlvbiB8fCBhbmltYXRpb25Db25maWcuZXhpdER1cmF0aW9uKSkge1xuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgY29uc3Qgb25UcmFuc2l0aW9uRW5kID0gKCkgPT4gdGhpcy5fZmluaXNoUmlwcGxlVHJhbnNpdGlvbihyaXBwbGVSZWYpO1xuICAgICAgICBjb25zdCBvblRyYW5zaXRpb25DYW5jZWwgPSAoKSA9PiB0aGlzLl9kZXN0cm95UmlwcGxlKHJpcHBsZVJlZik7XG4gICAgICAgIHJpcHBsZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgb25UcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgLy8gSWYgdGhlIHRyYW5zaXRpb24gaXMgY2FuY2VsbGVkIChlLmcuIGR1ZSB0byBET00gcmVtb3ZhbCksIHdlIGRlc3Ryb3kgdGhlIHJpcHBsZVxuICAgICAgICAvLyBkaXJlY3RseSBhcyBvdGhlcndpc2Ugd2Ugd291bGQga2VlcCBpdCBwYXJ0IG9mIHRoZSByaXBwbGUgY29udGFpbmVyIGZvcmV2ZXIuXG4gICAgICAgIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9jc3MtdHJhbnNpdGlvbnMtMS8jOn46dGV4dD1ubyUyMGxvbmdlciUyMGluJTIwdGhlJTIwZG9jdW1lbnQuXG4gICAgICAgIHJpcHBsZS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uY2FuY2VsJywgb25UcmFuc2l0aW9uQ2FuY2VsKTtcbiAgICAgICAgZXZlbnRMaXN0ZW5lcnMgPSB7b25UcmFuc2l0aW9uRW5kLCBvblRyYW5zaXRpb25DYW5jZWx9O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSByaXBwbGUgcmVmZXJlbmNlIHRvIHRoZSBsaXN0IG9mIGFsbCBhY3RpdmUgcmlwcGxlcy5cbiAgICB0aGlzLl9hY3RpdmVSaXBwbGVzLnNldChyaXBwbGVSZWYsIGV2ZW50TGlzdGVuZXJzKTtcblxuICAgIC8vIEluIGNhc2UgdGhlcmUgaXMgbm8gZmFkZS1pbiB0cmFuc2l0aW9uIGR1cmF0aW9uLCB3ZSBuZWVkIHRvIG1hbnVhbGx5IGNhbGwgdGhlIHRyYW5zaXRpb25cbiAgICAvLyBlbmQgbGlzdGVuZXIgYmVjYXVzZSBgdHJhbnNpdGlvbmVuZGAgZG9lc24ndCBmaXJlIGlmIHRoZXJlIGlzIG5vIHRyYW5zaXRpb24uXG4gICAgaWYgKGFuaW1hdGlvbkZvcmNpYmx5RGlzYWJsZWRUaHJvdWdoQ3NzIHx8ICFlbnRlckR1cmF0aW9uKSB7XG4gICAgICB0aGlzLl9maW5pc2hSaXBwbGVUcmFuc2l0aW9uKHJpcHBsZVJlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJpcHBsZVJlZjtcbiAgfVxuXG4gIC8qKiBGYWRlcyBvdXQgYSByaXBwbGUgcmVmZXJlbmNlLiAqL1xuICBmYWRlT3V0UmlwcGxlKHJpcHBsZVJlZjogUmlwcGxlUmVmKSB7XG4gICAgLy8gRm9yIHJpcHBsZXMgYWxyZWFkeSBmYWRpbmcgb3V0IG9yIGhpZGRlbiwgdGhpcyBzaG91bGQgYmUgYSBub29wLlxuICAgIGlmIChyaXBwbGVSZWYuc3RhdGUgPT09IFJpcHBsZVN0YXRlLkZBRElOR19PVVQgfHwgcmlwcGxlUmVmLnN0YXRlID09PSBSaXBwbGVTdGF0ZS5ISURERU4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByaXBwbGVFbCA9IHJpcHBsZVJlZi5lbGVtZW50O1xuICAgIGNvbnN0IGFuaW1hdGlvbkNvbmZpZyA9IHsuLi5kZWZhdWx0UmlwcGxlQW5pbWF0aW9uQ29uZmlnLCAuLi5yaXBwbGVSZWYuY29uZmlnLmFuaW1hdGlvbn07XG5cbiAgICAvLyBUaGlzIHN0YXJ0cyB0aGUgZmFkZS1vdXQgdHJhbnNpdGlvbiBhbmQgd2lsbCBmaXJlIHRoZSB0cmFuc2l0aW9uIGVuZCBsaXN0ZW5lciB0aGF0XG4gICAgLy8gcmVtb3ZlcyB0aGUgcmlwcGxlIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxuICAgIHJpcHBsZUVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke2FuaW1hdGlvbkNvbmZpZy5leGl0RHVyYXRpb259bXNgO1xuICAgIHJpcHBsZUVsLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgcmlwcGxlUmVmLnN0YXRlID0gUmlwcGxlU3RhdGUuRkFESU5HX09VVDtcblxuICAgIC8vIEluIGNhc2UgdGhlcmUgaXMgbm8gZmFkZS1vdXQgdHJhbnNpdGlvbiBkdXJhdGlvbiwgd2UgbmVlZCB0byBtYW51YWxseSBjYWxsIHRoZVxuICAgIC8vIHRyYW5zaXRpb24gZW5kIGxpc3RlbmVyIGJlY2F1c2UgYHRyYW5zaXRpb25lbmRgIGRvZXNuJ3QgZmlyZSBpZiB0aGVyZSBpcyBubyB0cmFuc2l0aW9uLlxuICAgIGlmIChyaXBwbGVSZWYuX2FuaW1hdGlvbkZvcmNpYmx5RGlzYWJsZWRUaHJvdWdoQ3NzIHx8ICFhbmltYXRpb25Db25maWcuZXhpdER1cmF0aW9uKSB7XG4gICAgICB0aGlzLl9maW5pc2hSaXBwbGVUcmFuc2l0aW9uKHJpcHBsZVJlZik7XG4gICAgfVxuICB9XG5cbiAgLyoqIEZhZGVzIG91dCBhbGwgY3VycmVudGx5IGFjdGl2ZSByaXBwbGVzLiAqL1xuICBmYWRlT3V0QWxsKCkge1xuICAgIHRoaXMuX2dldEFjdGl2ZVJpcHBsZXMoKS5mb3JFYWNoKHJpcHBsZSA9PiByaXBwbGUuZmFkZU91dCgpKTtcbiAgfVxuXG4gIC8qKiBGYWRlcyBvdXQgYWxsIGN1cnJlbnRseSBhY3RpdmUgbm9uLXBlcnNpc3RlbnQgcmlwcGxlcy4gKi9cbiAgZmFkZU91dEFsbE5vblBlcnNpc3RlbnQoKSB7XG4gICAgdGhpcy5fZ2V0QWN0aXZlUmlwcGxlcygpLmZvckVhY2gocmlwcGxlID0+IHtcbiAgICAgIGlmICghcmlwcGxlLmNvbmZpZy5wZXJzaXN0ZW50KSB7XG4gICAgICAgIHJpcHBsZS5mYWRlT3V0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogU2V0cyB1cCB0aGUgdHJpZ2dlciBldmVudCBsaXN0ZW5lcnMgKi9cbiAgc2V0dXBUcmlnZ2VyRXZlbnRzKGVsZW1lbnRPckVsZW1lbnRSZWY6IEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gY29lcmNlRWxlbWVudChlbGVtZW50T3JFbGVtZW50UmVmKTtcblxuICAgIGlmICghZWxlbWVudCB8fCBlbGVtZW50ID09PSB0aGlzLl90cmlnZ2VyRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbGwgcHJldmlvdXNseSByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgdGhpcy5fcmVtb3ZlVHJpZ2dlckV2ZW50cygpO1xuXG4gICAgdGhpcy5fdHJpZ2dlckVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRzKHBvaW50ZXJEb3duRXZlbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFsbCByZWdpc3RlcmVkIGV2ZW50cy5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlRXZlbnQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nKSB7XG4gICAgICB0aGlzLl9vbk1vdXNlZG93bihldmVudCBhcyBNb3VzZUV2ZW50KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgdGhpcy5fb25Ub3VjaFN0YXJ0KGV2ZW50IGFzIFRvdWNoRXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9vblBvaW50ZXJVcCgpO1xuICAgIH1cblxuICAgIC8vIElmIHBvaW50ZXItdXAgZXZlbnRzIGhhdmVuJ3QgYmVlbiByZWdpc3RlcmVkIHlldCwgZG8gc28gbm93LlxuICAgIC8vIFdlIGRvIHRoaXMgb24tZGVtYW5kIGluIG9yZGVyIHRvIHJlZHVjZSB0aGUgdG90YWwgbnVtYmVyIG9mIGV2ZW50IGxpc3RlbmVyc1xuICAgIC8vIHJlZ2lzdGVyZWQgYnkgdGhlIHJpcHBsZXMsIHdoaWNoIHNwZWVkcyB1cCB0aGUgcmVuZGVyaW5nIHRpbWUgZm9yIGxhcmdlIFVJcy5cbiAgICBpZiAoIXRoaXMuX3BvaW50ZXJVcEV2ZW50c1JlZ2lzdGVyZWQpIHtcbiAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRzKHBvaW50ZXJVcEV2ZW50cyk7XG4gICAgICB0aGlzLl9wb2ludGVyVXBFdmVudHNSZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKiogTWV0aG9kIHRoYXQgd2lsbCBiZSBjYWxsZWQgaWYgdGhlIGZhZGUtaW4gb3IgZmFkZS1pbiB0cmFuc2l0aW9uIGNvbXBsZXRlZC4gKi9cbiAgcHJpdmF0ZSBfZmluaXNoUmlwcGxlVHJhbnNpdGlvbihyaXBwbGVSZWY6IFJpcHBsZVJlZikge1xuICAgIGlmIChyaXBwbGVSZWYuc3RhdGUgPT09IFJpcHBsZVN0YXRlLkZBRElOR19JTikge1xuICAgICAgdGhpcy5fc3RhcnRGYWRlT3V0VHJhbnNpdGlvbihyaXBwbGVSZWYpO1xuICAgIH0gZWxzZSBpZiAocmlwcGxlUmVmLnN0YXRlID09PSBSaXBwbGVTdGF0ZS5GQURJTkdfT1VUKSB7XG4gICAgICB0aGlzLl9kZXN0cm95UmlwcGxlKHJpcHBsZVJlZik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgZmFkZS1vdXQgdHJhbnNpdGlvbiBvZiB0aGUgZ2l2ZW4gcmlwcGxlIGlmIGl0J3Mgbm90IHBlcnNpc3RlbnQgYW5kIHRoZSBwb2ludGVyXG4gICAqIGlzIG5vdCBoZWxkIGRvd24gYW55bW9yZS5cbiAgICovXG4gIHByaXZhdGUgX3N0YXJ0RmFkZU91dFRyYW5zaXRpb24ocmlwcGxlUmVmOiBSaXBwbGVSZWYpIHtcbiAgICBjb25zdCBpc01vc3RSZWNlbnRUcmFuc2llbnRSaXBwbGUgPSByaXBwbGVSZWYgPT09IHRoaXMuX21vc3RSZWNlbnRUcmFuc2llbnRSaXBwbGU7XG4gICAgY29uc3Qge3BlcnNpc3RlbnR9ID0gcmlwcGxlUmVmLmNvbmZpZztcblxuICAgIHJpcHBsZVJlZi5zdGF0ZSA9IFJpcHBsZVN0YXRlLlZJU0lCTEU7XG5cbiAgICAvLyBXaGVuIHRoZSB0aW1lciBydW5zIG91dCB3aGlsZSB0aGUgdXNlciBoYXMga2VwdCB0aGVpciBwb2ludGVyIGRvd24sIHdlIHdhbnQgdG9cbiAgICAvLyBrZWVwIG9ubHkgdGhlIHBlcnNpc3RlbnQgcmlwcGxlcyBhbmQgdGhlIGxhdGVzdCB0cmFuc2llbnQgcmlwcGxlLiBXZSBkbyB0aGlzLFxuICAgIC8vIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCBzdGFja2VkIHRyYW5zaWVudCByaXBwbGVzIHRvIGFwcGVhciBhZnRlciB0aGVpciBlbnRlclxuICAgIC8vIGFuaW1hdGlvbiBoYXMgZmluaXNoZWQuXG4gICAgaWYgKCFwZXJzaXN0ZW50ICYmICghaXNNb3N0UmVjZW50VHJhbnNpZW50UmlwcGxlIHx8ICF0aGlzLl9pc1BvaW50ZXJEb3duKSkge1xuICAgICAgcmlwcGxlUmVmLmZhZGVPdXQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogRGVzdHJveXMgdGhlIGdpdmVuIHJpcHBsZSBieSByZW1vdmluZyBpdCBmcm9tIHRoZSBET00gYW5kIHVwZGF0aW5nIGl0cyBzdGF0ZS4gKi9cbiAgcHJpdmF0ZSBfZGVzdHJveVJpcHBsZShyaXBwbGVSZWY6IFJpcHBsZVJlZikge1xuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gdGhpcy5fYWN0aXZlUmlwcGxlcy5nZXQocmlwcGxlUmVmKSA/PyBudWxsO1xuICAgIHRoaXMuX2FjdGl2ZVJpcHBsZXMuZGVsZXRlKHJpcHBsZVJlZik7XG5cbiAgICAvLyBDbGVhciBvdXQgdGhlIGNhY2hlZCBib3VuZGluZyByZWN0IGlmIHdlIGhhdmUgbm8gbW9yZSByaXBwbGVzLlxuICAgIGlmICghdGhpcy5fYWN0aXZlUmlwcGxlcy5zaXplKSB7XG4gICAgICB0aGlzLl9jb250YWluZXJSZWN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgY3VycmVudCByZWYgaXMgdGhlIG1vc3QgcmVjZW50IHRyYW5zaWVudCByaXBwbGUsIHVuc2V0IGl0XG4gICAgLy8gYXZvaWQgbWVtb3J5IGxlYWtzLlxuICAgIGlmIChyaXBwbGVSZWYgPT09IHRoaXMuX21vc3RSZWNlbnRUcmFuc2llbnRSaXBwbGUpIHtcbiAgICAgIHRoaXMuX21vc3RSZWNlbnRUcmFuc2llbnRSaXBwbGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJpcHBsZVJlZi5zdGF0ZSA9IFJpcHBsZVN0YXRlLkhJRERFTjtcbiAgICBpZiAoZXZlbnRMaXN0ZW5lcnMgIT09IG51bGwpIHtcbiAgICAgIHJpcHBsZVJlZi5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBldmVudExpc3RlbmVycy5vblRyYW5zaXRpb25FbmQpO1xuICAgICAgcmlwcGxlUmVmLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmNhbmNlbCcsIGV2ZW50TGlzdGVuZXJzLm9uVHJhbnNpdGlvbkNhbmNlbCk7XG4gICAgfVxuICAgIHJpcHBsZVJlZi5lbGVtZW50LnJlbW92ZSgpO1xuICB9XG5cbiAgLyoqIEZ1bmN0aW9uIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgdHJpZ2dlciBpcyBiZWluZyBwcmVzc2VkIHVzaW5nIG1vdXNlLiAqL1xuICBwcml2YXRlIF9vbk1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIC8vIFNjcmVlbiByZWFkZXJzIHdpbGwgZmlyZSBmYWtlIG1vdXNlIGV2ZW50cyBmb3Igc3BhY2UvZW50ZXIuIFNraXAgbGF1bmNoaW5nIGFcbiAgICAvLyByaXBwbGUgaW4gdGhpcyBjYXNlIGZvciBjb25zaXN0ZW5jeSB3aXRoIHRoZSBub24tc2NyZWVuLXJlYWRlciBleHBlcmllbmNlLlxuICAgIGNvbnN0IGlzRmFrZU1vdXNlZG93biA9IGlzRmFrZU1vdXNlZG93bkZyb21TY3JlZW5SZWFkZXIoZXZlbnQpO1xuICAgIGNvbnN0IGlzU3ludGhldGljRXZlbnQgPVxuICAgICAgdGhpcy5fbGFzdFRvdWNoU3RhcnRFdmVudCAmJlxuICAgICAgRGF0ZS5ub3coKSA8IHRoaXMuX2xhc3RUb3VjaFN0YXJ0RXZlbnQgKyBpZ25vcmVNb3VzZUV2ZW50c1RpbWVvdXQ7XG5cbiAgICBpZiAoIXRoaXMuX3RhcmdldC5yaXBwbGVEaXNhYmxlZCAmJiAhaXNGYWtlTW91c2Vkb3duICYmICFpc1N5bnRoZXRpY0V2ZW50KSB7XG4gICAgICB0aGlzLl9pc1BvaW50ZXJEb3duID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmFkZUluUmlwcGxlKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIHRoaXMuX3RhcmdldC5yaXBwbGVDb25maWcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBGdW5jdGlvbiBiZWluZyBjYWxsZWQgd2hlbmV2ZXIgdGhlIHRyaWdnZXIgaXMgYmVpbmcgcHJlc3NlZCB1c2luZyB0b3VjaC4gKi9cbiAgcHJpdmF0ZSBfb25Ub3VjaFN0YXJ0KGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl90YXJnZXQucmlwcGxlRGlzYWJsZWQgJiYgIWlzRmFrZVRvdWNoc3RhcnRGcm9tU2NyZWVuUmVhZGVyKGV2ZW50KSkge1xuICAgICAgLy8gU29tZSBicm93c2VycyBmaXJlIG1vdXNlIGV2ZW50cyBhZnRlciBhIGB0b3VjaHN0YXJ0YCBldmVudC4gVGhvc2Ugc3ludGhldGljIG1vdXNlXG4gICAgICAvLyBldmVudHMgd2lsbCBsYXVuY2ggYSBzZWNvbmQgcmlwcGxlIGlmIHdlIGRvbid0IGlnbm9yZSBtb3VzZSBldmVudHMgZm9yIGEgc3BlY2lmaWNcbiAgICAgIC8vIHRpbWUgYWZ0ZXIgYSB0b3VjaHN0YXJ0IGV2ZW50LlxuICAgICAgdGhpcy5fbGFzdFRvdWNoU3RhcnRFdmVudCA9IERhdGUubm93KCk7XG4gICAgICB0aGlzLl9pc1BvaW50ZXJEb3duID0gdHJ1ZTtcblxuICAgICAgLy8gVXNlIGBjaGFuZ2VkVG91Y2hlc2Agc28gd2Ugc2tpcCBhbnkgdG91Y2hlcyB3aGVyZSB0aGUgdXNlciBwdXRcbiAgICAgIC8vIHRoZWlyIGZpbmdlciBkb3duLCBidXQgdXNlZCBhbm90aGVyIGZpbmdlciB0byB0YXAgdGhlIGVsZW1lbnQgYWdhaW4uXG4gICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQuY2hhbmdlZFRvdWNoZXM7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmZhZGVJblJpcHBsZSh0b3VjaGVzW2ldLmNsaWVudFgsIHRvdWNoZXNbaV0uY2xpZW50WSwgdGhpcy5fdGFyZ2V0LnJpcHBsZUNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEZ1bmN0aW9uIGJlaW5nIGNhbGxlZCB3aGVuZXZlciB0aGUgdHJpZ2dlciBpcyBiZWluZyByZWxlYXNlZC4gKi9cbiAgcHJpdmF0ZSBfb25Qb2ludGVyVXAoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1BvaW50ZXJEb3duKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5faXNQb2ludGVyRG93biA9IGZhbHNlO1xuXG4gICAgLy8gRmFkZS1vdXQgYWxsIHJpcHBsZXMgdGhhdCBhcmUgdmlzaWJsZSBhbmQgbm90IHBlcnNpc3RlbnQuXG4gICAgdGhpcy5fZ2V0QWN0aXZlUmlwcGxlcygpLmZvckVhY2gocmlwcGxlID0+IHtcbiAgICAgIC8vIEJ5IGRlZmF1bHQsIG9ubHkgcmlwcGxlcyB0aGF0IGFyZSBjb21wbGV0ZWx5IHZpc2libGUgd2lsbCBmYWRlIG91dCBvbiBwb2ludGVyIHJlbGVhc2UuXG4gICAgICAvLyBJZiB0aGUgYHRlcm1pbmF0ZU9uUG9pbnRlclVwYCBvcHRpb24gaXMgc2V0LCByaXBwbGVzIHRoYXQgc3RpbGwgZmFkZSBpbiB3aWxsIGFsc28gZmFkZSBvdXQuXG4gICAgICBjb25zdCBpc1Zpc2libGUgPVxuICAgICAgICByaXBwbGUuc3RhdGUgPT09IFJpcHBsZVN0YXRlLlZJU0lCTEUgfHxcbiAgICAgICAgKHJpcHBsZS5jb25maWcudGVybWluYXRlT25Qb2ludGVyVXAgJiYgcmlwcGxlLnN0YXRlID09PSBSaXBwbGVTdGF0ZS5GQURJTkdfSU4pO1xuXG4gICAgICBpZiAoIXJpcHBsZS5jb25maWcucGVyc2lzdGVudCAmJiBpc1Zpc2libGUpIHtcbiAgICAgICAgcmlwcGxlLmZhZGVPdXQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZWdpc3RlcnMgZXZlbnQgbGlzdGVuZXJzIGZvciBhIGdpdmVuIGxpc3Qgb2YgZXZlbnRzLiAqL1xuICBwcml2YXRlIF9yZWdpc3RlckV2ZW50cyhldmVudFR5cGVzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBldmVudFR5cGVzLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJFbGVtZW50IS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIHRoaXMsIHBhc3NpdmVFdmVudE9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRBY3RpdmVSaXBwbGVzKCk6IFJpcHBsZVJlZltdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9hY3RpdmVSaXBwbGVzLmtleXMoKSk7XG4gIH1cblxuICAvKiogUmVtb3ZlcyBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIHRyaWdnZXIgZWxlbWVudC4gKi9cbiAgX3JlbW92ZVRyaWdnZXJFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuX3RyaWdnZXJFbGVtZW50KSB7XG4gICAgICBwb2ludGVyRG93bkV2ZW50cy5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgICB0aGlzLl90cmlnZ2VyRWxlbWVudCEucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLCBwYXNzaXZlRXZlbnRPcHRpb25zKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5fcG9pbnRlclVwRXZlbnRzUmVnaXN0ZXJlZCkge1xuICAgICAgICBwb2ludGVyVXBFdmVudHMuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICAgICB0aGlzLl90cmlnZ2VyRWxlbWVudCEucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLCBwYXNzaXZlRXZlbnRPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgcG9pbnQgKHgsIHkpIHRvIHRoZSBmdXJ0aGVzdCBjb3JuZXIgb2YgYSByZWN0YW5nbGUuXG4gKi9cbmZ1bmN0aW9uIGRpc3RhbmNlVG9GdXJ0aGVzdENvcm5lcih4OiBudW1iZXIsIHk6IG51bWJlciwgcmVjdDogQ2xpZW50UmVjdCkge1xuICBjb25zdCBkaXN0WCA9IE1hdGgubWF4KE1hdGguYWJzKHggLSByZWN0LmxlZnQpLCBNYXRoLmFicyh4IC0gcmVjdC5yaWdodCkpO1xuICBjb25zdCBkaXN0WSA9IE1hdGgubWF4KE1hdGguYWJzKHkgLSByZWN0LnRvcCksIE1hdGguYWJzKHkgLSByZWN0LmJvdHRvbSkpO1xuICByZXR1cm4gTWF0aC5zcXJ0KGRpc3RYICogZGlzdFggKyBkaXN0WSAqIGRpc3RZKTtcbn1cbiJdfQ==