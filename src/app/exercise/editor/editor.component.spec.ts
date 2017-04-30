import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorComponent } from './editor.component';
import { MonacoConfigService } from '../services/monaco-config.service';


// TODO: Fix this failing test suite.
xdescribe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditorComponent],
      providers: [{
        provide: MonacoConfigService, useValue: {
          monaco: {
            editor: {
              create: () => ({
                getModel: () => ({
                  getValue: () => 'hi',
                  onDidChangeContent: () => {},
                }),
                layout: () => {}
              }),
              getModel: () => {}
            }
          }
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    component.file = {
      path: 'test.ts',
      template: 'hi',
      code: 'hi'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
