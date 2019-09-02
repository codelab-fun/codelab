import {Api} from '../api.service';
import {
  app_html,
  context_context_html,
  thumbs_thumbs_html,
  toggle_panel_toggle_panel_html,
  video_video_component_html
} from '../code';
import {AppComponent} from '../app.component';
import {AppModule} from '../app.module';
import {ContextComponent} from '../context/context.component';
import {ContextService} from '../context/context.service';
import {FuzzyPipe} from '../fuzzy-pipe/fuzzy.pipe';
import {TestBed} from '@angular/core/testing';
import {ThumbsComponent} from '../thumbs/thumbs.component';
import {TogglePanelComponent} from '../toggle-panel/toggle-panel.component';
import {VideoComponent} from '../video/video.component';
import {VideoService} from '../video/video.service';
import 'initTestBed';


const sampleVideo = Api.fetch('')[0];

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService, ContextService, /* that's a hack, to provide parent component */ VideoComponent],
    declarations: [AppComponent, VideoComponent, ThumbsComponent, TogglePanelComponent, ContextComponent, FuzzyPipe]
  });
  TestBed.overrideComponent(AppComponent, {set: {template: app_html}});
  TestBed.overrideComponent(VideoComponent, {set: {template: video_video_component_html}});
  TestBed.overrideComponent(ThumbsComponent, {set: {template: thumbs_thumbs_html}});
  TestBed.overrideComponent(TogglePanelComponent, {set: {template: toggle_panel_toggle_panel_html}});
  TestBed.overrideComponent(ContextComponent, {set: {template: context_context_html}});
  try { TestBed.compileComponents(); } catch(e) { console.log(e); }
});
function sampleFuzzy(value) {
  const date = new Date(value);
  const dateNow = new Date();
  const millisecondsDifference = dateNow.getTime() - date.getTime();
  const differenceDays = Math.floor(millisecondsDifference / (1000 * 3600 * 24));

  return differenceDays + ' ' + 'days';
}

describe('Pipes', () => {


  it(`app.module.ts: Add the FuzzyPipe to the AppModule declarations`, () => {
    let metadata;
    try {
      metadata = AppModule['__annotations__'][0];
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata.declarations || [], `Fuzzy pipe not found`).contains(FuzzyPipe);
  });

  it(`video.component.html: Use the pipe on the date.`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    chai.expect(fixture.nativeElement.querySelector('my-video').innerHTML).contains(sampleFuzzy(sampleVideo.date));
  });
});

