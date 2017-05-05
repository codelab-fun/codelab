import {TrackingDirective} from './tracking.directive';

xdescribe('TrackingDirective', () => {
  it('should create an instance', () => {
    const directive = new TrackingDirective(null, null, null, null);
    expect(directive).toBeTruthy();
  });
});
