import { AppModule } from '../app.module';

describe('router', () => {

  it('app.module.ts: create a router configuration', () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata('annotations', AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    let message = metadata[0].imports;
    console.log(message);
    //debugger;

  });

  it('app.module.ts: pass the configuration to the module', () => {
    expect(1).toBe(2);
  });


  it('search.component.ts: pass the configuration to the module', () => {
    expect(1).toBe(2);
  });
});
