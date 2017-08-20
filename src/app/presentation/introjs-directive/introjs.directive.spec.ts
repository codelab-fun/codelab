import { IntrojsDirective } from './introjs.directive';

describe('IntrojsDirective', () => {
  it('should create an instance', () => {
    const directive = new IntrojsDirective({
      onActive: () => {
      }
    } as any);
    expect(directive).toBeTruthy();
  });
});
