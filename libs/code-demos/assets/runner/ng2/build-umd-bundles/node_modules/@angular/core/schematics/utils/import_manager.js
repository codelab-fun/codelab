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
        define("@angular/core/schematics/utils/import_manager", ["require", "exports", "path", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImportManager = void 0;
    const path_1 = require("path");
    const typescript_1 = __importDefault(require("typescript"));
    /**
     * Import manager that can be used to add TypeScript imports to given source
     * files. The manager ensures that multiple transformations are applied properly
     * without shifted offsets and that similar existing import declarations are re-used.
     */
    class ImportManager {
        constructor(getUpdateRecorder, printer) {
            this.getUpdateRecorder = getUpdateRecorder;
            this.printer = printer;
            /** Map of import declarations that need to be updated to include the given symbols. */
            this.updatedImports = new Map();
            /** Map of source-files and their previously used identifier names. */
            this.usedIdentifierNames = new Map();
            /**
             * Array of previously resolved symbol imports. Cache can be re-used to return
             * the same identifier without checking the source-file again.
             */
            this.importCache = [];
        }
        /**
         * Adds an import to the given source-file and returns the TypeScript
         * identifier that can be used to access the newly imported symbol.
         */
        addImportToSourceFile(sourceFile, symbolName, moduleName, typeImport = false) {
            const sourceDir = (0, path_1.dirname)(sourceFile.fileName);
            let importStartIndex = 0;
            let existingImport = null;
            // In case the given import has been already generated previously, we just return
            // the previous generated identifier in order to avoid duplicate generated imports.
            const cachedImport = this.importCache.find(c => c.sourceFile === sourceFile && c.symbolName === symbolName &&
                c.moduleName === moduleName);
            if (cachedImport) {
                return cachedImport.identifier;
            }
            // Walk through all source-file top-level statements and search for import declarations
            // that already match the specified "moduleName" and can be updated to import the
            // given symbol. If no matching import can be found, the last import in the source-file
            // will be used as starting point for a new import that will be generated.
            for (let i = sourceFile.statements.length - 1; i >= 0; i--) {
                const statement = sourceFile.statements[i];
                if (!typescript_1.default.isImportDeclaration(statement) || !typescript_1.default.isStringLiteral(statement.moduleSpecifier) ||
                    !statement.importClause) {
                    continue;
                }
                if (importStartIndex === 0) {
                    importStartIndex = this._getEndPositionOfNode(statement);
                }
                const moduleSpecifier = statement.moduleSpecifier.text;
                if (moduleSpecifier.startsWith('.') &&
                    (0, path_1.resolve)(sourceDir, moduleSpecifier) !== (0, path_1.resolve)(sourceDir, moduleName) ||
                    moduleSpecifier !== moduleName) {
                    continue;
                }
                if (statement.importClause.namedBindings) {
                    const namedBindings = statement.importClause.namedBindings;
                    // In case a "Type" symbol is imported, we can't use namespace imports
                    // because these only export symbols available at runtime (no types)
                    if (typescript_1.default.isNamespaceImport(namedBindings) && !typeImport) {
                        return typescript_1.default.factory.createPropertyAccessExpression(typescript_1.default.factory.createIdentifier(namedBindings.name.text), typescript_1.default.factory.createIdentifier(symbolName || 'default'));
                    }
                    else if (typescript_1.default.isNamedImports(namedBindings) && symbolName) {
                        const existingElement = namedBindings.elements.find(e => e.propertyName ? e.propertyName.text === symbolName : e.name.text === symbolName);
                        if (existingElement) {
                            return typescript_1.default.factory.createIdentifier(existingElement.name.text);
                        }
                        // In case the symbol could not be found in an existing import, we
                        // keep track of the import declaration as it can be updated to include
                        // the specified symbol name without having to create a new import.
                        existingImport = statement;
                    }
                }
                else if (statement.importClause.name && !symbolName) {
                    return typescript_1.default.factory.createIdentifier(statement.importClause.name.text);
                }
            }
            if (existingImport) {
                const propertyIdentifier = typescript_1.default.factory.createIdentifier(symbolName);
                const generatedUniqueIdentifier = this._getUniqueIdentifier(sourceFile, symbolName);
                const needsGeneratedUniqueName = generatedUniqueIdentifier.text !== symbolName;
                const importName = needsGeneratedUniqueName ? generatedUniqueIdentifier : propertyIdentifier;
                // Since it can happen that multiple classes need to be imported within the
                // specified source file and we want to add the identifiers to the existing
                // import declaration, we need to keep track of the updated import declarations.
                // We can't directly update the import declaration for each identifier as this
                // would throw off the recorder offsets. We need to keep track of the new identifiers
                // for the import and perform the import transformation as batches per source-file.
                this.updatedImports.set(existingImport, (this.updatedImports.get(existingImport) || []).concat({
                    propertyName: needsGeneratedUniqueName ? propertyIdentifier : undefined,
                    importName: importName,
                }));
                // Keep track of all updated imports so that we don't generate duplicate
                // similar imports as these can't be statically analyzed in the source-file yet.
                this.importCache.push({ sourceFile, moduleName, symbolName, identifier: importName });
                return importName;
            }
            let identifier = null;
            let newImport = null;
            if (symbolName) {
                const propertyIdentifier = typescript_1.default.factory.createIdentifier(symbolName);
                const generatedUniqueIdentifier = this._getUniqueIdentifier(sourceFile, symbolName);
                const needsGeneratedUniqueName = generatedUniqueIdentifier.text !== symbolName;
                identifier = needsGeneratedUniqueName ? generatedUniqueIdentifier : propertyIdentifier;
                newImport = typescript_1.default.factory.createImportDeclaration(undefined, undefined, typescript_1.default.factory.createImportClause(false, undefined, typescript_1.default.factory.createNamedImports([typescript_1.default.factory.createImportSpecifier(false, needsGeneratedUniqueName ? propertyIdentifier : undefined, identifier)])), typescript_1.default.factory.createStringLiteral(moduleName));
            }
            else {
                identifier = this._getUniqueIdentifier(sourceFile, 'defaultExport');
                newImport = typescript_1.default.factory.createImportDeclaration(undefined, undefined, typescript_1.default.factory.createImportClause(false, identifier, undefined), typescript_1.default.factory.createStringLiteral(moduleName));
            }
            const newImportText = this.printer.printNode(typescript_1.default.EmitHint.Unspecified, newImport, sourceFile);
            // If the import is generated at the start of the source file, we want to add
            // a new-line after the import. Otherwise if the import is generated after an
            // existing import, we need to prepend a new-line so that the import is not on
            // the same line as the existing import anchor.
            this.getUpdateRecorder(sourceFile)
                .addNewImport(importStartIndex, importStartIndex === 0 ? `${newImportText}\n` : `\n${newImportText}`);
            // Keep track of all generated imports so that we don't generate duplicate
            // similar imports as these can't be statically analyzed in the source-file yet.
            this.importCache.push({ sourceFile, symbolName, moduleName, identifier });
            return identifier;
        }
        /**
         * Stores the collected import changes within the appropriate update recorders. The
         * updated imports can only be updated *once* per source-file because previous updates
         * could otherwise shift the source-file offsets.
         */
        recordChanges() {
            this.updatedImports.forEach((expressions, importDecl) => {
                const sourceFile = importDecl.getSourceFile();
                const recorder = this.getUpdateRecorder(sourceFile);
                const namedBindings = importDecl.importClause.namedBindings;
                const newNamedBindings = typescript_1.default.factory.updateNamedImports(namedBindings, namedBindings.elements.concat(expressions.map(({ propertyName, importName }) => typescript_1.default.factory.createImportSpecifier(false, propertyName, importName))));
                const newNamedBindingsText = this.printer.printNode(typescript_1.default.EmitHint.Unspecified, newNamedBindings, sourceFile);
                recorder.updateExistingImport(namedBindings, newNamedBindingsText);
            });
        }
        /** Gets an unique identifier with a base name for the given source file. */
        _getUniqueIdentifier(sourceFile, baseName) {
            if (this.isUniqueIdentifierName(sourceFile, baseName)) {
                this._recordUsedIdentifier(sourceFile, baseName);
                return typescript_1.default.factory.createIdentifier(baseName);
            }
            let name = null;
            let counter = 1;
            do {
                name = `${baseName}_${counter++}`;
            } while (!this.isUniqueIdentifierName(sourceFile, name));
            this._recordUsedIdentifier(sourceFile, name);
            return typescript_1.default.factory.createIdentifier(name);
        }
        /**
         * Checks whether the specified identifier name is used within the given
         * source file.
         */
        isUniqueIdentifierName(sourceFile, name) {
            if (this.usedIdentifierNames.has(sourceFile) &&
                this.usedIdentifierNames.get(sourceFile).indexOf(name) !== -1) {
                return false;
            }
            // Walk through the source file and search for an identifier matching
            // the given name. In that case, it's not guaranteed that this name
            // is unique in the given declaration scope and we just return false.
            const nodeQueue = [sourceFile];
            while (nodeQueue.length) {
                const node = nodeQueue.shift();
                if (typescript_1.default.isIdentifier(node) && node.text === name) {
                    return false;
                }
                nodeQueue.push(...node.getChildren());
            }
            return true;
        }
        _recordUsedIdentifier(sourceFile, identifierName) {
            this.usedIdentifierNames.set(sourceFile, (this.usedIdentifierNames.get(sourceFile) || []).concat(identifierName));
        }
        /**
         * Determines the full end of a given node. By default the end position of a node is
         * before all trailing comments. This could mean that generated imports shift comments.
         */
        _getEndPositionOfNode(node) {
            const nodeEndPos = node.getEnd();
            const commentRanges = typescript_1.default.getTrailingCommentRanges(node.getSourceFile().text, nodeEndPos);
            if (!commentRanges || !commentRanges.length) {
                return nodeEndPos;
            }
            return commentRanges[commentRanges.length - 1].end;
        }
    }
    exports.ImportManager = ImportManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0X21hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NjaGVtYXRpY3MvdXRpbHMvaW1wb3J0X21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7O0lBRUgsK0JBQXNDO0lBQ3RDLDREQUE0QjtJQVE1Qjs7OztPQUlHO0lBQ0gsTUFBYSxhQUFhO1FBaUJ4QixZQUNZLGlCQUFxRSxFQUNyRSxPQUFtQjtZQURuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW9EO1lBQ3JFLFlBQU8sR0FBUCxPQUFPLENBQVk7WUFsQi9CLHVGQUF1RjtZQUMvRSxtQkFBYyxHQUNsQixJQUFJLEdBQUcsRUFBcUYsQ0FBQztZQUNqRyxzRUFBc0U7WUFDOUQsd0JBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7WUFDakU7OztlQUdHO1lBQ0ssZ0JBQVcsR0FLYixFQUFFLENBQUM7UUFJeUIsQ0FBQztRQUVuQzs7O1dBR0c7UUFDSCxxQkFBcUIsQ0FDakIsVUFBeUIsRUFBRSxVQUF1QixFQUFFLFVBQWtCLEVBQ3RFLFVBQVUsR0FBRyxLQUFLO1lBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUEsY0FBTyxFQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQyxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLGNBQWMsR0FBOEIsSUFBSSxDQUFDO1lBRXJELGlGQUFpRjtZQUNqRixtRkFBbUY7WUFDbkYsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ3RDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLFVBQVUsS0FBSyxVQUFVO2dCQUMzRCxDQUFDLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLElB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cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtkaXJuYW1lLCByZXNvbHZlfSBmcm9tICdwYXRoJztcbmltcG9ydCB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuLyoqIFVwZGF0ZSByZWNvcmRlciBmb3IgbWFuYWdpbmcgaW1wb3J0cy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW1wb3J0TWFuYWdlclVwZGF0ZVJlY29yZGVyIHtcbiAgYWRkTmV3SW1wb3J0KHN0YXJ0OiBudW1iZXIsIGltcG9ydFRleHQ6IHN0cmluZyk6IHZvaWQ7XG4gIHVwZGF0ZUV4aXN0aW5nSW1wb3J0KG5hbWVkQmluZGluZ3M6IHRzLk5hbWVkSW1wb3J0cywgbmV3TmFtZWRCaW5kaW5nczogc3RyaW5nKTogdm9pZDtcbn1cblxuLyoqXG4gKiBJbXBvcnQgbWFuYWdlciB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBUeXBlU2NyaXB0IGltcG9ydHMgdG8gZ2l2ZW4gc291cmNlXG4gKiBmaWxlcy4gVGhlIG1hbmFnZXIgZW5zdXJlcyB0aGF0IG11bHRpcGxlIHRyYW5zZm9ybWF0aW9ucyBhcmUgYXBwbGllZCBwcm9wZXJseVxuICogd2l0aG91dCBzaGlmdGVkIG9mZnNldHMgYW5kIHRoYXQgc2ltaWxhciBleGlzdGluZyBpbXBvcnQgZGVjbGFyYXRpb25zIGFyZSByZS11c2VkLlxuICovXG5leHBvcnQgY2xhc3MgSW1wb3J0TWFuYWdlciB7XG4gIC8qKiBNYXAgb2YgaW1wb3J0IGRlY2xhcmF0aW9ucyB0aGF0IG5lZWQgdG8gYmUgdXBkYXRlZCB0byBpbmNsdWRlIHRoZSBnaXZlbiBzeW1ib2xzLiAqL1xuICBwcml2YXRlIHVwZGF0ZWRJbXBvcnRzID1cbiAgICAgIG5ldyBNYXA8dHMuSW1wb3J0RGVjbGFyYXRpb24sIHtwcm9wZXJ0eU5hbWU/OiB0cy5JZGVudGlmaWVyLCBpbXBvcnROYW1lOiB0cy5JZGVudGlmaWVyfVtdPigpO1xuICAvKiogTWFwIG9mIHNvdXJjZS1maWxlcyBhbmQgdGhlaXIgcHJldmlvdXNseSB1c2VkIGlkZW50aWZpZXIgbmFtZXMuICovXG4gIHByaXZhdGUgdXNlZElkZW50aWZpZXJOYW1lcyA9IG5ldyBNYXA8dHMuU291cmNlRmlsZSwgc3RyaW5nW10+KCk7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBwcmV2aW91c2x5IHJlc29sdmVkIHN5bWJvbCBpbXBvcnRzLiBDYWNoZSBjYW4gYmUgcmUtdXNlZCB0byByZXR1cm5cbiAgICogdGhlIHNhbWUgaWRlbnRpZmllciB3aXRob3V0IGNoZWNraW5nIHRoZSBzb3VyY2UtZmlsZSBhZ2Fpbi5cbiAgICovXG4gIHByaXZhdGUgaW1wb3J0Q2FjaGU6IHtcbiAgICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICAgIHN5bWJvbE5hbWU6IHN0cmluZ3xudWxsLFxuICAgIG1vZHVsZU5hbWU6IHN0cmluZyxcbiAgICBpZGVudGlmaWVyOiB0cy5JZGVudGlmaWVyXG4gIH1bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBnZXRVcGRhdGVSZWNvcmRlcjogKHNmOiB0cy5Tb3VyY2VGaWxlKSA9PiBJbXBvcnRNYW5hZ2VyVXBkYXRlUmVjb3JkZXIsXG4gICAgICBwcml2YXRlIHByaW50ZXI6IHRzLlByaW50ZXIpIHt9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gaW1wb3J0IHRvIHRoZSBnaXZlbiBzb3VyY2UtZmlsZSBhbmQgcmV0dXJucyB0aGUgVHlwZVNjcmlwdFxuICAgKiBpZGVudGlmaWVyIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSBuZXdseSBpbXBvcnRlZCBzeW1ib2wuXG4gICAqL1xuICBhZGRJbXBvcnRUb1NvdXJjZUZpbGUoXG4gICAgICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLCBzeW1ib2xOYW1lOiBzdHJpbmd8bnVsbCwgbW9kdWxlTmFtZTogc3RyaW5nLFxuICAgICAgdHlwZUltcG9ydCA9IGZhbHNlKTogdHMuRXhwcmVzc2lvbiB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZGlybmFtZShzb3VyY2VGaWxlLmZpbGVOYW1lKTtcbiAgICBsZXQgaW1wb3J0U3RhcnRJbmRleCA9IDA7XG4gICAgbGV0IGV4aXN0aW5nSW1wb3J0OiB0cy5JbXBvcnREZWNsYXJhdGlvbnxudWxsID0gbnVsbDtcblxuICAgIC8vIEluIGNhc2UgdGhlIGdpdmVuIGltcG9ydCBoYXMgYmVlbiBhbHJlYWR5IGdlbmVyYXRlZCBwcmV2aW91c2x5LCB3ZSBqdXN0IHJldHVyblxuICAgIC8vIHRoZSBwcmV2aW91cyBnZW5lcmF0ZWQgaWRlbnRpZmllciBpbiBvcmRlciB0byBhdm9pZCBkdXBsaWNhdGUgZ2VuZXJhdGVkIGltcG9ydHMuXG4gICAgY29uc3QgY2FjaGVkSW1wb3J0ID0gdGhpcy5pbXBvcnRDYWNoZS5maW5kKFxuICAgICAgICBjID0+IGMuc291cmNlRmlsZSA9PT0gc291cmNlRmlsZSAmJiBjLnN5bWJvbE5hbWUgPT09IHN5bWJvbE5hbWUgJiZcbiAgICAgICAgICAgIGMubW9kdWxlTmFtZSA9PT0gbW9kdWxlTmFtZSk7XG4gICAgaWYgKGNhY2hlZEltcG9ydCkge1xuICAgICAgcmV0dXJuIGNhY2hlZEltcG9ydC5pZGVudGlmaWVyO1xuICAgIH1cblxuICAgIC8vIFdhbGsgdGhyb3VnaCBhbGwgc291cmNlLWZpbGUgdG9wLWxldmVsIHN0YXRlbWVudHMgYW5kIHNlYXJjaCBmb3IgaW1wb3J0IGRlY2xhcmF0aW9uc1xuICAgIC8vIHRoYXQgYWxyZWFkeSBtYXRjaCB0aGUgc3BlY2lmaWVkIFwibW9kdWxlTmFtZVwiIGFuZCBjYW4gYmUgdXBkYXRlZCB0byBpbXBvcnQgdGhlXG4gICAgLy8gZ2l2ZW4gc3ltYm9sLiBJZiBubyBtYXRjaGluZyBpbXBvcnQgY2FuIGJlIGZvdW5kLCB0aGUgbGFzdCBpbXBvcnQgaW4gdGhlIHNvdXJjZS1maWxlXG4gICAgLy8gd2lsbCBiZSB1c2VkIGFzIHN0YXJ0aW5nIHBvaW50IGZvciBhIG5ldyBpbXBvcnQgdGhhdCB3aWxsIGJlIGdlbmVyYXRlZC5cbiAgICBmb3IgKGxldCBpID0gc291cmNlRmlsZS5zdGF0ZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBzdGF0ZW1lbnQgPSBzb3VyY2VGaWxlLnN0YXRlbWVudHNbaV07XG5cbiAgICAgIGlmICghdHMuaXNJbXBvcnREZWNsYXJhdGlvbihzdGF0ZW1lbnQpIHx8ICF0cy5pc1N0cmluZ0xpdGVyYWwoc3RhdGVtZW50Lm1vZHVsZVNwZWNpZmllcikgfHxcbiAgICAgICAgICAhc3RhdGVtZW50LmltcG9ydENsYXVzZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGltcG9ydFN0YXJ0SW5kZXggPT09IDApIHtcbiAgICAgICAgaW1wb3J0U3RhcnRJbmRleCA9IHRoaXMuX2dldEVuZFBvc2l0aW9uT2ZOb2RlKHN0YXRlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1vZHVsZVNwZWNpZmllciA9IHN0YXRlbWVudC5tb2R1bGVTcGVjaWZpZXIudGV4dDtcblxuICAgICAgaWYgKG1vZHVsZVNwZWNpZmllci5zdGFydHNXaXRoKCcuJykgJiZcbiAgICAgICAgICAgICAgcmVzb2x2ZShzb3VyY2VEaXIsIG1vZHVsZVNwZWNpZmllcikgIT09IHJlc29sdmUoc291cmNlRGlyLCBtb2R1bGVOYW1lKSB8fFxuICAgICAgICAgIG1vZHVsZVNwZWNpZmllciAhPT0gbW9kdWxlTmFtZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlbWVudC5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncykge1xuICAgICAgICBjb25zdCBuYW1lZEJpbmRpbmdzID0gc3RhdGVtZW50LmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzO1xuXG4gICAgICAgIC8vIEluIGNhc2UgYSBcIlR5cGVcIiBzeW1ib2wgaXMgaW1wb3J0ZWQsIHdlIGNhbid0IHVzZSBuYW1lc3BhY2UgaW1wb3J0c1xuICAgICAgICAvLyBiZWNhdXNlIHRoZXNlIG9ubHkgZXhwb3J0IHN5bWJvbHMgYXZhaWxhYmxlIGF0IHJ1bnRpbWUgKG5vIHR5cGVzKVxuICAgICAgICBpZiAodHMuaXNOYW1lc3BhY2VJbXBvcnQobmFtZWRCaW5kaW5ncykgJiYgIXR5cGVJbXBvcnQpIHtcbiAgICAgICAgICByZXR1cm4gdHMuZmFjdG9yeS5jcmVhdGVQcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24oXG4gICAgICAgICAgICAgIHRzLmZhY3RvcnkuY3JlYXRlSWRlbnRpZmllcihuYW1lZEJpbmRpbmdzLm5hbWUudGV4dCksXG4gICAgICAgICAgICAgIHRzLmZhY3RvcnkuY3JlYXRlSWRlbnRpZmllcihzeW1ib2xOYW1lIHx8ICdkZWZhdWx0JykpO1xuICAgICAgICB9IGVsc2UgaWYgKHRzLmlzTmFtZWRJbXBvcnRzKG5hbWVkQmluZGluZ3MpICYmIHN5bWJvbE5hbWUpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZ0VsZW1lbnQgPSBuYW1lZEJpbmRpbmdzLmVsZW1lbnRzLmZpbmQoXG4gICAgICAgICAgICAgIGUgPT5cbiAgICAgICAgICAgICAgICAgIGUucHJvcGVydHlOYW1lID8gZS5wcm9wZXJ0eU5hbWUudGV4dCA9PT0gc3ltYm9sTmFtZSA6IGUubmFtZS50ZXh0ID09PSBzeW1ib2xOYW1lKTtcblxuICAgICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cy5mYWN0b3J5LmNyZWF0ZUlkZW50aWZpZXIoZXhpc3RpbmdFbGVtZW50Lm5hbWUudGV4dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSW4gY2FzZSB0aGUgc3ltYm9sIGNvdWxkIG5vdCBiZSBmb3VuZCBpbiBhbiBleGlzdGluZyBpbXBvcnQsIHdlXG4gICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgaW1wb3J0IGRlY2xhcmF0aW9uIGFzIGl0IGNhbiBiZSB1cGRhdGVkIHRvIGluY2x1ZGVcbiAgICAgICAgICAvLyB0aGUgc3BlY2lmaWVkIHN5bWJvbCBuYW1lIHdpdGhvdXQgaGF2aW5nIHRvIGNyZWF0ZSBhIG5ldyBpbXBvcnQuXG4gICAgICAgICAgZXhpc3RpbmdJbXBvcnQgPSBzdGF0ZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc3RhdGVtZW50LmltcG9ydENsYXVzZS5uYW1lICYmICFzeW1ib2xOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cy5mYWN0b3J5LmNyZWF0ZUlkZW50aWZpZXIoc3RhdGVtZW50LmltcG9ydENsYXVzZS5uYW1lLnRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChleGlzdGluZ0ltcG9ydCkge1xuICAgICAgY29uc3QgcHJvcGVydHlJZGVudGlmaWVyID0gdHMuZmFjdG9yeS5jcmVhdGVJZGVudGlmaWVyKHN5bWJvbE5hbWUhKTtcbiAgICAgIGNvbnN0IGdlbmVyYXRlZFVuaXF1ZUlkZW50aWZpZXIgPSB0aGlzLl9nZXRVbmlxdWVJZGVudGlmaWVyKHNvdXJjZUZpbGUsIHN5bWJvbE5hbWUhKTtcbiAgICAgIGNvbnN0IG5lZWRzR2VuZXJhdGVkVW5pcXVlTmFtZSA9IGdlbmVyYXRlZFVuaXF1ZUlkZW50aWZpZXIudGV4dCAhPT0gc3ltYm9sTmFtZTtcbiAgICAgIGNvbnN0IGltcG9ydE5hbWUgPSBuZWVkc0dlbmVyYXRlZFVuaXF1ZU5hbWUgPyBnZW5lcmF0ZWRVbmlxdWVJZGVudGlmaWVyIDogcHJvcGVydHlJZGVudGlmaWVyO1xuXG4gICAgICAvLyBTaW5jZSBpdCBjYW4gaGFwcGVuIHRoYXQgbXVsdGlwbGUgY2xhc3NlcyBuZWVkIHRvIGJlIGltcG9ydGVkIHdpdGhpbiB0aGVcbiAgICAgIC8vIHNwZWNpZmllZCBzb3VyY2UgZmlsZSBhbmQgd2Ugd2FudCB0byBhZGQgdGhlIGlkZW50aWZpZXJzIHRvIHRoZSBleGlzdGluZ1xuICAgICAgLy8gaW1wb3J0IGRlY2xhcmF0aW9uLCB3ZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIHVwZGF0ZWQgaW1wb3J0IGRlY2xhcmF0aW9ucy5cbiAgICAgIC8vIFdlIGNhbid0IGRpcmVjdGx5IHVwZGF0ZSB0aGUgaW1wb3J0IGRlY2xhcmF0aW9uIGZvciBlYWNoIGlkZW50aWZpZXIgYXMgdGhpc1xuICAgICAgLy8gd291bGQgdGhyb3cgb2ZmIHRoZSByZWNvcmRlciBvZmZzZXRzLiBXZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIG5ldyBpZGVudGlmaWVyc1xuICAgICAgLy8gZm9yIHRoZSBpbXBvcnQgYW5kIHBlcmZvcm0gdGhlIGltcG9ydCB0cmFuc2Zvcm1hdGlvbiBhcyBiYXRjaGVzIHBlciBzb3VyY2UtZmlsZS5cbiAgICAgIHRoaXMudXBkYXRlZEltcG9ydHMuc2V0KFxuICAgICAgICAgIGV4aXN0aW5nSW1wb3J0LCAodGhpcy51cGRhdGVkSW1wb3J0cy5nZXQoZXhpc3RpbmdJbXBvcnQpIHx8IFtdKS5jb25jYXQoe1xuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBuZWVkc0dlbmVyYXRlZFVuaXF1ZU5hbWUgPyBwcm9wZXJ0eUlkZW50aWZpZXIgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBpbXBvcnROYW1lOiBpbXBvcnROYW1lLFxuICAgICAgICAgIH0pKTtcblxuICAgICAgLy8gS2VlcCB0cmFjayBvZiBhbGwgdXBkYXRlZCBpbXBvcnRzIHNvIHRoYXQgd2UgZG9uJ3QgZ2VuZXJhdGUgZHVwbGljYXRlXG4gICAgICAvLyBzaW1pbGFyIGltcG9ydHMgYXMgdGhlc2UgY2FuJ3QgYmUgc3RhdGljYWxseSBhbmFseXplZCBpbiB0aGUgc291cmNlLWZpbGUgeWV0LlxuICAgICAgdGhpcy5pbXBvcnRDYWNoZS5wdXNoKHtzb3VyY2VGaWxlLCBtb2R1bGVOYW1lLCBzeW1ib2xOYW1lLCBpZGVudGlmaWVyOiBpbXBvcnROYW1lfSk7XG5cbiAgICAgIHJldHVybiBpbXBvcnROYW1lO1xuICAgIH1cblxuICAgIGxldCBpZGVudGlmaWVyOiB0cy5JZGVudGlmaWVyfG51bGwgPSBudWxsO1xuICAgIGxldCBuZXdJbXBvcnQ6IHRzLkltcG9ydERlY2xhcmF0aW9ufG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHN5bWJvbE5hbWUpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5SWRlbnRpZmllciA9IHRzLmZhY3RvcnkuY3JlYXRlSWRlbnRpZmllcihzeW1ib2xOYW1lKTtcbiAgICAgIGNvbnN0IGdlbmVyYXRlZFVuaXF1ZUlkZW50aWZpZXIgPSB0aGlzLl9nZXRVbmlxdWVJZGVudGlmaWVyKHNvdXJjZUZpbGUsIHN5bWJvbE5hbWUpO1xuICAgICAgY29uc3QgbmVlZHNHZW5lcmF0ZWRVbmlxdWVOYW1lID0gZ2VuZXJhdGVkVW5pcXVlSWRlbnRpZmllci50ZXh0ICE9PSBzeW1ib2xOYW1lO1xuICAgICAgaWRlbnRpZmllciA9IG5lZWRzR2VuZXJhdGVkVW5pcXVlTmFtZSA/IGdlbmVyYXRlZFVuaXF1ZUlkZW50aWZpZXIgOiBwcm9wZXJ0eUlkZW50aWZpZXI7XG5cbiAgICAgIG5ld0ltcG9ydCA9IHRzLmZhY3RvcnkuY3JlYXRlSW1wb3J0RGVjbGFyYXRpb24oXG4gICAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgICAgICAgdHMuZmFjdG9yeS5jcmVhdGVJbXBvcnRDbGF1c2UoXG4gICAgICAgICAgICAgIGZhbHNlLCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHRzLmZhY3RvcnkuY3JlYXRlTmFtZWRJbXBvcnRzKFt0cy5mYWN0b3J5LmNyZWF0ZUltcG9ydFNwZWNpZmllcihcbiAgICAgICAgICAgICAgICAgIGZhbHNlLCBuZWVkc0dlbmVyYXRlZFVuaXF1ZU5hbWUgPyBwcm9wZXJ0eUlkZW50aWZpZXIgOiB1bmRlZmluZWQsIGlkZW50aWZpZXIpXSkpLFxuICAgICAgICAgIHRzLmZhY3RvcnkuY3JlYXRlU3RyaW5nTGl0ZXJhbChtb2R1bGVOYW1lKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkZW50aWZpZXIgPSB0aGlzLl9nZXRVbmlxdWVJZGVudGlmaWVyKHNvdXJjZUZpbGUsICdkZWZhdWx0RXhwb3J0Jyk7XG4gICAgICBuZXdJbXBvcnQgPSB0cy5mYWN0b3J5LmNyZWF0ZUltcG9ydERlY2xhcmF0aW9uKFxuICAgICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cy5mYWN0b3J5LmNyZWF0ZUltcG9ydENsYXVzZShmYWxzZSwgaWRlbnRpZmllciwgdW5kZWZpbmVkKSxcbiAgICAgICAgICB0cy5mYWN0b3J5LmNyZWF0ZVN0cmluZ0xpdGVyYWwobW9kdWxlTmFtZSkpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0ltcG9ydFRleHQgPSB0aGlzLnByaW50ZXIucHJpbnROb2RlKHRzLkVtaXRIaW50LlVuc3BlY2lmaWVkLCBuZXdJbXBvcnQsIHNvdXJjZUZpbGUpO1xuICAgIC8vIElmIHRoZSBpbXBvcnQgaXMgZ2VuZXJhdGVkIGF0IHRoZSBzdGFydCBvZiB0aGUgc291cmNlIGZpbGUsIHdlIHdhbnQgdG8gYWRkXG4gICAgLy8gYSBuZXctbGluZSBhZnRlciB0aGUgaW1wb3J0LiBPdGhlcndpc2UgaWYgdGhlIGltcG9ydCBpcyBnZW5lcmF0ZWQgYWZ0ZXIgYW5cbiAgICAvLyBleGlzdGluZyBpbXBvcnQsIHdlIG5lZWQgdG8gcHJlcGVuZCBhIG5ldy1saW5lIHNvIHRoYXQgdGhlIGltcG9ydCBpcyBub3Qgb25cbiAgICAvLyB0aGUgc2FtZSBsaW5lIGFzIHRoZSBleGlzdGluZyBpbXBvcnQgYW5jaG9yLlxuICAgIHRoaXMuZ2V0VXBkYXRlUmVjb3JkZXIoc291cmNlRmlsZSlcbiAgICAgICAgLmFkZE5ld0ltcG9ydChcbiAgICAgICAgICAgIGltcG9ydFN0YXJ0SW5kZXgsIGltcG9ydFN0YXJ0SW5kZXggPT09IDAgPyBgJHtuZXdJbXBvcnRUZXh0fVxcbmAgOiBgXFxuJHtuZXdJbXBvcnRUZXh0fWApO1xuXG4gICAgLy8gS2VlcCB0cmFjayBvZiBhbGwgZ2VuZXJhdGVkIGltcG9ydHMgc28gdGhhdCB3ZSBkb24ndCBnZW5lcmF0ZSBkdXBsaWNhdGVcbiAgICAvLyBzaW1pbGFyIGltcG9ydHMgYXMgdGhlc2UgY2FuJ3QgYmUgc3RhdGljYWxseSBhbmFseXplZCBpbiB0aGUgc291cmNlLWZpbGUgeWV0LlxuICAgIHRoaXMuaW1wb3J0Q2FjaGUucHVzaCh7c291cmNlRmlsZSwgc3ltYm9sTmFtZSwgbW9kdWxlTmFtZSwgaWRlbnRpZmllcn0pO1xuXG4gICAgcmV0dXJuIGlkZW50aWZpZXI7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIHRoZSBjb2xsZWN0ZWQgaW1wb3J0IGNoYW5nZXMgd2l0aGluIHRoZSBhcHByb3ByaWF0ZSB1cGRhdGUgcmVjb3JkZXJzLiBUaGVcbiAgICogdXBkYXRlZCBpbXBvcnRzIGNhbiBvbmx5IGJlIHVwZGF0ZWQgKm9uY2UqIHBlciBzb3VyY2UtZmlsZSBiZWNhdXNlIHByZXZpb3VzIHVwZGF0ZXNcbiAgICogY291bGQgb3RoZXJ3aXNlIHNoaWZ0IHRoZSBzb3VyY2UtZmlsZSBvZmZzZXRzLlxuICAgKi9cbiAgcmVjb3JkQ2hhbmdlcygpIHtcbiAgICB0aGlzLnVwZGF0ZWRJbXBvcnRzLmZvckVhY2goKGV4cHJlc3Npb25zLCBpbXBvcnREZWNsKSA9PiB7XG4gICAgICBjb25zdCBzb3VyY2VGaWxlID0gaW1wb3J0RGVjbC5nZXRTb3VyY2VGaWxlKCk7XG4gICAgICBjb25zdCByZWNvcmRlciA9IHRoaXMuZ2V0VXBkYXRlUmVjb3JkZXIoc291cmNlRmlsZSk7XG4gICAgICBjb25zdCBuYW1lZEJpbmRpbmdzID0gaW1wb3J0RGVjbC5pbXBvcnRDbGF1c2UhLm5hbWVkQmluZGluZ3MgYXMgdHMuTmFtZWRJbXBvcnRzO1xuICAgICAgY29uc3QgbmV3TmFtZWRCaW5kaW5ncyA9IHRzLmZhY3RvcnkudXBkYXRlTmFtZWRJbXBvcnRzKFxuICAgICAgICAgIG5hbWVkQmluZGluZ3MsXG4gICAgICAgICAgbmFtZWRCaW5kaW5ncy5lbGVtZW50cy5jb25jYXQoZXhwcmVzc2lvbnMubWFwKFxuICAgICAgICAgICAgICAoe3Byb3BlcnR5TmFtZSwgaW1wb3J0TmFtZX0pID0+XG4gICAgICAgICAgICAgICAgICB0cy5mYWN0b3J5LmNyZWF0ZUltcG9ydFNwZWNpZmllcihmYWxzZSwgcHJvcGVydHlOYW1lLCBpbXBvcnROYW1lKSkpKTtcblxuICAgICAgY29uc3QgbmV3TmFtZWRCaW5kaW5nc1RleHQgPVxuICAgICAgICAgIHRoaXMucHJpbnRlci5wcmludE5vZGUodHMuRW1pdEhpbnQuVW5zcGVjaWZpZWQsIG5ld05hbWVkQmluZGluZ3MsIHNvdXJjZUZpbGUpO1xuICAgICAgcmVjb3JkZXIudXBkYXRlRXhpc3RpbmdJbXBvcnQobmFtZWRCaW5kaW5ncywgbmV3TmFtZWRCaW5kaW5nc1RleHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEdldHMgYW4gdW5pcXVlIGlkZW50aWZpZXIgd2l0aCBhIGJhc2UgbmFtZSBmb3IgdGhlIGdpdmVuIHNvdXJjZSBmaWxlLiAqL1xuICBwcml2YXRlIF9nZXRVbmlxdWVJZGVudGlmaWVyKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIGJhc2VOYW1lOiBzdHJpbmcpOiB0cy5JZGVudGlmaWVyIHtcbiAgICBpZiAodGhpcy5pc1VuaXF1ZUlkZW50aWZpZXJOYW1lKHNvdXJjZUZpbGUsIGJhc2VOYW1lKSkge1xuICAgICAgdGhpcy5fcmVjb3JkVXNlZElkZW50aWZpZXIoc291cmNlRmlsZSwgYmFzZU5hbWUpO1xuICAgICAgcmV0dXJuIHRzLmZhY3RvcnkuY3JlYXRlSWRlbnRpZmllcihiYXNlTmFtZSk7XG4gICAgfVxuXG4gICAgbGV0IG5hbWUgPSBudWxsO1xuICAgIGxldCBjb3VudGVyID0gMTtcbiAgICBkbyB7XG4gICAgICBuYW1lID0gYCR7YmFzZU5hbWV9XyR7Y291bnRlcisrfWA7XG4gICAgfSB3aGlsZSAoIXRoaXMuaXNVbmlxdWVJZGVudGlmaWVyTmFtZShzb3VyY2VGaWxlLCBuYW1lKSk7XG5cbiAgICB0aGlzLl9yZWNvcmRVc2VkSWRlbnRpZmllcihzb3VyY2VGaWxlLCBuYW1lISk7XG4gICAgcmV0dXJuIHRzLmZhY3RvcnkuY3JlYXRlSWRlbnRpZmllcihuYW1lISk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyIG5hbWUgaXMgdXNlZCB3aXRoaW4gdGhlIGdpdmVuXG4gICAqIHNvdXJjZSBmaWxlLlxuICAgKi9cbiAgcHJpdmF0ZSBpc1VuaXF1ZUlkZW50aWZpZXJOYW1lKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIG5hbWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnVzZWRJZGVudGlmaWVyTmFtZXMuaGFzKHNvdXJjZUZpbGUpICYmXG4gICAgICAgIHRoaXMudXNlZElkZW50aWZpZXJOYW1lcy5nZXQoc291cmNlRmlsZSkhLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gV2FsayB0aHJvdWdoIHRoZSBzb3VyY2UgZmlsZSBhbmQgc2VhcmNoIGZvciBhbiBpZGVudGlmaWVyIG1hdGNoaW5nXG4gICAgLy8gdGhlIGdpdmVuIG5hbWUuIEluIHRoYXQgY2FzZSwgaXQncyBub3QgZ3VhcmFudGVlZCB0aGF0IHRoaXMgbmFtZVxuICAgIC8vIGlzIHVuaXF1ZSBpbiB0aGUgZ2l2ZW4gZGVjbGFyYXRpb24gc2NvcGUgYW5kIHdlIGp1c3QgcmV0dXJuIGZhbHNlLlxuICAgIGNvbnN0IG5vZGVRdWV1ZTogdHMuTm9kZVtdID0gW3NvdXJjZUZpbGVdO1xuICAgIHdoaWxlIChub2RlUXVldWUubGVuZ3RoKSB7XG4gICAgICBjb25zdCBub2RlID0gbm9kZVF1ZXVlLnNoaWZ0KCkhO1xuICAgICAgaWYgKHRzLmlzSWRlbnRpZmllcihub2RlKSAmJiBub2RlLnRleHQgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbm9kZVF1ZXVlLnB1c2goLi4ubm9kZS5nZXRDaGlsZHJlbigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9yZWNvcmRVc2VkSWRlbnRpZmllcihzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLCBpZGVudGlmaWVyTmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy51c2VkSWRlbnRpZmllck5hbWVzLnNldChcbiAgICAgICAgc291cmNlRmlsZSwgKHRoaXMudXNlZElkZW50aWZpZXJOYW1lcy5nZXQoc291cmNlRmlsZSkgfHwgW10pLmNvbmNhdChpZGVudGlmaWVyTmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgdGhlIGZ1bGwgZW5kIG9mIGEgZ2l2ZW4gbm9kZS4gQnkgZGVmYXVsdCB0aGUgZW5kIHBvc2l0aW9uIG9mIGEgbm9kZSBpc1xuICAgKiBiZWZvcmUgYWxsIHRyYWlsaW5nIGNvbW1lbnRzLiBUaGlzIGNvdWxkIG1lYW4gdGhhdCBnZW5lcmF0ZWQgaW1wb3J0cyBzaGlmdCBjb21tZW50cy5cbiAgICovXG4gIHByaXZhdGUgX2dldEVuZFBvc2l0aW9uT2ZOb2RlKG5vZGU6IHRzLk5vZGUpIHtcbiAgICBjb25zdCBub2RlRW5kUG9zID0gbm9kZS5nZXRFbmQoKTtcbiAgICBjb25zdCBjb21tZW50UmFuZ2VzID0gdHMuZ2V0VHJhaWxpbmdDb21tZW50UmFuZ2VzKG5vZGUuZ2V0U291cmNlRmlsZSgpLnRleHQsIG5vZGVFbmRQb3MpO1xuICAgIGlmICghY29tbWVudFJhbmdlcyB8fCAhY29tbWVudFJhbmdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBub2RlRW5kUG9zO1xuICAgIH1cbiAgICByZXR1cm4gY29tbWVudFJhbmdlc1tjb21tZW50UmFuZ2VzLmxlbmd0aCAtIDFdIS5lbmQ7XG4gIH1cbn1cbiJdfQ==