/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, Input, ContentChildren, QueryList, ElementRef, Optional, ChangeDetectionStrategy, } from '@angular/core';
import { MatGridTile } from './grid-tile';
import { TileCoordinator } from './tile-coordinator';
import { FitTileStyler, RatioTileStyler, FixedTileStyler, } from './tile-styler';
import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MAT_GRID_LIST } from './grid-list-base';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
// TODO(kara): Conditional (responsive) column count / row size.
// TODO(kara): Re-layout on window resize / media change (debounced).
// TODO(kara): gridTileHeader and gridTileFooter.
const MAT_FIT_MODE = 'fit';
export class MatGridList {
    constructor(_element, _dir) {
        this._element = _element;
        this._dir = _dir;
        /** The amount of space between tiles. This will be something like '5px' or '2em'. */
        this._gutter = '1px';
    }
    /** Amount of columns in the grid list. */
    get cols() {
        return this._cols;
    }
    set cols(value) {
        this._cols = Math.max(1, Math.round(coerceNumberProperty(value)));
    }
    /** Size of the grid list's gutter in pixels. */
    get gutterSize() {
        return this._gutter;
    }
    set gutterSize(value) {
        this._gutter = `${value == null ? '' : value}`;
    }
    /** Set internal representation of row height from the user-provided value. */
    get rowHeight() {
        return this._rowHeight;
    }
    set rowHeight(value) {
        const newValue = `${value == null ? '' : value}`;
        if (newValue !== this._rowHeight) {
            this._rowHeight = newValue;
            this._setTileStyler(this._rowHeight);
        }
    }
    ngOnInit() {
        this._checkCols();
        this._checkRowHeight();
    }
    /**
     * The layout calculation is fairly cheap if nothing changes, so there's little cost
     * to run it frequently.
     */
    ngAfterContentChecked() {
        this._layoutTiles();
    }
    /** Throw a friendly error if cols property is missing */
    _checkCols() {
        if (!this.cols && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error(`mat-grid-list: must pass in number of columns. ` + `Example: <mat-grid-list cols="3">`);
        }
    }
    /** Default to equal width:height if rowHeight property is missing */
    _checkRowHeight() {
        if (!this._rowHeight) {
            this._setTileStyler('1:1');
        }
    }
    /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
    _setTileStyler(rowHeight) {
        if (this._tileStyler) {
            this._tileStyler.reset(this);
        }
        if (rowHeight === MAT_FIT_MODE) {
            this._tileStyler = new FitTileStyler();
        }
        else if (rowHeight && rowHeight.indexOf(':') > -1) {
            this._tileStyler = new RatioTileStyler(rowHeight);
        }
        else {
            this._tileStyler = new FixedTileStyler(rowHeight);
        }
    }
    /** Computes and applies the size and position for all children grid tiles. */
    _layoutTiles() {
        if (!this._tileCoordinator) {
            this._tileCoordinator = new TileCoordinator();
        }
        const tracker = this._tileCoordinator;
        const tiles = this._tiles.filter(tile => !tile._gridList || tile._gridList === this);
        const direction = this._dir ? this._dir.value : 'ltr';
        this._tileCoordinator.update(this.cols, tiles);
        this._tileStyler.init(this.gutterSize, tracker, this.cols, direction);
        tiles.forEach((tile, index) => {
            const pos = tracker.positions[index];
            this._tileStyler.setStyle(tile, pos.row, pos.col);
        });
        this._setListStyle(this._tileStyler.getComputedHeight());
    }
    /** Sets style on the main grid-list element, given the style name and value. */
    _setListStyle(style) {
        if (style) {
            this._element.nativeElement.style[style[0]] = style[1];
        }
    }
}
MatGridList.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatGridList, deps: [{ token: i0.ElementRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatGridList.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatGridList, selector: "mat-grid-list", inputs: { cols: "cols", gutterSize: "gutterSize", rowHeight: "rowHeight" }, host: { properties: { "attr.cols": "cols" }, classAttribute: "mat-grid-list" }, providers: [
        {
            provide: MAT_GRID_LIST,
            useExisting: MatGridList,
        },
    ], queries: [{ propertyName: "_tiles", predicate: MatGridTile, descendants: true }], exportAs: ["matGridList"], ngImport: i0, template: "<div>\n  <ng-content></ng-content>\n</div>", styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatGridList, decorators: [{
            type: Component,
            args: [{ selector: 'mat-grid-list', exportAs: 'matGridList', host: {
                        'class': 'mat-grid-list',
                        // Ensures that the "cols" input value is reflected in the DOM. This is
                        // needed for the grid-list harness.
                        '[attr.cols]': 'cols',
                    }, providers: [
                        {
                            provide: MAT_GRID_LIST,
                            useExisting: MatGridList,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div>\n  <ng-content></ng-content>\n</div>", styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { _tiles: [{
                type: ContentChildren,
                args: [MatGridTile, { descendants: true }]
            }], cols: [{
                type: Input
            }], gutterSize: [{
                type: Input
            }], rowHeight: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2dyaWQtbGlzdC9ncmlkLWxpc3QudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZ3JpZC1saXN0L2dyaWQtbGlzdC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBR2pCLEtBQUssRUFDTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBQ1IsdUJBQXVCLEdBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFFTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGVBQWUsR0FFaEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxvQkFBb0IsRUFBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxhQUFhLEVBQWtCLE1BQU0sa0JBQWtCLENBQUM7OztBQUVoRSxnRUFBZ0U7QUFDaEUscUVBQXFFO0FBQ3JFLGlEQUFpRDtBQUVqRCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUM7QUFzQjNCLE1BQU0sT0FBTyxXQUFXO0lBd0J0QixZQUNVLFFBQWlDLEVBQ3JCLElBQW9CO1FBRGhDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ3JCLFNBQUksR0FBSixJQUFJLENBQWdCO1FBWDFDLHFGQUFxRjtRQUM3RSxZQUFPLEdBQVcsS0FBSyxDQUFDO0lBVzdCLENBQUM7SUFFSiwwQ0FBMEM7SUFDMUMsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BC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dkIsU0FBUzsrQkFDRSxlQUFlLFlBQ2YsYUFBYSxRQUdqQjt3QkFDSixPQUFPLEVBQUUsZUFBZTt3QkFDeEIsdUVBQXVFO3dCQUN2RSxvQ0FBb0M7d0JBQ3BDLGFBQWEsRUFBRSxNQUFNO3FCQUN0QixhQUNVO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxhQUFhOzRCQUN0QixXQUFXLGFBQWE7eUJBQ3pCO3FCQUNGLG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJOzswQkE0QmxDLFFBQVE7NENBSndDLE1BQU07c0JBQXhELGVBQWU7dUJBQUMsV0FBVyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQztnQkFTN0MsSUFBSTtzQkFEUCxLQUFLO2dCQVVGLFVBQVU7c0JBRGIsS0FBSztnQkFVRixTQUFTO3NCQURaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEVsZW1lbnRSZWYsXG4gIE9wdGlvbmFsLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEdyaWRUaWxlfSBmcm9tICcuL2dyaWQtdGlsZSc7XG5pbXBvcnQge1RpbGVDb29yZGluYXRvcn0gZnJvbSAnLi90aWxlLWNvb3JkaW5hdG9yJztcbmltcG9ydCB7XG4gIFRpbGVTdHlsZXIsXG4gIEZpdFRpbGVTdHlsZXIsXG4gIFJhdGlvVGlsZVN0eWxlcixcbiAgRml4ZWRUaWxlU3R5bGVyLFxuICBUaWxlU3R5bGVUYXJnZXQsXG59IGZyb20gJy4vdGlsZS1zdHlsZXInO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtjb2VyY2VOdW1iZXJQcm9wZXJ0eSwgTnVtYmVySW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge01BVF9HUklEX0xJU1QsIE1hdEdyaWRMaXN0QmFzZX0gZnJvbSAnLi9ncmlkLWxpc3QtYmFzZSc7XG5cbi8vIFRPRE8oa2FyYSk6IENvbmRpdGlvbmFsIChyZXNwb25zaXZlKSBjb2x1bW4gY291bnQgLyByb3cgc2l6ZS5cbi8vIFRPRE8oa2FyYSk6IFJlLWxheW91dCBvbiB3aW5kb3cgcmVzaXplIC8gbWVkaWEgY2hhbmdlIChkZWJvdW5jZWQpLlxuLy8gVE9ETyhrYXJhKTogZ3JpZFRpbGVIZWFkZXIgYW5kIGdyaWRUaWxlRm9vdGVyLlxuXG5jb25zdCBNQVRfRklUX01PREUgPSAnZml0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWdyaWQtbGlzdCcsXG4gIGV4cG9ydEFzOiAnbWF0R3JpZExpc3QnLFxuICB0ZW1wbGF0ZVVybDogJ2dyaWQtbGlzdC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2dyaWQtbGlzdC5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtZ3JpZC1saXN0JyxcbiAgICAvLyBFbnN1cmVzIHRoYXQgdGhlIFwiY29sc1wiIGlucHV0IHZhbHVlIGlzIHJlZmxlY3RlZCBpbiB0aGUgRE9NLiBUaGlzIGlzXG4gICAgLy8gbmVlZGVkIGZvciB0aGUgZ3JpZC1saXN0IGhhcm5lc3MuXG4gICAgJ1thdHRyLmNvbHNdJzogJ2NvbHMnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBNQVRfR1JJRF9MSVNULFxuICAgICAgdXNlRXhpc3Rpbmc6IE1hdEdyaWRMaXN0LFxuICAgIH0sXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRHcmlkTGlzdCBpbXBsZW1lbnRzIE1hdEdyaWRMaXN0QmFzZSwgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBUaWxlU3R5bGVUYXJnZXQge1xuICAvKiogTnVtYmVyIG9mIGNvbHVtbnMgYmVpbmcgcmVuZGVyZWQuICovXG4gIHByaXZhdGUgX2NvbHM6IG51bWJlcjtcblxuICAvKiogVXNlZCBmb3IgZGV0ZXJtaW5pbmcgdGhlIHBvc2l0aW9uIG9mIGVhY2ggdGlsZSBpbiB0aGUgZ3JpZC4gKi9cbiAgcHJpdmF0ZSBfdGlsZUNvb3JkaW5hdG9yOiBUaWxlQ29vcmRpbmF0b3I7XG5cbiAgLyoqXG4gICAqIFJvdyBoZWlnaHQgdmFsdWUgcGFzc2VkIGluIGJ5IHVzZXIuIFRoaXMgY2FuIGJlIG9uZSBvZiB0aHJlZSB0eXBlczpcbiAgICogLSBOdW1iZXIgdmFsdWUgKGV4OiBcIjEwMHB4XCIpOiAgc2V0cyBhIGZpeGVkIHJvdyBoZWlnaHQgdG8gdGhhdCB2YWx1ZVxuICAgKiAtIFJhdGlvIHZhbHVlIChleDogXCI0OjNcIik6IHNldHMgdGhlIHJvdyBoZWlnaHQgYmFzZWQgb24gd2lkdGg6aGVpZ2h0IHJhdGlvXG4gICAqIC0gXCJGaXRcIiBtb2RlIChleDogXCJmaXRcIik6IHNldHMgdGhlIHJvdyBoZWlnaHQgdG8gdG90YWwgaGVpZ2h0IGRpdmlkZWQgYnkgbnVtYmVyIG9mIHJvd3NcbiAgICovXG4gIHByaXZhdGUgX3Jvd0hlaWdodDogc3RyaW5nO1xuXG4gIC8qKiBUaGUgYW1vdW50IG9mIHNwYWNlIGJldHdlZW4gdGlsZXMuIFRoaXMgd2lsbCBiZSBzb21ldGhpbmcgbGlrZSAnNXB4JyBvciAnMmVtJy4gKi9cbiAgcHJpdmF0ZSBfZ3V0dGVyOiBzdHJpbmcgPSAnMXB4JztcblxuICAvKiogU2V0cyBwb3NpdGlvbiBhbmQgc2l6ZSBzdHlsZXMgZm9yIGEgdGlsZSAqL1xuICBwcml2YXRlIF90aWxlU3R5bGVyOiBUaWxlU3R5bGVyO1xuXG4gIC8qKiBRdWVyeSBsaXN0IG9mIHRpbGVzIHRoYXQgYXJlIGJlaW5nIHJlbmRlcmVkLiAqL1xuICBAQ29udGVudENoaWxkcmVuKE1hdEdyaWRUaWxlLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBfdGlsZXM6IFF1ZXJ5TGlzdDxNYXRHcmlkVGlsZT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgKSB7fVxuXG4gIC8qKiBBbW91bnQgb2YgY29sdW1ucyBpbiB0aGUgZ3JpZCBsaXN0LiAqL1xuICBASW5wdXQoKVxuICBnZXQgY29scygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb2xzO1xuICB9XG4gIHNldCBjb2xzKHZhbHVlOiBOdW1iZXJJbnB1dCkge1xuICAgIHRoaXMuX2NvbHMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKSkpO1xuICB9XG5cbiAgLyoqIFNpemUgb2YgdGhlIGdyaWQgbGlzdCdzIGd1dHRlciBpbiBwaXhlbHMuICovXG4gIEBJbnB1dCgpXG4gIGdldCBndXR0ZXJTaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2d1dHRlcjtcbiAgfVxuICBzZXQgZ3V0dGVyU2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZ3V0dGVyID0gYCR7dmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWV9YDtcbiAgfVxuXG4gIC8qKiBTZXQgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gb2Ygcm93IGhlaWdodCBmcm9tIHRoZSB1c2VyLXByb3ZpZGVkIHZhbHVlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgcm93SGVpZ2h0KCk6IHN0cmluZyB8IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd0hlaWdodDtcbiAgfVxuICBzZXQgcm93SGVpZ2h0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGAke3ZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlfWA7XG5cbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX3Jvd0hlaWdodCkge1xuICAgICAgdGhpcy5fcm93SGVpZ2h0ID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl9zZXRUaWxlU3R5bGVyKHRoaXMuX3Jvd0hlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fY2hlY2tDb2xzKCk7XG4gICAgdGhpcy5fY2hlY2tSb3dIZWlnaHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbGF5b3V0IGNhbGN1bGF0aW9uIGlzIGZhaXJseSBjaGVhcCBpZiBub3RoaW5nIGNoYW5nZXMsIHNvIHRoZXJlJ3MgbGl0dGxlIGNvc3RcbiAgICogdG8gcnVuIGl0IGZyZXF1ZW50bHkuXG4gICAqL1xuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5fbGF5b3V0VGlsZXMoKTtcbiAgfVxuXG4gIC8qKiBUaHJvdyBhIGZyaWVuZGx5IGVycm9yIGlmIGNvbHMgcHJvcGVydHkgaXMgbWlzc2luZyAqL1xuICBwcml2YXRlIF9jaGVja0NvbHMoKSB7XG4gICAgaWYgKCF0aGlzLmNvbHMgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgbWF0LWdyaWQtbGlzdDogbXVzdCBwYXNzIGluIG51bWJlciBvZiBjb2x1bW5zLiBgICsgYEV4YW1wbGU6IDxtYXQtZ3JpZC1saXN0IGNvbHM9XCIzXCI+YCxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERlZmF1bHQgdG8gZXF1YWwgd2lkdGg6aGVpZ2h0IGlmIHJvd0hlaWdodCBwcm9wZXJ0eSBpcyBtaXNzaW5nICovXG4gIHByaXZhdGUgX2NoZWNrUm93SGVpZ2h0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fcm93SGVpZ2h0KSB7XG4gICAgICB0aGlzLl9zZXRUaWxlU3R5bGVyKCcxOjEnKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ3JlYXRlcyBjb3JyZWN0IFRpbGUgU3R5bGVyIHN1YnR5cGUgYmFzZWQgb24gcm93SGVpZ2h0IHBhc3NlZCBpbiBieSB1c2VyICovXG4gIHByaXZhdGUgX3NldFRpbGVTdHlsZXIocm93SGVpZ2h0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdGlsZVN0eWxlcikge1xuICAgICAgdGhpcy5fdGlsZVN0eWxlci5yZXNldCh0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAocm93SGVpZ2h0ID09PSBNQVRfRklUX01PREUpIHtcbiAgICAgIHRoaXMuX3RpbGVTdHlsZXIgPSBuZXcgRml0VGlsZVN0eWxlcigpO1xuICAgIH0gZWxzZSBpZiAocm93SGVpZ2h0ICYmIHJvd0hlaWdodC5pbmRleE9mKCc6JykgPiAtMSkge1xuICAgICAgdGhpcy5fdGlsZVN0eWxlciA9IG5ldyBSYXRpb1RpbGVTdHlsZXIocm93SGVpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdGlsZVN0eWxlciA9IG5ldyBGaXhlZFRpbGVTdHlsZXIocm93SGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICAvKiogQ29tcHV0ZXMgYW5kIGFwcGxpZXMgdGhlIHNpemUgYW5kIHBvc2l0aW9uIGZvciBhbGwgY2hpbGRyZW4gZ3JpZCB0aWxlcy4gKi9cbiAgcHJpdmF0ZSBfbGF5b3V0VGlsZXMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90aWxlQ29vcmRpbmF0b3IpIHtcbiAgICAgIHRoaXMuX3RpbGVDb29yZGluYXRvciA9IG5ldyBUaWxlQ29vcmRpbmF0b3IoKTtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFja2VyID0gdGhpcy5fdGlsZUNvb3JkaW5hdG9yO1xuICAgIGNvbnN0IHRpbGVzID0gdGhpcy5fdGlsZXMuZmlsdGVyKHRpbGUgPT4gIXRpbGUuX2dyaWRMaXN0IHx8IHRpbGUuX2dyaWRMaXN0ID09PSB0aGlzKTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJztcblxuICAgIHRoaXMuX3RpbGVDb29yZGluYXRvci51cGRhdGUodGhpcy5jb2xzLCB0aWxlcyk7XG4gICAgdGhpcy5fdGlsZVN0eWxlci5pbml0KHRoaXMuZ3V0dGVyU2l6ZSwgdHJhY2tlciwgdGhpcy5jb2xzLCBkaXJlY3Rpb24pO1xuXG4gICAgdGlsZXMuZm9yRWFjaCgodGlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHBvcyA9IHRyYWNrZXIucG9zaXRpb25zW2luZGV4XTtcbiAgICAgIHRoaXMuX3RpbGVTdHlsZXIuc2V0U3R5bGUodGlsZSwgcG9zLnJvdywgcG9zLmNvbCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zZXRMaXN0U3R5bGUodGhpcy5fdGlsZVN0eWxlci5nZXRDb21wdXRlZEhlaWdodCgpKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHN0eWxlIG9uIHRoZSBtYWluIGdyaWQtbGlzdCBlbGVtZW50LCBnaXZlbiB0aGUgc3R5bGUgbmFtZSBhbmQgdmFsdWUuICovXG4gIF9zZXRMaXN0U3R5bGUoc3R5bGU6IFtzdHJpbmcsIHN0cmluZyB8IG51bGxdIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChzdHlsZSkge1xuICAgICAgKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZSBhcyBhbnkpW3N0eWxlWzBdXSA9IHN0eWxlWzFdO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+Il19