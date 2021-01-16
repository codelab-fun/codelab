import { Api } from '../api.service';
import {
  app_html,
  thumbs_thumbs_html,
  toggle_panel_toggle_panel_html,
  video_video_component_html
  } from '../code';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { TestBed } from '@angular/core/testing';
import { ThumbsComponent } from '../thumbs/thumbs.component';
import { TogglePanelComponent } from '../toggle-panel/toggle-panel.component';
import { VideoComponent } from '../video/video.component';
import { VideoService } from '../video/video.service';
import 'initTestBed';

const video = Api.fetch('')[0];

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService],
    declarations: [AppComponent, VideoComponent, TogglePanelComponent, ThumbsComponent]
  });
  TestBed.overrideComponent(AppComponent, { set: { template: app_html } });
  TestBed.overrideComponent(ThumbsComponent, { set: { template: thumbs_thumbs_html } });
  TestBed.overrideComponent(VideoComponent, { set: { template: video_video_component_html } });
  TestBed.overrideComponent(TogglePanelComponent, { set: { template: toggle_panel_toggle_panel_html } });
  try { TestBed.compileComponents(); } catch(e) { console.log(e); }
});

describe('Component Tree', () => {
  it(`app.module.ts: Add the TogglePanelComponent to the declarations.`, () => {
    let metadata;
    try {
      metadata = AppModule['__annotations__'][0];
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata.declarations || [], `Keep the video component`).contains(VideoComponent);
    chai.expect(metadata.declarations || [], `Keep the app component`).contains(AppComponent);
    chai.expect(metadata.declarations || [], `Add TogglePanelComponent`).contains(TogglePanelComponent);
  });

  it(`video/video.component.html: Use the TogglePanel component in the template`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('my-toggle-panel');
    chai.expect(panel).is.not.null;
  });


  it(`video/video.component.html: Add .description as TogglePanel's content`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('my-toggle-panel');

    chai.expect(panel.querySelector('.description')).is.not.null;
    chai.expect(panel.querySelector('.extra')).is.null;

    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML, `Should display description text.`).contains(video.description);
    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML, `Should not display likes `).not.contains(video.likes);
  });

  it(`video/video.component.html: Add .extra as TogglePanel's content`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('my-toggle-panel');

    panel.querySelector('button').click();
    fixture.detectChanges();
    chai.expect(panel.querySelector('.description')).is.null.null;
    chai.expect(panel.querySelector('.extra')).is.not.null;

    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML, `Should not description text.`).not.contains(video.description);
    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML, `Should display likes`).contains(video.likes);

  });
});

