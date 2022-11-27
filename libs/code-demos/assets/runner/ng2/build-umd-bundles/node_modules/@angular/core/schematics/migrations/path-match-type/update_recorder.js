/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/core/schematics/migrations/path-match-type/update_recorder", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlX3JlY29yZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zY2hlbWF0aWNzL21pZ3JhdGlvbnMvcGF0aC1tYXRjaC10eXBlL3VwZGF0ZV9yZWNvcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge0ltcG9ydE1hbmFnZXJVcGRhdGVSZWNvcmRlcn0gZnJvbSAnLi4vLi4vdXRpbHMvaW1wb3J0X21hbmFnZXInO1xuXG4vKipcbiAqIFVwZGF0ZSByZWNvcmRlciBpbnRlcmZhY2UgdGhhdCBpcyB1c2VkIHRvIHRyYW5zZm9ybSBzb3VyY2UgZmlsZXNcbiAqIGluIGEgbm9uLWNvbGxpZGluZyB3YXkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlUmVjb3JkZXIgZXh0ZW5kcyBJbXBvcnRNYW5hZ2VyVXBkYXRlUmVjb3JkZXIge1xuICB1cGRhdGVOb2RlKFxuICAgICAgb2xkTm9kZTogdHMuVmFyaWFibGVEZWNsYXJhdGlvbiwgbmV3Tm9kZTogdHMuVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgICAgIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiB2b2lkO1xuICBjb21taXRVcGRhdGUoKTogdm9pZDtcbn1cbiJdfQ==