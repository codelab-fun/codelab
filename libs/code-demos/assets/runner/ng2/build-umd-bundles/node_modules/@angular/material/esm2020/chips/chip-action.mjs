/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { mixinTabIndex } from '@angular/material/core';
import { MAT_CHIP } from './tokens';
import * as i0 from "@angular/core";
class _MatChipActionBase {
}
const _MatChipActionMixinBase = mixinTabIndex(_MatChipActionBase, -1);
/**
 * Section within a chip.
 * @docs-private
 */
export class MatChipAction extends _MatChipActionMixinBase {
    constructor(_elementRef, _parentChip) {
        super();
        this._elementRef = _elementRef;
        this._parentChip = _parentChip;
        /** Whether the action is interactive. */
        this.isInteractive = true;
        /** Whether this is the primary action in the chip. */
        this._isPrimary = true;
        this._disabled = false;
        /**
         * Private API to allow focusing this chip when it is disabled.
         */
        this._allowFocusWhenDisabled = false;
        if (_elementRef.nativeElement.nodeName === 'BUTTON') {
            _elementRef.nativeElement.setAttribute('type', 'button');
        }
    }
    /** Whether the action is disabled. */
    get disabled() {
        return this._disabled || this._parentChip.disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Determine the value of the disabled attribute for this chip action.
     */
    _getDisabledAttribute() {
        // When this chip action is disabled and focusing disabled chips is not permitted, return empty
        // string to indicate that disabled attribute should be included.
        return this.disabled && !this._allowFocusWhenDisabled ? '' : null;
    }
    /**
     * Determine the value of the tabindex attribute for this chip action.
     */
    _getTabindex() {
        return (this.disabled && !this._allowFocusWhenDisabled) || !this.isInteractive
            ? null
            : this.tabIndex.toString();
    }
    focus() {
        this._elementRef.nativeElement.focus();
    }
    _handleClick(event) {
        if (!this.disabled && this.isInteractive && this._isPrimary) {
            event.preventDefault();
            this._parentChip._handlePrimaryActionInteraction();
        }
    }
    _handleKeydown(event) {
        if ((event.keyCode === ENTER || event.keyCode === SPACE) &&
            !this.disabled &&
            this.isInteractive &&
            this._isPrimary) {
            event.preventDefault();
            this._parentChip._handlePrimaryActionInteraction();
        }
    }
}
MatChipAction.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatChipAction, deps: [{ token: i0.ElementRef }, { token: MAT_CHIP }], target: i0.ɵɵFactoryTarget.Directive });
MatChipAction.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatChipAction, selector: "[matChipAction]", inputs: { disabled: "disabled", tabIndex: "tabIndex", isInteractive: "isInteractive", _allowFocusWhenDisabled: "_allowFocusWhenDisabled" }, host: { listeners: { "click": "_handleClick($event)", "keydown": "_handleKeydown($event)" }, properties: { "class.mdc-evolution-chip__action--primary": "_isPrimary", "class.mdc-evolution-chip__action--presentational": "_isPrimary", "class.mdc-evolution-chip__action--trailing": "!_isPrimary", "attr.tabindex": "_getTabindex()", "attr.disabled": "_getDisabledAttribute()", "attr.aria-disabled": "disabled" }, classAttribute: "mdc-evolution-chip__action mat-mdc-chip-action" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatChipAction, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matChipAction]',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        'class': 'mdc-evolution-chip__action mat-mdc-chip-action',
                        '[class.mdc-evolution-chip__action--primary]': '_isPrimary',
                        // Note that while our actions are interactive, we have to add the `--presentational` class,
                        // in order to avoid some super-specific `:hover` styles from MDC.
                        '[class.mdc-evolution-chip__action--presentational]': '_isPrimary',
                        '[class.mdc-evolution-chip__action--trailing]': '!_isPrimary',
                        '[attr.tabindex]': '_getTabindex()',
                        '[attr.disabled]': '_getDisabledAttribute()',
                        '[attr.aria-disabled]': 'disabled',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_CHIP]
                }] }]; }, propDecorators: { isInteractive: [{
                type: Input
            }], disabled: [{
                type: Input
            }], _allowFocusWhenDisabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC1hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY2hpcHMvY2hpcC1hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFlLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBYyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUVsQyxNQUFlLGtCQUFrQjtDQUVoQztBQUVELE1BQU0sdUJBQXVCLEdBQUcsYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFdEU7OztHQUdHO0FBa0JILE1BQU0sT0FBTyxhQUFjLFNBQVEsdUJBQXVCO0lBeUN4RCxZQUNTLFdBQW9DLEVBRWpDLFdBSVQ7UUFFRCxLQUFLLEVBQUUsQ0FBQztRQVJELGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUVqQyxnQkFBVyxHQUFYLFdBQVcsQ0FJcEI7UUEvQ0gseUNBQXlDO1FBQ2hDLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTlCLHNEQUFzRDtRQUN0RCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBVVYsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUUxQjs7V0FFRztRQUVLLDRCQUF1QixHQUFHLEtBQUssQ0FBQztRQStCdEMsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDbkQsV0FBVyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQztJQWhERCxzQ0FBc0M7SUFDdEMsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQ3JELENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFtQjtRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFTRDs7T0FFRztJQUNPLHFCQUFxQjtRQUM3QiwrRkFBK0Y7UUFDL0YsaUVBQWlFO1FBQ2pFLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDcEUsQ0FBQztJQUVEOztPQUVHO0lBQ08sWUFBWTtRQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFDNUUsQ0FBQyxDQUFDLElBQUk7WUFDTixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBa0JELEtBQUs7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWlCO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMzRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFvQjtRQUNqQyxJQUNFLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUM7WUFDcEQsQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNkLElBQUksQ0FBQyxhQUFhO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQ2Y7WUFDQSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQzs7K0dBOUVVLGFBQWEsNENBMkNkLFFBQVE7bUdBM0NQLGFBQWE7Z0dBQWIsYUFBYTtrQkFqQnpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztvQkFDaEMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxnREFBZ0Q7d0JBQ3pELDZDQUE2QyxFQUFFLFlBQVk7d0JBQzNELDRGQUE0Rjt3QkFDNUYsa0VBQWtFO3dCQUNsRSxvREFBb0QsRUFBRSxZQUFZO3dCQUNsRSw4Q0FBOEMsRUFBRSxhQUFhO3dCQUM3RCxpQkFBaUIsRUFBRSxnQkFBZ0I7d0JBQ25DLGlCQUFpQixFQUFFLHlCQUF5Qjt3QkFDNUMsc0JBQXNCLEVBQUUsVUFBVTt3QkFDbEMsU0FBUyxFQUFFLHNCQUFzQjt3QkFDakMsV0FBVyxFQUFFLHdCQUF3QjtxQkFDdEM7aUJBQ0Y7OzBCQTRDSSxNQUFNOzJCQUFDLFFBQVE7NENBekNULGFBQWE7c0JBQXJCLEtBQUs7Z0JBT0YsUUFBUTtzQkFEWCxLQUFLO2dCQWFFLHVCQUF1QjtzQkFEOUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtFTlRFUiwgU1BBQ0V9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0hhc1RhYkluZGV4LCBtaXhpblRhYkluZGV4fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TUFUX0NISVB9IGZyb20gJy4vdG9rZW5zJztcblxuYWJzdHJhY3QgY2xhc3MgX01hdENoaXBBY3Rpb25CYXNlIHtcbiAgYWJzdHJhY3QgZGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IF9NYXRDaGlwQWN0aW9uTWl4aW5CYXNlID0gbWl4aW5UYWJJbmRleChfTWF0Q2hpcEFjdGlvbkJhc2UsIC0xKTtcblxuLyoqXG4gKiBTZWN0aW9uIHdpdGhpbiBhIGNoaXAuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRDaGlwQWN0aW9uXScsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICd0YWJJbmRleCddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21kYy1ldm9sdXRpb24tY2hpcF9fYWN0aW9uIG1hdC1tZGMtY2hpcC1hY3Rpb24nLFxuICAgICdbY2xhc3MubWRjLWV2b2x1dGlvbi1jaGlwX19hY3Rpb24tLXByaW1hcnldJzogJ19pc1ByaW1hcnknLFxuICAgIC8vIE5vdGUgdGhhdCB3aGlsZSBvdXIgYWN0aW9ucyBhcmUgaW50ZXJhY3RpdmUsIHdlIGhhdmUgdG8gYWRkIHRoZSBgLS1wcmVzZW50YXRpb25hbGAgY2xhc3MsXG4gICAgLy8gaW4gb3JkZXIgdG8gYXZvaWQgc29tZSBzdXBlci1zcGVjaWZpYyBgOmhvdmVyYCBzdHlsZXMgZnJvbSBNREMuXG4gICAgJ1tjbGFzcy5tZGMtZXZvbHV0aW9uLWNoaXBfX2FjdGlvbi0tcHJlc2VudGF0aW9uYWxdJzogJ19pc1ByaW1hcnknLFxuICAgICdbY2xhc3MubWRjLWV2b2x1dGlvbi1jaGlwX19hY3Rpb24tLXRyYWlsaW5nXSc6ICchX2lzUHJpbWFyeScsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICdfZ2V0VGFiaW5kZXgoKScsXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdfZ2V0RGlzYWJsZWRBdHRyaWJ1dGUoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnKGNsaWNrKSc6ICdfaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcEFjdGlvbiBleHRlbmRzIF9NYXRDaGlwQWN0aW9uTWl4aW5CYXNlIGltcGxlbWVudHMgSGFzVGFiSW5kZXgge1xuICAvKiogV2hldGhlciB0aGUgYWN0aW9uIGlzIGludGVyYWN0aXZlLiAqL1xuICBASW5wdXQoKSBpc0ludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAvKiogV2hldGhlciB0aGlzIGlzIHRoZSBwcmltYXJ5IGFjdGlvbiBpbiB0aGUgY2hpcC4gKi9cbiAgX2lzUHJpbWFyeSA9IHRydWU7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGFjdGlvbiBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCB8fCB0aGlzLl9wYXJlbnRDaGlwLmRpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogQm9vbGVhbklucHV0KSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgQVBJIHRvIGFsbG93IGZvY3VzaW5nIHRoaXMgY2hpcCB3aGVuIGl0IGlzIGRpc2FibGVkLlxuICAgKi9cbiAgQElucHV0KClcbiAgcHJpdmF0ZSBfYWxsb3dGb2N1c1doZW5EaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIHZhbHVlIG9mIHRoZSBkaXNhYmxlZCBhdHRyaWJ1dGUgZm9yIHRoaXMgY2hpcCBhY3Rpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldERpc2FibGVkQXR0cmlidXRlKCk6IHN0cmluZyB8IG51bGwge1xuICAgIC8vIFdoZW4gdGhpcyBjaGlwIGFjdGlvbiBpcyBkaXNhYmxlZCBhbmQgZm9jdXNpbmcgZGlzYWJsZWQgY2hpcHMgaXMgbm90IHBlcm1pdHRlZCwgcmV0dXJuIGVtcHR5XG4gICAgLy8gc3RyaW5nIHRvIGluZGljYXRlIHRoYXQgZGlzYWJsZWQgYXR0cmlidXRlIHNob3VsZCBiZSBpbmNsdWRlZC5cbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5fYWxsb3dGb2N1c1doZW5EaXNhYmxlZCA/ICcnIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIHZhbHVlIG9mIHRoZSB0YWJpbmRleCBhdHRyaWJ1dGUgZm9yIHRoaXMgY2hpcCBhY3Rpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldFRhYmluZGV4KCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiAodGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5fYWxsb3dGb2N1c1doZW5EaXNhYmxlZCkgfHwgIXRoaXMuaXNJbnRlcmFjdGl2ZVxuICAgICAgPyBudWxsXG4gICAgICA6IHRoaXMudGFiSW5kZXgudG9TdHJpbmcoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQEluamVjdChNQVRfQ0hJUClcbiAgICBwcm90ZWN0ZWQgX3BhcmVudENoaXA6IHtcbiAgICAgIF9oYW5kbGVQcmltYXJ5QWN0aW9uSW50ZXJhY3Rpb24oKTogdm9pZDtcbiAgICAgIHJlbW92ZSgpOiB2b2lkO1xuICAgICAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgfSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lID09PSAnQlVUVE9OJykge1xuICAgICAgX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgfVxuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBfaGFuZGxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5pc0ludGVyYWN0aXZlICYmIHRoaXMuX2lzUHJpbWFyeSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX3BhcmVudENoaXAuX2hhbmRsZVByaW1hcnlBY3Rpb25JbnRlcmFjdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgKGV2ZW50LmtleUNvZGUgPT09IEVOVEVSIHx8IGV2ZW50LmtleUNvZGUgPT09IFNQQUNFKSAmJlxuICAgICAgIXRoaXMuZGlzYWJsZWQgJiZcbiAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSAmJlxuICAgICAgdGhpcy5faXNQcmltYXJ5XG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5fcGFyZW50Q2hpcC5faGFuZGxlUHJpbWFyeUFjdGlvbkludGVyYWN0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iXX0=