import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgTogetherResultComponent } from './svg-together-result.component';
import { SafeHtml } from '@codelab/utils/src/lib/pipes/safeHtml.pipe';
import { getMockAngularFireProviders } from '@codelab/utils/src/lib/testing/mocks/angular-fire';

describe('SvgTogetherResultComponent', () => {
  let component: SvgTogetherResultComponent;
  let fixture: ComponentFixture<SvgTogetherResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgTogetherResultComponent, SafeHtml],
      providers: [getMockAngularFireProviders()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgTogetherResultComponent);
    component = fixture.debugElement.componentInstance;
    component.allCode = 'function() { var hello = true; }';
    component.code = 'function() { var hello = true; }';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
