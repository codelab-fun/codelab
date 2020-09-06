import { ExternalLinkDirectiveDirective } from './external-link-directive.directive';

describe('ExternalLinkDirectiveDirective', () => {
  it('should create an instance', () => {
    const directive = new ExternalLinkDirectiveDirective({
      nativeElement: document.createElement('a')
    });
    expect(directive).toBeTruthy();
  });
});
