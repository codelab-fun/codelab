export function compileTemplates(files: Record<string, string>, sandbox) {
  Object.entries(files)
    .filter(([moduleName]) => moduleName.match(/\.html/))
    .forEach(([moduleName, code]) => {
      sandbox.iframe.contentWindow.System.register(moduleName, [], function(
        exports
      ) {
        return {
          setters: [],
          execute: function() {
            exports('template', code);
          }
        };
      });
    });
}
