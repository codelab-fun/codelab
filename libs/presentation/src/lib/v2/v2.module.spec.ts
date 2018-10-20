import { AngularPresentationV2Module } from './v2.module';

describe('AngularPresentationV2Module', () => {
  let v2Module: AngularPresentationV2Module;

  beforeEach(() => {
    v2Module = new AngularPresentationV2Module();
  });

  it('should create an instance', () => {
    expect(v2Module).toBeTruthy();
  });
});
