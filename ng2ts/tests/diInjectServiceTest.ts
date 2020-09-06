import { app_component_ts, app_html } from '../code';
import { AppComponent, evalJs } from '../app.component';
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
  try {
    TestBed.compileComponents();
  } catch (e) {
    console.log(e);
  }
});

describe('Blabla', () => {
  it(`@@addIjectableDecoraterToClass`, () => {
    let metadata;
    try {
      metadata = VideoService['__annotations__'][0];
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }
    chai.expect(metadata, 'Class VideoService has no decorators attached to it')
      .not.undefined;
  });

  it(`@@addVideoServiceToNgModule`, () => {
    let metadata;
    try {
      metadata = AppModule['__annotations__'][0];
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }

    chai.expect(
      metadata.providers,
      'Can not find "providers" property in the NgModule decorator of the app module'
    ).not.to.be.undefined;
    chai
      .expect(metadata.providers.length, '"providers" array is empty')
      .to.be.greaterThan(0);
    chai
      .expect(
        metadata.providers[0],
        'Expect the first provider to be VideoService'
      )
      .equals(VideoService);
  });

  it(`@@getRidOfFakeVideos`, () => {
    chai
      .expect(
        evalJs('typeof FAKE_VIDEOS;'),
        'Variable FAKE_VIDEOS is still present in the code'
      )
      .equals('undefined');
  });

  it(`@@injectVideoService`, () => {
    chai
      .expect(
        AppComponent.length,
        `App component constructor doesn't take any parameters`
      )
      .to.equal(1);
    chai.expect(app_component_ts).matches(/VideoService/);
  });

  it(`@@updateAppComponentSearchmethod`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.search('Itty');
    chai.expect(fixture.componentInstance.videos.length).to.equal(3);
  });
});
