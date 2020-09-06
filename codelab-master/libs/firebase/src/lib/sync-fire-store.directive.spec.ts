import { SyncFireStoreDirective } from './sync-fire-store.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'codelab-any',
  template: `
    <input [(ngModel)]="lol" syncFireStore="pikachu" />
  `
})
export class TestComponent {
  lol = 'hello';
}

describe('SyncFireStoreDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TestComponent, SyncFireStoreDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    const directive = new SyncFireStoreDirective();
    expect(directive).toBeTruthy();
  });
});
