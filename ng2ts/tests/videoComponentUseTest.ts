import { Api } from '../api.service';
import { app_html, video_video_component_html } from '../code';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { TestBed } from '@angular/core/testing';
import { VideoComponent } from '../video/video.component';
import { VideoService } from '../video/video.service';
import 'initTestBed';
import { Component, Input } from '@angular/core';

function prepareTestingModule(videoComponent: any = VideoComponent) {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [VideoService],
    declarations: [AppComponent, videoComponent]
  });

  TestBed.overrideComponent(AppComponent, {
    set: {
      template: app_html,
      templateUrl: undefined
    }
  });
  TestBed.overrideComponent(videoComponent, {
    set: {
      template: video_video_component_html,
      templateUrl: undefined
    }
  });
  try { TestBed.compileComponents(); } catch(e) { console.log(e); }
}

describe('Component Tree', () => {
  it(`@@addVideoComponentToAppModule`, () => {
    prepareTestingModule();
    let metadata;
    try {
      metadata = AppModule['__annotations__'][0];
    } catch (e) {
      // Do nothing, we have assertions below for this case
    }

    chai.expect(metadata.declarations || [], `Video component not found`).contains(VideoComponent);
    chai.expect(metadata.declarations || [], `Keep the app component`).contains(AppComponent);
  });

  it(`@@replaceTitleAndThumbnail`, () => {
    @Component({
      selector: '' + 'my-video',
      template: 'v'
    })
    class MockVideoComponent {
      @Input() video = {
        title: 'Kittens coming soon!!!'
      };
    }

    prepareTestingModule(MockVideoComponent);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.videos = Api.fetch('');
    // TODO: if the element is added, but the video prop is not present, this test will fail with
    // a useless message. Passing video prop should actually be tested in the next test, and this
    // one should pass.

    fixture.detectChanges();

    const myVideos = fixture.nativeElement.querySelectorAll('my-video');
    chai.expect(myVideos.length, `can't find any <my-video> elements in the app component`).is.greaterThan(0);
    chai.expect(myVideos.length, `There should be one <my-video> element for each video`).equals(fixture.componentInstance.videos.length);
  });

  it(`@@useDataBindingToPassVideoToComponent`, () => {
    prepareTestingModule();
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.videos = Api.fetch('');
    fixture.detectChanges();
    const video = fixture.nativeElement.querySelector('my-video');
    chai.expect(video.getAttribute('ng-reflect-video')).equals('[object Object]');
  });
});

