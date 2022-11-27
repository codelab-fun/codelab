/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Internal component that creates an instance of the MDC notched-outline component.
 *
 * The component sets up the HTML structure and styles for the notched-outline. It provides
 * inputs to toggle the notch state and width.
 */
export class MatFormFieldNotchedOutline {
    constructor(_elementRef, _ngZone) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        /** Width of the label (original scale) */
        this.labelWidth = 0;
        /** Whether the notch should be opened. */
        this.open = false;
    }
    ngAfterViewInit() {
        const label = this._elementRef.nativeElement.querySelector('.mdc-floating-label');
        if (label) {
            this._elementRef.nativeElement.classList.add('mdc-notched-outline--upgraded');
            if (typeof requestAnimationFrame === 'function') {
                label.style.transitionDuration = '0s';
                this._ngZone.runOutsideAngular(() => {
                    requestAnimationFrame(() => (label.style.transitionDuration = ''));
                });
            }
        }
        else {
            this._elementRef.nativeElement.classList.add('mdc-notched-outline--no-label');
        }
    }
    _getNotchWidth() {
        if (this.open) {
            const NOTCH_ELEMENT_PADDING = 8;
            const NOTCH_ELEMENT_BORDER = 1;
            return this.labelWidth > 0
                ? `calc(${this.labelWidth}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${NOTCH_ELEMENT_PADDING + NOTCH_ELEMENT_BORDER}px)`
                : '0px';
        }
        return null;
    }
}
MatFormFieldNotchedOutline.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldNotchedOutline, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
MatFormFieldNotchedOutline.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatFormFieldNotchedOutline, selector: "div[matFormFieldNotchedOutline]", inputs: { labelWidth: ["matFormFieldNotchedOutlineLabelWidth", "labelWidth"], open: ["matFormFieldNotchedOutlineOpen", "open"] }, host: { properties: { "class.mdc-notched-outline--notched": "open" }, classAttribute: "mdc-notched-outline" }, ngImport: i0, template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\" [style.width]=\"_getNotchWidth()\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldNotchedOutline, decorators: [{
            type: Component,
            args: [{ selector: 'div[matFormFieldNotchedOutline]', host: {
                        'class': 'mdc-notched-outline',
                        // Besides updating the notch state through the MDC component, we toggle this class through
                        // a host binding in order to ensure that the notched-outline renders correctly on the server.
                        '[class.mdc-notched-outline--notched]': 'open',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"mdc-notched-outline__leading\"></div>\n<div class=\"mdc-notched-outline__notch\" [style.width]=\"_getNotchWidth()\">\n  <ng-content></ng-content>\n</div>\n<div class=\"mdc-notched-outline__trailing\"></div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { labelWidth: [{
                type: Input,
                args: ['matFormFieldNotchedOutlineLabelWidth']
            }], open: [{
                type: Input,
                args: ['matFormFieldNotchedOutlineOpen']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90Y2hlZC1vdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tZmllbGQvZGlyZWN0aXZlcy9ub3RjaGVkLW91dGxpbmUudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1maWVsZC9kaXJlY3RpdmVzL25vdGNoZWQtb3V0bGluZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7QUFFdkI7Ozs7O0dBS0c7QUFhSCxNQUFNLE9BQU8sMEJBQTBCO0lBT3JDLFlBQW9CLFdBQW9DLEVBQVUsT0FBZTtRQUE3RCxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBTmpGLDBDQUEwQztRQUNLLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdEUsMENBQTBDO1FBQ0QsU0FBSSxHQUFZLEtBQUssQ0FBQztJQUVxQixDQUFDO0lBRXJGLGVBQWU7UUFDYixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQWMscUJBQXFCLENBQUMsQ0FBQztRQUMvRixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUU5RSxJQUFJLE9BQU8scUJBQXFCLEtBQUssVUFBVSxFQUFFO2dCQUMvQyxLQUFLLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7b0JBQ2xDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUMvRTtJQUNILENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUM7WUFDaEMsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLENBQUM7WUFDL0IsT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxVQUFVLCtEQUNyQixxQkFBcUIsR0FBRyxvQkFDMUIsS0FBSztnQkFDUCxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ1g7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OzRIQXJDVSwwQkFBMEI7Z0hBQTFCLDBCQUEwQix3VENwQ3ZDLCtOQUtBO2dHRCtCYSwwQkFBMEI7a0JBWnRDLFNBQVM7K0JBQ0UsaUNBQWlDLFFBRXJDO3dCQUNKLE9BQU8sRUFBRSxxQkFBcUI7d0JBQzlCLDJGQUEyRjt3QkFDM0YsOEZBQThGO3dCQUM5RixzQ0FBc0MsRUFBRSxNQUFNO3FCQUMvQyxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTtzSEFJVSxVQUFVO3NCQUF4RCxLQUFLO3VCQUFDLHNDQUFzQztnQkFHSixJQUFJO3NCQUE1QyxLQUFLO3VCQUFDLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50IHRoYXQgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgTURDIG5vdGNoZWQtb3V0bGluZSBjb21wb25lbnQuXG4gKlxuICogVGhlIGNvbXBvbmVudCBzZXRzIHVwIHRoZSBIVE1MIHN0cnVjdHVyZSBhbmQgc3R5bGVzIGZvciB0aGUgbm90Y2hlZC1vdXRsaW5lLiBJdCBwcm92aWRlc1xuICogaW5wdXRzIHRvIHRvZ2dsZSB0aGUgbm90Y2ggc3RhdGUgYW5kIHdpZHRoLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkaXZbbWF0Rm9ybUZpZWxkTm90Y2hlZE91dGxpbmVdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25vdGNoZWQtb3V0bGluZS5odG1sJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtZGMtbm90Y2hlZC1vdXRsaW5lJyxcbiAgICAvLyBCZXNpZGVzIHVwZGF0aW5nIHRoZSBub3RjaCBzdGF0ZSB0aHJvdWdoIHRoZSBNREMgY29tcG9uZW50LCB3ZSB0b2dnbGUgdGhpcyBjbGFzcyB0aHJvdWdoXG4gICAgLy8gYSBob3N0IGJpbmRpbmcgaW4gb3JkZXIgdG8gZW5zdXJlIHRoYXQgdGhlIG5vdGNoZWQtb3V0bGluZSByZW5kZXJzIGNvcnJlY3RseSBvbiB0aGUgc2VydmVyLlxuICAgICdbY2xhc3MubWRjLW5vdGNoZWQtb3V0bGluZS0tbm90Y2hlZF0nOiAnb3BlbicsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAvKiogV2lkdGggb2YgdGhlIGxhYmVsIChvcmlnaW5hbCBzY2FsZSkgKi9cbiAgQElucHV0KCdtYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZUxhYmVsV2lkdGgnKSBsYWJlbFdpZHRoOiBudW1iZXIgPSAwO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBub3RjaCBzaG91bGQgYmUgb3BlbmVkLiAqL1xuICBASW5wdXQoJ21hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lT3BlbicpIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGxhYmVsID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcubWRjLWZsb2F0aW5nLWxhYmVsJyk7XG4gICAgaWYgKGxhYmVsKSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWRjLW5vdGNoZWQtb3V0bGluZS0tdXBncmFkZWQnKTtcblxuICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbGFiZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBzJztcbiAgICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gKGxhYmVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcnKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWRjLW5vdGNoZWQtb3V0bGluZS0tbm8tbGFiZWwnKTtcbiAgICB9XG4gIH1cblxuICBfZ2V0Tm90Y2hXaWR0aCgpIHtcbiAgICBpZiAodGhpcy5vcGVuKSB7XG4gICAgICBjb25zdCBOT1RDSF9FTEVNRU5UX1BBRERJTkcgPSA4O1xuICAgICAgY29uc3QgTk9UQ0hfRUxFTUVOVF9CT1JERVIgPSAxO1xuICAgICAgcmV0dXJuIHRoaXMubGFiZWxXaWR0aCA+IDBcbiAgICAgICAgPyBgY2FsYygke3RoaXMubGFiZWxXaWR0aH1weCAqIHZhcigtLW1hdC1tZGMtZm9ybS1maWVsZC1mbG9hdGluZy1sYWJlbC1zY2FsZSwgMC43NSkgKyAke1xuICAgICAgICAgICAgTk9UQ0hfRUxFTUVOVF9QQURESU5HICsgTk9UQ0hfRUxFTUVOVF9CT1JERVJcbiAgICAgICAgICB9cHgpYFxuICAgICAgICA6ICcwcHgnO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fbGVhZGluZ1wiPjwvZGl2PlxuPGRpdiBjbGFzcz1cIm1kYy1ub3RjaGVkLW91dGxpbmVfX25vdGNoXCIgW3N0eWxlLndpZHRoXT1cIl9nZXROb3RjaFdpZHRoKClcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibWRjLW5vdGNoZWQtb3V0bGluZV9fdHJhaWxpbmdcIj48L2Rpdj5cbiJdfQ==