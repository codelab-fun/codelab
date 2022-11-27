/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BehaviorSubject, combineLatest, merge, of as observableOf, Subject, } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { _isNumberValue } from '@angular/cdk/coercion';
import { map } from 'rxjs/operators';
/**
 * Corresponds to `Number.MAX_SAFE_INTEGER`. Moved out into a variable here due to
 * flaky browser support and the value not being defined in Closure's typings.
 */
const MAX_SAFE_INTEGER = 9007199254740991;
/** Shared base class with MDC-based implementation. */
export class _MatTableDataSource extends DataSource {
    constructor(initialData = []) {
        super();
        /** Stream emitting render data to the table (depends on ordered data changes). */
        this._renderData = new BehaviorSubject([]);
        /** Stream that emits when a new filter string is set on the data source. */
        this._filter = new BehaviorSubject('');
        /** Used to react to internal changes of the paginator that are made by the data source itself. */
        this._internalPageChanges = new Subject();
        /**
         * Subscription to the changes that should trigger an update to the table's rendered rows, such
         * as filtering, sorting, pagination, or base data changes.
         */
        this._renderChangesSubscription = null;
        /**
         * Data accessor function that is used for accessing data properties for sorting through
         * the default sortData function.
         * This default function assumes that the sort header IDs (which defaults to the column name)
         * matches the data's properties (e.g. column Xyz represents data['Xyz']).
         * May be set to a custom function for different behavior.
         * @param data Data object that is being accessed.
         * @param sortHeaderId The name of the column that represents the data.
         */
        this.sortingDataAccessor = (data, sortHeaderId) => {
            const value = data[sortHeaderId];
            if (_isNumberValue(value)) {
                const numberValue = Number(value);
                // Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we
                // leave them as strings. For more info: https://goo.gl/y5vbSg
                return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
            }
            return value;
        };
        /**
         * Gets a sorted copy of the data array based on the state of the MatSort. Called
         * after changes are made to the filtered data or when sort changes are emitted from MatSort.
         * By default, the function retrieves the active sort and its direction and compares data
         * by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation
         * of data ordering.
         * @param data The array of data that should be sorted.
         * @param sort The connected MatSort that holds the current sort state.
         */
        this.sortData = (data, sort) => {
            const active = sort.active;
            const direction = sort.direction;
            if (!active || direction == '') {
                return data;
            }
            return data.sort((a, b) => {
                let valueA = this.sortingDataAccessor(a, active);
                let valueB = this.sortingDataAccessor(b, active);
                // If there are data in the column that can be converted to a number,
                // it must be ensured that the rest of the data
                // is of the same type so as not to order incorrectly.
                const valueAType = typeof valueA;
                const valueBType = typeof valueB;
                if (valueAType !== valueBType) {
                    if (valueAType === 'number') {
                        valueA += '';
                    }
                    if (valueBType === 'number') {
                        valueB += '';
                    }
                }
                // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
                // one value exists while the other doesn't. In this case, existing value should come last.
                // This avoids inconsistent results when comparing values to undefined/null.
                // If neither value exists, return 0 (equal).
                let comparatorResult = 0;
                if (valueA != null && valueB != null) {
                    // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
                    if (valueA > valueB) {
                        comparatorResult = 1;
                    }
                    else if (valueA < valueB) {
                        comparatorResult = -1;
                    }
                }
                else if (valueA != null) {
                    comparatorResult = 1;
                }
                else if (valueB != null) {
                    comparatorResult = -1;
                }
                return comparatorResult * (direction == 'asc' ? 1 : -1);
            });
        };
        /**
         * Checks if a data object matches the data source's filter string. By default, each data object
         * is converted to a string of its properties and returns true if the filter has
         * at least one occurrence in that string. By default, the filter string has its whitespace
         * trimmed and the match is case-insensitive. May be overridden for a custom implementation of
         * filter matching.
         * @param data Data object used to check against the filter.
         * @param filter Filter string that has been set on the data source.
         * @returns Whether the filter matches against the data
         */
        this.filterPredicate = (data, filter) => {
            // Transform the data into a lowercase string of all property values.
            const dataStr = Object.keys(data)
                .reduce((currentTerm, key) => {
                // Use an obscure Unicode character to delimit the words in the concatenated string.
                // This avoids matches where the values of two columns combined will match the user's query
                // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
                // that has a very low chance of being typed in by somebody in a text field. This one in
                // particular is "White up-pointing triangle with dot" from
                // https://en.wikipedia.org/wiki/List_of_Unicode_characters
                return currentTerm + data[key] + '◬';
            }, '')
                .toLowerCase();
            // Transform the filter by converting it to lowercase and removing whitespace.
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) != -1;
        };
        this._data = new BehaviorSubject(initialData);
        this._updateChangeSubscription();
    }
    /** Array of data that should be rendered by the table, where each object represents one row. */
    get data() {
        return this._data.value;
    }
    set data(data) {
        data = Array.isArray(data) ? data : [];
        this._data.next(data);
        // Normally the `filteredData` is updated by the re-render
        // subscription, but that won't happen if it's inactive.
        if (!this._renderChangesSubscription) {
            this._filterData(data);
        }
    }
    /**
     * Filter term that should be used to filter out objects from the data array. To override how
     * data objects match to this filter string, provide a custom function for filterPredicate.
     */
    get filter() {
        return this._filter.value;
    }
    set filter(filter) {
        this._filter.next(filter);
        // Normally the `filteredData` is updated by the re-render
        // subscription, but that won't happen if it's inactive.
        if (!this._renderChangesSubscription) {
            this._filterData(this.data);
        }
    }
    /**
     * Instance of the MatSort directive used by the table to control its sorting. Sort changes
     * emitted by the MatSort will trigger an update to the table's rendered data.
     */
    get sort() {
        return this._sort;
    }
    set sort(sort) {
        this._sort = sort;
        this._updateChangeSubscription();
    }
    /**
     * Instance of the paginator component used by the table to control what page of the data is
     * displayed. Page changes emitted by the paginator will trigger an update to the
     * table's rendered data.
     *
     * Note that the data source uses the paginator's properties to calculate which page of data
     * should be displayed. If the paginator receives its properties as template inputs,
     * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
     * initialized before assigning it to this data source.
     */
    get paginator() {
        return this._paginator;
    }
    set paginator(paginator) {
        this._paginator = paginator;
        this._updateChangeSubscription();
    }
    /**
     * Subscribe to changes that should trigger an update to the table's rendered rows. When the
     * changes occur, process the current state of the filter, sort, and pagination along with
     * the provided base data and send it to the table for rendering.
     */
    _updateChangeSubscription() {
        // Sorting and/or pagination should be watched if sort and/or paginator are provided.
        // The events should emit whenever the component emits a change or initializes, or if no
        // component is provided, a stream with just a null event should be provided.
        // The `sortChange` and `pageChange` acts as a signal to the combineLatests below so that the
        // pipeline can progress to the next step. Note that the value from these streams are not used,
        // they purely act as a signal to progress in the pipeline.
        const sortChange = this._sort
            ? merge(this._sort.sortChange, this._sort.initialized)
            : observableOf(null);
        const pageChange = this._paginator
            ? merge(this._paginator.page, this._internalPageChanges, this._paginator.initialized)
            : observableOf(null);
        const dataStream = this._data;
        // Watch for base data or filter changes to provide a filtered set of data.
        const filteredData = combineLatest([dataStream, this._filter]).pipe(map(([data]) => this._filterData(data)));
        // Watch for filtered data or sort changes to provide an ordered set of data.
        const orderedData = combineLatest([filteredData, sortChange]).pipe(map(([data]) => this._orderData(data)));
        // Watch for ordered data or page changes to provide a paged set of data.
        const paginatedData = combineLatest([orderedData, pageChange]).pipe(map(([data]) => this._pageData(data)));
        // Watched for paged data changes and send the result to the table to render.
        this._renderChangesSubscription?.unsubscribe();
        this._renderChangesSubscription = paginatedData.subscribe(data => this._renderData.next(data));
    }
    /**
     * Returns a filtered data array where each filter object contains the filter string within
     * the result of the filterTermAccessor function. If no filter is set, returns the data array
     * as provided.
     */
    _filterData(data) {
        // If there is a filter string, filter out data that does not contain it.
        // Each data object is converted to a string using the function defined by filterTermAccessor.
        // May be overridden for customization.
        this.filteredData =
            this.filter == null || this.filter === ''
                ? data
                : data.filter(obj => this.filterPredicate(obj, this.filter));
        if (this.paginator) {
            this._updatePaginator(this.filteredData.length);
        }
        return this.filteredData;
    }
    /**
     * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
     * data array as provided. Uses the default data accessor for data lookup, unless a
     * sortDataAccessor function is defined.
     */
    _orderData(data) {
        // If there is no active sort or direction, return the data without trying to sort.
        if (!this.sort) {
            return data;
        }
        return this.sortData(data.slice(), this.sort);
    }
    /**
     * Returns a paged slice of the provided data array according to the provided paginator's page
     * index and length. If there is no paginator provided, returns the data array as provided.
     */
    _pageData(data) {
        if (!this.paginator) {
            return data;
        }
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.slice(startIndex, startIndex + this.paginator.pageSize);
    }
    /**
     * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
     * index does not exceed the paginator's last page. Values are changed in a resolved promise to
     * guard against making property changes within a round of change detection.
     */
    _updatePaginator(filteredDataLength) {
        Promise.resolve().then(() => {
            const paginator = this.paginator;
            if (!paginator) {
                return;
            }
            paginator.length = filteredDataLength;
            // If the page index is set beyond the page, reduce it to the last page.
            if (paginator.pageIndex > 0) {
                const lastPageIndex = Math.ceil(paginator.length / paginator.pageSize) - 1 || 0;
                const newPageIndex = Math.min(paginator.pageIndex, lastPageIndex);
                if (newPageIndex !== paginator.pageIndex) {
                    paginator.pageIndex = newPageIndex;
                    // Since the paginator only emits after user-generated changes,
                    // we need our own stream so we know to should re-render the data.
                    this._internalPageChanges.next();
                }
            }
        });
    }
    /**
     * Used by the MatTable. Called when it connects to the data source.
     * @docs-private
     */
    connect() {
        if (!this._renderChangesSubscription) {
            this._updateChangeSubscription();
        }
        return this._renderData;
    }
    /**
     * Used by the MatTable. Called when it disconnects from the data source.
     * @docs-private
     */
    disconnect() {
        this._renderChangesSubscription?.unsubscribe();
        this._renderChangesSubscription = null;
    }
}
/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using MatSort), and pagination (using MatPaginator).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 *
 * **Note:** This class is meant to be a simple data source to help you get started. As such
 * it isn't equipped to handle some more advanced cases like robust i18n support or server-side
 * interactions. If your app needs to support more advanced use cases, consider implementing your
 * own `DataSource`.
 */
export class MatTableDataSource extends _MatTableDataSource {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvdGFibGUvdGFibGUtZGF0YS1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBQ2IsS0FBSyxFQUVMLEVBQUUsSUFBSSxZQUFZLEVBQ2xCLE9BQU8sR0FFUixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDckQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBMEJuQzs7O0dBR0c7QUFDSCxNQUFNLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBRTFDLHVEQUF1RDtBQUN2RCxNQUFNLE9BQU8sbUJBR1gsU0FBUSxVQUFhO0lBZ05yQixZQUFZLGNBQW1CLEVBQUU7UUFDL0IsS0FBSyxFQUFFLENBQUM7UUE3TVYsa0ZBQWtGO1FBQ2pFLGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQU0sRUFBRSxDQUFDLENBQUM7UUFFNUQsNEVBQTRFO1FBQzNELFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUUzRCxrR0FBa0c7UUFDakYseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUU1RDs7O1dBR0c7UUFDSCwrQkFBMEIsR0FBd0IsSUFBSSxDQUFDO1FBOEV2RDs7Ozs7Ozs7V0FRRztRQUNILHdCQUFtQixHQUF1RCxDQUN4RSxJQUFPLEVBQ1AsWUFBb0IsRUFDSCxFQUFFO1lBQ25CLE1BQU0sS0FBSyxHQUFJLElBQXVDLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFckUsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCLE1BQU0s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TUFBTSxHQUFHLGtCQUFrQixDQUFDO1lBRXRDLHdFQUF3RTtZQUN4RSxJQUFJLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFFbEUsSUFBSSxZQUFZLEtBQUssU0FBUyxDQUFDLFNBQVMsRUFBRTtvQkFDeEMsU0FBUyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7b0JBRW5DLCtEQUErRDtvQkFDL0Qsa0VBQWtFO29CQUNsRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2xDO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNwQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNsQztRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQywwQkFBMEIsRUFBRSxXQUFXLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO0lBQ3pDLENBQUM7Q0FDRjtBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sT0FBTyxrQkFHWCxTQUFRLG1CQUF5QjtDQUFHIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgY29tYmluZUxhdGVzdCxcbiAgbWVyZ2UsXG4gIE9ic2VydmFibGUsXG4gIG9mIGFzIG9ic2VydmFibGVPZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGF0YVNvdXJjZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7TWF0U29ydCwgU29ydH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQge19pc051bWJlclZhbHVlfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgdGhhdCBtYXRjaGVzIHRoZSByZXF1aXJlZCBBUEkgcGFydHMgZm9yIHRoZSBNYXRQYWdpbmF0b3IncyBQYWdlRXZlbnQuXG4gKiBEZWNvdXBsZWQgc28gdGhhdCB1c2VycyBjYW4gZGVwZW5kIG9uIGVpdGhlciB0aGUgbGVnYWN5IG9yIE1EQy1iYXNlZCBwYWdpbmF0b3IuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0VGFibGVEYXRhU291cmNlUGFnZUV2ZW50IHtcbiAgcGFnZUluZGV4OiBudW1iZXI7XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIGxlbmd0aDogbnVtYmVyO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSB0aGF0IG1hdGNoZXMgdGhlIHJlcXVpcmVkIEFQSSBwYXJ0cyBvZiB0aGUgTWF0UGFnaW5hdG9yLlxuICogRGVjb3VwbGVkIHNvIHRoYXQgdXNlcnMgY2FuIGRlcGVuZCBvbiBlaXRoZXIgdGhlIGxlZ2FjeSBvciBNREMtYmFzZWQgcGFnaW5hdG9yLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFRhYmxlRGF0YVNvdXJjZVBhZ2luYXRvciB7XG4gIHBhZ2U6IFN1YmplY3Q8TWF0VGFibGVEYXRhU291cmNlUGFnZUV2ZW50PjtcbiAgcGFnZUluZGV4OiBudW1iZXI7XG4gIGluaXRpYWxpemVkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuICBsZW5ndGg6IG51bWJlcjtcbiAgZmlyc3RQYWdlOiAoKSA9PiB2b2lkO1xuICBsYXN0UGFnZTogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBDb3JyZXNwb25kcyB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLiBNb3ZlZCBvdXQgaW50byBhIHZhcmlhYmxlIGhlcmUgZHVlIHRvXG4gKiBmbGFreSBicm93c2VyIHN1cHBvcnQgYW5kIHRoZSB2YWx1ZSBub3QgYmVpbmcgZGVmaW5lZCBpbiBDbG9zdXJlJ3MgdHlwaW5ncy5cbiAqL1xuY29uc3QgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBTaGFyZWQgYmFzZSBjbGFzcyB3aXRoIE1EQy1iYXNlZCBpbXBsZW1lbnRhdGlvbi4gKi9cbmV4cG9ydCBjbGFzcyBfTWF0VGFibGVEYXRhU291cmNlPFxuICBULFxuICBQIGV4dGVuZHMgTWF0VGFibGVEYXRhU291cmNlUGFnaW5hdG9yID0gTWF0VGFibGVEYXRhU291cmNlUGFnaW5hdG9yLFxuPiBleHRlbmRzIERhdGFTb3VyY2U8VD4ge1xuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhIG5ldyBkYXRhIGFycmF5IGlzIHNldCBvbiB0aGUgZGF0YSBzb3VyY2UuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2RhdGE6IEJlaGF2aW9yU3ViamVjdDxUW10+O1xuXG4gIC8qKiBTdHJlYW0gZW1pdHRpbmcgcmVuZGVyIGRhdGEgdG8gdGhlIHRhYmxlIChkZXBlbmRzIG9uIG9yZGVyZWQgZGF0YSBjaGFuZ2VzKS4gKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfcmVuZGVyRGF0YSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYSBuZXcgZmlsdGVyIHN0cmluZyBpcyBzZXQgb24gdGhlIGRhdGEgc291cmNlLiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9maWx0ZXIgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xuXG4gIC8qKiBVc2VkIHRvIHJlYWN0IHRvIGludGVybmFsIGNoYW5nZXMgb2YgdGhlIHBhZ2luYXRvciB0aGF0IGFyZSBtYWRlIGJ5IHRoZSBkYXRhIHNvdXJjZSBpdHNlbGYuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ludGVybmFsUGFnZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIGNoYW5nZXMgdGhhdCBzaG91bGQgdHJpZ2dlciBhbiB1cGRhdGUgdG8gdGhlIHRhYmxlJ3MgcmVuZGVyZWQgcm93cywgc3VjaFxuICAgKiBhcyBmaWx0ZXJpbmcsIHNvcnRpbmcsIHBhZ2luYXRpb24sIG9yIGJhc2UgZGF0YSBjaGFuZ2VzLlxuICAgKi9cbiAgX3JlbmRlckNoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgZmlsdGVyZWQgc2V0IG9mIGRhdGEgdGhhdCBoYXMgYmVlbiBtYXRjaGVkIGJ5IHRoZSBmaWx0ZXIgc3RyaW5nLCBvciBhbGwgdGhlIGRhdGEgaWYgdGhlcmVcbiAgICogaXMgbm8gZmlsdGVyLiBVc2VmdWwgZm9yIGtub3dpbmcgdGhlIHNldCBvZiBkYXRhIHRoZSB0YWJsZSByZXByZXNlbnRzLlxuICAgKiBGb3IgZXhhbXBsZSwgYSAnc2VsZWN0QWxsKCknIGZ1bmN0aW9uIHdvdWxkIGxpa2VseSB3YW50IHRvIHNlbGVjdCB0aGUgc2V0IG9mIGZpbHRlcmVkIGRhdGFcbiAgICogc2hvd24gdG8gdGhlIHVzZXIgcmF0aGVyIHRoYW4gYWxsIHRoZSBkYXRhLlxuICAgKi9cbiAgZmlsdGVyZWREYXRhOiBUW107XG5cbiAgLyoqIEFycmF5IG9mIGRhdGEgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQgYnkgdGhlIHRhYmxlLCB3aGVyZSBlYWNoIG9iamVjdCByZXByZXNlbnRzIG9uZSByb3cuICovXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLnZhbHVlO1xuICB9XG5cbiAgc2V0IGRhdGEoZGF0YTogVFtdKSB7XG4gICAgZGF0YSA9IEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW107XG4gICAgdGhpcy5fZGF0YS5uZXh0KGRhdGEpO1xuICAgIC8vIE5vcm1hbGx5IHRoZSBgZmlsdGVyZWREYXRhYCBpcyB1cGRhdGVkIGJ5IHRoZSByZS1yZW5kZXJcbiAgICAvLyBzdWJzY3JpcHRpb24sIGJ1dCB0aGF0IHdvbid0IGhhcHBlbiBpZiBpdCdzIGluYWN0aXZlLlxuICAgIGlmICghdGhpcy5fcmVuZGVyQ2hhbmdlc1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fZmlsdGVyRGF0YShkYXRhKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyIHRlcm0gdGhhdCBzaG91bGQgYmUgdXNlZCB0byBmaWx0ZXIgb3V0IG9iamVjdHMgZnJvbSB0aGUgZGF0YSBhcnJheS4gVG8gb3ZlcnJpZGUgaG93XG4gICAqIGRhdGEgb2JqZWN0cyBtYXRjaCB0byB0aGlzIGZpbHRlciBzdHJpbmcsIHByb3ZpZGUgYSBjdXN0b20gZnVuY3Rpb24gZm9yIGZpbHRlclByZWRpY2F0ZS5cbiAgICovXG4gIGdldCBmaWx0ZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyLnZhbHVlO1xuICB9XG5cbiAgc2V0IGZpbHRlcihmaWx0ZXI6IHN0cmluZykge1xuICAgIHRoaXMuX2ZpbHRlci5uZXh0KGZpbHRlcik7XG4gICAgLy8gTm9ybWFsbHkgdGhlIGBmaWx0ZXJlZERhdGFgIGlzIHVwZGF0ZWQgYnkgdGhlIHJlLXJlbmRlclxuICAgIC8vIHN1YnNjcmlwdGlvbiwgYnV0IHRoYXQgd29uJ3QgaGFwcGVuIGlmIGl0J3MgaW5hY3RpdmUuXG4gICAgaWYgKCF0aGlzLl9yZW5kZXJDaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9maWx0ZXJEYXRhKHRoaXMuZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBNYXRTb3J0IGRpcmVjdGl2ZSB1c2VkIGJ5IHRoZSB0YWJsZSB0byBjb250cm9sIGl0cyBzb3J0aW5nLiBTb3J0IGNoYW5nZXNcbiAgICogZW1pdHRlZCBieSB0aGUgTWF0U29ydCB3aWxsIHRyaWdnZXIgYW4gdXBkYXRlIHRvIHRoZSB0YWJsZSdzIHJlbmRlcmVkIGRhdGEuXG4gICAqL1xuICBnZXQgc29ydCgpOiBNYXRTb3J0IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnQ7XG4gIH1cblxuICBzZXQgc29ydChzb3J0OiBNYXRTb3J0IHwgbnVsbCkge1xuICAgIHRoaXMuX3NvcnQgPSBzb3J0O1xuICAgIHRoaXMuX3VwZGF0ZUNoYW5nZVN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc29ydDogTWF0U29ydCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBwYWdpbmF0b3IgY29tcG9uZW50IHVzZWQgYnkgdGhlIHRhYmxlIHRvIGNvbnRyb2wgd2hhdCBwYWdlIG9mIHRoZSBkYXRhIGlzXG4gICAqIGRpc3BsYXllZC4gUGFnZSBjaGFuZ2VzIGVtaXR0ZWQgYnkgdGhlIHBhZ2luYXRvciB3aWxsIHRyaWdnZXIgYW4gdXBkYXRlIHRvIHRoZVxuICAgKiB0YWJsZSdzIHJlbmRlcmVkIGRhdGEuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGUgZGF0YSBzb3VyY2UgdXNlcyB0aGUgcGFnaW5hdG9yJ3MgcHJvcGVydGllcyB0byBjYWxjdWxhdGUgd2hpY2ggcGFnZSBvZiBkYXRhXG4gICAqIHNob3VsZCBiZSBkaXNwbGF5ZWQuIElmIHRoZSBwYWdpbmF0b3IgcmVjZWl2ZXMgaXRzIHByb3BlcnRpZXMgYXMgdGVtcGxhdGUgaW5wdXRzLFxuICAgKiBlLmcuIGBbcGFnZUxlbmd0aF09MTAwYCBvciBgW3BhZ2VJbmRleF09MWAsIHRoZW4gYmUgc3VyZSB0aGF0IHRoZSBwYWdpbmF0b3IncyB2aWV3IGhhcyBiZWVuXG4gICAqIGluaXRpYWxpemVkIGJlZm9yZSBhc3NpZ25pbmcgaXQgdG8gdGhpcyBkYXRhIHNvdXJjZS5cbiAgICovXG4gIGdldCBwYWdpbmF0b3IoKTogUCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9wYWdpbmF0b3I7XG4gIH1cblxuICBzZXQgcGFnaW5hdG9yKHBhZ2luYXRvcjogUCB8IG51bGwpIHtcbiAgICB0aGlzLl9wYWdpbmF0b3IgPSBwYWdpbmF0b3I7XG4gICAgdGhpcy5fdXBkYXRlQ2hhbmdlU3Vic2NyaXB0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF9wYWdpbmF0b3I6IFAgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBEYXRhIGFjY2Vzc29yIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCBmb3IgYWNjZXNzaW5nIGRhdGEgcHJvcGVydGllcyBmb3Igc29ydGluZyB0aHJvdWdoXG4gICAqIHRoZSBkZWZhdWx0IHNvcnREYXRhIGZ1bmN0aW9uLlxuICAgKiBUaGlzIGRlZmF1bHQgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IHRoZSBzb3J0IGhlYWRlciBJRHMgKHdoaWNoIGRlZmF1bHRzIHRvIHRoZSBjb2x1bW4gbmFtZSlcbiAgICogbWF0Y2hlcyB0aGUgZGF0YSdzIHByb3BlcnRpZXMgKGUuZy4gY29sdW1uIFh5eiByZXByZXNlbnRzIGRhdGFbJ1h5eiddKS5cbiAgICogTWF5IGJlIHNldCB0byBhIGN1c3RvbSBmdW5jdGlvbiBmb3IgZGlmZmVyZW50IGJlaGF2aW9yLlxuICAgKiBAcGFyYW0gZGF0YSBEYXRhIG9iamVjdCB0aGF0IGlzIGJlaW5nIGFjY2Vzc2VkLlxuICAgKiBAcGFyYW0gc29ydEhlYWRlcklkIFRoZSBuYW1lIG9mIHRoZSBjb2x1bW4gdGhhdCByZXByZXNlbnRzIHRoZSBkYXRhLlxuICAgKi9cbiAgc29ydGluZ0RhdGFBY2Nlc3NvcjogKGRhdGE6IFQsIHNvcnRIZWFkZXJJZDogc3RyaW5nKSA9PiBzdHJpbmcgfCBudW1iZXIgPSAoXG4gICAgZGF0YTogVCxcbiAgICBzb3J0SGVhZGVySWQ6IHN0cmluZyxcbiAgKTogc3RyaW5nIHwgbnVtYmVyID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IChkYXRhIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgYW55Pilbc29ydEhlYWRlcklkXTtcblxuICAgIGlmIChfaXNOdW1iZXJWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgIGNvbnN0IG51bWJlclZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblxuICAgICAgLy8gTnVtYmVycyBiZXlvbmQgYE1BWF9TQUZFX0lOVEVHRVJgIGNhbid0IGJlIGNvbXBhcmVkIHJlbGlhYmx5IHNvIHdlXG4gICAgICAvLyBsZWF2ZSB0aGVtIGFzIHN0cmluZ3MuIEZvciBtb3JlIGluZm86IGh0dHBzOi8vZ29vLmdsL3k1dmJTZ1xuICAgICAgcmV0dXJuIG51bWJlclZhbHVlIDwgTUFYX1NBRkVfSU5URUdFUiA/IG51bWJlclZhbHVlIDogdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgc29ydGVkIGNvcHkgb2YgdGhlIGRhdGEgYXJyYXkgYmFzZWQgb24gdGhlIHN0YXRlIG9mIHRoZSBNYXRTb3J0LiBDYWxsZWRcbiAgICogYWZ0ZXIgY2hhbmdlcyBhcmUgbWFkZSB0byB0aGUgZmlsdGVyZWQgZGF0YSBvciB3aGVuIHNvcnQgY2hhbmdlcyBhcmUgZW1pdHRlZCBmcm9tIE1hdFNvcnQuXG4gICAqIEJ5IGRlZmF1bHQsIHRoZSBmdW5jdGlvbiByZXRyaWV2ZXMgdGhlIGFjdGl2ZSBzb3J0IGFuZCBpdHMgZGlyZWN0aW9uIGFuZCBjb21wYXJlcyBkYXRhXG4gICAqIGJ5IHJldHJpZXZpbmcgZGF0YSB1c2luZyB0aGUgc29ydGluZ0RhdGFBY2Nlc3Nvci4gTWF5IGJlIG92ZXJyaWRkZW4gZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gICAqIG9mIGRhdGEgb3JkZXJpbmcuXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBhcnJheSBvZiBkYXRhIHRoYXQgc2hvdWxkIGJlIHNvcnRlZC5cbiAgICogQHBhcmFtIHNvcnQgVGhlIGNvbm5lY3RlZCBNYXRTb3J0IHRoYXQgaG9sZHMgdGhlIGN1cnJlbnQgc29ydCBzdGF0ZS5cbiAgICovXG4gIHNvcnREYXRhOiAoZGF0YTogVFtdLCBzb3J0OiBNYXRTb3J0KSA9PiBUW10gPSAoZGF0YTogVFtdLCBzb3J0OiBNYXRTb3J0KTogVFtdID0+IHtcbiAgICBjb25zdCBhY3RpdmUgPSBzb3J0LmFjdGl2ZTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBzb3J0LmRpcmVjdGlvbjtcbiAgICBpZiAoIWFjdGl2ZSB8fCBkaXJlY3Rpb24gPT0gJycpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGxldCB2YWx1ZUEgPSB0aGlzLnNvcnRpbmdEYXRhQWNjZXNzb3IoYSwgYWN0aXZlKTtcbiAgICAgIGxldCB2YWx1ZUIgPSB0aGlzLnNvcnRpbmdEYXRhQWNjZXNzb3IoYiwgYWN0aXZlKTtcblxuICAgICAgLy8gSWYgdGhlcmUgYXJlIGRhdGEgaW4gdGhlIGNvbHVtbiB0aGF0IGNhbiBiZSBjb252ZXJ0ZWQgdG8gYSBudW1iZXIsXG4gICAgICAvLyBpdCBtdXN0IGJlIGVuc3VyZWQgdGhhdCB0aGUgcmVzdCBvZiB0aGUgZGF0YVxuICAgICAgLy8gaXMgb2YgdGhlIHNhbWUgdHlwZSBzbyBhcyBub3QgdG8gb3JkZXIgaW5jb3JyZWN0bHkuXG4gICAgICBjb25zdCB2YWx1ZUFUeXBlID0gdHlwZW9mIHZhbHVlQTtcbiAgICAgIGNvbnN0IHZhbHVlQlR5cGUgPSB0eXBlb2YgdmFsdWVCO1xuXG4gICAgICBpZiAodmFsdWVBVHlwZSAhPT0gdmFsdWVCVHlwZSkge1xuICAgICAgICBpZiAodmFsdWVBVHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICB2YWx1ZUEgKz0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlQlR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgdmFsdWVCICs9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGJvdGggdmFsdWVBIGFuZCB2YWx1ZUIgZXhpc3QgKHRydXRoeSksIHRoZW4gY29tcGFyZSB0aGUgdHdvLiBPdGhlcndpc2UsIGNoZWNrIGlmXG4gICAgICAvLyBvbmUgdmFsdWUgZXhpc3RzIHdoaWxlIHRoZSBvdGhlciBkb2Vzbid0LiBJbiB0aGlzIGNhc2UsIGV4aXN0aW5nIHZhbHVlIHNob3VsZCBjb21lIGxhc3QuXG4gICAgICAvLyBUaGlzIGF2b2lkcyBpbmNvbnNpc3RlbnQgcmVzdWx0cyB3aGVuIGNvbXBhcmluZyB2YWx1ZXMgdG8gdW5kZWZpbmVkL251bGwuXG4gICAgICAvLyBJZiBuZWl0aGVyIHZhbHVlIGV4aXN0cywgcmV0dXJuIDAgKGVxdWFsKS5cbiAgICAgIGxldCBjb21wYXJhdG9yUmVzdWx0ID0gMDtcbiAgICAgIGlmICh2YWx1ZUEgIT0gbnVsbCAmJiB2YWx1ZUIgIT0gbnVsbCkge1xuICAgICAgICAvLyBDaGVjayBpZiBvbmUgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRoZSBvdGhlcjsgaWYgZXF1YWwsIGNvbXBhcmF0b3JSZXN1bHQgc2hvdWxkIHJlbWFpbiAwLlxuICAgICAgICBpZiAodmFsdWVBID4gdmFsdWVCKSB7XG4gICAgICAgICAgY29tcGFyYXRvclJlc3VsdCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWVBIDwgdmFsdWVCKSB7XG4gICAgICAgICAgY29tcGFyYXRvclJlc3VsdCA9IC0xO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlQSAhPSBudWxsKSB7XG4gICAgICAgIGNvbXBhcmF0b3JSZXN1bHQgPSAxO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZUIgIT0gbnVsbCkge1xuICAgICAgICBjb21wYXJhdG9yUmVzdWx0ID0gLTE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb21wYXJhdG9yUmVzdWx0ICogKGRpcmVjdGlvbiA9PSAnYXNjJyA/IDEgOiAtMSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIGRhdGEgb2JqZWN0IG1hdGNoZXMgdGhlIGRhdGEgc291cmNlJ3MgZmlsdGVyIHN0cmluZy4gQnkgZGVmYXVsdCwgZWFjaCBkYXRhIG9iamVjdFxuICAgKiBpcyBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgb2YgaXRzIHByb3BlcnRpZXMgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGUgZmlsdGVyIGhhc1xuICAgKiBhdCBsZWFzdCBvbmUgb2NjdXJyZW5jZSBpbiB0aGF0IHN0cmluZy4gQnkgZGVmYXVsdCwgdGhlIGZpbHRlciBzdHJpbmcgaGFzIGl0cyB3aGl0ZXNwYWNlXG4gICAqIHRyaW1tZWQgYW5kIHRoZSBtYXRjaCBpcyBjYXNlLWluc2Vuc2l0aXZlLiBNYXkgYmUgb3ZlcnJpZGRlbiBmb3IgYSBjdXN0b20gaW1wbGVtZW50YXRpb24gb2ZcbiAgICogZmlsdGVyIG1hdGNoaW5nLlxuICAgKiBAcGFyYW0gZGF0YSBEYXRhIG9iamVjdCB1c2VkIHRvIGNoZWNrIGFnYWluc3QgdGhlIGZpbHRlci5cbiAgICogQHBhcmFtIGZpbHRlciBGaWx0ZXIgc3RyaW5nIHRoYXQgaGFzIGJlZW4gc2V0IG9uIHRoZSBkYXRhIHNvdXJjZS5cbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgZmlsdGVyIG1hdGNoZXMgYWdhaW5zdCB0aGUgZGF0YVxuICAgKi9cbiAgZmlsdGVyUHJlZGljYXRlOiAoZGF0YTogVCwgZmlsdGVyOiBzdHJpbmcpID0+IGJvb2xlYW4gPSAoZGF0YTogVCwgZmlsdGVyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAvLyBUcmFuc2Zvcm0gdGhlIGRhdGEgaW50byBhIGxvd2VyY2FzZSBzdHJpbmcgb2YgYWxsIHByb3BlcnR5IHZhbHVlcy5cbiAgICBjb25zdCBkYXRhU3RyID0gT2JqZWN0LmtleXMoZGF0YSBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIGFueT4pXG4gICAgICAucmVkdWNlKChjdXJyZW50VGVybTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyBVc2UgYW4gb2JzY3VyZSBVbmljb2RlIGNoYXJhY3RlciB0byBkZWxpbWl0IHRoZSB3b3JkcyBpbiB0aGUgY29uY2F0ZW5hdGVkIHN0cmluZy5cbiAgICAgICAgLy8gVGhpcyBhdm9pZHMgbWF0Y2hlcyB3aGVyZSB0aGUgdmFsdWVzIG9mIHR3byBjb2x1bW5zIGNvbWJpbmVkIHdpbGwgbWF0Y2ggdGhlIHVzZXIncyBxdWVyeVxuICAgICAgICAvLyAoZS5nLiBgRmx1dGVgIGFuZCBgU3RvcGAgd2lsbCBtYXRjaCBgVGVzdGApLiBUaGUgY2hhcmFjdGVyIGlzIGludGVuZGVkIHRvIGJlIHNvbWV0aGluZ1xuICAgICAgICAvLyB0aGF0IGhhcyBhIHZlcnkgbG93IGNoYW5jZSBvZiBiZWluZyB0eXBlZCBpbiBieSBzb21lYm9keSBpbiBhIHRleHQgZmllbGQuIFRoaXMgb25lIGluXG4gICAgICAgIC8vIHBhcnRpY3VsYXIgaXMgXCJXaGl0ZSB1cC1wb2ludGluZyB0cmlhbmdsZSB3aXRoIGRvdFwiIGZyb21cbiAgICAgICAgLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlzdF9vZl9Vbmljb2RlX2NoYXJhY3RlcnNcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUZXJtICsgKGRhdGEgYXMgdW5rbm93biBhcyBSZWNvcmQ8c3RyaW5nLCBhbnk+KVtrZXldICsgJ+KXrCc7XG4gICAgICB9LCAnJylcbiAgICAgIC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHRoZSBmaWx0ZXIgYnkgY29udmVydGluZyBpdCB0byBsb3dlcmNhc2UgYW5kIHJlbW92aW5nIHdoaXRlc3BhY2UuXG4gICAgY29uc3QgdHJhbnNmb3JtZWRGaWx0ZXIgPSBmaWx0ZXIudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gZGF0YVN0ci5pbmRleE9mKHRyYW5zZm9ybWVkRmlsdGVyKSAhPSAtMTtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihpbml0aWFsRGF0YTogVFtdID0gW10pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2RhdGEgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oaW5pdGlhbERhdGEpO1xuICAgIHRoaXMuX3VwZGF0ZUNoYW5nZVN1YnNjcmlwdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byBjaGFuZ2VzIHRoYXQgc2hvdWxkIHRyaWdnZXIgYW4gdXBkYXRlIHRvIHRoZSB0YWJsZSdzIHJlbmRlcmVkIHJvd3MuIFdoZW4gdGhlXG4gICAqIGNoYW5nZXMgb2NjdXIsIHByb2Nlc3MgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGZpbHRlciwgc29ydCwgYW5kIHBhZ2luYXRpb24gYWxvbmcgd2l0aFxuICAgKiB0aGUgcHJvdmlkZWQgYmFzZSBkYXRhIGFuZCBzZW5kIGl0IHRvIHRoZSB0YWJsZSBmb3IgcmVuZGVyaW5nLlxuICAgKi9cbiAgX3VwZGF0ZUNoYW5nZVN1YnNjcmlwdGlvbigpIHtcbiAgICAvLyBTb3J0aW5nIGFuZC9vciBwYWdpbmF0aW9uIHNob3VsZCBiZSB3YXRjaGVkIGlmIHNvcnQgYW5kL29yIHBhZ2luYXRvciBhcmUgcHJvdmlkZWQuXG4gICAgLy8gVGhlIGV2ZW50cyBzaG91bGQgZW1pdCB3aGVuZXZlciB0aGUgY29tcG9uZW50IGVtaXRzIGEgY2hhbmdlIG9yIGluaXRpYWxpemVzLCBvciBpZiBub1xuICAgIC8vIGNvbXBvbmVudCBpcyBwcm92aWRlZCwgYSBzdHJlYW0gd2l0aCBqdXN0IGEgbnVsbCBldmVudCBzaG91bGQgYmUgcHJvdmlkZWQuXG4gICAgLy8gVGhlIGBzb3J0Q2hhbmdlYCBhbmQgYHBhZ2VDaGFuZ2VgIGFjdHMgYXMgYSBzaWduYWwgdG8gdGhlIGNvbWJpbmVMYXRlc3RzIGJlbG93IHNvIHRoYXQgdGhlXG4gICAgLy8gcGlwZWxpbmUgY2FuIHByb2dyZXNzIHRvIHRoZSBuZXh0IHN0ZXAuIE5vdGUgdGhhdCB0aGUgdmFsdWUgZnJvbSB0aGVzZSBzdHJlYW1zIGFyZSBub3QgdXNlZCxcbiAgICAvLyB0aGV5IHB1cmVseSBhY3QgYXMgYSBzaWduYWwgdG8gcHJvZ3Jlc3MgaW4gdGhlIHBpcGVsaW5lLlxuICAgIGNvbnN0IHNvcnRDaGFuZ2U6IE9ic2VydmFibGU8U29ydCB8IG51bGwgfCB2b2lkPiA9IHRoaXMuX3NvcnRcbiAgICAgID8gKG1lcmdlKHRoaXMuX3NvcnQuc29ydENoYW5nZSwgdGhpcy5fc29ydC5pbml0aWFsaXplZCkgYXMgT2JzZXJ2YWJsZTxTb3J0IHwgdm9pZD4pXG4gICAgICA6IG9ic2VydmFibGVPZihudWxsKTtcbiAgICBjb25zdCBwYWdlQ2hhbmdlOiBPYnNlcnZhYmxlPE1hdFRhYmxlRGF0YVNvdXJjZVBhZ2VFdmVudCB8IG51bGwgfCB2b2lkPiA9IHRoaXMuX3BhZ2luYXRvclxuICAgICAgPyAobWVyZ2UoXG4gICAgICAgICAgdGhpcy5fcGFnaW5hdG9yLnBhZ2UsXG4gICAgICAgICAgdGhpcy5faW50ZXJuYWxQYWdlQ2hhbmdlcyxcbiAgICAgICAgICB0aGlzLl9wYWdpbmF0b3IuaW5pdGlhbGl6ZWQsXG4gICAgICAgICkgYXMgT2JzZXJ2YWJsZTxNYXRUYWJsZURhdGFTb3VyY2VQYWdlRXZlbnQgfCB2b2lkPilcbiAgICAgIDogb2JzZXJ2YWJsZU9mKG51bGwpO1xuICAgIGNvbnN0IGRhdGFTdHJlYW0gPSB0aGlzLl9kYXRhO1xuICAgIC8vIFdhdGNoIGZvciBiYXNlIGRhdGEgb3IgZmlsdGVyIGNoYW5nZXMgdG8gcHJvdmlkZSBhIGZpbHRlcmVkIHNldCBvZiBkYXRhLlxuICAgIGNvbnN0IGZpbHRlcmVkRGF0YSA9IGNvbWJpbmVMYXRlc3QoW2RhdGFTdHJlYW0sIHRoaXMuX2ZpbHRlcl0pLnBpcGUoXG4gICAgICBtYXAoKFtkYXRhXSkgPT4gdGhpcy5fZmlsdGVyRGF0YShkYXRhKSksXG4gICAgKTtcbiAgICAvLyBXYXRjaCBmb3IgZmlsdGVyZWQgZGF0YSBvciBzb3J0IGNoYW5nZXMgdG8gcHJvdmlkZSBhbiBvcmRlcmVkIHNldCBvZiBkYXRhLlxuICAgIGNvbnN0IG9yZGVyZWREYXRhID0gY29tYmluZUxhdGVzdChbZmlsdGVyZWREYXRhLCBzb3J0Q2hhbmdlXSkucGlwZShcbiAgICAgIG1hcCgoW2RhdGFdKSA9PiB0aGlzLl9vcmRlckRhdGEoZGF0YSkpLFxuICAgICk7XG4gICAgLy8gV2F0Y2ggZm9yIG9yZGVyZWQgZGF0YSBvciBwYWdlIGNoYW5nZXMgdG8gcHJvdmlkZSBhIHBhZ2VkIHNldCBvZiBkYXRhLlxuICAgIGNvbnN0IHBhZ2luYXRlZERhdGEgPSBjb21iaW5lTGF0ZXN0KFtvcmRlcmVkRGF0YSwgcGFnZUNoYW5nZV0pLnBpcGUoXG4gICAgICBtYXAoKFtkYXRhXSkgPT4gdGhpcy5fcGFnZURhdGEoZGF0YSkpLFxuICAgICk7XG4gICAgLy8gV2F0Y2hlZCBmb3IgcGFnZWQgZGF0YSBjaGFuZ2VzIGFuZCBzZW5kIHRoZSByZXN1bHQgdG8gdGhlIHRhYmxlIHRvIHJlbmRlci5cbiAgICB0aGlzLl9yZW5kZXJDaGFuZ2VzU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbmRlckNoYW5nZXNTdWJzY3JpcHRpb24gPSBwYWdpbmF0ZWREYXRhLnN1YnNjcmliZShkYXRhID0+IHRoaXMuX3JlbmRlckRhdGEubmV4dChkYXRhKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGZpbHRlcmVkIGRhdGEgYXJyYXkgd2hlcmUgZWFjaCBmaWx0ZXIgb2JqZWN0IGNvbnRhaW5zIHRoZSBmaWx0ZXIgc3RyaW5nIHdpdGhpblxuICAgKiB0aGUgcmVzdWx0IG9mIHRoZSBmaWx0ZXJUZXJtQWNjZXNzb3IgZnVuY3Rpb24uIElmIG5vIGZpbHRlciBpcyBzZXQsIHJldHVybnMgdGhlIGRhdGEgYXJyYXlcbiAgICogYXMgcHJvdmlkZWQuXG4gICAqL1xuICBfZmlsdGVyRGF0YShkYXRhOiBUW10pIHtcbiAgICAvLyBJZiB0aGVyZSBpcyBhIGZpbHRlciBzdHJpbmcsIGZpbHRlciBvdXQgZGF0YSB0aGF0IGRvZXMgbm90IGNvbnRhaW4gaXQuXG4gICAgLy8gRWFjaCBkYXRhIG9iamVjdCBpcyBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgdXNpbmcgdGhlIGZ1bmN0aW9uIGRlZmluZWQgYnkgZmlsdGVyVGVybUFjY2Vzc29yLlxuICAgIC8vIE1heSBiZSBvdmVycmlkZGVuIGZvciBjdXN0b21pemF0aW9uLlxuICAgIHRoaXMuZmlsdGVyZWREYXRhID1cbiAgICAgIHRoaXMuZmlsdGVyID09IG51bGwgfHwgdGhpcy5maWx0ZXIgPT09ICcnXG4gICAgICAgID8gZGF0YVxuICAgICAgICA6IGRhdGEuZmlsdGVyKG9iaiA9PiB0aGlzLmZpbHRlclByZWRpY2F0ZShvYmosIHRoaXMuZmlsdGVyKSk7XG5cbiAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVBhZ2luYXRvcih0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZpbHRlcmVkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc29ydGVkIGNvcHkgb2YgdGhlIGRhdGEgaWYgTWF0U29ydCBoYXMgYSBzb3J0IGFwcGxpZWQsIG90aGVyd2lzZSBqdXN0IHJldHVybnMgdGhlXG4gICAqIGRhdGEgYXJyYXkgYXMgcHJvdmlkZWQuIFVzZXMgdGhlIGRlZmF1bHQgZGF0YSBhY2Nlc3NvciBmb3IgZGF0YSBsb29rdXAsIHVubGVzcyBhXG4gICAqIHNvcnREYXRhQWNjZXNzb3IgZnVuY3Rpb24gaXMgZGVmaW5lZC5cbiAgICovXG4gIF9vcmRlckRhdGEoZGF0YTogVFtdKTogVFtdIHtcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBhY3RpdmUgc29ydCBvciBkaXJlY3Rpb24sIHJldHVybiB0aGUgZGF0YSB3aXRob3V0IHRyeWluZyB0byBzb3J0LlxuICAgIGlmICghdGhpcy5zb3J0KSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zb3J0RGF0YShkYXRhLnNsaWNlKCksIHRoaXMuc29ydCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHBhZ2VkIHNsaWNlIG9mIHRoZSBwcm92aWRlZCBkYXRhIGFycmF5IGFjY29yZGluZyB0byB0aGUgcHJvdmlkZWQgcGFnaW5hdG9yJ3MgcGFnZVxuICAgKiBpbmRleCBhbmQgbGVuZ3RoLiBJZiB0aGVyZSBpcyBubyBwYWdpbmF0b3IgcHJvdmlkZWQsIHJldHVybnMgdGhlIGRhdGEgYXJyYXkgYXMgcHJvdmlkZWQuXG4gICAqL1xuICBfcGFnZURhdGEoZGF0YTogVFtdKTogVFtdIHtcbiAgICBpZiAoIXRoaXMucGFnaW5hdG9yKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5wYWdpbmF0b3IucGFnZUluZGV4ICogdGhpcy5wYWdpbmF0b3IucGFnZVNpemU7XG4gICAgcmV0dXJuIGRhdGEuc2xpY2Uoc3RhcnRJbmRleCwgc3RhcnRJbmRleCArIHRoaXMucGFnaW5hdG9yLnBhZ2VTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBwYWdpbmF0b3IgdG8gcmVmbGVjdCB0aGUgbGVuZ3RoIG9mIHRoZSBmaWx0ZXJlZCBkYXRhLCBhbmQgbWFrZXMgc3VyZSB0aGF0IHRoZSBwYWdlXG4gICAqIGluZGV4IGRvZXMgbm90IGV4Y2VlZCB0aGUgcGFnaW5hdG9yJ3MgbGFzdCBwYWdlLiBWYWx1ZXMgYXJlIGNoYW5nZWQgaW4gYSByZXNvbHZlZCBwcm9taXNlIHRvXG4gICAqIGd1YXJkIGFnYWluc3QgbWFraW5nIHByb3BlcnR5IGNoYW5nZXMgd2l0aGluIGEgcm91bmQgb2YgY2hhbmdlIGRldGVjdGlvbi5cbiAgICovXG4gIF91cGRhdGVQYWdpbmF0b3IoZmlsdGVyZWREYXRhTGVuZ3RoOiBudW1iZXIpIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuXG4gICAgICBpZiAoIXBhZ2luYXRvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHBhZ2luYXRvci5sZW5ndGggPSBmaWx0ZXJlZERhdGFMZW5ndGg7XG5cbiAgICAgIC8vIElmIHRoZSBwYWdlIGluZGV4IGlzIHNldCBiZXlvbmQgdGhlIHBhZ2UsIHJlZHVjZSBpdCB0byB0aGUgbGFzdCBwYWdlLlxuICAgICAgaWYgKHBhZ2luYXRvci5wYWdlSW5kZXggPiAwKSB7XG4gICAgICAgIGNvbnN0IGxhc3RQYWdlSW5kZXggPSBNYXRoLmNlaWwocGFnaW5hdG9yLmxlbmd0aCAvIHBhZ2luYXRvci5wYWdlU2l6ZSkgLSAxIHx8IDA7XG4gICAgICAgIGNvbnN0IG5ld1BhZ2VJbmRleCA9IE1hdGgubWluKHBhZ2luYXRvci5wYWdlSW5kZXgsIGxhc3RQYWdlSW5kZXgpO1xuXG4gICAgICAgIGlmIChuZXdQYWdlSW5kZXggIT09IHBhZ2luYXRvci5wYWdlSW5kZXgpIHtcbiAgICAgICAgICBwYWdpbmF0b3IucGFnZUluZGV4ID0gbmV3UGFnZUluZGV4O1xuXG4gICAgICAgICAgLy8gU2luY2UgdGhlIHBhZ2luYXRvciBvbmx5IGVtaXRzIGFmdGVyIHVzZXItZ2VuZXJhdGVkIGNoYW5nZXMsXG4gICAgICAgICAgLy8gd2UgbmVlZCBvdXIgb3duIHN0cmVhbSBzbyB3ZSBrbm93IHRvIHNob3VsZCByZS1yZW5kZXIgdGhlIGRhdGEuXG4gICAgICAgICAgdGhpcy5faW50ZXJuYWxQYWdlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IHRoZSBNYXRUYWJsZS4gQ2FsbGVkIHdoZW4gaXQgY29ubmVjdHMgdG8gdGhlIGRhdGEgc291cmNlLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBjb25uZWN0KCkge1xuICAgIGlmICghdGhpcy5fcmVuZGVyQ2hhbmdlc1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fdXBkYXRlQ2hhbmdlU3Vic2NyaXB0aW9uKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlckRhdGE7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBieSB0aGUgTWF0VGFibGUuIENhbGxlZCB3aGVuIGl0IGRpc2Nvbm5lY3RzIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBkaXNjb25uZWN0KCkge1xuICAgIHRoaXMuX3JlbmRlckNoYW5nZXNTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVuZGVyQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIHNvdXJjZSB0aGF0IGFjY2VwdHMgYSBjbGllbnQtc2lkZSBkYXRhIGFycmF5IGFuZCBpbmNsdWRlcyBuYXRpdmUgc3VwcG9ydCBvZiBmaWx0ZXJpbmcsXG4gKiBzb3J0aW5nICh1c2luZyBNYXRTb3J0KSwgYW5kIHBhZ2luYXRpb24gKHVzaW5nIE1hdFBhZ2luYXRvcikuXG4gKlxuICogQWxsb3dzIGZvciBzb3J0IGN1c3RvbWl6YXRpb24gYnkgb3ZlcnJpZGluZyBzb3J0aW5nRGF0YUFjY2Vzc29yLCB3aGljaCBkZWZpbmVzIGhvdyBkYXRhXG4gKiBwcm9wZXJ0aWVzIGFyZSBhY2Nlc3NlZC4gQWxzbyBhbGxvd3MgZm9yIGZpbHRlciBjdXN0b21pemF0aW9uIGJ5IG92ZXJyaWRpbmcgZmlsdGVyVGVybUFjY2Vzc29yLFxuICogd2hpY2ggZGVmaW5lcyBob3cgcm93IGRhdGEgaXMgY29udmVydGVkIHRvIGEgc3RyaW5nIGZvciBmaWx0ZXIgbWF0Y2hpbmcuXG4gKlxuICogKipOb3RlOioqIFRoaXMgY2xhc3MgaXMgbWVhbnQgdG8gYmUgYSBzaW1wbGUgZGF0YSBzb3VyY2UgdG8gaGVscCB5b3UgZ2V0IHN0YXJ0ZWQuIEFzIHN1Y2hcbiAqIGl0IGlzbid0IGVxdWlwcGVkIHRvIGhhbmRsZSBzb21lIG1vcmUgYWR2YW5jZWQgY2FzZXMgbGlrZSByb2J1c3QgaTE4biBzdXBwb3J0IG9yIHNlcnZlci1zaWRlXG4gKiBpbnRlcmFjdGlvbnMuIElmIHlvdXIgYXBwIG5lZWRzIHRvIHN1cHBvcnQgbW9yZSBhZHZhbmNlZCB1c2UgY2FzZXMsIGNvbnNpZGVyIGltcGxlbWVudGluZyB5b3VyXG4gKiBvd24gYERhdGFTb3VyY2VgLlxuICovXG5leHBvcnQgY2xhc3MgTWF0VGFibGVEYXRhU291cmNlPFxuICBULFxuICBQIGV4dGVuZHMgTWF0VGFibGVEYXRhU291cmNlUGFnaW5hdG9yID0gTWF0VGFibGVEYXRhU291cmNlUGFnaW5hdG9yLFxuPiBleHRlbmRzIF9NYXRUYWJsZURhdGFTb3VyY2U8VCwgUD4ge31cbiJdfQ==