import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackComponent } from './feedback.component';
import { FeedbackModule } from './feedback.module';
import { getMockAngularFireProviders } from '@codelab/utils/src/lib/testing/mocks/angular-fire';
import { GithubService } from './github.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackModule, NoopAnimationsModule],
      providers: [
        ...getMockAngularFireProviders(),
        { provide: GithubService, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
