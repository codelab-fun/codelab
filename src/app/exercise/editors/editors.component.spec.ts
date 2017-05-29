import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorsComponent } from './editors.component';

// TODO: Fix this test suite.
xdescribe('EditorsComponent', () => {
  let component: EditorsComponent;
  let fixture: ComponentFixture<EditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorsComponent],
      providers: [{},
        {}]
    })
      .overrideComponent(EditorsComponent, {set: {template: 'hi'}})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return visible files', () => {
    component.files = [{hidden: true}, {hidden: false}];
    expect(component.visibleFiles.length).toEqual(1);
  });
});
