/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Throws an exception for the case when menu's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
export function throwMatMenuInvalidPositionX() {
    throw Error(`xPosition value must be either 'before' or after'.
      Example: <mat-menu xPosition="before" #menu="matMenu"></mat-menu>`);
}
/**
 * Throws an exception for the case when menu's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
export function throwMatMenuInvalidPositionY() {
    throw Error(`yPosition value must be either 'above' or below'.
      Example: <mat-menu yPosition="above" #menu="matMenu"></mat-menu>`);
}
/**
 * Throws an exception for the case when a menu is assigned
 * to a trigger that is placed inside the same menu.
 * @docs-private
 */
export function throwMatMenuRecursiveError() {
    throw Error(`matMenuTriggerFor: menu cannot contain its own trigger. Assign a menu that is ` +
        `not a parent of the trigger or move the trigger outside of the menu.`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1lcnJvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbWVudS9tZW51LWVycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QjtJQUMxQyxNQUFNLEtBQUssQ0FBQzt3RUFDMEQsQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QjtJQUMxQyxNQUFNLEtBQUssQ0FBQzt1RUFDeUQsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDBCQUEwQjtJQUN4QyxNQUFNLEtBQUssQ0FDVCxnRkFBZ0Y7UUFDOUUsc0VBQXNFLENBQ3pFLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBmb3IgdGhlIGNhc2Ugd2hlbiBtZW51J3MgeC1wb3NpdGlvbiB2YWx1ZSBpc24ndCB2YWxpZC5cbiAqIEluIG90aGVyIHdvcmRzLCBpdCBkb2Vzbid0IG1hdGNoICdiZWZvcmUnIG9yICdhZnRlcicuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd01hdE1lbnVJbnZhbGlkUG9zaXRpb25YKCkge1xuICB0aHJvdyBFcnJvcihgeFBvc2l0aW9uIHZhbHVlIG11c3QgYmUgZWl0aGVyICdiZWZvcmUnIG9yIGFmdGVyJy5cbiAgICAgIEV4YW1wbGU6IDxtYXQtbWVudSB4UG9zaXRpb249XCJiZWZvcmVcIiAjbWVudT1cIm1hdE1lbnVcIj48L21hdC1tZW51PmApO1xufVxuXG4vKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gZm9yIHRoZSBjYXNlIHdoZW4gbWVudSdzIHktcG9zaXRpb24gdmFsdWUgaXNuJ3QgdmFsaWQuXG4gKiBJbiBvdGhlciB3b3JkcywgaXQgZG9lc24ndCBtYXRjaCAnYWJvdmUnIG9yICdiZWxvdycuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd01hdE1lbnVJbnZhbGlkUG9zaXRpb25ZKCkge1xuICB0aHJvdyBFcnJvcihgeVBvc2l0aW9uIHZhbHVlIG11c3QgYmUgZWl0aGVyICdhYm92ZScgb3IgYmVsb3cnLlxuICAgICAgRXhhbXBsZTogPG1hdC1tZW51IHlQb3NpdGlvbj1cImFib3ZlXCIgI21lbnU9XCJtYXRNZW51XCI+PC9tYXQtbWVudT5gKTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGZvciB0aGUgY2FzZSB3aGVuIGEgbWVudSBpcyBhc3NpZ25lZFxuICogdG8gYSB0cmlnZ2VyIHRoYXQgaXMgcGxhY2VkIGluc2lkZSB0aGUgc2FtZSBtZW51LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dNYXRNZW51UmVjdXJzaXZlRXJyb3IoKSB7XG4gIHRocm93IEVycm9yKFxuICAgIGBtYXRNZW51VHJpZ2dlckZvcjogbWVudSBjYW5ub3QgY29udGFpbiBpdHMgb3duIHRyaWdnZXIuIEFzc2lnbiBhIG1lbnUgdGhhdCBpcyBgICtcbiAgICAgIGBub3QgYSBwYXJlbnQgb2YgdGhlIHRyaWdnZXIgb3IgbW92ZSB0aGUgdHJpZ2dlciBvdXRzaWRlIG9mIHRoZSBtZW51LmAsXG4gICk7XG59XG4iXX0=