/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, ContentContainerComponentHarness, HarnessPredicate, parallel, } from '@angular/cdk/testing';
const iconSelector = '.mat-mdc-list-item-icon';
const avatarSelector = '.mat-mdc-list-item-avatar';
/**
 * Gets a `HarnessPredicate` that applies the given `BaseListItemHarnessFilters` to the given
 * list item harness.
 * @template H The type of list item harness to create a predicate for.
 * @param harnessType A constructor for a list item harness.
 * @param options An instance of `BaseListItemHarnessFilters` to apply.
 * @return A `HarnessPredicate` for the given harness type with the given options applied.
 */
export function getListItemPredicate(harnessType, options) {
    return new HarnessPredicate(harnessType, options)
        .addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text))
        .addOption('fullText', options.fullText, (harness, fullText) => HarnessPredicate.stringMatches(harness.getFullText(), fullText))
        .addOption('title', options.title, (harness, title) => HarnessPredicate.stringMatches(harness.getTitle(), title))
        .addOption('secondaryText', options.secondaryText, (harness, secondaryText) => HarnessPredicate.stringMatches(harness.getSecondaryText(), secondaryText))
        .addOption('tertiaryText', options.tertiaryText, (harness, tertiaryText) => HarnessPredicate.stringMatches(harness.getTertiaryText(), tertiaryText));
}
/** Harness for interacting with a MDC-based list subheader. */
export class MatSubheaderHarness extends ComponentHarness {
    static with(options = {}) {
        return new HarnessPredicate(MatSubheaderHarness, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
    }
    /** Gets the full text content of the list item (including text from any font icons). */
    async getText() {
        return (await this.host()).text();
    }
}
MatSubheaderHarness.hostSelector = '.mat-mdc-subheader';
/**
 * Shared behavior among the harnesses for the various `MatListItem` flavors.
 * @docs-private
 */
export class MatListItemHarnessBase extends ContentContainerComponentHarness {
    constructor() {
        super(...arguments);
        this._lines = this.locatorForAll('.mat-mdc-list-item-line');
        this._primaryText = this.locatorFor('.mdc-list-item__primary-text');
        this._avatar = this.locatorForOptional('.mat-mdc-list-item-avatar');
        this._icon = this.locatorForOptional('.mat-mdc-list-item-icon');
        this._unscopedTextContent = this.locatorFor('.mat-mdc-list-item-unscoped-content');
    }
    /** Gets the type of the list item, currently describing how many lines there are. */
    async getType() {
        const host = await this.host();
        const [isOneLine, isTwoLine] = await parallel(() => [
            host.hasClass('mdc-list-item--with-one-line'),
            host.hasClass('mdc-list-item--with-two-lines'),
        ]);
        if (isOneLine) {
            return 0 /* MatListItemType.ONE_LINE_ITEM */;
        }
        else if (isTwoLine) {
            return 1 /* MatListItemType.TWO_LINE_ITEM */;
        }
        else {
            return 2 /* MatListItemType.THREE_LINE_ITEM */;
        }
    }
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     *
     * @deprecated Use the `getFullText` method instead.
     * @breaking-change 16.0.0
     */
    async getText() {
        return this.getFullText();
    }
    /**
     * Gets the full text content of the list item, excluding text
     * from icons and avatars.
     */
    async getFullText() {
        return (await this.host()).text({ exclude: `${iconSelector}, ${avatarSelector}` });
    }
    /** Gets the title of the list item. */
    async getTitle() {
        return (await this._primaryText()).text();
    }
    /** Whether the list item is disabled. */
    async isDisabled() {
        return (await this.host()).hasClass('mdc-list-item--disabled');
    }
    /**
     * Gets the secondary line text of the list item. Null if the list item
     * does not have a secondary line.
     */
    async getSecondaryText() {
        const type = await this.getType();
        if (type === 0 /* MatListItemType.ONE_LINE_ITEM */) {
            return null;
        }
        const [lines, unscopedTextContent] = await parallel(() => [
            this._lines(),
            this._unscopedTextContent(),
        ]);
        // If there is no explicit line for the secondary text, the unscoped text content
        // is rendered as the secondary text (with potential text wrapping enabled).
        if (lines.length >= 1) {
            return lines[0].text();
        }
        else {
            return unscopedTextContent.text();
        }
    }
    /**
     * Gets the tertiary line text of the list item. Null if the list item
     * does not have a tertiary line.
     */
    async getTertiaryText() {
        const type = await this.getType();
        if (type !== 2 /* MatListItemType.THREE_LINE_ITEM */) {
            return null;
        }
        const [lines, unscopedTextContent] = await parallel(() => [
            this._lines(),
            this._unscopedTextContent(),
        ]);
        // First we check if there is an explicit line for the tertiary text. If so, we return it.
        // If there is at least an explicit secondary line though, then we know that the unscoped
        // text content corresponds to the tertiary line. If there are no explicit lines at all,
        // we know that the unscoped text content from the secondary text just wraps into the third
        // line, but there *no* actual dedicated tertiary text.
        if (lines.length === 2) {
            return lines[1].text();
        }
        else if (lines.length === 1) {
            return unscopedTextContent.text();
        }
        return null;
    }
    /** Whether this list item has an avatar. */
    async hasAvatar() {
        return !!(await this._avatar());
    }
    /** Whether this list item has an icon. */
    async hasIcon() {
        return !!(await this._icon());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLWhhcm5lc3MtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9saXN0L3Rlc3RpbmcvbGlzdC1pdGVtLWhhcm5lc3MtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBRWhCLGdDQUFnQyxFQUNoQyxnQkFBZ0IsRUFDaEIsUUFBUSxHQUNULE1BQU0sc0JBQXNCLENBQUM7QUFHOUIsTUFBTSxZQUFZLEdBQUcseUJBQXlCLENBQUM7QUFDL0MsTUFBTSxjQUFjLEdBQUcsMkJBQTJCLENBQUM7QUFFbkQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsV0FBMkMsRUFDM0MsT0FBbUM7SUFFbkMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7U0FDOUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQ2pELGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQ3hEO1NBQ0EsU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQzdELGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQ2hFO1NBQ0EsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ3BELGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQzFEO1NBQ0EsU0FBUyxDQUFDLGVBQWUs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Q0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM3QixPQUFPLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsNENBQTRDO0lBQzVDLEtBQUssQ0FBQyxTQUFTO1FBQ2IsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudEhhcm5lc3MsXG4gIENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcixcbiAgQ29udGVudENvbnRhaW5lckNvbXBvbmVudEhhcm5lc3MsXG4gIEhhcm5lc3NQcmVkaWNhdGUsXG4gIHBhcmFsbGVsLFxufSBmcm9tICdAYW5ndWxhci9jZGsvdGVzdGluZyc7XG5pbXBvcnQge0Jhc2VMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzLCBTdWJoZWFkZXJIYXJuZXNzRmlsdGVyc30gZnJvbSAnLi9saXN0LWhhcm5lc3MtZmlsdGVycyc7XG5cbmNvbnN0IGljb25TZWxlY3RvciA9ICcubWF0LW1kYy1saXN0LWl0ZW0taWNvbic7XG5jb25zdCBhdmF0YXJTZWxlY3RvciA9ICcubWF0LW1kYy1saXN0LWl0ZW0tYXZhdGFyJztcblxuLyoqXG4gKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgYXBwbGllcyB0aGUgZ2l2ZW4gYEJhc2VMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzYCB0byB0aGUgZ2l2ZW5cbiAqIGxpc3QgaXRlbSBoYXJuZXNzLlxuICogQHRlbXBsYXRlIEggVGhlIHR5cGUgb2YgbGlzdCBpdGVtIGhhcm5lc3MgdG8gY3JlYXRlIGEgcHJlZGljYXRlIGZvci5cbiAqIEBwYXJhbSBoYXJuZXNzVHlwZSBBIGNvbnN0cnVjdG9yIGZvciBhIGxpc3QgaXRlbSBoYXJuZXNzLlxuICogQHBhcmFtIG9wdGlvbnMgQW4gaW5zdGFuY2Ugb2YgYEJhc2VMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzYCB0byBhcHBseS5cbiAqIEByZXR1cm4gQSBgSGFybmVzc1ByZWRpY2F0ZWAgZm9yIHRoZSBnaXZlbiBoYXJuZXNzIHR5cGUgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucyBhcHBsaWVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlzdEl0ZW1QcmVkaWNhdGU8SCBleHRlbmRzIE1hdExpc3RJdGVtSGFybmVzc0Jhc2U+KFxuICBoYXJuZXNzVHlwZTogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPEg+LFxuICBvcHRpb25zOiBCYXNlTGlzdEl0ZW1IYXJuZXNzRmlsdGVycyxcbik6IEhhcm5lc3NQcmVkaWNhdGU8SD4ge1xuICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUoaGFybmVzc1R5cGUsIG9wdGlvbnMpXG4gICAgLmFkZE9wdGlvbigndGV4dCcsIG9wdGlvbnMudGV4dCwgKGhhcm5lc3MsIHRleHQpID0+XG4gICAgICBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUZXh0KCksIHRleHQpLFxuICAgIClcbiAgICAuYWRkT3B0aW9uKCdmdWxsVGV4dCcsIG9wdGlvbnMuZnVsbFRleHQsIChoYXJuZXNzLCBmdWxsVGV4dCkgPT5cbiAgICAgIEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldEZ1bGxUZXh0KCksIGZ1bGxUZXh0KSxcbiAgICApXG4gICAgLmFkZE9wdGlvbigndGl0bGUnLCBvcHRpb25zLnRpdGxlLCAoaGFybmVzcywgdGl0bGUpID0+XG4gICAgICBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUaXRsZSgpLCB0aXRsZSksXG4gICAgKVxuICAgIC5hZGRPcHRpb24oJ3NlY29uZGFyeVRleHQnLCBvcHRpb25zLnNlY29uZGFyeVRleHQsIChoYXJuZXNzLCBzZWNvbmRhcnlUZXh0KSA9PlxuICAgICAgSGFybmVzc1ByZWRpY2F0ZS5zdHJpbmdNYXRjaGVzKGhhcm5lc3MuZ2V0U2Vjb25kYXJ5VGV4dCgpLCBzZWNvbmRhcnlUZXh0KSxcbiAgICApXG4gICAgLmFkZE9wdGlvbigndGVydGlhcnlUZXh0Jywgb3B0aW9ucy50ZXJ0aWFyeVRleHQsIChoYXJuZXNzLCB0ZXJ0aWFyeVRleHQpID0+XG4gICAgICBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUZXJ0aWFyeVRleHQoKSwgdGVydGlhcnlUZXh0KSxcbiAgICApO1xufVxuXG4vKiogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBhIE1EQy1iYXNlZCBsaXN0IHN1YmhlYWRlci4gKi9cbmV4cG9ydCBjbGFzcyBNYXRTdWJoZWFkZXJIYXJuZXNzIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyB7XG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtc3ViaGVhZGVyJztcblxuICBzdGF0aWMgd2l0aChvcHRpb25zOiBTdWJoZWFkZXJIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxNYXRTdWJoZWFkZXJIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKE1hdFN1YmhlYWRlckhhcm5lc3MsIG9wdGlvbnMpLmFkZE9wdGlvbihcbiAgICAgICd0ZXh0JyxcbiAgICAgIG9wdGlvbnMudGV4dCxcbiAgICAgIChoYXJuZXNzLCB0ZXh0KSA9PiBIYXJuZXNzUHJlZGljYXRlLnN0cmluZ01hdGNoZXMoaGFybmVzcy5nZXRUZXh0KCksIHRleHQpLFxuICAgICk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgZnVsbCB0ZXh0IGNvbnRlbnQgb2YgdGhlIGxpc3QgaXRlbSAoaW5jbHVkaW5nIHRleHQgZnJvbSBhbnkgZm9udCBpY29ucykuICovXG4gIGFzeW5jIGdldFRleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuaG9zdCgpKS50ZXh0KCk7XG4gIH1cbn1cblxuLyoqIFNlbGVjdG9ycyBmb3IgdGhlIHZhcmlvdXMgbGlzdCBpdGVtIHNlY3Rpb25zIHRoYXQgbWF5IGNvbnRhaW4gdXNlciBjb250ZW50LiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTWF0TGlzdEl0ZW1TZWN0aW9uIHtcbiAgQ09OVEVOVCA9ICcubWRjLWxpc3QtaXRlbV9fY29udGVudCcsXG59XG5cbi8qKiBFbnVtIGRlc2NyaWJpbmcgdGhlIHBvc3NpYmxlIHZhcmlhbnRzIG9mIGEgbGlzdCBpdGVtLiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTWF0TGlzdEl0ZW1UeXBlIHtcbiAgT05FX0xJTkVfSVRFTSxcbiAgVFdPX0xJTkVfSVRFTSxcbiAgVEhSRUVfTElORV9JVEVNLFxufVxuXG4vKipcbiAqIFNoYXJlZCBiZWhhdmlvciBhbW9uZyB0aGUgaGFybmVzc2VzIGZvciB0aGUgdmFyaW91cyBgTWF0TGlzdEl0ZW1gIGZsYXZvcnMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXRMaXN0SXRlbUhhcm5lc3NCYXNlIGV4dGVuZHMgQ29udGVudENvbnRhaW5lckNvbXBvbmVudEhhcm5lc3M8TWF0TGlzdEl0ZW1TZWN0aW9uPiB7XG4gIHByaXZhdGUgX2xpbmVzID0gdGhpcy5sb2NhdG9yRm9yQWxsKCcubWF0LW1kYy1saXN0LWl0ZW0tbGluZScpO1xuICBwcml2YXRlIF9wcmltYXJ5VGV4dCA9IHRoaXMubG9jYXRvckZvcignLm1kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dCcpO1xuICBwcml2YXRlIF9hdmF0YXIgPSB0aGlzLmxvY2F0b3JGb3JPcHRpb25hbCgnLm1hdC1tZGMtbGlzdC1pdGVtLWF2YXRhcicpO1xuICBwcml2YXRlIF9pY29uID0gdGhpcy5sb2NhdG9yRm9yT3B0aW9uYWwoJy5tYXQtbWRjLWxpc3QtaXRlbS1pY29uJyk7XG4gIHByaXZhdGUgX3Vuc2NvcGVkVGV4dENvbnRlbnQgPSB0aGlzLmxvY2F0b3JGb3IoJy5tYXQtbWRjLWxpc3QtaXRlbS11bnNjb3BlZC1jb250ZW50Jyk7XG5cbiAgLyoqIEdldHMgdGhlIHR5cGUgb2YgdGhlIGxpc3QgaXRlbSwgY3VycmVudGx5IGRlc2NyaWJpbmcgaG93IG1hbnkgbGluZXMgdGhlcmUgYXJlLiAqL1xuICBhc3luYyBnZXRUeXBlKCk6IFByb21pc2U8TWF0TGlzdEl0ZW1UeXBlPiB7XG4gICAgY29uc3QgaG9zdCA9IGF3YWl0IHRoaXMuaG9zdCgpO1xuICAgIGNvbnN0IFtpc09uZUxpbmUsIGlzVHdvTGluZV0gPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbXG4gICAgICBob3N0Lmhhc0NsYXNzKCdtZGMtbGlzdC1pdGVtLS13aXRoLW9uZS1saW5lJyksXG4gICAgICBob3N0Lmhhc0NsYXNzKCdtZGMtbGlzdC1pdGVtLS13aXRoLXR3by1saW5lcycpLFxuICAgIF0pO1xuICAgIGlmIChpc09uZUxpbmUpIHtcbiAgICAgIHJldHVybiBNYXRMaXN0SXRlbVR5cGUuT05FX0xJTkVfSVRFTTtcbiAgICB9IGVsc2UgaWYgKGlzVHdvTGluZSkge1xuICAgICAgcmV0dXJuIE1hdExpc3RJdGVtVHlwZS5UV09fTElORV9JVEVNO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0TGlzdEl0ZW1UeXBlLlRIUkVFX0xJTkVfSVRFTTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZnVsbCB0ZXh0IGNvbnRlbnQgb2YgdGhlIGxpc3QgaXRlbSwgZXhjbHVkaW5nIHRleHRcbiAgICogZnJvbSBpY29ucyBhbmQgYXZhdGFycy5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBgZ2V0RnVsbFRleHRgIG1ldGhvZCBpbnN0ZWFkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDE2LjAuMFxuICAgKi9cbiAgYXN5bmMgZ2V0VGV4dCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmdldEZ1bGxUZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZnVsbCB0ZXh0IGNvbnRlbnQgb2YgdGhlIGxpc3QgaXRlbSwgZXhjbHVkaW5nIHRleHRcbiAgICogZnJvbSBpY29ucyBhbmQgYXZhdGFycy5cbiAgICovXG4gIGFzeW5jIGdldEZ1bGxUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCh7ZXhjbHVkZTogYCR7aWNvblNlbGVjdG9yfSwgJHthdmF0YXJTZWxlY3Rvcn1gfSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGl0bGUgb2YgdGhlIGxpc3QgaXRlbS4gKi9cbiAgYXN5bmMgZ2V0VGl0bGUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gKGF3YWl0IHRoaXMuX3ByaW1hcnlUZXh0KCkpLnRleHQoKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBsaXN0IGl0ZW0gaXMgZGlzYWJsZWQuICovXG4gIGFzeW5jIGlzRGlzYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkuaGFzQ2xhc3MoJ21kYy1saXN0LWl0ZW0tLWRpc2FibGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2Vjb25kYXJ5IGxpbmUgdGV4dCBvZiB0aGUgbGlzdCBpdGVtLiBOdWxsIGlmIHRoZSBsaXN0IGl0ZW1cbiAgICogZG9lcyBub3QgaGF2ZSBhIHNlY29uZGFyeSBsaW5lLlxuICAgKi9cbiAgYXN5bmMgZ2V0U2Vjb25kYXJ5VGV4dCgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICBjb25zdCB0eXBlID0gYXdhaXQgdGhpcy5nZXRUeXBlKCk7XG4gICAgaWYgKHR5cGUgPT09IE1hdExpc3RJdGVtVHlwZS5PTkVfTElORV9JVEVNKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBbbGluZXMsIHVuc2NvcGVkVGV4dENvbnRlbnRdID0gYXdhaXQgcGFyYWxsZWwoKCkgPT4gW1xuICAgICAgdGhpcy5fbGluZXMoKSxcbiAgICAgIHRoaXMuX3Vuc2NvcGVkVGV4dENvbnRlbnQoKSxcbiAgICBdKTtcblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIGV4cGxpY2l0IGxpbmUgZm9yIHRoZSBzZWNvbmRhcnkgdGV4dCwgdGhlIHVuc2NvcGVkIHRleHQgY29udGVudFxuICAgIC8vIGlzIHJlbmRlcmVkIGFzIHRoZSBzZWNvbmRhcnkgdGV4dCAod2l0aCBwb3RlbnRpYWwgdGV4dCB3cmFwcGluZyBlbmFibGVkKS5cbiAgICBpZiAobGluZXMubGVuZ3RoID49IDEpIHtcbiAgICAgIHJldHVybiBsaW5lc1swXS50ZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bnNjb3BlZFRleHRDb250ZW50LnRleHQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdGVydGlhcnkgbGluZSB0ZXh0IG9mIHRoZSBsaXN0IGl0ZW0uIE51bGwgaWYgdGhlIGxpc3QgaXRlbVxuICAgKiBkb2VzIG5vdCBoYXZlIGEgdGVydGlhcnkgbGluZS5cbiAgICovXG4gIGFzeW5jIGdldFRlcnRpYXJ5VGV4dCgpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICBjb25zdCB0eXBlID0gYXdhaXQgdGhpcy5nZXRUeXBlKCk7XG4gICAgaWYgKHR5cGUgIT09IE1hdExpc3RJdGVtVHlwZS5USFJFRV9MSU5FX0lURU0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IFtsaW5lcywgdW5zY29wZWRUZXh0Q29udGVudF0gPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbXG4gICAgICB0aGlzLl9saW5lcygpLFxuICAgICAgdGhpcy5fdW5zY29wZWRUZXh0Q29udGVudCgpLFxuICAgIF0pO1xuXG4gICAgLy8gRmlyc3Qgd2UgY2hlY2sgaWYgdGhlcmUgaXMgYW4gZXhwbGljaXQgbGluZSBmb3IgdGhlIHRlcnRpYXJ5IHRleHQuIElmIHNvLCB3ZSByZXR1cm4gaXQuXG4gICAgLy8gSWYgdGhlcmUgaXMgYXQgbGVhc3QgYW4gZXhwbGljaXQgc2Vjb25kYXJ5IGxpbmUgdGhvdWdoLCB0aGVuIHdlIGtub3cgdGhhdCB0aGUgdW5zY29wZWRcbiAgICAvLyB0ZXh0IGNvbnRlbnQgY29ycmVzcG9uZHMgdG8gdGhlIHRlcnRpYXJ5IGxpbmUuIElmIHRoZXJlIGFyZSBubyBleHBsaWNpdCBsaW5lcyBhdCBhbGwsXG4gICAgLy8gd2Uga25vdyB0aGF0IHRoZSB1bnNjb3BlZCB0ZXh0IGNvbnRlbnQgZnJvbSB0aGUgc2Vjb25kYXJ5IHRleHQganVzdCB3cmFwcyBpbnRvIHRoZSB0aGlyZFxuICAgIC8vIGxpbmUsIGJ1dCB0aGVyZSAqbm8qIGFjdHVhbCBkZWRpY2F0ZWQgdGVydGlhcnkgdGV4dC5cbiAgICBpZiAobGluZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICByZXR1cm4gbGluZXNbMV0udGV4dCgpO1xuICAgIH0gZWxzZSBpZiAobGluZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gdW5zY29wZWRUZXh0Q29udGVudC50ZXh0KCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhpcyBsaXN0IGl0ZW0gaGFzIGFuIGF2YXRhci4gKi9cbiAgYXN5bmMgaGFzQXZhdGFyKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiAhIShhd2FpdCB0aGlzLl9hdmF0YXIoKSk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGlzIGxpc3QgaXRlbSBoYXMgYW4gaWNvbi4gKi9cbiAgYXN5bmMgaGFzSWNvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gISEoYXdhaXQgdGhpcy5faWNvbigpKTtcbiAgfVxufVxuIl19