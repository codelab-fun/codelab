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
        define("@angular/core/schematics/migrations/typed-forms/util", ["require", "exports", "typescript", "@angular/core/schematics/utils/typescript/imports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.migrateFile = exports.forms = exports.untypedPrefix = exports.formControl = exports.classes = void 0;
    const typescript_1 = __importDefault(require("typescript"));
    const imports_1 = require("@angular/core/schematics/utils/typescript/imports");
    exports.classes = new Set(['FormArray', 'FormBuilder', 'FormControl', 'FormGroup']);
    exports.formControl = 'FormControl';
    exports.untypedPrefix = 'Untyped';
    exports.forms = '@angular/forms';
    function migrateFile(sourceFile, typeChecker, rewrite) {
        const imports = getImports(sourceFile);
        // If no relevant classes are imported, we can exit early.
        if (imports.length === 0)
            return;
        // For each control class, migrate all of its uses.
        for (let i = imports.length; i >= 0; i--) {
            const imp = imports[i];
            const usages = getUsages(sourceFile, typeChecker, imp);
            if (usages.length === 0) {
                // Since there are no usages of this class we need to migrate it, we should completely
                // skip it for the subsequent migration steps.
                imports.splice(i, 1);
            }
            for (const usage of usages) {
                const newName = getUntypedVersionOfImportOrName(usage.importName);
                if (newName === null) {
                    // This should never happen.
                    console.error(`Typed forms migration error: unknown replacement for usage ${usage.node.getText()}`);
                    continue;
                }
                rewrite(usage.node.getStart(), usage.node.getWidth(), newName);
            }
        }
        // For each imported control class, migrate to the corresponding uptyped import.
        for (const imp of imports) {
            const untypedClass = getUntypedVersionOfImportOrName(imp.getText());
            if (untypedClass === null) {
                // This should never happen.
                console.error(`Typed forms migration error: unknown untyped version of import ${imp.getText()}`);
                continue;
            }
            if ((0, imports_1.getImportSpecifier)(sourceFile, exports.forms, untypedClass)) {
                // In order to make the migration idempotent, we must check whether the untyped version of the
                // class is already present. If present, immediately continue.
                continue;
            }
            rewrite(imp.getStart(), imp.getWidth(), untypedClass);
        }
    }
    exports.migrateFile = migrateFile;
    function getImports(sourceFile) {
        let imports = [];
        for (const cc of exports.classes) {
            const specifier = (0, imports_1.getImportSpecifier)(sourceFile, exports.forms, cc);
            if (!specifier)
                continue;
            imports.push(specifier);
        }
        return imports;
    }
    function getUntypedVersionOfImportOrName(name) {
        for (const cc of exports.classes) {
            if (name.includes(cc)) {
                return `${exports.untypedPrefix}${cc}`;
            }
        }
        return null;
    }
    function getUsages(sourceFile, typeChecker, importSpecifier) {
        const usages = [];
        const visitNode = (node) => {
            if (typescript_1.default.isImportSpecifier(node)) {
                // Skip this node and all of its children; imports are a special case.
                return;
            }
            if (typescript_1.default.isIdentifier(node) && isUsageOfFormsImport(typeChecker, node, importSpecifier)) {
                usages.push({ node, importName: importSpecifier.getText() });
            }
            typescript_1.default.forEachChild(node, visitNode);
        };
        typescript_1.default.forEachChild(sourceFile, visitNode);
        return usages;
    }
    function isUsageOfFormsImport(typeChecker, node, importSpecifier) {
        var _a, _b;
        const symbol = typeChecker.getSymbolAtLocation(node);
        // We check symbol.declarations because we actually care about the name at the declaration site,
        // not the usage site. These could be different in the case of overridden constructors.
        if (!symbol || symbol.declarations === undefined || !symbol.declarations.length)
            return false;
        const decl = symbol.declarations[0];
        if (!typescript_1.default.isImportSpecifier(decl))
            return false;
        // As per `typescript/imports.ts`, we must walk up the tree to find the enclosing import
        // declaration. For reasons specific to the TS AST, this is always 3 levels up from an import
        // specifier node.
        const importDecl = decl.parent.parent.parent;
        if (!typescript_1.default.isStringLiteral(importDecl.moduleSpecifier))
            return false;
        const importName = (_b = (_a = typeChecker.getTypeAtLocation(importSpecifier)) === null || _a === void 0 ? void 0 : _a.getSymbol()) === null || _b === void 0 ? void 0 : _b.getName();
        if (!importName)
            return false;
        // Handles aliased imports: e.g. "import {Component as myComp} from ...";
        const declName = decl.propertyName ? decl.propertyName.text : decl.name.text;
        if (importName === declName)
            return true;
        // In the case of FormControl's overridden exported constructor, the value name and declaration
        // name are not exactly the same. For our purposes, it's enough to check whether the latter is a
        // substring of the former.
        if (declName === exports.formControl && importName.includes(declName))
            return true;
        return false;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc2NoZW1hdGljcy9taWdyYXRpb25zL3R5cGVkLWZvcm1zL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7O0lBRUgsNERBQTRCO0lBRTVCLCtFQUFrRTtJQUVyRCxRQUFBLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDNUUsUUFBQSxXQUFXLEdBQUcsYUFBYSxDQUFDO0lBQzVCLFFBQUEsYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUMxQixRQUFBLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztJQVN0QyxTQUFnQixXQUFXLENBQ3ZCLFVBQXlCLEVBQUUsV0FBMkIsRUFBRSxPQUFrQjtRQUM1RSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkMsMERBQTBEO1FBQzFELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTztRQUVqQyxtREFBbUQ7UUFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLHNGQUFzRjtnQkFDdEYsOENBQThDO2dCQUM5QyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN0QjtZQUNELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO2dCQUMxQixNQUFNLE9BQU8sR0FBRywrQkFBK0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2xFLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtvQkFDcEIsNEJBQTRCO29CQUM1QixPQUFPLENBQUMsS0FBSyxDQUNULDhEQUE4RCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDMUYsU0FBUztpQkFDVjtnQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2hFO1NBQ0Y7UUFFRCxnRkFBZ0Y7UUFDaEYsS0FBSyxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUU7WUFDekIsTUFBTSxZQUFZLEdBQUcsK0JBQStCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFO2dCQUN6Qiw0QkFBNEI7Z0JBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQ1Qsa0VBQWtFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZGLFNBQVM7YUFDVjtZQUNELElBQUksSUFBQSw0QkFBa0IsRUFBQyxVQUFVLEVBQUUsYUFBSyxFQUFFLFlBQVksQ0FBQyxFQUFFO2dCQUN2RCw4RkFBOEY7Z0JBQzlGLDhEQUE4RDtnQkFDOUQsU0FBUzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0lBNUNELGtDQTRDQztJQUVELFNBQVMsVUFBVSxDQUFDLFVBQXlCO1FBQzNDLElBQUksT0FBTyxHQUF5QixFQUFFLENBQUM7UUFDdkMsS0FBSyxNQUFNLEVBQUUsSUFBSSxlQUFPLEVBQUU7WUFDeEIsTUFBTSxTQUFTLEdBQUcsSUFBQSw0QkFBa0IsRUFBQyxVQUFVLEVBQUUsYUFBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxTQUFTO2dCQUFFLFNBQVM7WUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN6QjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxTQUFTLCtCQUErQixDQUFDLElBQVk7UUFDbkQsS0FBSyxNQUFNLEVBQUUsSUFBSSxlQUFPLEVBQUU7WUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNyQixPQUFPLEdBQUcscUJBQWEsR0FBRyxFQUFFLEVBQUUsQ0FBQzthQUNoQztTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsU0FBUyxTQUFTLENBQ2QsVUFBeUIsRUFBRSxXQUEyQixFQUN0RCxlQUFtQztRQUNyQyxNQUFNLE1BQU0sR0FBcUIsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBYSxFQUFFLEVBQUU7WUFDbEMsSUFBSSxvQkFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixzRUFBc0U7Z0JBQ3RFLE9BQU87YUFDUjtZQUNELElBQUksb0JBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQW9CLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxlQUFlLENBQUMsRUFBRTtnQkFDckYsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLE9BQU8sRUFBRSxFQUFDLENBQUMsQ0FBQzthQUM1RDtZQUNELG9CQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUM7UUFDRixvQkFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVMsb0JBQW9CLENBQ3pCLFdBQTJCLEVBQUUsSUFBbUIsRUFDaEQsZUFBbUM7O1FBQ3JDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxnR0FBZ0c7UUFDaEcsdUZBQXVGO1FBQ3ZGLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxTQUFTLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU07WUFBRSxPQUFPLEtBQUssQ0FBQztRQUU5RixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxvQkFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRTlDLHdGQUF3RjtRQUN4Riw2RkFBNkY7UUFDN0Ysa0JBQWtCO1FBQ2xCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM3QyxJQUFJLENBQUMsb0JBQUUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRWxFLE1BQU0sVUFBVSxHQUFHLE1BQUEsTUFBQSxXQUFXLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLDBDQUFFLFNBQVMsRUFBRSwwQ0FBRSxPQUFPLEVBQUUsQ0FBQztRQUMxRixJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRTlCLHlFQUF5RTtRQUN6RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFN0UsSUFBSSxVQUFVLEtBQUssUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXpDLCtGQUErRjtRQUMvRixnR0FBZ0c7UUFDaEcsMkJBQTJCO1FBQzNCLElBQUksUUFBUSxLQUFLLG1CQUFXLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUUzRSxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge2dldEltcG9ydFNwZWNpZmllcn0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXNjcmlwdC9pbXBvcnRzJztcblxuZXhwb3J0IGNvbnN0IGNsYXNzZXMgPSBuZXcgU2V0KFsnRm9ybUFycmF5JywgJ0Zvcm1CdWlsZGVyJywgJ0Zvcm1Db250cm9sJywgJ0Zvcm1Hcm91cCddKTtcbmV4cG9ydCBjb25zdCBmb3JtQ29udHJvbCA9ICdGb3JtQ29udHJvbCc7XG5leHBvcnQgY29uc3QgdW50eXBlZFByZWZpeCA9ICdVbnR5cGVkJztcbmV4cG9ydCBjb25zdCBmb3JtcyA9ICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWlncmF0YWJsZU5vZGUge1xuICBub2RlOiB0cy5Ob2RlO1xuICBpbXBvcnROYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIHJld3JpdGVGbiA9IChzdGFydFBvczogbnVtYmVyLCBvcmlnTGVuZ3RoOiBudW1iZXIsIHRleHQ6IHN0cmluZykgPT4gdm9pZDtcblxuZXhwb3J0IGZ1bmN0aW9uIG1pZ3JhdGVGaWxlKFxuICAgIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlciwgcmV3cml0ZTogcmV3cml0ZUZuKSB7XG4gIGNvbnN0IGltcG9ydHMgPSBnZXRJbXBvcnRzKHNvdXJjZUZpbGUpO1xuXG4gIC8vIElmIG5vIHJlbGV2YW50IGNsYXNzZXMgYXJlIGltcG9ydGVkLCB3ZSBjYW4gZXhpdCBlYXJseS5cbiAgaWYgKGltcG9ydHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgLy8gRm9yIGVhY2ggY29udHJvbCBjbGFzcywgbWlncmF0ZSBhbGwgb2YgaXRzIHVzZXMuXG4gIGZvciAobGV0IGkgPSBpbXBvcnRzLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICBjb25zdCBpbXAgPSBpbXBvcnRzW2ldO1xuICAgIGNvbnN0IHVzYWdlcyA9IGdldFVzYWdlcyhzb3VyY2VGaWxlLCB0eXBlQ2hlY2tlciwgaW1wKTtcbiAgICBpZiAodXNhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gU2luY2UgdGhlcmUgYXJlIG5vIHVzYWdlcyBvZiB0aGlzIGNsYXNzIHdlIG5lZWQgdG8gbWlncmF0ZSBpdCwgd2Ugc2hvdWxkIGNvbXBsZXRlbHlcbiAgICAgIC8vIHNraXAgaXQgZm9yIHRoZSBzdWJzZXF1ZW50IG1pZ3JhdGlvbiBzdGVwcy5cbiAgICAgIGltcG9ydHMuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHVzYWdlIG9mIHVzYWdlcykge1xuICAgICAgY29uc3QgbmV3TmFtZSA9IGdldFVudHlwZWRWZXJzaW9uT2ZJbXBvcnRPck5hbWUodXNhZ2UuaW1wb3J0TmFtZSk7XG4gICAgICBpZiAobmV3TmFtZSA9PT0gbnVsbCkge1xuICAgICAgICAvLyBUaGlzIHNob3VsZCBuZXZlciBoYXBwZW4uXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBgVHlwZWQgZm9ybXMgbWlncmF0aW9uIGVycm9yOiB1bmtub3duIHJlcGxhY2VtZW50IGZvciB1c2FnZSAke3VzYWdlLm5vZGUuZ2V0VGV4dCgpfWApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJld3JpdGUodXNhZ2Uubm9kZS5nZXRTdGFydCgpLCB1c2FnZS5ub2RlLmdldFdpZHRoKCksIG5ld05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvciBlYWNoIGltcG9ydGVkIGNvbnRyb2wgY2xhc3MsIG1pZ3JhdGUgdG8gdGhlIGNvcnJlc3BvbmRpbmcgdXB0eXBlZCBpbXBvcnQuXG4gIGZvciAoY29uc3QgaW1wIG9mIGltcG9ydHMpIHtcbiAgICBjb25zdCB1bnR5cGVkQ2xhc3MgPSBnZXRVbnR5cGVkVmVyc2lvbk9mSW1wb3J0T3JOYW1lKGltcC5nZXRUZXh0KCkpO1xuICAgIGlmICh1bnR5cGVkQ2xhc3MgPT09IG51bGwpIHtcbiAgICAgIC8vIFRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbi5cbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYFR5cGVkIGZvcm1zIG1pZ3JhdGlvbiBlcnJvcjogdW5rbm93biB1bnR5cGVkIHZlcnNpb24gb2YgaW1wb3J0ICR7aW1wLmdldFRleHQoKX1gKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoZ2V0SW1wb3J0U3BlY2lmaWVyKHNvdXJjZUZpbGUsIGZvcm1zLCB1bnR5cGVkQ2xhc3MpKSB7XG4gICAgICAvLyBJbiBvcmRlciB0byBtYWtlIHRoZSBtaWdyYXRpb24gaWRlbXBvdGVudCwgd2UgbXVzdCBjaGVjayB3aGV0aGVyIHRoZSB1bnR5cGVkIHZlcnNpb24gb2YgdGhlXG4gICAgICAvLyBjbGFzcyBpcyBhbHJlYWR5IHByZXNlbnQuIElmIHByZXNlbnQsIGltbWVkaWF0ZWx5IGNvbnRpbnVlLlxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJld3JpdGUoaW1wLmdldFN0YXJ0KCksIGltcC5nZXRXaWR0aCgpLCB1bnR5cGVkQ2xhc3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEltcG9ydHMoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IHRzLkltcG9ydFNwZWNpZmllcltdIHtcbiAgbGV0IGltcG9ydHM6IHRzLkltcG9ydFNwZWNpZmllcltdID0gW107XG4gIGZvciAoY29uc3QgY2Mgb2YgY2xhc3Nlcykge1xuICAgIGNvbnN0IHNwZWNpZmllciA9IGdldEltcG9ydFNwZWNpZmllcihzb3VyY2VGaWxlLCBmb3JtcywgY2MpO1xuICAgIGlmICghc3BlY2lmaWVyKSBjb250aW51ZTtcbiAgICBpbXBvcnRzLnB1c2goc3BlY2lmaWVyKTtcbiAgfVxuICByZXR1cm4gaW1wb3J0cztcbn1cblxuZnVuY3Rpb24gZ2V0VW50eXBlZFZlcnNpb25PZkltcG9ydE9yTmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gIGZvciAoY29uc3QgY2Mgb2YgY2xhc3Nlcykge1xuICAgIGlmIChuYW1lLmluY2x1ZGVzKGNjKSkge1xuICAgICAgcmV0dXJuIGAke3VudHlwZWRQcmVmaXh9JHtjY31gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0VXNhZ2VzKFxuICAgIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlcixcbiAgICBpbXBvcnRTcGVjaWZpZXI6IHRzLkltcG9ydFNwZWNpZmllcik6IE1pZ3JhdGFibGVOb2RlW10ge1xuICBjb25zdCB1c2FnZXM6IE1pZ3JhdGFibGVOb2RlW10gPSBbXTtcbiAgY29uc3QgdmlzaXROb2RlID0gKG5vZGU6IHRzLk5vZGUpID0+IHtcbiAgICBpZiAodHMuaXNJbXBvcnRTcGVjaWZpZXIobm9kZSkpIHtcbiAgICAgIC8vIFNraXAgdGhpcyBub2RlIGFuZCBhbGwgb2YgaXRzIGNoaWxkcmVuOyBpbXBvcnRzIGFyZSBhIHNwZWNpYWwgY2FzZS5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRzLmlzSWRlbnRpZmllcihub2RlKSAmJiBpc1VzYWdlT2ZGb3Jtc0ltcG9ydCh0eXBlQ2hlY2tlciwgbm9kZSwgaW1wb3J0U3BlY2lmaWVyKSkge1xuICAgICAgdXNhZ2VzLnB1c2goe25vZGUsIGltcG9ydE5hbWU6IGltcG9ydFNwZWNpZmllci5nZXRUZXh0KCl9KTtcbiAgICB9XG4gICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIHZpc2l0Tm9kZSk7XG4gIH07XG4gIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCB2aXNpdE5vZGUpO1xuICByZXR1cm4gdXNhZ2VzO1xufVxuXG5mdW5jdGlvbiBpc1VzYWdlT2ZGb3Jtc0ltcG9ydChcbiAgICB0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIsIG5vZGU6IHRzLklkZW50aWZpZXIsXG4gICAgaW1wb3J0U3BlY2lmaWVyOiB0cy5JbXBvcnRTcGVjaWZpZXIpOiBib29sZWFuIHtcbiAgY29uc3Qgc3ltYm9sID0gdHlwZUNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihub2RlKTtcblxuICAvLyBXZSBjaGVjayBzeW1ib2wuZGVjbGFyYXRpb25zIGJlY2F1c2Ugd2UgYWN0dWFsbHkgY2FyZSBhYm91dCB0aGUgbmFtZSBhdCB0aGUgZGVjbGFyYXRpb24gc2l0ZSxcbiAgLy8gbm90IHRoZSB1c2FnZSBzaXRlLiBUaGVzZSBjb3VsZCBiZSBkaWZmZXJlbnQgaW4gdGhlIGNhc2Ugb2Ygb3ZlcnJpZGRlbiBjb25zdHJ1Y3RvcnMuXG4gIGlmICghc3ltYm9sIHx8IHN5bWJvbC5kZWNsYXJhdGlvbnMgPT09IHVuZGVmaW5lZCB8fCAhc3ltYm9sLmRlY2xhcmF0aW9ucy5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBkZWNsID0gc3ltYm9sLmRlY2xhcmF0aW9uc1swXTtcbiAgaWYgKCF0cy5pc0ltcG9ydFNwZWNpZmllcihkZWNsKSkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIEFzIHBlciBgdHlwZXNjcmlwdC9pbXBvcnRzLnRzYCwgd2UgbXVzdCB3YWxrIHVwIHRoZSB0cmVlIHRvIGZpbmQgdGhlIGVuY2xvc2luZyBpbXBvcnRcbiAgLy8gZGVjbGFyYXRpb24uIEZvciByZWFzb25zIHNwZWNpZmljIHRvIHRoZSBUUyBBU1QsIHRoaXMgaXMgYWx3YXlzIDMgbGV2ZWxzIHVwIGZyb20gYW4gaW1wb3J0XG4gIC8vIHNwZWNpZmllciBub2RlLlxuICBjb25zdCBpbXBvcnREZWNsID0gZGVjbC5wYXJlbnQucGFyZW50LnBhcmVudDtcbiAgaWYgKCF0cy5pc1N0cmluZ0xpdGVyYWwoaW1wb3J0RGVjbC5tb2R1bGVTcGVjaWZpZXIpKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgaW1wb3J0TmFtZSA9IHR5cGVDaGVja2VyLmdldFR5cGVBdExvY2F0aW9uKGltcG9ydFNwZWNpZmllcik/LmdldFN5bWJvbCgpPy5nZXROYW1lKCk7XG4gIGlmICghaW1wb3J0TmFtZSkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIEhhbmRsZXMgYWxpYXNlZCBpbXBvcnRzOiBlLmcuIFwiaW1wb3J0IHtDb21wb25lbnQgYXMgbXlDb21wfSBmcm9tIC4uLlwiO1xuICBjb25zdCBkZWNsTmFtZSA9IGRlY2wucHJvcGVydHlOYW1lID8gZGVjbC5wcm9wZXJ0eU5hbWUudGV4dCA6IGRlY2wubmFtZS50ZXh0O1xuXG4gIGlmIChpbXBvcnROYW1lID09PSBkZWNsTmFtZSkgcmV0dXJuIHRydWU7XG5cbiAgLy8gSW4gdGhlIGNhc2Ugb2YgRm9ybUNvbnRyb2wncyBvdmVycmlkZGVuIGV4cG9ydGVkIGNvbnN0cnVjdG9yLCB0aGUgdmFsdWUgbmFtZSBhbmQgZGVjbGFyYXRpb25cbiAgLy8gbmFtZSBhcmUgbm90IGV4YWN0bHkgdGhlIHNhbWUuIEZvciBvdXIgcHVycG9zZXMsIGl0J3MgZW5vdWdoIHRvIGNoZWNrIHdoZXRoZXIgdGhlIGxhdHRlciBpcyBhXG4gIC8vIHN1YnN0cmluZyBvZiB0aGUgZm9ybWVyLlxuICBpZiAoZGVjbE5hbWUgPT09IGZvcm1Db250cm9sICYmIGltcG9ydE5hbWUuaW5jbHVkZXMoZGVjbE5hbWUpKSByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=