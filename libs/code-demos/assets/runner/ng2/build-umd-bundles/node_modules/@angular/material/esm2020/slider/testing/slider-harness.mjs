/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, HarnessPredicate, } from '@angular/cdk/testing';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatSliderThumbHarness } from './slider-thumb-harness';
/** Harness for interacting with a MDC mat-slider in tests. */
export class MatSliderHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slider with specific attributes.
     * @param options Options for filtering which input instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('isRange', options.isRange, async (harness, value) => {
            return (await harness.isRange()) === value;
        });
    }
    /** Gets the start thumb of the slider (only applicable for range sliders). */
    async getStartThumb() {
        if (!(await this.isRange())) {
            throw Error('`getStartThumb` is only applicable for range sliders. ' +
                'Did you mean to use `getEndThumb`?');
        }
        return this.locatorFor(MatSliderThumbHarness.with({ position: 0 /* ThumbPosition.START */ }))();
    }
    /** Gets the thumb (for single point sliders), or the end thumb (for range sliders). */
    async getEndThumb() {
        return this.locatorFor(MatSliderThumbHarness.with({ position: 1 /* ThumbPosition.END */ }))();
    }
    /** Gets whether the slider is a range slider. */
    async isRange() {
        return await (await this.host()).hasClass('mdc-slider--range');
    }
    /** Gets whether the slider is disabled. */
    async isDisabled() {
        return await (await this.host()).hasClass('mdc-slider--disabled');
    }
    /** Gets the value step increments of the slider. */
    async getStep() {
        // The same step value is forwarded to both thumbs.
        const startHost = await (await this.getEndThumb()).host();
        return coerceNumberProperty(await startHost.getProperty('step'));
    }
    /** Gets the maximum value of the slider. */
    async getMaxValue() {
        return (await this.getEndThumb()).getMaxValue();
    }
    /** Gets the minimum value of the slider. */
    async getMinValue() {
        const startThumb = (await this.isRange())
            ? await this.getStartThumb()
            : await this.getEndThumb();
        return startThumb.getMinValue();
    }
}
MatSliderHarness.hostSelector = '.mat-mdc-slider';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2xpZGVyL3Rlc3Rpbmcvc2xpZGVyLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixnQkFBZ0IsR0FDakIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUzRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCw4REFBOEQ7QUFDOUQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGdCQUFnQjtJQUdwRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FFVCxVQUFnQyxFQUFFO1FBRWxDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUNsRCxTQUFTLEVBQ1QsT0FBTyxDQUFDLE9BQU8sRUFDZixLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQztRQUM3QyxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCw4RUFBOEU7SUFDOUUsS0FBSyxDQUFDLGFBQWE7UUFDakIsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUMzQixNQUFNLEtBQUssQ0FDVCx3REFBd0Q7Z0JBQ3RELG9DQUFvQyxDQUN2QyxDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSw2QkFBcUIsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3hGLENBQUM7SUFFRCx1RkFBdUY7SUFDdkYsS0FBSyxDQUFDLFdBQVc7UUFDZixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSwyQkFBbUIsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RGLENBQUM7SUFFRCxpREFBaUQ7SUFDakQsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsS0FBSyxDQUFDLFVBQVU7UUFDZCxPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxvREFBb0Q7SUFDcEQsS0FBSyxDQUFDLE9BQU87UUFDWCxtREFBbUQ7UUFDbkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUQsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxXQUFXLENBQVMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLEtBQUssQ0FBQyxXQUFXO1FBQ2YsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELDRDQUE0QztJQUM1QyxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM1QixDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsT0FBTyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7QUFoRU0sNkJBQVksR0FBRyxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIEhhcm5lc3NQcmVkaWNhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1NsaWRlckhhcm5lc3NGaWx0ZXJzLCBUaHVtYlBvc2l0aW9ufSBmcm9tICcuL3NsaWRlci1oYXJuZXNzLWZpbHRlcnMnO1xuaW1wb3J0IHtNYXRTbGlkZXJUaHVtYkhhcm5lc3N9IGZyb20gJy4vc2xpZGVyLXRodW1iLWhhcm5lc3MnO1xuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIE1EQyBtYXQtc2xpZGVyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlckhhcm5lc3MgZXh0ZW5kcyBDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICcubWF0LW1kYy1zbGlkZXInO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIHNsaWRlciB3aXRoIHNwZWNpZmljIGF0dHJpYnV0ZXMuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIGZpbHRlcmluZyB3aGljaCBpbnB1dCBpbnN0YW5jZXMgYXJlIGNvbnNpZGVyZWQgYSBtYXRjaC5cbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aDxUIGV4dGVuZHMgTWF0U2xpZGVySGFybmVzcz4oXG4gICAgdGhpczogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFQ+LFxuICAgIG9wdGlvbnM6IFNsaWRlckhhcm5lc3NGaWx0ZXJzID0ge30sXG4gICk6IEhhcm5lc3NQcmVkaWNhdGU8VD4ge1xuICAgIHJldHVybiBuZXcgSGFybmVzc1ByZWRpY2F0ZSh0aGlzLCBvcHRpb25zKS5hZGRPcHRpb24oXG4gICAgICAnaXNSYW5nZScsXG4gICAgICBvcHRpb25zLmlzUmFuZ2UsXG4gICAgICBhc3luYyAoaGFybmVzcywgdmFsdWUpID0+IHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCBoYXJuZXNzLmlzUmFuZ2UoKSkgPT09IHZhbHVlO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHN0YXJ0IHRodW1iIG9mIHRoZSBzbGlkZXIgKG9ubHkgYXBwbGljYWJsZSBmb3IgcmFuZ2Ugc2xpZGVycykuICovXG4gIGFzeW5jIGdldFN0YXJ0VGh1bWIoKTogUHJvbWlzZTxNYXRTbGlkZXJUaHVtYkhhcm5lc3M+IHtcbiAgICBpZiAoIShhd2FpdCB0aGlzLmlzUmFuZ2UoKSkpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAnYGdldFN0YXJ0VGh1bWJgIGlzIG9ubHkgYXBwbGljYWJsZSBmb3IgcmFuZ2Ugc2xpZGVycy4gJyArXG4gICAgICAgICAgJ0RpZCB5b3UgbWVhbiB0byB1c2UgYGdldEVuZFRodW1iYD8nLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvcihNYXRTbGlkZXJUaHVtYkhhcm5lc3Mud2l0aCh7cG9zaXRpb246IFRodW1iUG9zaXRpb24uU1RBUlR9KSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0aHVtYiAoZm9yIHNpbmdsZSBwb2ludCBzbGlkZXJzKSwgb3IgdGhlIGVuZCB0aHVtYiAoZm9yIHJhbmdlIHNsaWRlcnMpLiAqL1xuICBhc3luYyBnZXRFbmRUaHVtYigpOiBQcm9taXNlPE1hdFNsaWRlclRodW1iSGFybmVzcz4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3IoTWF0U2xpZGVyVGh1bWJIYXJuZXNzLndpdGgoe3Bvc2l0aW9uOiBUaHVtYlBvc2l0aW9uLkVORH0pKSgpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgc2xpZGVyIGlzIGEgcmFuZ2Ugc2xpZGVyLiAqL1xuICBhc3luYyBpc1JhbmdlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtZGMtc2xpZGVyLS1yYW5nZScpO1xuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgc2xpZGVyIGlzIGRpc2FibGVkLiAqL1xuICBhc3luYyBpc0Rpc2FibGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmhhc0NsYXNzKCdtZGMtc2xpZGVyLS1kaXNhYmxlZCcpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHZhbHVlIHN0ZXAgaW5jcmVtZW50cyBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRTdGVwKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgLy8gVGhlIHNhbWUgc3RlcCB2YWx1ZSBpcyBmb3J3YXJkZWQgdG8gYm90aCB0aHVtYnMuXG4gICAgY29uc3Qgc3RhcnRIb3N0ID0gYXdhaXQgKGF3YWl0IHRoaXMuZ2V0RW5kVGh1bWIoKSkuaG9zdCgpO1xuICAgIHJldHVybiBjb2VyY2VOdW1iZXJQcm9wZXJ0eShhd2FpdCBzdGFydEhvc3QuZ2V0UHJvcGVydHk8c3RyaW5nPignc3RlcCcpKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSBzbGlkZXIuICovXG4gIGFzeW5jIGdldE1heFZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldEVuZFRodW1iKCkpLmdldE1heFZhbHVlKCk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWluaW11bSB2YWx1ZSBvZiB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRNaW5WYWx1ZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGNvbnN0IHN0YXJ0VGh1bWIgPSAoYXdhaXQgdGhpcy5pc1JhbmdlKCkpXG4gICAgICA/IGF3YWl0IHRoaXMuZ2V0U3RhcnRUaHVtYigpXG4gICAgICA6IGF3YWl0IHRoaXMuZ2V0RW5kVGh1bWIoKTtcbiAgICByZXR1cm4gc3RhcnRUaHVtYi5nZXRNaW5WYWx1ZSgpO1xuICB9XG59XG4iXX0=