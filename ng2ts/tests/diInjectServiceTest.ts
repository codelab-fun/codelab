import { app_component_ts, app_html } from '../code';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { TestBed } from '@angular/core/testing';
import { VideoService } from '../video/video.service';
import 'initTestBed';


beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService],
    declarations: [AppComponent]
  });
  TestBed.overrideComponent(AppComponent, {
    set: {
      template: app_html,
      templateUrl: undefined
    }
  });
  TestBed.compileComponents();
});

describe('Blabla', () => {
  it(`Video.Service.ts: Add @Injectable() decorator to the class`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata('annotations', VideoService);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata).not.undefined;
  });
  it(`App.module.ts: Add VideoService to the NgModule providers property`, () => {
    let metadata;
    try {
      metadata = Reflect.getMetadata('annotations', AppModule);
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata[0].providers[0]).equals(VideoService);
  });

  it(`AppComponent.ts: Get rid of FAKE_VIDEOS`, () => {

    chai.expect(evalJs('typeof FAKE_VIDEOS;')).equals('undefined');
  });

  it(`App.Component.ts: Inject videoService in the component constructor`, () => {
    chai.expect(AppComponent.length, `App component constructor doesn't take any parameters`).to.equal(1);
    chai.expect(app_component_ts).matches(/VideoService/);
  });

  it(`App.Component.ts: When searching assign videoService.search results to the videos property of the class`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.search('itten');
    chai.expect(fixture.componentInstance.videos.length).to.equal(4);
  });
});

