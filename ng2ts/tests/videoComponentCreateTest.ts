import {Api} from '../api.service';
import {TestBed} from '@angular/core/testing';
import {video_video_component_html} from '../code';
import {VideoComponent} from '../video/video.component';
import {VideoService} from '../video/video.service';
import 'initTestBed';
const video = Api.fetch('')[0];

beforeEach(() => {
  try {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [VideoService],
      declarations: [VideoComponent]
    });
    TestBed.overrideComponent(VideoComponent, {
      set: {
        template: video_video_component_html,
        templateUrl: undefined
      }
    });
    TestBed.compileComponents();
  } catch (e) {
    // whatever
  }
});

describe('Component tree', () => {
  describe('Make sure metadata is in place', () => {
    it(`video.component.ts: Set the selector property to 'my-video'.`, () => {
      const metadata = Reflect.getMetadata('annotations', VideoComponent);
      chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].selector, `VideoComponent's selector has to be 'my-video'.`).equals('my-video');
    });

    it(`video.component.ts: Set the templateUrl to load the appropriate html file`, () => {
      const metadata = Reflect.getMetadata('annotations', VideoComponent);
      chai.expect(metadata, `VideoComponent doesn't have a @Component() annotation`).is.not.undefined;
      chai.expect(metadata[0].templateUrl, `VideoComponent's templateUrl should be set to './video.component.html'`)
        .matches(/\.\/video\.component\.html/);
    });

    it(`video.component.ts: Add a video property and decorate it with @Input()`, () => {
      const metadata = Reflect.getMetadata('propMetadata', VideoComponent);
      chai.expect(metadata, `VideoComponent doesn't have any @Input()'s`).is.not.undefined;
      chai.expect(Object.keys(metadata).length, `VideoComponent doesn't have any @Input()'s`).equals(1);
      chai.expect(metadata.video, `VideoComponent's @Input()' should be called video.`).is.not.undefined;
    });
  });


  describe('Make sure things are displayed properly', () => {
    let fixture;
    beforeEach(() => {
      try {

        fixture = TestBed.createComponent(VideoComponent);
        fixture.componentInstance.video = video;
        fixture.detectChanges();
      } catch (e) {

      }
    });

    it(`video.component.html: Display the video title`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video title`).contains(video.title);
    });

    it(`video.component.html: Display the video thumbnail`, () => {
      const image = fixture.nativeElement.querySelector('img');
      chai.expect(image, `Can't find the thumbnail`).is.not.null;
      chai.expect(image.getAttribute('src')).equals(video.src);
    });

    it(`video.component.html: Display the video description`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.description);
    });


    it(`video.component.html: Display the video date`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video date`).contains(video.date);
    });

    it(`video.component.html: Display the number video likes`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video like`).contains(video.likes);
    });

    it(`video.component.html: Display the number of video views`, () => {
      chai.expect(fixture.nativeElement.innerHTML, `can't find the video description`).contains(video.views);
    });
  });
});

