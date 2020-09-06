import { upload_upload_component_html } from '../code';
import { TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { AppModule } from '../app.module';
import { UploadComponent } from '../upload/upload.component';
import { FormsModule } from '@angular/forms';
import 'initTestBed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export function createFakeEvent(type: string) {
  const event = document.createEvent('Event');
  event.initEvent(type, true, true);
  return event;
}

export function dispatchFakeEvent(node: Node | Window, type: string) {
  node.dispatchEvent(createFakeEvent(type));
}

describe('forms', () => {
  beforeEach(() => {
    try {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        declarations: [UploadComponent],
        imports: [FormsModule, MatInputModule, NoopAnimationsModule]
      });
      TestBed.overrideComponent(UploadComponent, {
        set: {
          template: upload_upload_component_html,
          templateUrl: undefined
        }
      });
      try {
        TestBed.compileComponents();
      } catch (e) {
        console.log(e);
      }
    } catch (e) {}
  });

  it('AddFormsModule', () => {
    let metadata;
    try {
      metadata = AppModule['__annotations__'][0];
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata.imports).to.contain(MatInputModule);
    chai.expect(metadata.imports).to.contain(FormsModule);
  });

  it('AddTitle', done => {
    const fixture = TestBed.createComponent(UploadComponent);
    fixture.componentInstance.title = 'hello';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const input = fixture.nativeElement.querySelector('input');
      chai.expect(input).is.ok;
      chai.expect(input.value).is.equal('hello');
      fixture.componentInstance.title = 'greatTitle';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        chai.expect(input.value).to.equal(fixture.componentInstance.title);
        done();
      });
    });
  });

  it('AddDescription', done => {
    const fixture = TestBed.createComponent(UploadComponent);
    fixture.componentInstance.description = 'hello';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const textarea = fixture.nativeElement.querySelector('textarea');
      chai.expect(textarea).is.ok;
      chai.expect(textarea.value).is.equal('hello');
      fixture.componentInstance.description = 'greatdescription';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        chai
          .expect(textarea.value)
          .to.equal(fixture.componentInstance.description);
        done();
      });
    });
  }, 4000);
});
