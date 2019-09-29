import { Api } from '../api.service';
import { AppModule } from '../app.module';
import { TestBed } from '@angular/core/testing';
import { thumbs_thumbs_html, video_video_component_html } from '../code';
import { ThumbsComponent } from '../thumbs/thumbs.component';
import { VideoComponent } from '../video/video.component';
import 'initTestBed';

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [],
    declarations: [VideoComponent, ThumbsComponent]
  });

  TestBed.overrideComponent(VideoComponent, {
    set: {
      template: video_video_component_html
    }
  });
  TestBed.overrideComponent(ThumbsComponent, {
    set: {
      template: thumbs_thumbs_html
    }
  });
  try { TestBed.compileComponents(); } catch(e) { console.log(e); }
});

describe('Component Tree', () => {
  it(`app.module.ts: Add the ThumbsComponent to the AppModule 'declarations' property`, () => {
    let metadata;
    try {
      metadata = AppModule['__annotations__'][0];
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata.declarations || [], `Thumbs component not found`).contains(ThumbsComponent);
    chai.expect(metadata.declarations || [], `Keep the app component`).contains(VideoComponent);
  });

  it(`video.component.html: Use the thumbs component in the template`, () => {
    const fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = Api.fetch('')[0];
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.querySelector('.thumbs-up')).is.ok;
    chai.expect(fixture.nativeElement.querySelector('.thumbs-down')).is.ok;
  });

  it(`VideoComponent: Listen to the thumbs component onThumbs event, and update the amount of likes accordingly`, () => {
    const fixture = TestBed.createComponent(VideoComponent);
    fixture.componentInstance.video = Api.fetch('')[0];
    fixture.detectChanges();
    const likes = fixture.componentInstance.video.likes;
    // TODO: test it.
    fixture.nativeElement.querySelector('.thumbs-up').click();
    chai.expect(fixture.nativeElement.querySelector('.thumbs-up'), 'Thumbs up component is not present').to.be.ok;
    chai.expect(fixture.componentInstance.video.likes).equals(likes + 1);
    fixture.nativeElement.querySelector('.thumbs-down').click();
    chai.expect(fixture.nativeElement.querySelector('.thumbs-down'), 'Thumbs down component is not present').to.be.ok;
    chai.expect(fixture.componentInstance.video.likes).equals(likes);
  });
});

