/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ComponentHarness, HarnessPredicate, parallel, } from '@angular/cdk/testing';
/** Harness for interacting with a thumb inside of a Material slider in tests. */
export class MatSliderThumbHarness extends ComponentHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a slider thumb with specific attributes.
     * @param options Options for filtering which thumb instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options).addOption('position', options.position, async (harness, value) => {
            return (await harness.getPosition()) === value;
        });
    }
    /** Gets the position of the thumb inside the slider. */
    async getPosition() {
        // Meant to mimic MDC's logic where `matSliderThumb` is treated as END.
        const isStart = (await (await this.host()).getAttribute('matSliderStartThumb')) != null;
        return isStart ? 0 /* ThumbPosition.START */ : 1 /* ThumbPosition.END */;
    }
    /** Gets the value of the thumb. */
    async getValue() {
        return await (await this.host()).getProperty('valueAsNumber');
    }
    /** Sets the value of the thumb. */
    async setValue(newValue) {
        const input = await this.host();
        // Since this is a range input, we can't simulate the user interacting with it so we set the
        // value directly and dispatch a couple of fake events to ensure that everything fires.
        await input.setInputValue(newValue + '');
        await input.dispatchEvent('input');
        await input.dispatchEvent('change');
    }
    /** Gets the current percentage value of the slider. */
    async getPercentage() {
        const [value, min, max] = await parallel(() => [
            this.getValue(),
            this.getMinValue(),
            this.getMaxValue(),
        ]);
        return (value - min) / (max - min);
    }
    /** Gets the maximum value of the thumb. */
    async getMaxValue() {
        return coerceNumberProperty(await (await this.host()).getProperty('max'));
    }
    /** Gets the minimum value of the thumb. */
    async getMinValue() {
        return coerceNumberProperty(await (await this.host()).getProperty('min'));
    }
    /** Gets the text representation of the slider's value. */
    async getDisplayValue() {
        return (await (await this.host()).getAttribute('aria-valuetext')) || '';
    }
    /** Whether the thumb is disabled. */
    async isDisabled() {
        return (await this.host()).getProperty('disabled');
    }
    /** Gets the name of the thumb. */
    async getName() {
        return await (await this.host()).getProperty('name');
    }
    /** Gets the id of the thumb. */
    async getId() {
        return await (await this.host()).getProperty('id');
    }
    /**
     * Focuses the thumb and returns a promise that indicates when the
     * action is complete.
     */
    async focus() {
        return (await this.host()).focus();
    }
    /**
     * Blurs the thumb and returns a promise that indicates when the
     * action is complete.
     */
    async blur() {
        return (await this.host()).blur();
    }
    /** Whether the thumb is focused. */
    async isFocused() {
        return (await this.host()).isFocused();
    }
}
MatSliderThumbHarness.hostSelector = 'input[matSliderThumb], input[matSliderStartThumb], input[matSliderEndThumb]';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLXRodW1iLWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2xpZGVyL3Rlc3Rpbmcvc2xpZGVyLXRodW1iLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUNMLGdCQUFnQixFQUVoQixnQkFBZ0IsRUFDaEIsUUFBUSxHQUNULE1BQU0sc0JBQXNCLENBQUM7QUFHOUIsaUZBQWlGO0FBQ2pGLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxnQkFBZ0I7SUFJekQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBRVQsVUFBcUMsRUFBRTtRQUV2QyxPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FDbEQsVUFBVSxFQUNWLE9BQU8sQ0FBQyxRQUFRLEVBQ2hCLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdkIsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDO1FBQ2pELENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELHdEQUF3RDtJQUN4RCxLQUFLLENBQUMsV0FBVztRQUNmLHVFQUF1RTtRQUN2RSxNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3hGLE9BQU8sT0FBTyxDQUFDLENBQUMsNkJBQXFCLENBQUMsMEJBQWtCLENBQUM7SUFDM0QsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxLQUFLLENBQUMsUUFBUTtRQUNaLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFTLGVBQWUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxtQ0FBbUM7SUFDbkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFnQjtRQUM3QixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVoQyw0RkFBNEY7UUFDNUYsdUZBQXVGO1FBQ3ZGLE1BQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekMsTUFBTSxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLE1BQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsdURBQXVEO0lBQ3ZELEtBQUssQ0FBQyxhQUFhO1FBQ2pCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQUU7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLEtBQUssQ0FBQyxXQUFXO1FBQ2YsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLEtBQUssQ0FBQyxXQUFXO1FBQ2YsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsMERBQTBEO0lBQzFELEtBQUssQ0FBQyxlQUFlO1FBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxRSxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLEtBQUssQ0FBQyxVQUFVO1FBQ2QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFVLFVBQVUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBUyxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsZ0NBQWdDO0lBQ2hDLEtBQUssQ0FBQyxLQUFLO1FBQ1QsT0FBTyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQVMsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxLQUFLO1FBQ1QsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELG9DQUFvQztJQUNwQyxLQUFLLENBQUMsU0FBUztRQUNiLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pDLENBQUM7O0FBeEdNLGtDQUFZLEdBQ2pCLDZFQUE2RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIEhhcm5lc3NQcmVkaWNhdGUsXG4gIHBhcmFsbGVsLFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge1NsaWRlclRodW1iSGFybmVzc0ZpbHRlcnMsIFRodW1iUG9zaXRpb259IGZyb20gJy4vc2xpZGVyLWhhcm5lc3MtZmlsdGVycyc7XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGEgdGh1bWIgaW5zaWRlIG9mIGEgTWF0ZXJpYWwgc2xpZGVyIGluIHRlc3RzLiAqL1xuZXhwb3J0IGNsYXNzIE1hdFNsaWRlclRodW1iSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID1cbiAgICAnaW5wdXRbbWF0U2xpZGVyVGh1bWJdLCBpbnB1dFttYXRTbGlkZXJTdGFydFRodW1iXSwgaW5wdXRbbWF0U2xpZGVyRW5kVGh1bWJdJztcblxuICAvKipcbiAgICogR2V0cyBhIGBIYXJuZXNzUHJlZGljYXRlYCB0aGF0IGNhbiBiZSB1c2VkIHRvIHNlYXJjaCBmb3IgYSBzbGlkZXIgdGh1bWIgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBmaWx0ZXJpbmcgd2hpY2ggdGh1bWIgaW5zdGFuY2VzIGFyZSBjb25zaWRlcmVkIGEgbWF0Y2guXG4gICAqIEByZXR1cm4gYSBgSGFybmVzc1ByZWRpY2F0ZWAgY29uZmlndXJlZCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgKi9cbiAgc3RhdGljIHdpdGg8VCBleHRlbmRzIE1hdFNsaWRlclRodW1iSGFybmVzcz4oXG4gICAgdGhpczogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFQ+LFxuICAgIG9wdGlvbnM6IFNsaWRlclRodW1iSGFybmVzc0ZpbHRlcnMgPSB7fSxcbiAgKTogSGFybmVzc1ByZWRpY2F0ZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKHRoaXMsIG9wdGlvbnMpLmFkZE9wdGlvbihcbiAgICAgICdwb3NpdGlvbicsXG4gICAgICBvcHRpb25zLnBvc2l0aW9uLFxuICAgICAgYXN5bmMgKGhhcm5lc3MsIHZhbHVlKSA9PiB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgaGFybmVzcy5nZXRQb3NpdGlvbigpKSA9PT0gdmFsdWU7XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIHRodW1iIGluc2lkZSB0aGUgc2xpZGVyLiAqL1xuICBhc3luYyBnZXRQb3NpdGlvbigpOiBQcm9taXNlPFRodW1iUG9zaXRpb24+IHtcbiAgICAvLyBNZWFudCB0byBtaW1pYyBNREMncyBsb2dpYyB3aGVyZSBgbWF0U2xpZGVyVGh1bWJgIGlzIHRyZWF0ZWQgYXMgRU5ELlxuICAgIGNvbnN0IGlzU3RhcnQgPSAoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRBdHRyaWJ1dGUoJ21hdFNsaWRlclN0YXJ0VGh1bWInKSkgIT0gbnVsbDtcbiAgICByZXR1cm4gaXNTdGFydCA/IFRodW1iUG9zaXRpb24uU1RBUlQgOiBUaHVtYlBvc2l0aW9uLkVORDtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIGdldFZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHk8bnVtYmVyPigndmFsdWVBc051bWJlcicpO1xuICB9XG5cbiAgLyoqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgc2V0VmFsdWUobmV3VmFsdWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlucHV0ID0gYXdhaXQgdGhpcy5ob3N0KCk7XG5cbiAgICAvLyBTaW5jZSB0aGlzIGlzIGEgcmFuZ2UgaW5wdXQsIHdlIGNhbid0IHNpbXVsYXRlIHRoZSB1c2VyIGludGVyYWN0aW5nIHdpdGggaXQgc28gd2Ugc2V0IHRoZVxuICAgIC8vIHZhbHVlIGRpcmVjdGx5IGFuZCBkaXNwYXRjaCBhIGNvdXBsZSBvZiBmYWtlIGV2ZW50cyB0byBlbnN1cmUgdGhhdCBldmVyeXRoaW5nIGZpcmVzLlxuICAgIGF3YWl0IGlucHV0LnNldElucHV0VmFsdWUobmV3VmFsdWUgKyAnJyk7XG4gICAgYXdhaXQgaW5wdXQuZGlzcGF0Y2hFdmVudCgnaW5wdXQnKTtcbiAgICBhd2FpdCBpbnB1dC5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBjdXJyZW50IHBlcmNlbnRhZ2UgdmFsdWUgb2YgdGhlIHNsaWRlci4gKi9cbiAgYXN5bmMgZ2V0UGVyY2VudGFnZSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGNvbnN0IFt2YWx1ZSwgbWluLCBtYXhdID0gYXdhaXQgcGFyYWxsZWwoKCkgPT4gW1xuICAgICAgdGhpcy5nZXRWYWx1ZSgpLFxuICAgICAgdGhpcy5nZXRNaW5WYWx1ZSgpLFxuICAgICAgdGhpcy5nZXRNYXhWYWx1ZSgpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuICh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgZ2V0TWF4VmFsdWUoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gY29lcmNlTnVtYmVyUHJvcGVydHkoYXdhaXQgKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eTxudW1iZXI+KCdtYXgnKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgbWluaW11bSB2YWx1ZSBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIGdldE1pblZhbHVlKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIGNvZXJjZU51bWJlclByb3BlcnR5KGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHk8bnVtYmVyPignbWluJykpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRleHQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNsaWRlcidzIHZhbHVlLiAqL1xuICBhc3luYyBnZXREaXNwbGF5VmFsdWUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcpKSB8fCAnJztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0aHVtYiBpcyBkaXNhYmxlZC4gKi9cbiAgYXN5bmMgaXNEaXNhYmxlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5nZXRQcm9wZXJ0eTxib29sZWFuPignZGlzYWJsZWQnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSB0aHVtYi4gKi9cbiAgYXN5bmMgZ2V0TmFtZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBhd2FpdCAoYXdhaXQgdGhpcy5ob3N0KCkpLmdldFByb3BlcnR5PHN0cmluZz4oJ25hbWUnKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSBpZCBvZiB0aGUgdGh1bWIuICovXG4gIGFzeW5jIGdldElkKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIGF3YWl0IChhd2FpdCB0aGlzLmhvc3QoKSkuZ2V0UHJvcGVydHk8c3RyaW5nPignaWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSB0aHVtYiBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGVcbiAgICogYWN0aW9uIGlzIGNvbXBsZXRlLlxuICAgKi9cbiAgYXN5bmMgZm9jdXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCbHVycyB0aGUgdGh1bWIgYW5kIHJldHVybnMgYSBwcm9taXNlIHRoYXQgaW5kaWNhdGVzIHdoZW4gdGhlXG4gICAqIGFjdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG4gIGFzeW5jIGJsdXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuYmx1cigpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHRodW1iIGlzIGZvY3VzZWQuICovXG4gIGFzeW5jIGlzRm9jdXNlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS5pc0ZvY3VzZWQoKTtcbiAgfVxufVxuIl19