import { parseTemplate } from './ms';
fdescribe('micro-syntax', () => {
  it('parses ngIF', () => {
    expect(parseTemplate('<div *ngIf="hero">{{hero.name}}</div>')).toBe(`<ng-template [ngIf]="hero">
  <div>{{hero.name}}</div>
</ng-template>`);
  });

  it('parses ngIf multi line', () => {
    expect(parseTemplate(`<div *ngIf="hero">
  {{hero.name}}
  </div>`)).toBe(`<ng-template [ngIf]="hero">
  <div>
  {{hero.name}}
  </div>
</ng-template>`);
  });


   it('parses ngFor', () => {
    expect(parseTemplate(`<div *ngFor="let x of list">
  {{hero.name}}
  </div>`)).toBe(`<ng-template [ngIf]="hero">
  <div>
  {{hero.name}}
  </div>
</ng-template>`);
  });





});
