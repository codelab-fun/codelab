import { getGreeting } from '../support/app.po';

describe('lis', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to lis!');
  });
});
