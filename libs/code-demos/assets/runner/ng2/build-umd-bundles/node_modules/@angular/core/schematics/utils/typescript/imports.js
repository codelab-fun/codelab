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
        define("@angular/core/schematics/utils/typescript/imports", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findImportSpecifier = exports.removeSymbolFromNamedImports = exports.replaceImport = exports.getImportSpecifier = exports.getImportOfIdentifier = void 0;
    const typescript_1 = __importDefault(require("typescript"));
    /** Gets import information about the specified identifier by using the Type checker. */
    function getImportOfIdentifier(typeChecker, node) {
        const symbol = typeChecker.getSymbolAtLocation(node);
        if (!symbol || symbol.declarations === undefined || !symbol.declarations.length) {
            return null;
        }
        const decl = symbol.declarations[0];
        if (!typescript_1.default.isImportSpecifier(decl)) {
            return null;
        }
        const importDecl = decl.parent.parent.parent;
        if (!typescript_1.default.isStringLiteral(importDecl.moduleSpecifier)) {
            return null;
        }
        return {
            // Handles aliased imports: e.g. "import {Component as myComp} from ...";
            name: decl.propertyName ? decl.propertyName.text : decl.name.text,
            importModule: importDecl.moduleSpecifier.text,
            node: importDecl
        };
    }
    exports.getImportOfIdentifier = getImportOfIdentifier;
    /**
     * Gets a top-level import specifier with a specific name that is imported from a particular module.
     * E.g. given a file that looks like:
     *
     * ```
     * import { Component, Directive } from '@angular/core';
     * import { Foo } from './foo';
     * ```
     *
     * Calling `getImportSpecifier(sourceFile, '@angular/core', 'Directive')` will yield the node
     * referring to `Directive` in the top import.
     *
     * @param sourceFile File in which to look for imports.
     * @param moduleName Name of the import's module.
     * @param specifierName Original name of the specifier to look for. Aliases will be resolved to
     *    their original name.
     */
    function getImportSpecifier(sourceFile, moduleName, specifierName) {
        for (const node of sourceFile.statements) {
            if (typescript_1.default.isImportDeclaration(node) && typescript_1.default.isStringLiteral(node.moduleSpecifier) &&
                node.moduleSpecifier.text === moduleName) {
                const namedBindings = node.importClause && node.importClause.namedBindings;
                if (namedBindings && typescript_1.default.isNamedImports(namedBindings)) {
                    const match = findImportSpecifier(namedBindings.elements, specifierName);
                    if (match) {
                        return match;
                    }
                }
            }
        }
        return null;
    }
    exports.getImportSpecifier = getImportSpecifier;
    /**
     * Replaces an import inside a named imports node with a different one.
     *
     * @param node Node that contains the imports.
     * @param existingImport Import that should be replaced.
     * @param newImportName Import that should be inserted.
     */
    function replaceImport(node, existingImport, newImportName) {
        const isAlreadyImported = findImportSpecifier(node.elements, newImportName);
        if (isAlreadyImported) {
            return node;
        }
        const existingImportNode = findImportSpecifier(node.elements, existingImport);
        if (!existingImportNode) {
            return node;
        }
        const importPropertyName = existingImportNode.propertyName ? typescript_1.default.factory.createIdentifier(newImportName) : undefined;
        const importName = existingImportNode.propertyName ? existingImportNode.name :
            typescript_1.default.factory.createIdentifier(newImportName);
        return typescript_1.default.factory.updateNamedImports(node, [
            ...node.elements.filter(current => current !== existingImportNode),
            // Create a new import while trying to preserve the alias of the old one.
            typescript_1.default.factory.createImportSpecifier(false, importPropertyName, importName)
        ]);
    }
    exports.replaceImport = replaceImport;
    /**
     * Removes a symbol from the named imports and updates a node
     * that represents a given named imports.
     *
     * @param node Node that contains the imports.
     * @param symbol Symbol that should be removed.
     * @returns An updated node (ts.NamedImports).
     */
    function removeSymbolFromNamedImports(node, symbol) {
        return typescript_1.default.factory.updateNamedImports(node, [
            ...node.elements.filter(current => current !== symbol),
        ]);
    }
    exports.removeSymbolFromNamedImports = removeSymbolFromNamedImports;
    /** Finds an import specifier with a particular name. */
    function findImportSpecifier(nodes, specifierName) {
        return nodes.find(element => {
            const { name, propertyName } = element;
            return propertyName ? propertyName.text === specifierName : name.text === specifierName;
        });
    }
    exports.findImportSpecifier = findImportSpecifier;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc2NoZW1hdGljcy91dGlscy90eXBlc2NyaXB0L2ltcG9ydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7O0lBRUgsNERBQTRCO0lBUTVCLHdGQUF3RjtJQUN4RixTQUFnQixxQkFBcUIsQ0FBQyxXQUEyQixFQUFFLElBQW1CO1FBRXBGLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDL0UsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLG9CQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUU3QyxJQUFJLENBQUMsb0JBQUUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ25ELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPO1lBQ0wseUVBQXlFO1lBQ3pFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ2pFLFlBQVksRUFBRSxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUk7WUFDN0MsSUFB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QyxHQUFHLE9BQU8sQ0FBQztZQUNyQyxPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDO1FBQzFGLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQU5ELGtEQU1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuZXhwb3J0IHR5cGUgSW1wb3J0ID0ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGltcG9ydE1vZHVsZTogc3RyaW5nLFxuICBub2RlOiB0cy5JbXBvcnREZWNsYXJhdGlvblxufTtcblxuLyoqIEdldHMgaW1wb3J0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBzcGVjaWZpZWQgaWRlbnRpZmllciBieSB1c2luZyB0aGUgVHlwZSBjaGVja2VyLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEltcG9ydE9mSWRlbnRpZmllcih0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIsIG5vZGU6IHRzLklkZW50aWZpZXIpOiBJbXBvcnR8XG4gICAgbnVsbCB7XG4gIGNvbnN0IHN5bWJvbCA9IHR5cGVDaGVja2VyLmdldFN5bWJvbEF0TG9jYXRpb24obm9kZSk7XG5cbiAgaWYgKCFzeW1ib2wgfHwgc3ltYm9sLmRlY2xhcmF0aW9ucyA9PT0gdW5kZWZpbmVkIHx8ICFzeW1ib2wuZGVjbGFyYXRpb25zLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgZGVjbCA9IHN5bWJvbC5kZWNsYXJhdGlvbnNbMF07XG5cbiAgaWYgKCF0cy5pc0ltcG9ydFNwZWNpZmllcihkZWNsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgaW1wb3J0RGVjbCA9IGRlY2wucGFyZW50LnBhcmVudC5wYXJlbnQ7XG5cbiAgaWYgKCF0cy5pc1N0cmluZ0xpdGVyYWwoaW1wb3J0RGVjbC5tb2R1bGVTcGVjaWZpZXIpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC8vIEhhbmRsZXMgYWxpYXNlZCBpbXBvcnRzOiBlLmcuIFwiaW1wb3J0IHtDb21wb25lbnQgYXMgbXlDb21wfSBmcm9tIC4uLlwiO1xuICAgIG5hbWU6IGRlY2wucHJvcGVydHlOYW1lID8gZGVjbC5wcm9wZXJ0eU5hbWUudGV4dCA6IGRlY2wubmFtZS50ZXh0LFxuICAgIGltcG9ydE1vZHVsZTogaW1wb3J0RGVjbC5tb2R1bGVTcGVjaWZpZXIudGV4dCxcbiAgICBub2RlOiBpbXBvcnREZWNsXG4gIH07XG59XG5cblxuLyoqXG4gKiBHZXRzIGEgdG9wLWxldmVsIGltcG9ydCBzcGVjaWZpZXIgd2l0aCBhIHNwZWNpZmljIG5hbWUgdGhhdCBpcyBpbXBvcnRlZCBmcm9tIGEgcGFydGljdWxhciBtb2R1bGUuXG4gKiBFLmcuIGdpdmVuIGEgZmlsZSB0aGF0IGxvb2tzIGxpa2U6XG4gKlxuICogYGBgXG4gKiBpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHsgRm9vIH0gZnJvbSAnLi9mb28nO1xuICogYGBgXG4gKlxuICogQ2FsbGluZyBgZ2V0SW1wb3J0U3BlY2lmaWVyKHNvdXJjZUZpbGUsICdAYW5ndWxhci9jb3JlJywgJ0RpcmVjdGl2ZScpYCB3aWxsIHlpZWxkIHRoZSBub2RlXG4gKiByZWZlcnJpbmcgdG8gYERpcmVjdGl2ZWAgaW4gdGhlIHRvcCBpbXBvcnQuXG4gKlxuICogQHBhcmFtIHNvdXJjZUZpbGUgRmlsZSBpbiB3aGljaCB0byBsb29rIGZvciBpbXBvcnRzLlxuICogQHBhcmFtIG1vZHVsZU5hbWUgTmFtZSBvZiB0aGUgaW1wb3J0J3MgbW9kdWxlLlxuICogQHBhcmFtIHNwZWNpZmllck5hbWUgT3JpZ2luYWwgbmFtZSBvZiB0aGUgc3BlY2lmaWVyIHRvIGxvb2sgZm9yLiBBbGlhc2VzIHdpbGwgYmUgcmVzb2x2ZWQgdG9cbiAqICAgIHRoZWlyIG9yaWdpbmFsIG5hbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbXBvcnRTcGVjaWZpZXIoXG4gICAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgbW9kdWxlTmFtZTogc3RyaW5nLCBzcGVjaWZpZXJOYW1lOiBzdHJpbmcpOiB0cy5JbXBvcnRTcGVjaWZpZXJ8bnVsbCB7XG4gIGZvciAoY29uc3Qgbm9kZSBvZiBzb3VyY2VGaWxlLnN0YXRlbWVudHMpIHtcbiAgICBpZiAodHMuaXNJbXBvcnREZWNsYXJhdGlvbihub2RlKSAmJiB0cy5pc1N0cmluZ0xpdGVyYWwobm9kZS5tb2R1bGVTcGVjaWZpZXIpICYmXG4gICAgICAgIG5vZGUubW9kdWxlU3BlY2lmaWVyLnRleHQgPT09IG1vZHVsZU5hbWUpIHtcbiAgICAgIGNvbnN0IG5hbWVkQmluZGluZ3MgPSBub2RlLmltcG9ydENsYXVzZSAmJiBub2RlLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzO1xuICAgICAgaWYgKG5hbWVkQmluZGluZ3MgJiYgdHMuaXNOYW1lZEltcG9ydHMobmFtZWRCaW5kaW5ncykpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBmaW5kSW1wb3J0U3BlY2lmaWVyKG5hbWVkQmluZGluZ3MuZWxlbWVudHMsIHNwZWNpZmllck5hbWUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuXG4vKipcbiAqIFJlcGxhY2VzIGFuIGltcG9ydCBpbnNpZGUgYSBuYW1lZCBpbXBvcnRzIG5vZGUgd2l0aCBhIGRpZmZlcmVudCBvbmUuXG4gKlxuICogQHBhcmFtIG5vZGUgTm9kZSB0aGF0IGNvbnRhaW5zIHRoZSBpbXBvcnRzLlxuICogQHBhcmFtIGV4aXN0aW5nSW1wb3J0IEltcG9ydCB0aGF0IHNob3VsZCBiZSByZXBsYWNlZC5cbiAqIEBwYXJhbSBuZXdJbXBvcnROYW1lIEltcG9ydCB0aGF0IHNob3VsZCBiZSBpbnNlcnRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VJbXBvcnQoXG4gICAgbm9kZTogdHMuTmFtZWRJbXBvcnRzLCBleGlzdGluZ0ltcG9ydDogc3RyaW5nLCBuZXdJbXBvcnROYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgaXNBbHJlYWR5SW1wb3J0ZWQgPSBmaW5kSW1wb3J0U3BlY2lmaWVyKG5vZGUuZWxlbWVudHMsIG5ld0ltcG9ydE5hbWUpO1xuICBpZiAoaXNBbHJlYWR5SW1wb3J0ZWQpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNvbnN0IGV4aXN0aW5nSW1wb3J0Tm9kZSA9IGZpbmRJbXBvcnRTcGVjaWZpZXIobm9kZS5lbGVtZW50cywgZXhpc3RpbmdJbXBvcnQpO1xuICBpZiAoIWV4aXN0aW5nSW1wb3J0Tm9kZSkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgY29uc3QgaW1wb3J0UHJvcGVydHlOYW1lID1cbiAgICAgIGV4aXN0aW5nSW1wb3J0Tm9kZS5wcm9wZXJ0eU5hbWUgPyB0cy5mYWN0b3J5LmNyZWF0ZUlkZW50aWZpZXIobmV3SW1wb3J0TmFtZSkgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGltcG9ydE5hbWUgPSBleGlzdGluZ0ltcG9ydE5vZGUucHJvcGVydHlOYW1lID8gZXhpc3RpbmdJbXBvcnROb2RlLm5hbWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRzLmZhY3RvcnkuY3JlYXRlSWRlbnRpZmllcihuZXdJbXBvcnROYW1lKTtcblxuICByZXR1cm4gdHMuZmFjdG9yeS51cGRhdGVOYW1lZEltcG9ydHMobm9kZSwgW1xuICAgIC4uLm5vZGUuZWxlbWVudHMuZmlsdGVyKGN1cnJlbnQgPT4gY3VycmVudCAhPT0gZXhpc3RpbmdJbXBvcnROb2RlKSxcbiAgICAvLyBDcmVhdGUgYSBuZXcgaW1wb3J0IHdoaWxlIHRyeWluZyB0byBwcmVzZXJ2ZSB0aGUgYWxpYXMgb2YgdGhlIG9sZCBvbmUuXG4gICAgdHMuZmFjdG9yeS5jcmVhdGVJbXBvcnRTcGVjaWZpZXIoZmFsc2UsIGltcG9ydFByb3BlcnR5TmFtZSwgaW1wb3J0TmFtZSlcbiAgXSk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIHN5bWJvbCBmcm9tIHRoZSBuYW1lZCBpbXBvcnRzIGFuZCB1cGRhdGVzIGEgbm9kZVxuICogdGhhdCByZXByZXNlbnRzIGEgZ2l2ZW4gbmFtZWQgaW1wb3J0cy5cbiAqXG4gKiBAcGFyYW0gbm9kZSBOb2RlIHRoYXQgY29udGFpbnMgdGhlIGltcG9ydHMuXG4gKiBAcGFyYW0gc3ltYm9sIFN5bWJvbCB0aGF0IHNob3VsZCBiZSByZW1vdmVkLlxuICogQHJldHVybnMgQW4gdXBkYXRlZCBub2RlICh0cy5OYW1lZEltcG9ydHMpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlU3ltYm9sRnJvbU5hbWVkSW1wb3J0cyhub2RlOiB0cy5OYW1lZEltcG9ydHMsIHN5bWJvbDogdHMuSW1wb3J0U3BlY2lmaWVyKSB7XG4gIHJldHVybiB0cy5mYWN0b3J5LnVwZGF0ZU5hbWVkSW1wb3J0cyhub2RlLCBbXG4gICAgLi4ubm9kZS5lbGVtZW50cy5maWx0ZXIoY3VycmVudCA9PiBjdXJyZW50ICE9PSBzeW1ib2wpLFxuICBdKTtcbn1cblxuLyoqIEZpbmRzIGFuIGltcG9ydCBzcGVjaWZpZXIgd2l0aCBhIHBhcnRpY3VsYXIgbmFtZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kSW1wb3J0U3BlY2lmaWVyKFxuICAgIG5vZGVzOiB0cy5Ob2RlQXJyYXk8dHMuSW1wb3J0U3BlY2lmaWVyPiwgc3BlY2lmaWVyTmFtZTogc3RyaW5nKTogdHMuSW1wb3J0U3BlY2lmaWVyfHVuZGVmaW5lZCB7XG4gIHJldHVybiBub2Rlcy5maW5kKGVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IHtuYW1lLCBwcm9wZXJ0eU5hbWV9ID0gZWxlbWVudDtcbiAgICByZXR1cm4gcHJvcGVydHlOYW1lID8gcHJvcGVydHlOYW1lLnRleHQgPT09IHNwZWNpZmllck5hbWUgOiBuYW1lLnRleHQgPT09IHNwZWNpZmllck5hbWU7XG4gIH0pO1xufVxuIl19