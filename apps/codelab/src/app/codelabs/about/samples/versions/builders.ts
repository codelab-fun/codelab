Repository()
  .version('create-component', v => {
    v.file('app.component.ts')
      .getImport('@angular.core')
      .add('Component');
  })
  .version('create-component-solution', v => {
    v.file('app.component.ts')
      .getClass('AppComponent')
      .getDecorator('Component')
      .addProperty('template', '<h1>lol</h1>');
  })
  .version('inputs', v => {
    v.file('app.component.ts')
      .getImport('@angular.core')
      .add('Input');
  });
