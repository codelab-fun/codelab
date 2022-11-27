/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/core/schematics/migrations/path-match-type/transform", ["require", "exports", "typescript", "@angular/core/schematics/utils/import_manager", "@angular/core/schematics/migrations/path-match-type/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PathMatchTypeTransform = void 0;
    const typescript_1 = __importDefault(require("typescript"));
    const import_manager_1 = require("@angular/core/schematics/utils/import_manager");
    const util_1 = require("@angular/core/schematics/migrations/path-match-type/util");
    class PathMatchTypeTransform {
        constructor(getUpdateRecorder) {
            this.getUpdateRecorder = getUpdateRecorder;
            this.printer = typescript_1.default.createPrinter();
            this.importManager = new import_manager_1.ImportManager(this.getUpdateRecorder, this.printer);
        }
        migrate(sourceFiles) {
            for (const sourceFile of sourceFiles) {
                const toMigrate = (0, util_1.findExpressionsToMigrate)(sourceFile, this.importManager);
                const recorder = this.getUpdateRecorder(sourceFile);
                for (const [oldNode, newNode] of toMigrate) {
                    recorder.updateNode(oldNode, newNode, sourceFile);
                }
            }
        }
        /** Records all changes that were made in the import manager. */
        recordChanges() {
            this.importManager.recordChanges();
        }
    }
    exports.PathMatchTypeTransform = PathMatchTypeTransform;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zY2hlbWF0aWNzL21pZ3JhdGlvbnMvcGF0aC1tYXRjaC10eXBlL3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFSCw0REFBNEI7SUFFNUIsa0ZBQXlEO0lBR3pELG1GQUFnRDtJQUdoRCxNQUFhLHNCQUFzQjtRQUlqQyxZQUFvQixpQkFBd0Q7WUFBeEQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QztZQUhwRSxZQUFPLEdBQUcsb0JBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM3QixrQkFBYSxHQUFHLElBQUksOEJBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRUQsQ0FBQztRQUVoRixPQUFPLENBQUMsV0FBNEI7WUFDbEMsS0FBSyxNQUFNLFVBQVUsSUFBSSxXQUFXLEVBQUU7Z0JBQ3BDLE1BQU0sU0FBUyxHQUFHLElBQUEsK0JBQXdCLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0UsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRCxLQUFLLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksU0FBUyxFQUFFO29CQUMxQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ25EO2FBQ0Y7UUFDSCxDQUFDO1FBQ0QsZ0VBQWdFO1FBQ2hFLGFBQWE7WUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JDLENBQUM7S0FDRjtJQW5CRCx3REFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge0ltcG9ydE1hbmFnZXJ9IGZyb20gJy4uLy4uL3V0aWxzL2ltcG9ydF9tYW5hZ2VyJztcblxuaW1wb3J0IHtVcGRhdGVSZWNvcmRlcn0gZnJvbSAnLi91cGRhdGVfcmVjb3JkZXInO1xuaW1wb3J0IHtmaW5kRXhwcmVzc2lvbnNUb01pZ3JhdGV9IGZyb20gJy4vdXRpbCc7XG5cblxuZXhwb3J0IGNsYXNzIFBhdGhNYXRjaFR5cGVUcmFuc2Zvcm0ge1xuICBwcml2YXRlIHByaW50ZXIgPSB0cy5jcmVhdGVQcmludGVyKCk7XG4gIHByaXZhdGUgaW1wb3J0TWFuYWdlciA9IG5ldyBJbXBvcnRNYW5hZ2VyKHRoaXMuZ2V0VXBkYXRlUmVjb3JkZXIsIHRoaXMucHJpbnRlcik7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBnZXRVcGRhdGVSZWNvcmRlcjogKHNmOiB0cy5Tb3VyY2VGaWxlKSA9PiBVcGRhdGVSZWNvcmRlcikge31cblxuICBtaWdyYXRlKHNvdXJjZUZpbGVzOiB0cy5Tb3VyY2VGaWxlW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHNvdXJjZUZpbGUgb2Ygc291cmNlRmlsZXMpIHtcbiAgICAgIGNvbnN0IHRvTWlncmF0ZSA9IGZpbmRFeHByZXNzaW9uc1RvTWlncmF0ZShzb3VyY2VGaWxlLCB0aGlzLmltcG9ydE1hbmFnZXIpO1xuICAgICAgY29uc3QgcmVjb3JkZXIgPSB0aGlzLmdldFVwZGF0ZVJlY29yZGVyKHNvdXJjZUZpbGUpO1xuICAgICAgZm9yIChjb25zdCBbb2xkTm9kZSwgbmV3Tm9kZV0gb2YgdG9NaWdyYXRlKSB7XG4gICAgICAgIHJlY29yZGVyLnVwZGF0ZU5vZGUob2xkTm9kZSwgbmV3Tm9kZSwgc291cmNlRmlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKiBSZWNvcmRzIGFsbCBjaGFuZ2VzIHRoYXQgd2VyZSBtYWRlIGluIHRoZSBpbXBvcnQgbWFuYWdlci4gKi9cbiAgcmVjb3JkQ2hhbmdlcygpIHtcbiAgICB0aGlzLmltcG9ydE1hbmFnZXIucmVjb3JkQ2hhbmdlcygpO1xuICB9XG59XG4iXX0=