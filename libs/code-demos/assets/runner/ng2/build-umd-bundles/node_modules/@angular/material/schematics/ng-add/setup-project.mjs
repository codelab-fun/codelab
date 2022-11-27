"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
const components_1 = require("@schematics/angular/private/components");
const workspace_1 = require("@schematics/angular/utility/workspace");
const workspace_models_1 = require("@schematics/angular/utility/workspace-models");
const material_fonts_1 = require("./fonts/material-fonts");
const theming_1 = require("./theming/theming");
/** Name of the Angular module that enables Angular browser animations. */
const browserAnimationsModuleName = 'BrowserAnimationsModule';
/** Name of the module that switches Angular animations to a noop implementation. */
const noopAnimationsModuleName = 'NoopAnimationsModule';
/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.module
 */
function default_1(options) {
    return async (host, context) => {
        const workspace = await (0, workspace_1.getWorkspace)(host);
        const project = (0, schematics_2.getProjectFromWorkspace)(workspace, options.project);
        if (project.extensions.projectType === workspace_models_1.ProjectType.Application) {
            return (0, schematics_1.chain)([
                addAnimationsModule(options),
                (0, theming_1.addThemeToAppStyles)(options),
                (0, material_fonts_1.addFontsToIndex)(options),
                addMaterialAppStyles(options),
                (0, theming_1.addTypographyClass)(options),
            ]);
        }
        context.logger.warn('Angular Material has been set up in your workspace. There is no additional setup ' +
            'required for consuming Angular Material in your library project.\n\n' +
            'If you intended to run the schematic on a different project, pass the `--project` ' +
            'option.');
        return;
    };
}
exports.default = default_1;
/**
 * Adds an animation module to the root module of the specified project. In case the "animations"
 * option is set to false, we still add the `NoopAnimationsModule` because otherwise various
 * components of Angular Material will throw an exception.
 */
function addAnimationsModule(options) {
    return async (host, context) => {
        const workspace = await (0, workspace_1.getWorkspace)(host);
        const project = (0, schematics_2.getProjectFromWorkspace)(workspace, options.project);
        try {
            addAnimationsModuleToNonStandaloneApp(host, project, context, options);
        }
        catch (e) {
            if (e.message?.includes('Bootstrap call not found')) {
                addAnimationsModuleToStandaloneApp(host, project, context, options);
            }
            else {
                throw e;
            }
        }
    };
}
/** Adds the animations module to an app that is bootstrap using the standalone component APIs. */
function addAnimationsModuleToStandaloneApp(host, project, context, options) {
    const mainFile = (0, schematics_2.getProjectMainFile)(project);
    if (options.animations === 'enabled') {
        // In case the project explicitly uses the NoopAnimationsModule, we should print a warning
        // message that makes the user aware of the fact that we won't automatically set up
        // animations. If we would add the BrowserAnimationsModule while the NoopAnimationsModule
        // is already configured, we would cause unexpected behavior and runtime exceptions.
        if ((0, components_1.importsProvidersFrom)(host, mainFile, noopAnimationsModuleName)) {
            context.logger.error(`Could not set up "${browserAnimationsModuleName}" ` +
                `because "${noopAnimationsModuleName}" is already imported.`);
            context.logger.info(`Please manually set up browser animations.`);
        }
        else {
            (0, components_1.addModuleImportToStandaloneBootstrap)(host, mainFile, browserAnimationsModuleName, '@angular/platform-browser/animations');
        }
    }
    else if (options.animations === 'disabled' &&
        !(0, components_1.importsProvidersFrom)(host, mainFile, browserAnimationsModuleName)) {
        // Do not add the NoopAnimationsModule module if the project already explicitly uses
        // the BrowserAnimationsModule.
        (0, components_1.addModuleImportToStandaloneBootstrap)(host, mainFile, noopAnimationsModuleName, '@angular/platform-browser/animations');
    }
}
/**
 * Adds the animations module to an app that is bootstrap
 * using the non-standalone component APIs.
 */
function addAnimationsModuleToNonStandaloneApp(host, project, context, options) {
    const appModulePath = (0, schematics_2.getAppModulePath)(host, (0, schematics_2.getProjectMainFile)(project));
    if (options.animations === 'enabled') {
        // In case the project explicitly uses the NoopAnimationsModule, we should print a warning
        // message that makes the user aware of the fact that we won't automatically set up
        // animations. If we would add the BrowserAnimationsModule while the NoopAnimationsModule
        // is already configured, we would cause unexpected behavior and runtime exceptions.
        if ((0, schematics_2.hasNgModuleImport)(host, appModulePath, noopAnimationsModuleName)) {
            context.logger.error(`Could not set up "${browserAnimationsModuleName}" ` +
                `because "${noopAnimationsModuleName}" is already imported.`);
            context.logger.info(`Please manually set up browser animations.`);
        }
        else {
            (0, schematics_2.addModuleImportToRootModule)(host, browserAnimationsModuleName, '@angular/platform-browser/animations', project);
        }
    }
    else if (options.animations === 'disabled' &&
        !(0, schematics_2.hasNgModuleImport)(host, appModulePath, browserAnimationsModuleName)) {
        // Do not add the NoopAnimationsModule module if the project already explicitly uses
        // the BrowserAnimationsModule.
        (0, schematics_2.addModuleImportToRootModule)(host, noopAnimationsModuleName, '@angular/platform-browser/animations', project);
    }
}
/**
 * Adds custom Material styles to the project style file. The custom CSS sets up the Roboto font
 * and reset the default browser body margin.
 */
function addMaterialAppStyles(options) {
    return async (host, context) => {
        const workspace = await (0, workspace_1.getWorkspace)(host);
        const project = (0, schematics_2.getProjectFromWorkspace)(workspace, options.project);
        const styleFilePath = (0, schematics_2.getProjectStyleFile)(project);
        const logger = context.logger;
        if (!styleFilePath) {
            logger.error(`Could not find the default style file for this project.`);
            logger.info(`Consider manually adding the Roboto font to your CSS.`);
            logger.info(`More information at https://fonts.google.com/specimen/Roboto`);
            return;
        }
        const buffer = host.read(styleFilePath);
        if (!buffer) {
            logger.error(`Could not read the default style file within the project ` + `(${styleFilePath})`);
            logger.info(`Please consider manually setting up the Roboto font.`);
            return;
        }
        const htmlContent = buffer.toString();
        const insertion = '\n' +
            `html, body { height: 100%; }\n` +
            `body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }\n`;
        if (htmlContent.includes(insertion)) {
            return;
        }
        const recorder = host.beginUpdate(styleFilePath);
        recorder.insertLeft(htmlContent.length, insertion);
        host.commitUpdate(recorder);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXAtcHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zY2hlbWF0aWNzL25nLWFkZC9zZXR1cC1wcm9qZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkRBQStFO0FBQy9FLHdEQU9pQztBQUNqQyx1RUFHZ0Q7QUFDaEQscUVBQXNGO0FBQ3RGLG1GQUF5RTtBQUN6RSwyREFBdUQ7QUFFdkQsK0NBQTBFO0FBRTFFLDBFQUEwRTtBQUMxRSxNQUFNLDJCQUEyQixHQUFHLHlCQUF5QixDQUFDO0FBRTlELG9GQUFvRjtBQUNwRixNQUFNLHdCQUF3QixHQUFHLHNCQUFzQixDQUFDO0FBRXhEOzs7OztHQUtHO0FBQ0gsbUJBQXlCLE9BQWU7SUFDdEMsT0FBTyxLQUFLLEVBQUUsSUFBVSxFQUFFLE9BQXlCLEVBQUUsRUFBRTtRQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUEsd0JBQVksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxNQUFNLE9BQU8sR0FBRyxJQUFBLG9DQUF1QixFQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFcEUsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsS0FBSyw4QkFBVyxDQUFDLFdBQVcsRUFBRTtZQUM5RCxPQUFPLElBQUEsa0JBQUssRUFBQztnQkFDWCxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7Z0JBQzVCLElBQUEsNkJBQW1CLEVBQUMsT0FBTyxDQUFDO2dCQUM1QixJQUFBLGdDQUFlLEVBQUMsT0FBTyxDQUFDO2dCQUN4QixvQkFBb0IsQ0FBQyxPQUFPLENBQUM7Z0JBQzdCLElBQUEsNEJBQWtCLEVBQUMsT0FBTyxDQUFDO2FBQzVCLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2pCLG1GQUFtRjtZQUNqRixzRUFBc0U7WUFD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SSxhQUFhLEdBQUcsQ0FDbkYsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUNwRSxPQUFPO1NBQ1I7UUFFRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEMsTUFBTSxTQUFTLEdBQ2IsSUFBSTtZQUNKLGdDQUFnQztZQUNoQywwRUFBMEUsQ0FBQztRQUU3RSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbkMsT0FBTztTQUNSO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVqRCxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y2hhaW4sIFJ1bGUsIFNjaGVtYXRpY0NvbnRleHQsIFRyZWV9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7XG4gIGFkZE1vZHVsZUltcG9ydFRvUm9vdE1vZHVsZSxcbiAgZ2V0QXBwTW9kdWxlUGF0aCxcbiAgZ2V0UHJvamVjdEZyb21Xb3Jrc3BhY2UsXG4gIGdldFByb2plY3RNYWluRmlsZSxcbiAgZ2V0UHJvamVjdFN0eWxlRmlsZSxcbiAgaGFzTmdNb2R1bGVJbXBvcnQsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY2hlbWF0aWNzJztcbmltcG9ydCB7XG4gIGltcG9ydHNQcm92aWRlcnNGcm9tLFxuICBhZGRNb2R1bGVJbXBvcnRUb1N0YW5kYWxvbmVCb290c3RyYXAsXG59IGZyb20gJ0BzY2hlbWF0aWNzL2FuZ3VsYXIvcHJpdmF0ZS9jb21wb25lbnRzJztcbmltcG9ydCB7Z2V0V29ya3NwYWNlLCBQcm9qZWN0RGVmaW5pdGlvbn0gZnJvbSAnQHNjaGVtYXRpY3MvYW5ndWxhci91dGlsaXR5L3dvcmtzcGFjZSc7XG5pbXBvcnQge1Byb2plY3RUeXBlfSBmcm9tICdAc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvd29ya3NwYWNlLW1vZGVscyc7XG5pbXBvcnQge2FkZEZvbnRzVG9JbmRleH0gZnJvbSAnLi9mb250cy9tYXRlcmlhbC1mb250cyc7XG5pbXBvcnQge1NjaGVtYX0gZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHthZGRUaGVtZVRvQXBwU3R5bGVzLCBhZGRUeXBvZ3JhcGh5Q2xhc3N9IGZyb20gJy4vdGhlbWluZy90aGVtaW5nJztcblxuLyoqIE5hbWUgb2YgdGhlIEFuZ3VsYXIgbW9kdWxlIHRoYXQgZW5hYmxlcyBBbmd1bGFyIGJyb3dzZXIgYW5pbWF0aW9ucy4gKi9cbmNvbnN0IGJyb3dzZXJBbmltYXRpb25zTW9kdWxlTmFtZSA9ICdCcm93c2VyQW5pbWF0aW9uc01vZHVsZSc7XG5cbi8qKiBOYW1lIG9mIHRoZSBtb2R1bGUgdGhhdCBzd2l0Y2hlcyBBbmd1bGFyIGFuaW1hdGlvbnMgdG8gYSBub29wIGltcGxlbWVudGF0aW9uLiAqL1xuY29uc3Qgbm9vcEFuaW1hdGlvbnNNb2R1bGVOYW1lID0gJ05vb3BBbmltYXRpb25zTW9kdWxlJztcblxuLyoqXG4gKiBTY2FmZm9sZHMgdGhlIGJhc2ljcyBvZiBhIEFuZ3VsYXIgTWF0ZXJpYWwgYXBwbGljYXRpb24sIHRoaXMgaW5jbHVkZXM6XG4gKiAgLSBBZGQgUGFja2FnZXMgdG8gcGFja2FnZS5qc29uXG4gKiAgLSBBZGRzIHByZS1idWlsdCB0aGVtZXMgdG8gc3R5bGVzLmV4dFxuICogIC0gQWRkcyBCcm93c2VyIEFuaW1hdGlvbiB0byBhcHAubW9kdWxlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zOiBTY2hlbWEpOiBSdWxlIHtcbiAgcmV0dXJuIGFzeW5jIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgY29uc3Qgd29ya3NwYWNlID0gYXdhaXQgZ2V0V29ya3NwYWNlKGhvc3QpO1xuICAgIGNvbnN0IHByb2plY3QgPSBnZXRQcm9qZWN0RnJvbVdvcmtzcGFjZSh3b3Jrc3BhY2UsIG9wdGlvbnMucHJvamVjdCk7XG5cbiAgICBpZiAocHJvamVjdC5leHRlbnNpb25zLnByb2plY3RUeXBlID09PSBQcm9qZWN0VHlwZS5BcHBsaWNhdGlvbikge1xuICAgICAgcmV0dXJuIGNoYWluKFtcbiAgICAgICAgYWRkQW5pbWF0aW9uc01vZHVsZShvcHRpb25zKSxcbiAgICAgICAgYWRkVGhlbWVUb0FwcFN0eWxlcyhvcHRpb25zKSxcbiAgICAgICAgYWRkRm9udHNUb0luZGV4KG9wdGlvbnMpLFxuICAgICAgICBhZGRNYXRlcmlhbEFwcFN0eWxlcyhvcHRpb25zKSxcbiAgICAgICAgYWRkVHlwb2dyYXBoeUNsYXNzKG9wdGlvbnMpLFxuICAgICAgXSk7XG4gICAgfVxuICAgIGNvbnRleHQubG9nZ2VyLndhcm4oXG4gICAgICAnQW5ndWxhciBNYXRlcmlhbCBoYXMgYmVlbiBzZXQgdXAgaW4geW91ciB3b3Jrc3BhY2UuIFRoZXJlIGlzIG5vIGFkZGl0aW9uYWwgc2V0dXAgJyArXG4gICAgICAgICdyZXF1aXJlZCBmb3IgY29uc3VtaW5nIEFuZ3VsYXIgTWF0ZXJpYWwgaW4geW91ciBsaWJyYXJ5IHByb2plY3QuXFxuXFxuJyArXG4gICAgICAgICdJZiB5b3UgaW50ZW5kZWQgdG8gcnVuIHRoZSBzY2hlbWF0aWMgb24gYSBkaWZmZXJlbnQgcHJvamVjdCwgcGFzcyB0aGUgYC0tcHJvamVjdGAgJyArXG4gICAgICAgICdvcHRpb24uJyxcbiAgICApO1xuICAgIHJldHVybjtcbiAgfTtcbn1cblxuLyoqXG4gKiBBZGRzIGFuIGFuaW1hdGlvbiBtb2R1bGUgdG8gdGhlIHJvb3QgbW9kdWxlIG9mIHRoZSBzcGVjaWZpZWQgcHJvamVjdC4gSW4gY2FzZSB0aGUgXCJhbmltYXRpb25zXCJcbiAqIG9wdGlvbiBpcyBzZXQgdG8gZmFsc2UsIHdlIHN0aWxsIGFkZCB0aGUgYE5vb3BBbmltYXRpb25zTW9kdWxlYCBiZWNhdXNlIG90aGVyd2lzZSB2YXJpb3VzXG4gKiBjb21wb25lbnRzIG9mIEFuZ3VsYXIgTWF0ZXJpYWwgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24uXG4gKi9cbmZ1bmN0aW9uIGFkZEFuaW1hdGlvbnNNb2R1bGUob3B0aW9uczogU2NoZW1hKSB7XG4gIHJldHVybiBhc3luYyAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHdvcmtzcGFjZSA9IGF3YWl0IGdldFdvcmtzcGFjZShob3N0KTtcbiAgICBjb25zdCBwcm9qZWN0ID0gZ2V0UHJvamVjdEZyb21Xb3Jrc3BhY2Uod29ya3NwYWNlLCBvcHRpb25zLnByb2plY3QpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGFkZEFuaW1hdGlvbnNNb2R1bGVUb05vblN0YW5kYWxvbmVBcHAoaG9zdCwgcHJvamVjdCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKChlIGFzIHttZXNzYWdlPzogc3RyaW5nfSkubWVzc2FnZT8uaW5jbHVkZXMoJ0Jvb3RzdHJhcCBjYWxsIG5vdCBmb3VuZCcpKSB7XG4gICAgICAgIGFkZEFuaW1hdGlvbnNNb2R1bGVUb1N0YW5kYWxvbmVBcHAoaG9zdCwgcHJvamVjdCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLyoqIEFkZHMgdGhlIGFuaW1hdGlvbnMgbW9kdWxlIHRvIGFuIGFwcCB0aGF0IGlzIGJvb3RzdHJhcCB1c2luZyB0aGUgc3RhbmRhbG9uZSBjb21wb25lbnQgQVBJcy4gKi9cbmZ1bmN0aW9uIGFkZEFuaW1hdGlvbnNNb2R1bGVUb1N0YW5kYWxvbmVBcHAoXG4gIGhvc3Q6IFRyZWUsXG4gIHByb2plY3Q6IFByb2plY3REZWZpbml0aW9uLFxuICBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0LFxuICBvcHRpb25zOiBTY2hlbWEsXG4pIHtcbiAgY29uc3QgbWFpbkZpbGUgPSBnZXRQcm9qZWN0TWFpbkZpbGUocHJvamVjdCk7XG5cbiAgaWYgKG9wdGlvbnMuYW5pbWF0aW9ucyA9PT0gJ2VuYWJsZWQnKSB7XG4gICAgLy8gSW4gY2FzZSB0aGUgcHJvamVjdCBleHBsaWNpdGx5IHVzZXMgdGhlIE5vb3BBbmltYXRpb25zTW9kdWxlLCB3ZSBzaG91bGQgcHJpbnQgYSB3YXJuaW5nXG4gICAgLy8gbWVzc2FnZSB0aGF0IG1ha2VzIHRoZSB1c2VyIGF3YXJlIG9mIHRoZSBmYWN0IHRoYXQgd2Ugd29uJ3QgYXV0b21hdGljYWxseSBzZXQgdXBcbiAgICAvLyBhbmltYXRpb25zLiBJZiB3ZSB3b3VsZCBhZGQgdGhlIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIHdoaWxlIHRoZSBOb29wQW5pbWF0aW9uc01vZHVsZVxuICAgIC8vIGlzIGFscmVhZHkgY29uZmlndXJlZCwgd2Ugd291bGQgY2F1c2UgdW5leHBlY3RlZCBiZWhhdmlvciBhbmQgcnVudGltZSBleGNlcHRpb25zLlxuICAgIGlmIChpbXBvcnRzUHJvdmlkZXJzRnJvbShob3N0LCBtYWluRmlsZSwgbm9vcEFuaW1hdGlvbnNNb2R1bGVOYW1lKSkge1xuICAgICAgY29udGV4dC5sb2dnZXIuZXJyb3IoXG4gICAgICAgIGBDb3VsZCBub3Qgc2V0IHVwIFwiJHticm93c2VyQW5pbWF0aW9uc01vZHVsZU5hbWV9XCIgYCArXG4gICAgICAgICAgYGJlY2F1c2UgXCIke25vb3BBbmltYXRpb25zTW9kdWxlTmFtZX1cIiBpcyBhbHJlYWR5IGltcG9ydGVkLmAsXG4gICAgICApO1xuICAgICAgY29udGV4dC5sb2dnZXIuaW5mbyhgUGxlYXNlIG1hbnVhbGx5IHNldCB1cCBicm93c2VyIGFuaW1hdGlvbnMuYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZE1vZHVsZUltcG9ydFRvU3RhbmRhbG9uZUJvb3RzdHJhcChcbiAgICAgICAgaG9zdCxcbiAgICAgICAgbWFpbkZpbGUsXG4gICAgICAgIGJyb3dzZXJBbmltYXRpb25zTW9kdWxlTmFtZSxcbiAgICAgICAgJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucycsXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcbiAgICBvcHRpb25zLmFuaW1hdGlvbnMgPT09ICdkaXNhYmxlZCcgJiZcbiAgICAhaW1wb3J0c1Byb3ZpZGVyc0Zyb20oaG9zdCwgbWFpbkZpbGUsIGJyb3dzZXJBbmltYXRpb25zTW9kdWxlTmFtZSlcbiAgKSB7XG4gICAgLy8gRG8gbm90IGFkZCB0aGUgTm9vcEFuaW1hdGlvbnNNb2R1bGUgbW9kdWxlIGlmIHRoZSBwcm9qZWN0IGFscmVhZHkgZXhwbGljaXRseSB1c2VzXG4gICAgLy8gdGhlIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLlxuICAgIGFkZE1vZHVsZUltcG9ydFRvU3RhbmRhbG9uZUJvb3RzdHJhcChcbiAgICAgIGhvc3QsXG4gICAgICBtYWluRmlsZSxcbiAgICAgIG5vb3BBbmltYXRpb25zTW9kdWxlTmFtZSxcbiAgICAgICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnLFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBhbmltYXRpb25zIG1vZHVsZSB0byBhbiBhcHAgdGhhdCBpcyBib290c3RyYXBcbiAqIHVzaW5nIHRoZSBub24tc3RhbmRhbG9uZSBjb21wb25lbnQgQVBJcy5cbiAqL1xuZnVuY3Rpb24gYWRkQW5pbWF0aW9uc01vZHVsZVRvTm9uU3RhbmRhbG9uZUFwcChcbiAgaG9zdDogVHJlZSxcbiAgcHJvamVjdDogUHJvamVjdERlZmluaXRpb24sXG4gIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQsXG4gIG9wdGlvbnM6IFNjaGVtYSxcbikge1xuICBjb25zdCBhcHBNb2R1bGVQYXRoID0gZ2V0QXBwTW9kdWxlUGF0aChob3N0LCBnZXRQcm9qZWN0TWFpbkZpbGUocHJvamVjdCkpO1xuXG4gIGlmIChvcHRpb25zLmFuaW1hdGlvbnMgPT09ICdlbmFibGVkJykge1xuICAgIC8vIEluIGNhc2UgdGhlIHByb2plY3QgZXhwbGljaXRseSB1c2VzIHRoZSBOb29wQW5pbWF0aW9uc01vZHVsZSwgd2Ugc2hvdWxkIHByaW50IGEgd2FybmluZ1xuICAgIC8vIG1lc3NhZ2UgdGhhdCBtYWtlcyB0aGUgdXNlciBhd2FyZSBvZiB0aGUgZmFjdCB0aGF0IHdlIHdvbid0IGF1dG9tYXRpY2FsbHkgc2V0IHVwXG4gICAgLy8gYW5pbWF0aW9ucy4gSWYgd2Ugd291bGQgYWRkIHRoZSBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB3aGlsZSB0aGUgTm9vcEFuaW1hdGlvbnNNb2R1bGVcbiAgICAvLyBpcyBhbHJlYWR5IGNvbmZpZ3VyZWQsIHdlIHdvdWxkIGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3IgYW5kIHJ1bnRpbWUgZXhjZXB0aW9ucy5cbiAgICBpZiAoaGFzTmdNb2R1bGVJbXBvcnQoaG9zdCwgYXBwTW9kdWxlUGF0aCwgbm9vcEFuaW1hdGlvbnNNb2R1bGVOYW1lKSkge1xuICAgICAgY29udGV4dC5sb2dnZXIuZXJyb3IoXG4gICAgICAgIGBDb3VsZCBub3Qgc2V0IHVwIFwiJHticm93c2VyQW5pbWF0aW9uc01vZHVsZU5hbWV9XCIgYCArXG4gICAgICAgICAgYGJlY2F1c2UgXCIke25vb3BBbmltYXRpb25zTW9kdWxlTmFtZX1cIiBpcyBhbHJlYWR5IGltcG9ydGVkLmAsXG4gICAgICApO1xuICAgICAgY29udGV4dC5sb2dnZXIuaW5mbyhgUGxlYXNlIG1hbnVhbGx5IHNldCB1cCBicm93c2VyIGFuaW1hdGlvbnMuYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZE1vZHVsZUltcG9ydFRvUm9vdE1vZHVsZShcbiAgICAgICAgaG9zdCxcbiAgICAgICAgYnJvd3NlckFuaW1hdGlvbnNNb2R1bGVOYW1lLFxuICAgICAgICAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJyxcbiAgICAgICAgcHJvamVjdCxcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2UgaWYgKFxuICAgIG9wdGlvbnMuYW5pbWF0aW9ucyA9PT0gJ2Rpc2FibGVkJyAmJlxuICAgICFoYXNOZ01vZHVsZUltcG9ydChob3N0LCBhcHBNb2R1bGVQYXRoLCBicm93c2VyQW5pbWF0aW9uc01vZHVsZU5hbWUpXG4gICkge1xuICAgIC8vIERvIG5vdCBhZGQgdGhlIE5vb3BBbmltYXRpb25zTW9kdWxlIG1vZHVsZSBpZiB0aGUgcHJvamVjdCBhbHJlYWR5IGV4cGxpY2l0bHkgdXNlc1xuICAgIC8vIHRoZSBCcm93c2VyQW5pbWF0aW9uc01vZHVsZS5cbiAgICBhZGRNb2R1bGVJbXBvcnRUb1Jvb3RNb2R1bGUoXG4gICAgICBob3N0LFxuICAgICAgbm9vcEFuaW1hdGlvbnNNb2R1bGVOYW1lLFxuICAgICAgJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucycsXG4gICAgICBwcm9qZWN0LFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIGN1c3RvbSBNYXRlcmlhbCBzdHlsZXMgdG8gdGhlIHByb2plY3Qgc3R5bGUgZmlsZS4gVGhlIGN1c3RvbSBDU1Mgc2V0cyB1cCB0aGUgUm9ib3RvIGZvbnRcbiAqIGFuZCByZXNldCB0aGUgZGVmYXVsdCBicm93c2VyIGJvZHkgbWFyZ2luLlxuICovXG5mdW5jdGlvbiBhZGRNYXRlcmlhbEFwcFN0eWxlcyhvcHRpb25zOiBTY2hlbWEpIHtcbiAgcmV0dXJuIGFzeW5jIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgY29uc3Qgd29ya3NwYWNlID0gYXdhaXQgZ2V0V29ya3NwYWNlKGhvc3QpO1xuICAgIGNvbnN0IHByb2plY3QgPSBnZXRQcm9qZWN0RnJvbVdvcmtzcGFjZSh3b3Jrc3BhY2UsIG9wdGlvbnMucHJvamVjdCk7XG4gICAgY29uc3Qgc3R5bGVGaWxlUGF0aCA9IGdldFByb2plY3RTdHlsZUZpbGUocHJvamVjdCk7XG4gICAgY29uc3QgbG9nZ2VyID0gY29udGV4dC5sb2dnZXI7XG5cbiAgICBpZiAoIXN0eWxlRmlsZVBhdGgpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihgQ291bGQgbm90IGZpbmQgdGhlIGRlZmF1bHQgc3R5bGUgZmlsZSBmb3IgdGhpcyBwcm9qZWN0LmApO1xuICAgICAgbG9nZ2VyLmluZm8oYENvbnNpZGVyIG1hbnVhbGx5IGFkZGluZyB0aGUgUm9ib3RvIGZvbnQgdG8geW91ciBDU1MuYCk7XG4gICAgICBsb2dnZXIuaW5mbyhgTW9yZSBpbmZvcm1hdGlvbiBhdCBodHRwczovL2ZvbnRzLmdvb2dsZS5jb20vc3BlY2ltZW4vUm9ib3RvYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnVmZmVyID0gaG9zdC5yZWFkKHN0eWxlRmlsZVBhdGgpO1xuXG4gICAgaWYgKCFidWZmZXIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgYENvdWxkIG5vdCByZWFkIHRoZSBkZWZhdWx0IHN0eWxlIGZpbGUgd2l0aGluIHRoZSBwcm9qZWN0IGAgKyBgKCR7c3R5bGVGaWxlUGF0aH0pYCxcbiAgICAgICk7XG4gICAgICBsb2dnZXIuaW5mbyhgUGxlYXNlIGNvbnNpZGVyIG1hbnVhbGx5IHNldHRpbmcgdXAgdGhlIFJvYm90byBmb250LmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGh0bWxDb250ZW50ID0gYnVmZmVyLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgaW5zZXJ0aW9uID1cbiAgICAgICdcXG4nICtcbiAgICAgIGBodG1sLCBib2R5IHsgaGVpZ2h0OiAxMDAlOyB9XFxuYCArXG4gICAgICBgYm9keSB7IG1hcmdpbjogMDsgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmOyB9XFxuYDtcblxuICAgIGlmIChodG1sQ29udGVudC5pbmNsdWRlcyhpbnNlcnRpb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKHN0eWxlRmlsZVBhdGgpO1xuXG4gICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChodG1sQ29udGVudC5sZW5ndGgsIGluc2VydGlvbik7XG4gICAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuICB9O1xufVxuIl19