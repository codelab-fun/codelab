import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSyncComponent } from './code-sync.component';
import { CodeSyncModule } from './code-sync.module';
import { RouterTestingModule } from '@angular/router/testing';
import { getMockAngularFireProviders } from '@codelab/utils/src/lib/testing/mocks/angular-fire';

describe('CodeSyncComponent', () => {
  let component: CodeSyncComponent;
  let fixture: ComponentFixture<CodeSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CodeSyncModule, RouterTestingModule],
      providers: [getMockAngularFireProviders()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
