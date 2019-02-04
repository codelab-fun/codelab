import { browser, element, by } from 'protractor';

export class AngularPresentationPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('codelab-root h1')).getText();
  }
}
