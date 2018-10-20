import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PresentationComponentV2 } from '@angular-presentation/presentation/src/lib/v2/pres/presentation-componentv2.component';



describe('PresentationComponentV2', () => {
  let component: PresentationComponentV2;
  let fixture: ComponentFixture<PresentationComponentV2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationComponentV2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationComponentV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
