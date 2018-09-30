import { AngularPresentationPage } from './app.po';

describe('angular-presentation App', () => {
  let page: AngularPresentationPage;

  beforeEach(() => {
    page = new AngularPresentationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
