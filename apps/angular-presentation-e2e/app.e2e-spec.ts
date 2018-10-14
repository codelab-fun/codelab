import { AngularPresentationPage } from './app.po';

describe('angular-presentation App', () => {
  let page: AngularPresentationPage;

  beforeEach(() => {
    page = new AngularPresentationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(1).toEqual(0);
  });
});
