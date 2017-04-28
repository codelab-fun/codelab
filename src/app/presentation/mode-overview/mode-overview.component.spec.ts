import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeOverviewComponent } from './mode-overview.component';


describe('ModeOverviewComponent', () => {
  let component: ModeOverviewComponent;
  let fixture: ComponentFixture<ModeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
