import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgTogetherComponent } from './svg-together.component';
import { SafeHtml } from '@codelab/utils/src/lib/pipes/safeHtml.pipe';
import { getMockAngularFireProviders } from '@codelab/utils/src/lib/testing/mocks/angular-fire';
import { CodeDemoEditorComponent } from '@codelab/code-demos/src/lib/code-demo-editor/code-demo-editor.component';

// TODO this is broken due to monaco for some reason
describe.skip('SvgTogetherComponent', () => {
  let component: SvgTogetherComponent;
  let fixture: ComponentFixture<SvgTogetherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgTogetherComponent, SafeHtml],
      providers: [getMockAngularFireProviders(), CodeDemoEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgTogetherComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
