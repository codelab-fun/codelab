/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Parses string representation of a style and converts it into object literal.
 *
 * @param value string representation of style as used in the `style` attribute in HTML.
 *   Example: `color: red; height: auto`.
 * @returns An array of style property name and value pairs, e.g. `['color', 'red', 'height',
 * 'auto']`
 */
export function parse(value) {
    // we use a string array here instead of a string map
    // because a string-map is not guaranteed to retain the
    // order of the entries whereas a string array can be
    // constructed in a [key, value, key, value] format.
    const styles = [];
    let i = 0;
    let parenDepth = 0;
    let quote = 0 /* Char.QuoteNone */;
    let valueStart = 0;
    let propStart = 0;
    let currentProp = null;
    let valueHasQuotes = false;
    while (i < value.length) {
        const token = value.charCodeAt(i++);
        switch (token) {
            case 40 /* Char.OpenParen */:
                parenDepth++;
                break;
            case 41 /* Char.CloseParen */:
                parenDepth--;
                break;
            case 39 /* Char.QuoteSingle */:
                // valueStart needs to be there since prop values don't
                // have quotes in CSS
                valueHasQuotes = valueHasQuotes || valueStart > 0;
                if (quote === 0 /* Char.QuoteNone */) {
                    quote = 39 /* Char.QuoteSingle */;
                }
                else if (quote === 39 /* Char.QuoteSingle */ && value.charCodeAt(i - 1) !== 92 /* Char.BackSlash */) {
                    quote = 0 /* Char.QuoteNone */;
                }
                break;
            case 34 /* Char.QuoteDouble */:
                // same logic as above
                valueHasQuotes = valueHasQuotes || valueStart > 0;
                if (quote === 0 /* Char.QuoteNone */) {
                    quote = 34 /* Char.QuoteDouble */;
                }
                else if (quote === 34 /* Char.QuoteDouble */ && value.charCodeAt(i - 1) !== 92 /* Char.BackSlash */) {
                    quote = 0 /* Char.QuoteNone */;
                }
                break;
            case 58 /* Char.Colon */:
                if (!currentProp && parenDepth === 0 && quote === 0 /* Char.QuoteNone */) {
                    currentProp = hyphenate(value.substring(propStart, i - 1).trim());
                    valueStart = i;
                }
                break;
            case 59 /* Char.Semicolon */:
                if (currentProp && valueStart > 0 && parenDepth === 0 && quote === 0 /* Char.QuoteNone */) {
                    const styleVal = value.substring(valueStart, i - 1).trim();
                    styles.push(currentProp, valueHasQuotes ? stripUnnecessaryQuotes(styleVal) : styleVal);
                    propStart = i;
                    valueStart = 0;
                    currentProp = null;
                    valueHasQuotes = false;
                }
                break;
        }
    }
    if (currentProp && valueStart) {
        const styleVal = value.slice(valueStart).trim();
        styles.push(currentProp, valueHasQuotes ? stripUnnecessaryQuotes(styleVal) : styleVal);
    }
    return styles;
}
export function stripUnnecessaryQuotes(value) {
    const qS = value.charCodeAt(0);
    const qE = value.charCodeAt(value.length - 1);
    if (qS == qE && (qS == 39 /* Char.QuoteSingle */ || qS == 34 /* Char.QuoteDouble */)) {
        const tempValue = value.substring(1, value.length - 1);
        // special case to avoid using a multi-quoted string that was just chomped
        // (e.g. `font-family: "Verdana", "sans-serif"`)
        if (tempValue.indexOf('\'') == -1 && tempValue.indexOf('"') == -1) {
            value = tempValue;
        }
    }
    return value;
}
export function hyphenate(value) {
    return value
        .replace(/[a-z][A-Z]/g, v => {
        return v.charAt(0) + '-' + v.charAt(1);
    })
        .toLowerCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVfcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvdmlldy9zdHlsZV9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBY0g7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxLQUFLLENBQUMsS0FBYTtJQUNqQyxxREFBcUQ7SUFDckQsdURBQXVEO0lBQ3ZELHFEQUFxRDtJQUNyRCxvREFBb0Q7SUFDcEQsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBRTVCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNuQixJQUFJLEtBQUsseUJBQXVCLENBQUM7SUFDakMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNsQixJQUFJLFdBQVcsR0FBZ0IsSUFBSSxDQUFDO0lBQ3BDLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztJQUMzQixPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQVMsQ0FBQztRQUM1QyxRQUFRLEtBQUssRUFBRTtZQUNiO2dCQUNFLFVBQVUsRUFBRSxDQUFDO2dCQUNiLE1BQU07WUFDUjtnQkFDRSxVQUFVLEVBQUUsQ0FBQztnQkFDYixNQUFNO1lBQ1I7Z0JBQ0UsdURBQXVEO2dCQUN2RCxxQkFBcUI7Z0JBQ3JCLGNBQWMsR0FBRyxjQUFjLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxLQUFLLDJCQUFtQixFQUFFO29CQUM1QixLQUFLLDRCQUFtQixDQUFDO2lCQUMxQjtxQkFBTSxJQUFJLEtBQUssOEJBQXFCLElBQUksS0FBSyxDQUFDLFVB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QWEsRUFDYixDQUFDLENBQUMsRUFBRTtRQUNGLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUM7U0FDTCxXQUFXLEVBQUUsQ0FBQztBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmNvbnN0IGVudW0gQ2hhciB7XG4gIE9wZW5QYXJlbiA9IDQwLFxuICBDbG9zZVBhcmVuID0gNDEsXG4gIENvbG9uID0gNTgsXG4gIFNlbWljb2xvbiA9IDU5LFxuICBCYWNrU2xhc2ggPSA5MixcbiAgUXVvdGVOb25lID0gMCwgIC8vIGluZGljYXRpbmcgd2UgYXJlIG5vdCBpbnNpZGUgYSBxdW90ZVxuICBRdW90ZURvdWJsZSA9IDM0LFxuICBRdW90ZVNpbmdsZSA9IDM5LFxufVxuXG5cbi8qKlxuICogUGFyc2VzIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHN0eWxlIGFuZCBjb252ZXJ0cyBpdCBpbnRvIG9iamVjdCBsaXRlcmFsLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2Ygc3R5bGUgYXMgdXNlZCBpbiB0aGUgYHN0eWxlYCBhdHRyaWJ1dGUgaW4gSFRNTC5cbiAqICAgRXhhbXBsZTogYGNvbG9yOiByZWQ7IGhlaWdodDogYXV0b2AuXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHlsZSBwcm9wZXJ0eSBuYW1lIGFuZCB2YWx1ZSBwYWlycywgZS5nLiBgWydjb2xvcicsICdyZWQnLCAnaGVpZ2h0JyxcbiAqICdhdXRvJ11gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAvLyB3ZSB1c2UgYSBzdHJpbmcgYXJyYXkgaGVyZSBpbnN0ZWFkIG9mIGEgc3RyaW5nIG1hcFxuICAvLyBiZWNhdXNlIGEgc3RyaW5nLW1hcCBpcyBub3QgZ3VhcmFudGVlZCB0byByZXRhaW4gdGhlXG4gIC8vIG9yZGVyIG9mIHRoZSBlbnRyaWVzIHdoZXJlYXMgYSBzdHJpbmcgYXJyYXkgY2FuIGJlXG4gIC8vIGNvbnN0cnVjdGVkIGluIGEgW2tleSwgdmFsdWUsIGtleSwgdmFsdWVdIGZvcm1hdC5cbiAgY29uc3Qgc3R5bGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGxldCBpID0gMDtcbiAgbGV0IHBhcmVuRGVwdGggPSAwO1xuICBsZXQgcXVvdGU6IENoYXIgPSBDaGFyLlF1b3RlTm9uZTtcbiAgbGV0IHZhbHVlU3RhcnQgPSAwO1xuICBsZXQgcHJvcFN0YXJ0ID0gMDtcbiAgbGV0IGN1cnJlbnRQcm9wOiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gIGxldCB2YWx1ZUhhc1F1b3RlcyA9IGZhbHNlO1xuICB3aGlsZSAoaSA8IHZhbHVlLmxlbmd0aCkge1xuICAgIGNvbnN0IHRva2VuID0gdmFsdWUuY2hhckNvZGVBdChpKyspIGFzIENoYXI7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSBDaGFyLk9wZW5QYXJlbjpcbiAgICAgICAgcGFyZW5EZXB0aCsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2hhci5DbG9zZVBhcmVuOlxuICAgICAgICBwYXJlbkRlcHRoLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDaGFyLlF1b3RlU2luZ2xlOlxuICAgICAgICAvLyB2YWx1ZVN0YXJ0IG5lZWRzIHRvIGJlIHRoZXJlIHNpbmNlIHByb3AgdmFsdWVzIGRvbid0XG4gICAgICAgIC8vIGhhdmUgcXVvdGVzIGluIENTU1xuICAgICAgICB2YWx1ZUhhc1F1b3RlcyA9IHZhbHVlSGFzUXVvdGVzIHx8IHZhbHVlU3RhcnQgPiAwO1xuICAgICAgICBpZiAocXVvdGUgPT09IENoYXIuUXVvdGVOb25lKSB7XG4gICAgICAgICAgcXVvdGUgPSBDaGFyLlF1b3RlU2luZ2xlO1xuICAgICAgICB9IGVsc2UgaWYgKHF1b3RlID09PSBDaGFyLlF1b3RlU2luZ2xlICYmIHZhbHVlLmNoYXJDb2RlQXQoaSAtIDEpICE9PSBDaGFyLkJhY2tTbGFzaCkge1xuICAgICAgICAgIHF1b3RlID0gQ2hhci5RdW90ZU5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENoYXIuUXVvdGVEb3VibGU6XG4gICAgICAgIC8vIHNhbWUgbG9naWMgYXMgYWJvdmVcbiAgICAgICAgdmFsdWVIYXNRdW90ZXMgPSB2YWx1ZUhhc1F1b3RlcyB8fCB2YWx1ZVN0YXJ0ID4gMDtcbiAgICAgICAgaWYgKHF1b3RlID09PSBDaGFyLlF1b3RlTm9uZSkge1xuICAgICAgICAgIHF1b3RlID0gQ2hhci5RdW90ZURvdWJsZTtcbiAgICAgICAgfSBlbHNlIGlmIChxdW90ZSA9PT0gQ2hhci5RdW90ZURvdWJsZSAmJiB2YWx1ZS5jaGFyQ29kZUF0KGkgLSAxKSAhPT0gQ2hhci5CYWNrU2xhc2gpIHtcbiAgICAgICAgICBxdW90ZSA9IENoYXIuUXVvdGVOb25lO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDaGFyLkNvbG9uOlxuICAgICAgICBpZiAoIWN1cnJlbnRQcm9wICYmIHBhcmVuRGVwdGggPT09IDAgJiYgcXVvdGUgPT09IENoYXIuUXVvdGVOb25lKSB7XG4gICAgICAgICAgY3VycmVudFByb3AgPSBoeXBoZW5hdGUodmFsdWUuc3Vic3RyaW5nKHByb3BTdGFydCwgaSAtIDEpLnRyaW0oKSk7XG4gICAgICAgICAgdmFsdWVTdGFydCA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENoYXIuU2VtaWNvbG9uOlxuICAgICAgICBpZiAoY3VycmVudFByb3AgJiYgdmFsdWVTdGFydCA+IDAgJiYgcGFyZW5EZXB0aCA9PT0gMCAmJiBxdW90ZSA9PT0gQ2hhci5RdW90ZU5vbmUpIHtcbiAgICAgICAgICBjb25zdCBzdHlsZVZhbCA9IHZhbHVlLnN1YnN0cmluZyh2YWx1ZVN0YXJ0LCBpIC0gMSkudHJpbSgpO1xuICAgICAgICAgIHN0eWxlcy5wdXNoKGN1cnJlbnRQcm9wLCB2YWx1ZUhhc1F1b3RlcyA/IHN0cmlwVW5uZWNlc3NhcnlRdW90ZXMoc3R5bGVWYWwpIDogc3R5bGVWYWwpO1xuICAgICAgICAgIHByb3BTdGFydCA9IGk7XG4gICAgICAgICAgdmFsdWVTdGFydCA9IDA7XG4gICAgICAgICAgY3VycmVudFByb3AgPSBudWxsO1xuICAgICAgICAgIHZhbHVlSGFzUXVvdGVzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGN1cnJlbnRQcm9wICYmIHZhbHVlU3RhcnQpIHtcbiAgICBjb25zdCBzdHlsZVZhbCA9IHZhbHVlLnNsaWNlKHZhbHVlU3RhcnQpLnRyaW0oKTtcbiAgICBzdHlsZXMucHVzaChjdXJyZW50UHJvcCwgdmFsdWVIYXNRdW90ZXMgPyBzdHJpcFVubmVjZXNzYXJ5UXVvdGVzKHN0eWxlVmFsKSA6IHN0eWxlVmFsKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcFVubmVjZXNzYXJ5UXVvdGVzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBxUyA9IHZhbHVlLmNoYXJDb2RlQXQoMCk7XG4gIGNvbnN0IHFFID0gdmFsdWUuY2hhckNvZGVBdCh2YWx1ZS5sZW5ndGggLSAxKTtcbiAgaWYgKHFTID09IHFFICYmIChxUyA9PSBDaGFyLlF1b3RlU2luZ2xlIHx8IHFTID09IENoYXIuUXVvdGVEb3VibGUpKSB7XG4gICAgY29uc3QgdGVtcFZhbHVlID0gdmFsdWUuc3Vic3RyaW5nKDEsIHZhbHVlLmxlbmd0aCAtIDEpO1xuICAgIC8vIHNwZWNpYWwgY2FzZSB0byBhdm9pZCB1c2luZyBhIG11bHRpLXF1b3RlZCBzdHJpbmcgdGhhdCB3YXMganVzdCBjaG9tcGVkXG4gICAgLy8gKGUuZy4gYGZvbnQtZmFtaWx5OiBcIlZlcmRhbmFcIiwgXCJzYW5zLXNlcmlmXCJgKVxuICAgIGlmICh0ZW1wVmFsdWUuaW5kZXhPZignXFwnJykgPT0gLTEgJiYgdGVtcFZhbHVlLmluZGV4T2YoJ1wiJykgPT0gLTEpIHtcbiAgICAgIHZhbHVlID0gdGVtcFZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoeXBoZW5hdGUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZVxuICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgL1thLXpdW0EtWl0vZyxcbiAgICAgICAgICB2ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2LmNoYXJBdCgwKSArICctJyArIHYuY2hhckF0KDEpO1xuICAgICAgICAgIH0pXG4gICAgICAudG9Mb3dlckNhc2UoKTtcbn1cbiJdfQ==